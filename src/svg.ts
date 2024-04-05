import * as d3 from "d3";
import { SVG_WIDTH, SVG_HEIGHT } from "./constants";

export const svg = d3
  .select("#app")
  .append("svg")
  .attr("width", SVG_WIDTH)
  .attr("height", SVG_HEIGHT);

export const legend = d3
  .select("#app")
  .append("svg")
  .attr("width", 500)
  .style("margin", "2rem 0");
