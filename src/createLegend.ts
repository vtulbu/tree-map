export const createLegend = (
  legendCell: d3.Selection<SVGGElement, string, SVGSVGElement, unknown>,
  color: d3.ScaleOrdinal<string, string, never>
) => {
  legendCell
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", (_, i) => {
      if (i < 6) {
        return 0;
      }
      if (i < 12) {
        return 200;
      }

      return 400;
    })
    .attr("y", (_, i) => {
      if (i < 6) {
        return i * 25;
      }
      if (i < 12) {
        return (i - 6) * 25;
      }

      return (i - 12) * 25;
    })
    .attr("fill", (d) => color(d));

  legendCell
    .append("text")
    .attr("x", (_, i) => {
      if (i < 6) {
        return 25;
      }
      if (i < 12) {
        return 225;
      }

      return 425;
    })
    .attr("y", (_, i) => {
      if (i < 6) {
        return i * 25 + 15;
      }
      if (i < 12) {
        return (i - 6) * 25 + 15;
      }

      return (i - 12) * 25 + 15;
    })
    .text((d) => d);
};
