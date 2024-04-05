import * as d3 from "d3";

export const tooltip = d3
  .select("body")
  .append("div")
  .style("position", "absolute")
  .style("opacity", 0)
  .attr("id", "tooltip");
