import * as d3 from "d3";
import { useEffect, useCallback } from "react";

const Chart = ({ data, svgRef }) => {
  const draw = useCallback(() => {
    const svg = d3.select(svgRef.current), // select svg element
      width = svg.attr("width"), // get width of svg element
      height = svg.attr("height"), // get height of svg element
      radius = Math.min(width, height) / 2, //calculate max radius
      g = svg
        .append("g") // append g element to svg
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"); // place in the center

    const color = d3.scaleOrdinal([
      "#4daf4a",
      "#377eb8",
      "#ff7f00",
      "#984ea3",
      "#e41a1c",
    ]);

    // Generate the pie
    const pie = d3.pie();

    // Generate the arcs
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

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
      .attr("fill", function (d, i) {
        return color(i);
      })
      .attr("d", arc)
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
  }, [data, svgRef]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div>
      <svg className="chart" ref={svgRef} width="300" height="300"></svg>
    </div>
  );
};

export default Chart;
