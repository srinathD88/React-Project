import ChartElememt from "./ChartElememt";

const AreaChart = () => {
  const options = {
    title: {
      text: "Area Chart",
    },
    series: [
      {
        name: "Area",
        type: "area",
        data: [1, 2, 3],
      },
    ],
  };

  return <ChartElememt options={options} />;
};

export default AreaChart;
