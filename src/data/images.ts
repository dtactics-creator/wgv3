const px = (id: number, w = 1920) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const IMAGES = {
  hero: "/img/Modern commercial architecture.webp",
  intro: "/img/Modern commercial architecture.webp",
  about: "/img/Commercial-Asset.png",
  expertise: {
    industrial: "/img/Industrial Spaces.png",
    plots: "/img/Industrial Plots.png",
    commercial: "/img/Commercial architecture.png",
    agricultural: "/img/Agricultural Lands.jpeg",
    estate: "/img/Estates.jpeg",
  },
  properties: {
    facility: px(6060193, 1800), // RETAINED UNCHANGED as required
    commercial: "/img/Commercial architecture1.png",
    land: "/img/Industrial Land.png",
    agriculturalEstate: "/img/Agricultural-Estate.jpeg",
  },
  cta: "/img/Estates.png",
} as const;
