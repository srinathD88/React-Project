import { useEffect, useState } from "react";
import ChartElememt from "../charts/ChartElememt";

const AreaRange = ({ chartRef }) => {
  const [options, setOptions] = useState(null);

  const formatSeriesData = (data) => {
    const lines = data.split("\n");

    const series = [
      {
        name: "Ensemble Mean",
        color: "#3068ac",
        data: [],
        zIndex: 1,
        graphId: "mean",
      },
      {
        name: "Possible Upper Range 75% - 90%",
        type: "arearange",
        color: "#66b5e8",
        fillOpacity: 0.7,
        // color: {
        //   linearGradient: {
        //     x1: 0,
        //     x2: 0,
        //     y1: 0,
        //     y2: 1,
        //   },
        //   stops: [
        //     [0, "#66b5e8"],
        //     [1, "#95cbef"],
        //   ],
        // },
        data: [],
        // zIndex: 3,
        graphId: "upper",
      },

      {
        name: "Likely 25% - 75%",
        type: "arearange",
        color: "#95cbef",
        fillOpacity: 0.6,
        // color: {
        //   linearGradient: {
        //     x1: 0,
        //     x2: 0,
        //     y1: 0,
        //     y2: 1,
        //   },
        //   stops: [
        //     [0, "#95cbef"],
        //     [1, "#c8e4f7"],
        //   ],
        // },
        data: [],
        // zIndex: 2,
      },
      {
        name: "Possible Lower Range 10% - 25%",
        type: "arearange",
        color: "#c8e4f7",
        fillOpacity: 0.5,
        // color: {
        //   linearGradient: {
        //     x1: 0,
        //     x2: 0,
        //     y1: 0,
        //     y2: 1,
        //   },
        //   stops: [
        //     [0, "#c8e4f7"],
        //     [1, "#c8e4f7"],
        //   ],
        // },
        data: [],
        // zIndex: 1,
      },
    ];
    const xCategories = [];

    // Ignore first row
    for (let i = 1; i <= lines.length - 1; i++) {
      const line = lines[i].split(",");

      const date = new Date(line[4]).getTime();
      const mean = parseFloat(line[line.length - 1]);
      xCategories.push(date);
      series[0].data.push({ y: mean });
      series[3].data.push([parseFloat(line[6]), parseFloat(line[12])]);
      series[2].data.push([parseFloat(line[12]), parseFloat(line[22])]);
      series[1].data.push([parseFloat(line[22]), parseFloat(line[25])]);
    }
    console.log(series, xCategories);
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
            margin: 30,
            title: { text: "Percentiles" },
            layout: "vertical",
            // labelFormatter: function () {
            //   const img = `<img src=
            //     "https://media.geeksforgeeks.org/wp-content/uploads/20210915115837/gfg3-300x300.png"
            //              alt="GFG image" />`;
            //   return img;
            // },
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
              text: "Daily",
              y: 10,
            },
            labels: {
              format: "{value:%d/%m}",
            },
            gridLineDashStyle: "solid",
            gridLineWidth: 1,
            tickLength: 0,
            lineColor: "lightGray",
            crosshair: {
              width: 2,
              color: "green",
              dashStyle: "shortdot",
            },
          },
          yAxis: {
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
          },
          plotOptions: {
            series: {
              marker: {
                enabled: false,
              },
              states: {
                hover: {
                  //   enabled: false,
                },
              },
            },
            line: {
              marker: {
                fillColor: "white",
                // lineWidth: 0,
                lineColor: "blue",
              },
            },
            arearange: {
              lineWidth: 0,
              zIndex: 0,
              marker: {
                states: {
                  hover: {
                    enabled: false,
                  },
                },
              },
            },
          },
          tooltip: {
            shared: true,
            useHTML: true,
            backgroundColor: "#1e558b",
            style: {
              color: "white",
            },
            // followPointer: true,
            // snap: 200,
            headerFormat: "",
            // pointFormat:
            //   "<tr><td><b>{point.options.low}</b> to <b>{point.options.high}\xB0F</b></td>" +
            //   "<td>{series.name}</td></tr>",
            // footerFormat: "</table>",
            pointFormatter: function () {
              const value = this.options.y
                ? `<b>${this.options.y}</b>\xB0F`
                : `<b>${this.options.low}</b> to <b>${this.options.high}\xB0F</b>`;

              const seriesName = this.series.name;
              let name = "";

              switch (true) {
                case /mean/i.test(seriesName):
                  name = "Average Temprature Anamoly";
                  break;
                case /upper/i.test(seriesName):
                  name = "Possible Upper Range";
                  break;
                case /likely/i.test(seriesName):
                  name = "Likely";
                  break;
                case /lower/i.test(seriesName):
                  name = "Possible Lower Range";
                  break;
              }

              const html = `<table>
                <tr><td>${value}</td>
                <td>${name}</td></tr>
                </table>`;
              return html;
            },
          },
          responsive: {
            rules: [
              {
                condition: {
                  maxWidth: 700,
                  maxHeight: 700,
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

  console.log(options);
  return (
    <>
      <ChartElememt options={options} ref={chartRef} />
    </>
  );
};

export default AreaRange;
