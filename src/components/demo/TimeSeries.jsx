import { useState } from "react";
import AreaRange from "./AreaRange";
import BoxType from "./BoxType";
import Line from "./Line";

const chartOptions = ["area", "box", "line"];

const TimeSeries = ({ chartRef }) => {
  const [chartType, setChartType] = useState("area");
  return (
    <div>
      <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
        {chartOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {chartType === "area" && <AreaRange chartRef={chartRef} />}
      {chartType === "box" && <BoxType chartRef={chartRef} />}
      {chartType === "line" && <Line chartRef={chartRef} />}
    </div>
  );
};

export default TimeSeries;
