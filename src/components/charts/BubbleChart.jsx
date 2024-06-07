import ChartElememt from "./ChartElememt";

const BubbleChart = () => {
  const options = {
    chart: {
      type: "bubble",
      plotBorderWidth: 1,
      zooming: {
        type: "xy",
      },
    },
    title: {
      text: "Bubble Chart",
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
        name: "bubble set 1",
        data: [1, 2, 3],
      },
      {
        name: "bubble set 2",
        data: [
          {
            name: "set2 bubble 1",
            x: 4,
            y: 4,
            z: 1,
          },
          {
            name: "set2 bubble 2",
            x: 3,
            y: 3,
            z: 4,
            color: "red",
          },
        ],
      },
    ],
  };

  return <ChartElememt options={options} />;
};

export default BubbleChart;
