import { useEffect, useState } from "react";
import ChartElememt from "../charts/ChartElememt";

const Line = ({ chartRef }) => {
  const [options, setOptions] = useState(null);

  const formatSeriesData = (data) => {
    const lines = data.split("\n");

    const series = [
      {
        name: "GFS Deterministic Forecast",
        data: [],
      },
    ];
    const xCategories = [];

    // Ignore first row
    for (let i = 1; i < lines.length - 1; i++) {
      const line = lines[i].split(",");

      const date = new Date(line[4]).getTime();
      const point = parseFloat(line[29]);

      xCategories.push(date);
      series[0].data.push(point);
    }

    return { series, xCategories };
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getData = async () => {
      try {
        const chartData = {
          legend: {
            enabled: true,
            useHTML: true,
            align: "right",
            verticalAlign: "middle",
            margin: 20,
            title: { text: "" },
            layout: "vertical",
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
            type: "datetime",
            title: {
              text: "Hourly",
              y: 10,
            },
            labels: {
              format: "{value:%d/%m}",
            },
            lineColor: "lightGray",
            gridLineWidth: 1,
          },
          yAxis: [
            {
              title: {
                text: "Average Daily Precipitation (in day-1)",
                x: -5,
              },
              labels: {
                format: "{value:.1f}",
              },
              gridLineDashStyle: "Dash",
              gridLineColor: "lightGray",
              lineWidth: 1,
              lineColor: "lightGray",
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
          tooltip: {
            shared: true,
            useHTML: true,
            backgroundColor: "#1e558b",
            style: {
              color: "white",
            },
            // formatter: function () {
            //   const points = [];
            //   this.points.forEach((point) => points.push(point.point.options));

            //   const { low, q1, median, q3, high } = {
            //     low: points[1].low,
            //     q1: points[1].q1,
            //     median: points[1].median,
            //     q3: points[0].q3,
            //     high: points[0].high,
            //   };

            //   const pointFormat = `<table>
            //   <tr>
            //   <td><b>${median}\xB0F</b> Average Temprature Anomaly</td>
            //   </tr>
            //   <tr>
            //   <td><b>${q3}</b> to <b>${high}\xB0F</b> Possible Upper Range</td>
            //   </tr>
            //   <tr>
            //   <td><b>${q1}</b> to <b>${q3}\xB0F</b> Likely</td>
            //   </tr>
            //   <tr>
            //   <td><b>${low}</b> to <b>${q1}\xB0F</b> Possible Lower Range</td>
            //   </tr>
            //   </table>`;

            //   return pointFormat;
            // },
          },
          plotOptions: {
            line: {
              marker: {
                enabled: false,
              },
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
    <div>
      <ChartElememt options={options} ref={chartRef} />
    </div>
  );
};

export default Line;
