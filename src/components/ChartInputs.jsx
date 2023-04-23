import { Fragment } from "react";
import * as d3 from "d3";

const ChartInputs = ({ onAction, svgRef }) => {
  const handleAdd = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const submittedValue = formData.get("submittedValue");
    onAction((prevData) => {
      return [...prevData, submittedValue];
    });
  };

  const handleReset = () => {
    d3.selectAll("svg > *").remove();
    onAction(() => {
      return [];
    });
  };

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
    <Fragment>
      <form className="chart-input" onSubmit={handleAdd}>
        <input type="number" name="submittedValue"></input>
        <button className="btn" type="submit">
          Add Data
        </button>
      </form>
      <button className="btn-download" onClick={handleDownload}>
        Download
      </button>
      <button className="btn-reset" onClick={handleReset}>
        Reset
      </button>
    </Fragment>
  );
};

export default ChartInputs;
