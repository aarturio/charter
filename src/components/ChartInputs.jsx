import { Fragment, useState } from "react";
import * as d3 from "d3";

const ChartInputs = ({ onAction, svgRef }) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredLabel, setEnteredLabel] = useState("");

  const handleAdd = (event) => {
    event.preventDefault();
    d3.selectAll(".chart > *").remove();
    const formData = new FormData(event.target);
    const submittedValue = formData.get("submittedValue");
    const submittedLabel = formData.get("submittedLabel");
    onAction((prevData) => {
      return [...prevData, { submittedLabel, submittedValue }];
    });
    setEnteredValue("");
    setEnteredLabel("");
  };

  const handleReset = () => {
    d3.selectAll(".chart > *").remove();
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
        <input
          className="input-field"
          type="number"
          name="submittedValue"
          placeholder="Enter numeric value"
          // value={enteredValue}
          onChange={(event) => setEnteredValue(event.target.value)}
        ></input>
        <br />
        <input
          className="input-field"
          type="text"
          name="submittedLabel"
          placeholder="Add label"
          // value={enteredLabel}
          onChange={(event) => setEnteredLabel(event.target.value)}
        ></input>
        <br />
        <button className="btn-add" type="submit">
          Add Data
        </button>
      </form>
      <button className="btn-reset" onClick={handleReset}>
        Reset
      </button>
      <button className="btn-download" onClick={handleDownload}>
        Download
      </button>
    </Fragment>
  );
};

export default ChartInputs;
