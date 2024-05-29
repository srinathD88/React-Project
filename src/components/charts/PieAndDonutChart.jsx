import { useState } from "react";
import ChartElememt from "./ChartElememt";

const PieAndDonutChart = () => {
  const [selectedPie, setSelectedPie] = useState(null);
  const [options, setOptions] = useState({
    chart: {
      type: "pie",
    },
    colors: ["red", "green", "blue"],
    title: {
      text: "Pie Chart",
      align: "left",
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        // innerSize: "75%", // add this for 'Donut' chart
        point: {
          events: {
            select: function () {
              console.log(this);
              setSelectedPie(this.name);
              return;
            },
          },
        },
        dataLabels: {
          format: "{point.name}: {y} %",
        },
      },
    },
    series: [
      {
        name: "pie",
        data: [
          {
            name: "pie 1",
            y: 32,
            color: { patternIndex: 0 },
            borderColor: "red",
          },
          {
            name: "pie 2",
            y: 45,
          },
          {
            name: "pie 3",
            sliced: true,
            y: 20,
          },
        ],
        colorByPoint: true,
        cursor: "pointer",
        showInLegend: true,
        tooltip: {
          headerFormat: "",
          pointFormat: "{point.name} - {point.y}",
          valueSuffix: "%",
        },
      },
    ],
  });

  return (
    <>
      <ChartElememt options={options} />
      <br />
      <p>Selected Pie/Donut: {selectedPie}</p>
    </>
  );
};

export default PieAndDonutChart;
