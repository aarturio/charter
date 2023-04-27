import ChartInputs from "./components/ChartInputs";
import Chart from "./components/Chart";
import Navbar from "./components/Navbar.jsx";
import { useState, useRef, Fragment } from "react";
import "./index.css";

function App() {
  const [chartData, setChartData] = useState([]);

  const svgRef = useRef(null);

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Chart data={chartData} svgRef={svgRef}></Chart>
        <ChartInputs onAction={setChartData} svgRef={svgRef}></ChartInputs>
      </div>
    </Fragment>
  );
}

export default App;
