import ChartInputs from "./components/ChartInputs";
import Chart from "./components/Chart";
import { useState, useRef } from "react";
import "./index.css";

function App() {
  const [chartData, setChartData] = useState([]);

  return (
    <div>
      <h3>Chart App</h3>
      <ChartInputs onAdd={setChartData}></ChartInputs>
      <Chart data={chartData}></Chart>
    </div>
  );
}

export default App;
