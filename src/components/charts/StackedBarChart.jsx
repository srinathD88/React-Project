import { useState } from "react";
import ChartElememt from "./ChartElememt";

const StackedBarChart = () => {
  const [options, setOptions] = useState({
    chart: {
      type: "bar", // or 'column' for vertical bars
    },
    title: {
      text: "Stacked Bar Chart",
    },
    yAxis: {
      tickInterval: 10,
      min: 0,
      max: 100,
    },
    plotOptions: {
      bar: {
        stacking: "normal",
        color: "red",
        borderColor: "black",
        borderRadius: 50,
        dataLabels: {
          enabled: true,
          format: "{y}%",
        },
      },
      column: {
        stacking: "percentage",
      },
    },
    tooltip: {
      shared: true,
    },
    series: [
      {
        name: "set 1",
        data: [11, 2, 32],
      },
      {
        name: "set 2",
        data: [2, 4, 12],
        color: "yellow",
      },
      {
        name: "set 3",
        data: [20, 14, 2],
        color: "green",
      },
    ],
  });

  return <ChartElememt options={options} />;
};

export default StackedBarChart;
