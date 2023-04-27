import * as d3 from "d3";
import { useEffect, useCallback } from "react";

const Chart = ({ data, svgRef }) => {
  console.log(data);
  const draw = useCallback(() => {
    // select svg element
    const svg = d3.select(svgRef.current).append("g");

    // set chart dims
    const width = 300, //svg.attr("width"), // get width of svg element
      height = 300, // svg.attr("height"), // get height of svg element
      radius = 150, //calculate max radius
      g = svg
        .append("g") // append g element to svg
        .attr("transform", "translate(" + 450 / 2 + "," + 450 / 2 + ")"); // place in the center

    const color = d3.scaleOrdinal([
      "#4daf4a",
      "#377eb8",
      "#ff7f00",
      "#984ea3",
      "#e41a1c",
    ]);

    // Generate the pie
    const pie = d3.pie().value(function (d) {
      return d.submittedValue;
    });

    // Generate the arcs
    const arc = d3.arc().innerRadius(100).outerRadius(radius);

    const label = d3
      .arc()
      .innerRadius(radius * 1.2)
      .outerRadius(radius * 1.2);

    // Generate groups
    const arcs = g
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    // Draw arc paths
    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", function (d, i) {
        return color(i);
      })
      .transition() // Add ease out
      .duration(500)
      .ease(d3.easeCubicOut)
      .attrTween("d", function (d) {
        let i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return arc(d);
        };
      });

    // Add labels
    arcs
      .append("text")
      .attr("transform", function (d) {
        return "translate(" + label.centroid(d) + ")";
      })
      .attr("font-size", "16")
      .text(function (d) {
        return d.data.submittedLabel;
      });

    // Remove labels that are not needed
    arcs.exit().select("text").remove();
  }, [data, svgRef]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div>
      <svg className="chart" ref={svgRef} width="450" height="450"></svg>
    </div>
  );
};

export default Chart;
