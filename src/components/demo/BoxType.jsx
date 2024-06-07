import { useEffect, useState } from "react";
import ChartElememt from "../charts/ChartElememt";

const BoxType = ({ chartRef }) => {
  const [options, setOptions] = useState(null);

  const formatSeriesData = (data) => {
    const lines = data.split("\n");

    const series = [
      {
        name: "Percentiles 1",
        fillColor: "#48a6e4",
        color: "#48a6e4",
        data: [],
      },
      {
        name: "Percentiles 2",
        fillColor: "#3068ac",
        color: "#3068ac",
        data: [],
      },
    ];
    const xCategories = [];

    // Ignore first row
    for (let i = 1; i < lines.length - 1; i++) {
      const line = lines[i].split(",");

      const low = parseFloat(line[6]);
      const q1 = parseFloat(line[12]);
      const median = parseFloat(line[17]);
      const q3 = parseFloat(line[21]);
      const high = parseFloat(line[27]);

      const box = [low, q1, median, q3, high];

      const box1 = [median, median, median, q3, high];
      const box2 = [low, q1, median, median, median];

      const startDate = line[4].split("/").slice(1).join("/");
      const endDate = line[5].split("/").slice(1).join("/");

      const date = `${startDate} - ${endDate}`;
      xCategories.push(date);
      series[0].data.push(box1);
      series[1].data.push(box2);
    }

    return { series, xCategories };
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getData = async () => {
      try {
        const chartData = {
          chart: {
            type: "boxplot",
            // plotBorderWidth: 1,
          },
          legend: {
            enabled: true,
            useHTML: true,
            align: "right",
            verticalAlign: "middle",
            width: "15%",
            title: { text: "" },
            layout: "vertical",
            labelFormatter: function () {
              return "";
            },
            symbolWidth: 0,
            symbolHeight: 0,
          },
          title: {
            text: "Forecast Time Series",
            align: "left",
            margin: 5,
          },
          subtitle: {
            text: "<p><span><b>Location</b>: 48.5\xB0N 98.5\xB0W</span><span>&nbsp;&nbsp;<b>Model</b>: GFS</span>&nbsp;&nbsp;<span><b>Initialization Date</b>: 2024-02-30</span></p>",
            align: "left",
            useHTML: true,
            y: 30,
          },
          xAxis: {
            // type: "datetime",
            title: {
              text: "Quarterly",
              y: 10,
            },
            labels: {
              format: "{value:%d/%m}",
            },
            tickLength: 0,
            lineColor: "lightGray",
            gridLineWidth: 0,
            lineWidth: 0,
            crosshair: {
              width: 2,
              color: "green",
              dashStyle: "shortdot",
            },
          },
          yAxis: [
            {
              title: {
                text: "Average Temprature Anamoly (\xB0F)",
                x: -5,
              },
              labels: {
                format: "{value:.1f}",
              },
              gridLineDashStyle: "Dash",
              gridLineColor: "lightGray",
              crosshair: {
                width: 2,
                color: "green",
                dashStyle: "shortdot",
              },
              lineWidth: 1,
              lineColor: "lightGray",
              plotLines: [
                {
                  value: 0,
                  color: "lightGray",
                  width: 1,
                  dashStyle: "Solid",
                  zIndex: 1,
                },
              ],
            },
            {
              lineWidth: 1,
              lineColor: "lightGray",
              opposite: true,
              title: {
                text: undefined,
              },
            },
          ],
          plotOptions: {
            boxplot: {
              grouping: false,
              medianWidth: 0,
              whiskerWidth: 1,
              whiskerLength: "20%",
              whiskerColor: "black",
              stemColor: "black",
            },
          },
          tooltip: {
            shared: true,
            useHTML: true,
            backgroundColor: "#1e558b",
            style: {
              color: "white",
            },
            formatter: function () {
              const points = [];
              this.points.forEach((point) => points.push(point.point.options));

              const { low, q1, median, q3, high } = {
                low: points[1].low,
                q1: points[1].q1,
                median: points[1].median,
                q3: points[0].q3,
                high: points[0].high,
              };

              const pointFormat = `<table>
              <tr>
              <td><b>${median}\xB0F</b> Average Temprature Anomaly</td>
              </tr>
              <tr>
              <td><b>${q3}</b> to <b>${high}\xB0F</b> Possible Upper Range</td>
              </tr>
              <tr>
              <td><b>${q1}</b> to <b>${q3}\xB0F</b> Likely</td>
              </tr>
              <tr>
              <td><b>${low}</b> to <b>${q1}\xB0F</b> Possible Lower Range</td>
              </tr>
              </table>`;

              return pointFormat;
            },
          },
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 500,
                  maxHeight: 500,
                },
              },
            ],
          },
          exporting: {
            enabled: false,
            fallbackToExportServer: false,
          },
        };

        const response = await fetch("timeseries.csv", { signal });
        const data = await response.text();

        const { series, xCategories } = await formatSeriesData(data);
        chartData["series"] = series;
        chartData.xAxis["categories"] = xCategories;

        setOptions(chartData);
      } catch (error) {
        console.log(error);
      }
    };

    getData();

    return () => controller.abort();
  }, []);

  if (!options) return "Loading...";

  return (
    <div className="box-chart">
      <ChartElememt options={options} ref={chartRef} />
      <div className="img">
        <img src="box.png" />
      </div>
    </div>
  );
};

export default BoxType;
