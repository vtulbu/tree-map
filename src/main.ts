import "./style.css";

import * as d3 from "d3";
import {
  KICKSTARTER,
  MOVIES,
  RESOURCES,
  SVG_HEIGHT,
  SVG_WIDTH,
  VIDEO_GAMES,
} from "./constants";
import { schema } from "./schema";
import { VideoGamesData } from "./types";
import { legend, svg } from "./svg";
import { createLegend } from "./createLegend";
import { createTreeMapCells } from "./createTreeMapCells";
import { tooltip } from "./tooltip";

let urlData;
const queryData = new URLSearchParams(window.location.search).get("data");
const description = document.querySelector(
  "#description"
) as HTMLParagraphElement;
const title = document.querySelector("#title") as HTMLHeadingElement;

switch (queryData) {
  case VIDEO_GAMES:
    urlData = RESOURCES[VIDEO_GAMES].url;
    title.innerHTML = RESOURCES[VIDEO_GAMES].title;
    description.innerHTML = RESOURCES[VIDEO_GAMES].description;
    break;
  case MOVIES:
    urlData = RESOURCES[MOVIES].url;
    title.innerHTML = RESOURCES[MOVIES].title;
    description.innerHTML = RESOURCES[MOVIES].description;
    break;
  case KICKSTARTER:
    urlData = RESOURCES[KICKSTARTER].url;
    title.innerHTML = RESOURCES[KICKSTARTER].title;
    description.innerHTML = RESOURCES[KICKSTARTER].description;
    break;
  default:
    const url = new URL(window.location.href);
    url.searchParams.delete("data");
    url.searchParams.append("data", VIDEO_GAMES);
    window.location.href = url.toString();
    break;
}

if (!urlData) {
  throw new Error("Invalid data");
}

d3.json<VideoGamesData>(urlData).then((data) => {
  if (!data) {
    return;
  }

  const root = d3
    .hierarchy(data)
    .sum(function (d) {
      if ("value" in d) {
        return Number(d.value);
      }

      return 0;
    })
    .sort(function (a, b) {
      return (b.value || 0) - (a.value || 0);
    }) as d3.HierarchyRectangularNode<VideoGamesData>;

  const domains = new Set(root.leaves().map((d) => d.parent?.data.name || ""));
  const color = schema(Array.from(domains)) as d3.ScaleOrdinal<string, string>;

  //create the treemap and assign root
  d3.treemap<VideoGamesData>().size([SVG_WIDTH, SVG_HEIGHT]).padding(1)(root);

  //create cells
  const cell = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", function (d) {
      return "translate(" + d.x0 + "," + d.y0 + ")";
    });
  createTreeMapCells(cell, color);

  const legendCell = legend
    .selectAll("g")
    .data(Array.from(domains))
    .enter()
    .append("g");
  createLegend(legendCell, color);

  cell
    .on("mousemove", function (event, d) {
      tooltip.style("opacity", 0.9);
      tooltip
        .html(
          `<p>Name: ${d.data.name}</p><p>Category: ${
            d.parent?.data.name
          }</p><p>Value: ${"value" in d.data ? d.data.value : ""}</p>`
        )
        .style("left", event.pageX + 20 + "px")
        .style("top", event.pageY + 20 + "px");
    })
    .on("mouseout", function () {
      tooltip.style("opacity", 0);
    });
});
