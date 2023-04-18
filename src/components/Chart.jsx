import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Chart = ({ data }) => {
  const draw = () => {
    // var data = [2, 4, 8, 10];

    var svg = d3.select("svg"),
      width = svg.attr("width"),
      height = svg.attr("height"),
      radius = Math.min(width, height) / 2,
      g = svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var color = d3.scaleOrdinal([
      "#4daf4a",
      "#377eb8",
      "#ff7f00",
      "#984ea3",
      "#e41a1c",
    ]);

    // Generate the pie
    var pie = d3.pie();

    // Generate the arcs
    var arc = d3.arc().innerRadius(0).outerRadius(radius);

    //Generate groups
    var arcs = g
      .selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    //Draw arc paths
    arcs
      .append("path")
      .attr("fill", function (d, i) {
        return color(i);
      })
      .attr("d", arc);
  };

  useEffect(() => {
    draw();
  }, [data]);

  const svgRef = useRef(null);

  function handleDownload() {
    const svg = svgRef.current;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 300;
      canvas.height = 300;
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);

      const link = document.createElement("a");
      link.download = "plot.png";
      link.href = canvas.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    image.src =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);
  }

  return (
    <div>
      <svg ref={svgRef} width="300" height="300"></svg>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Chart;
