export const SVG_WIDTH = 960 as const;
export const SVG_HEIGHT = 600 as const;

export const VIDEO_GAMES = "videogames" as const;
export const MOVIES = "movies" as const;
export const KICKSTARTER = "kickstarter" as const;

export const RESOURCES = {
  [VIDEO_GAMES]: {
    url: "https://cdn.jsdelivr.net/gh/freeCodeCamp/testable-projects-fcc@a80ce8f9/src/data/tree_map/video-game-sales-data.json",
    title: "Video Game Sales",
    description: "Top 100 Most Sold Video Games Grouped by Platform",
  },
  [MOVIES]: {
    url: "https://cdn.jsdelivr.net/gh/freeCodeCamp/testable-projects-fcc@a80ce8f9/src/data/tree_map/movie-data.json",
    title: "Movies Sales",
    description: "Top 100 Highest Grossing Movies Grouped By Genre",
  },
  [KICKSTARTER]: {
    url: "https://cdn.jsdelivr.net/gh/freeCodeCamp/testable-projects-fcc@a80ce8f9/src/data/tree_map/kickstarter-funding-data.json",
    title: "Kickstarter Pledges",
    description:
      "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
  },
} as const;
