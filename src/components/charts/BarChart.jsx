import { useState } from "react";
import ChartElememt from "./ChartElememt";

const BarChart = () => {
  const [options, setOptions] = useState({
    title: {
      text: "Bar Chart",
    },
    yAxis: {
      tickInterval: 1,
      min: 0,
      max: 3,
    },
    plotOptions: {
      bar: {
        color: "red",
        borderColor: "black",
        borderRadius: 50,
        dataLabels: {
          enabled: true,
          format: "{y}%",
        },
      },
    },
    series: [
      {
        name: "bar",
        type: "bar", // or 'column' for vertical bars
        data: [1, 3, 2],
      },
    ],
  });

  return <ChartElememt options={options} />;
};

export default BarChart;
