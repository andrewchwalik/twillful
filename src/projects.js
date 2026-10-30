// Add new site cards here; both portfolio rows include every registered project.
export const siteProjects = {
  bluebird: { label: "Bluebird", company: "Bluebird", url: "https://bluebird.ooo/", background: "#29486e", image: "assets/client-cards/bluebird.jpg" },
  lakeside: { label: "Lakeside", company: "Lakeside Laundromat", url: "https://lakesidelaundromat.com/", background: "#9c6f4e", image: "assets/client-cards/lakeside-laundromat.jpg" },
  personal: { label: "Andrew", company: "Andrew Chwalik", url: "https://andrewchwalik.com/", image: "assets/client-cards/andrew-chwalik-painting.png", background: "#496958" },
  captionLab: { label: "Caption Lab", company: "The Caption Lab", url: "https://www.thecaptionlab.com/", background: "#574070", image: "assets/client-cards/the-caption-lab.jpg" },
  adamh: { label: "ADAMH", company: "ADAMH", url: "https://andrewchwalik.github.io/adamh-header-prototype/", image: "assets/client-cards/adamh-painting.png", background: "#91a986" },
  firelands: { label: "Firelands", company: "Firelands United", url: "https://firelandsunited.com/", background: "#334164", image: "assets/client-cards/firelands-united-textile.png" },
  sweatyThumb: { label: "SweatyThumb", company: "SweatyThumb", url: "https://sweatythumb.com/", background: "#080f30", image: "assets/client-cards/sweatythumb-abstract.png" }
};

export function includeAllProjects(cards, projects = Object.values(siteProjects)) {
  const included = new Set(cards.map(card => card.url));
  const missing = projects.filter(project => !included.has(project.url));
  return [...cards, ...missing.map((project, index) => ({
    ...project,
    offset: 8 + index % 3 * 3,
    delay: `${((cards.length + index) * 0.4).toFixed(1)}s`
  }))];
}
