const px = (id: number, w = 1920) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMAGES = {
  hero: "/img/Modern commercial architecture.webp",
  intro: "/img/Modern commercial architecture.webp",
  about: "/img/Commercial-Asset.webp",
  expertise: {
    industrial: "/img/Industrial Spaces.webp?v=2",
    plots: "/img/Industrial Plots.webp",
    commercial: "/img/Commercial architecture.webp",
    agricultural: "/img/Agricultural Lands.webp",
    estate: "/img/Estates.webp",
  },
  properties: {
    facility: px(6060193, 1800), // RETAINED UNCHANGED as required
    commercial: "/img/Commercial architecture1.webp",
    land: "/img/Industrial Land.webp",
    agriculturalEstate: "/img/Agricultural-Estate.webp",
  },
  cta: "/img/Estates.webp",
} as const;
