import ChartElememt from "./ChartElememt";

const ScatterPlotChart = () => {
  const options = {
    chart: {
      type: "scatter",
      plotBorderWidth: 1,
      zooming: {
        type: "xy",
      },
    },
    title: {
      text: "ScatterPlot Chart",
    },
    xAxis: {
      title: {
        text: "X axis title",
      },
      labels: {
        format: "{text}x",
      },
    },
    yAxis: {
      title: {
        text: "Y axis title",
      },
      labels: {
        format: "{text}y",
      },
    },
    series: [
      {
        name: "scatter 1",
        data: [1, 2, 3],
      },
      {
        name: "scatter 2",
        data: [3, 4, 3],
      },
    ],
  };

  return <ChartElememt options={options} />;
};

export default ScatterPlotChart;
