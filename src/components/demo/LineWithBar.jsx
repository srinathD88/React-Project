import { useEffect, useState } from "react";
import ChartElememt from "../charts/ChartElememt";

const LineWithBar = ({ chartRef }) => {
  const [options, setOptions] = useState(null);

  const formatSeriesData = (data) => {
    const lines = data.split("\n");
    const colors = ["rgb(44, 175, 254)", "rgb(84, 79, 197)"];
    const series = [];

    // Ignore first line as it is a column header row
    for (let i = 1; i <= lines.length - 1; i++) {
      const [model, probability, density, frequency] = lines[i].split(",");

      const category_line = `${model}_line`;
      const category_bar = `${model}_bar`;

      if (!series[category_line]) {
        series[category_line] = {
          name: category_line,
          data: [],
          id: category_line,
          xAxis: 0,
          yAxis: 0,
        };
      }

      if (!series[category_bar]) {
        series[category_bar] = {
          name: category_bar,
          type: "column",
          data: [],
          id: category_bar,
          xAxis: 1,
          yAxis: 1,
        };
      }

      series[category_line]?.data.push({
        y: parseFloat(frequency),
        x: parseFloat(probability),
      });

      series[category_bar]?.data.push({
        y: parseFloat(density),
        x: parseFloat(probability),
      });
    }

    // Assign colors to series
    const seriesKeys = Object.keys(series);
    let i = 0;
    let j = 0;

    while (i <= seriesKeys.length - 1) {
      // Assign same color to each line and bar set
      series[seriesKeys[i]]["color"] = colors[j];
      series[seriesKeys[i + 1]]["color"] = colors[j];

      //   series[seriesKeys[i + 1]]["zIndex"] = seriesKeys.length - i;

      i = i + 2;
      j = j + 1 <= colors.length - 1 ? j + 1 : 0;
    }

    console.log(series);
    return { series };
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
            // title: {
            //   text: `<table>
            // <tr><td>\u2e3a</td><td>Perfect Reliability</td></tr>
            // <tr><td>\u2e3a</td><td>Climatoligical Probability</td></tr>
            // <tr><td>\u2e3a</td><td>Salient v8</td></tr>
            // <tr><td>\u2e3a</td><td>NOAA GEFS 12</td></tr>
            // </table>`,
            //   style: {
            //     fontWeight: "normal",
            //   },
            // },
            layout: "vertical",
            labelFormatter: function () {
              console.log(this);
              return `<span style="color:${this.color}">\u2e3a</span>&nbsp; ${this.name}`;
            },
            symbolWidth: 0,
            symbolHeight: 0,
          },
          title: {
            text: "Reliability",
            align: "left",
            margin: 5,
          },
          subtitle: {
            text: `<p><span><b>Region</b>: North America</span><span>&nbsp;&nbsp;<b>Variable</b>: Temperature</span>
            <span><b>Time Scale</b>: Weekly</span>&nbsp;&nbsp;<span><b>Season</b>: All</span><span>&nbsp;&nbsp;<b>Lead</b>: Week1</span></p>`,
            align: "left",
            useHTML: true,
            y: 30,
          },
          xAxis: [
            {
              lineColor: "lightGray",
              gridLineWidth: 1,
              height: "70%",
              labels: {
                enabled: false,
              },
              offset: 0,
              //   minPadding: 0,
              endOnTick: true,
              tickLength: 0,
            },
            {
              title: {
                text: "Forecast Probability",
                y: 10,
              },
              lineColor: "lightGray",
              gridLineWidth: 1,
              height: "30%",
              top: "70%",
              offset: 0,
              endOnTick: true,
              minPadding: 0.02,
              tickLength: 0,
              labels: {
                format: "{value:.1f}",
              },
              plotLines: [
                {
                  value: 1.75,
                  dashStyle: "Dash",
                },
              ],
            },
          ],
          yAxis: [
            {
              title: {
                text: "Observed Frequency",
                x: -5,
              },
              labels: {
                format: "{value:.1f}",
              },
              gridLineDashStyle: "Dash",
              gridLineColor: "lightGray",
              lineWidth: 1,
              lineColor: "lightGray",
              height: "70%",
              offset: 0,
              endOnTick: false,
              plotLines: [
                {
                  value: 0.3,
                  dashStyle: "Dash",
                },
              ],
            },
            {
              title: {
                text: "Forecast Density",
                x: -5,
              },
              labels: {
                format: "{value:.1f}",
              },
              //   labels: {
              //     formatter: function () {
              //       return this.isLast ? "" : this.value.toFixed(1);
              //     },
              //   },
              gridLineDashStyle: "Dash",
              gridLineColor: "lightGray",
              lineWidth: 1,
              lineColor: "lightGray",
              height: "30%",
              top: "70%",
              offset: 0,
              endOnTick: false,
            },
          ],
          tooltip: {
            enabled: false,
          },
          plotOptions: {
            series: {
              pointPlacement: "on",
              maxPointWidth: 25,
              enableMouseTracking: false,
            },
            line: {
              marker: {
                enabled: true,
              },
            },
            column: {
              stacking: "normal",
              borderWidth: 0,
              borderRadius: 0,
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

        const response = await fetch("reliability.csv", { signal });
        const data = await response.text();

        const { series } = await formatSeriesData(data);
        chartData["series"] = Object.values(series);

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

export default LineWithBar;
