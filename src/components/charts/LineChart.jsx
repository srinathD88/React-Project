import ChartElememt from "./ChartElememt";

const LineChart = () => {
  const options = {
    title: {
      text: "Line Chart",
    },
    series: [
      {
        name: "line",
        data: [1, 2, 3],
      },
    ],
  };

  return <ChartElememt options={options} />;
};

export default LineChart;
