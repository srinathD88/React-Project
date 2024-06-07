import ChartElememt from "./ChartElememt";

const MixCharts = () => {
  const options = {
    chart: {
      //   margin: [0, 0, 0, 0],
      backgroundColor: "lightYellow",
      borderRadius: 20,
      borderWidth: 2,
      zooming: {
        type: "xy",
      },
    },
    title: {
      text: "My chart",
      align: "left",
    },
    subtitle: {
      text: "My chart subtitle",
      align: "left",
    },
    xAxis: {
      title: {
        text: "Month",
      },
      categories: ["jan", "feb", "march"],
      crosshair: {
        width: 2,
        color: "gray",
        dashStyle: "shortdot",
      },
      labels: {
        rotation: 260,
      },
    },
    yAxis: {
      title: {
        text: "Avregae Wind speed",
      },
      crosshair: {
        width: 2,
        color: "gray",
        dashStyle: "shortdot",
      },
      labels: {
        formatter: function () {
          console.log(this);
          return `${this.value} km/s`;
        },
      },
      visible: true,
    },
    tooltip: {
      shared: true,
      valueSuffix: "km/s",
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          format: "{y} km/s",
        },
      },
    },
    series: [
      {
        name: "bar",
        type: "column",
        data: [1, 2, 3],
      },
      {
        name: "area",
        type: "area",
        data: [1, 3, 2],
      },
      {
        name: "areaspline",
        type: "areaspline",
        data: [1, 3, 2],
        color: "red",
        marker: {
          enabled: false,
        },
      },
      {
        name: "line",
        data: [1, 2, 3],
        marker: {
          symbol: "triangle",
        },
      },
    ],
    exporting: {
      buttons: {
        contextButton: {
          text: "Export",
        },
      },
    },
  };

  return <ChartElememt options={options} />;
};

export default MixCharts;
