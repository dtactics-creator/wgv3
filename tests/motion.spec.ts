import { expect, test, type Page } from "@playwright/test";

async function ready(page: Page) {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".site-loader")).toHaveCount(0);
  await page.waitForFunction(() => document.fonts.status === "loaded");
  await page.waitForTimeout(1700);
}

async function seek(page: Page, selector: string, viewportPosition: number) {
  await page.locator(selector).first().evaluate((element, position) => {
    window.scrollTo({
      top: Math.max(0, element.getBoundingClientRect().top + window.scrollY - window.innerHeight * position),
      behavior: "instant",
    });
  }, viewportPosition);
  await page.waitForTimeout(1150);
}

async function transform(page: Page, selector: string) {
  return page.locator(selector).first().evaluate((element) => getComputedStyle(element).transform);
}

async function noOverflow(page: Page) {
  const sizes = await page.evaluate(() => ({
    document: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  }));
  expect(sizes.document).toBeLessThanOrEqual(sizes.viewport + 1);
}

test("hero, editorial and property imagery have real scroll-linked parallax", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await ready(page);
  await noOverflow(page);
  await page.screenshot({ path: info.outputPath("hero.png") });
  const heroBefore = await transform(page, "#home .parallax-layer");
  const titleBefore = await transform(page, "[data-hero-title]");
  await page.evaluate(() => window.scrollTo({ top: 360, behavior: "instant" }));
  await page.waitForTimeout(1200);
  expect(await transform(page, "#home .parallax-layer")).not.toBe(heroBefore);
  expect(await transform(page, "[data-hero-title]")).not.toBe(titleBefore);

  await seek(page, "#intro figure > div", 0.83);
  const editorialBefore = await transform(page, "#intro .parallax-layer");
  const cropBefore = await page.locator("#intro figure > div").evaluate((element) => getComputedStyle(element).clipPath);
  await seek(page, "#intro figure > div", 0.25);
  expect(await transform(page, "#intro .parallax-layer")).not.toBe(editorialBefore);
  expect(await page.locator("#intro figure > div").evaluate((element) => getComputedStyle(element).clipPath)).not.toBe(cropBefore);
  const coverage = await page.locator("#intro .parallax-layer").evaluate((element) => {
    const image = element.getBoundingClientRect();
    const frame = element.parentElement!.getBoundingClientRect();
    return image.top <= frame.top && image.bottom >= frame.bottom;
  });
  expect(coverage).toBe(true);

  await seek(page, "[data-property-frame]", 0.82);
  const propertyBefore = await transform(page, "[data-property-parallax]");
  await seek(page, "[data-property-frame]", 0.25);
  expect(await transform(page, "[data-property-parallax]")).not.toBe(propertyBefore);
  await page.screenshot({ path: info.outputPath("property-parallax.png") });
  await noOverflow(page);
  expect(errors).toEqual([]);
});

test("expertise wipes, ownership timeline and typography follow the scroll position", async ({ page }, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await ready(page);
  const thirdBlock = "[data-xp-block]:nth-child(3)";
  await seek(page, thirdBlock, 0.65);
  const panel = page.locator("[data-xp-panel]").nth(2);
  const partial = await panel.evaluate((element) => getComputedStyle(element).clipPath);
  await seek(page, thirdBlock, 0.2);
  expect(await panel.evaluate((element) => getComputedStyle(element).clipPath)).not.toBe(partial);
  await expect(page.locator("[data-xp-sticky-column] .tabular-nums")).toHaveText("03");
  await page.screenshot({ path: info.outputPath("expertise-scroll.png") });
  await seek(page, "[data-xp-block]:nth-child(5)", 0.2);
  await expect(page.locator("[data-xp-sticky-column] .tabular-nums")).toHaveText("05");
  await seek(page, "[data-xp-block]:nth-child(1)", 0.2);
  await expect(page.locator("[data-xp-sticky-column] .tabular-nums")).toHaveText("01");

  await seek(page, "#approach ol", 0.75);
  const initialRail = await transform(page, "[data-approach-progress]");
  await seek(page, "[data-step]:nth-child(3)", 0.35);
  expect(await transform(page, "[data-approach-progress]")).not.toBe(initialRail);
  await page.screenshot({ path: info.outputPath("approach-scroll.png") });

  const stripe = ".scroll-type-track";
  await seek(page, stripe, 0.8);
  const typeBefore = await transform(page, stripe);
  await seek(page, stripe, 0.2);
  expect(await transform(page, stripe)).not.toBe(typeBefore);

  await seek(page, "section[aria-labelledby='conversation-heading']", 0.8);
  const closingBefore = await transform(page, "section[aria-labelledby='conversation-heading'] .parallax-layer");
  await seek(page, "section[aria-labelledby='conversation-heading']", 0.2);
  expect(await transform(page, "section[aria-labelledby='conversation-heading'] .parallax-layer")).not.toBe(closingBefore);
  expect(errors).toEqual([]);
});

test("mobile retains native scrolling, readable layouts and working menu anchors", async ({ browser }, info) => {
  const context = await browser.newContext({
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000",
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await ready(page);
  await page.screenshot({ path: info.outputPath("mobile-hero.png") });
  expect(await page.locator("html").evaluate((element) => element.classList.contains("lenis"))).toBe(false);
  await noOverflow(page);
  for (const section of ["#expertise", "#properties", "#why", "#approach", "#contact"]) {
    await seek(page, section, 0.1);
    await noOverflow(page);
  }
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await page.waitForTimeout(900);
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toHaveAttribute("inert", "");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(900);
  await page.getByRole("navigation", { name: "Mobile", exact: true }).getByRole("link", { name: "Contact", exact: true }).click();
  await page.waitForTimeout(1900);
  const contactTop = await page.locator("#contact").evaluate((element) => element.getBoundingClientRect().top);
  expect(Math.abs(contactTop - 76)).toBeLessThan(4);
  expect(await page.locator("html").evaluate((element) => getComputedStyle(element).overflow)).not.toBe("hidden");
  expect(errors).toEqual([]);
  await context.close();
});

test("live reduced-motion changes remove scene transforms and preserve the full narrative", async ({ page }) => {
  await ready(page);
  await seek(page, "#about figure > div", 0.3);
  expect(await page.locator("#about .parallax-layer").evaluate((element) => (element as HTMLElement).style.transform)).not.toBe("");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => page.locator("#about .parallax-layer").evaluate((element) => (element as HTMLElement).style.transform)).toBe("");
  await expect(page.locator("[data-counter]")).toHaveText("15");
  expect(await page.locator("html").evaluate((element) => element.classList.contains("lenis"))).toBe(false);
  expect(await page.locator("[data-xp-sticky-column]").evaluate((element) => getComputedStyle(element).display)).toBe("none");
  for (const image of await page.locator("[data-xp-mobile-frame]").all()) await expect(image).toBeVisible();
  await noOverflow(page);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect.poll(() => page.locator("#about .parallax-layer").evaluate((element) => (element as HTMLElement).style.transform)).not.toBe("");
  await seek(page, "#home", 0);
  await expect(page.locator("h1")).toBeVisible();
});
