import { VideoGamesData } from "./types";

export const createTreeMapCells = (
  cell: d3.Selection<
    SVGGElement,
    d3.HierarchyRectangularNode<VideoGamesData>,
    SVGSVGElement,
    unknown
  >,
  color: d3.ScaleOrdinal<string, string, never>
) => {
  cell
    .append("rect")
    .attr("width", function (d) {
      return d.x1 - d.x0;
    })
    .attr("height", function (d) {
      return d.y1 - d.y0;
    })
    .style("fill", function (d) {
      return color(d.parent?.data.name || "");
    });

  cell
    .append("text")
    .attr("class", "tile-text")
    .selectAll("tspan")
    .data(function (d) {
      return d.data.name.split(/(?=[A-Z][^A-Z])/g);
    })
    .enter()
    .append("tspan")
    .attr("x", 4)
    .attr("y", function (_, i) {
      return 13 + i * 10;
    })
    .text(function (d) {
      return d;
    })
    .attr("font-size", "10px");
};
