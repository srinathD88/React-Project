import { useState } from "react";
import ChartElememt from "./ChartElememt";

const RadialChart = () => {
  const [options, setOptions] = useState({
    chart: {
      type: "bar",
      polar: true,
    },
    title: {
      text: "Radial Chart",
    },
    xAxis: {
      categories: ["jan", "feb", "march"],
    },
    yAxis: {
      tickInterval: 1,
      min: 0,
      max: 3,
    },
    tooltip: {
      outside: true,
    },
    series: [
      {
        name: "Radial",
        data: [1, 2, 3],
      },
    ],
  });

  return <ChartElememt options={options} />;
};

export default RadialChart;
