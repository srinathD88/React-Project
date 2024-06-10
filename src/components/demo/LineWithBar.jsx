import { useEffect, useState } from "react";
import ChartElememt from "../charts/ChartElememt";

const LineWithBar = ({ chartRef }) => {
  const [options, setOptions] = useState(null);

  const formatSeriesData = (data) => {
    const series = [
      {
        name: "line",
        type: "line",
        data: [0.1, 0.2, 0.4, 0.6, 0.8, 1],
        xAxis: 0,
        yAxis: 0,
      },
      {
        name: "line 1",
        type: "line",
        data: [0.2, 0.3, 0.5, 0.7, 0.9, 1],
        xAxis: 0,
        yAxis: 0,
      },
      {
        name: "line 3",
        type: "line",
        data: [0, 0.2, 0.4, 0.6, 0.8, 1],
        xAxis: 0,
        yAxis: 0,
        dashStyle: "Dot",
        zIndex: 1,
      },
      {
        name: "bar",
        type: "column",
        data: [0.1, 0.2, 0.4, 0.6, 0.8, 1],
        xAxis: 1,
        yAxis: 1,
      },
      {
        name: "bar 1",
        type: "column",
        data: [0.2, 0.3, 0.5, 0.7, 0.9, 1],
        xAxis: 1,
        yAxis: 1,
      },
    ];

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
            title: {
              text: `<table>
            <tr><td>\u2e3a</td><td>Perfect Reliability</td></tr>
            <tr><td>\u2e3a</td><td>Climatoligical Probability</td></tr>
            <tr><td>\u2e3a</td><td>Salient v8</td></tr>
            <tr><td>\u2e3a</td><td>NOAA GEFS 12</td></tr>
            </table>`,
              style: {
                fontWeight: "normal",
              },
            },
            layout: "vertical",
            labelFormatter: function () {
              return "";
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
            text: `<p><span><b>Region</b>: North America</span><span>&nbsp;&nbsp;<b>Variable</b>: Temperature</span><br><br>
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
              reserveSpace: false,
              offset: 0,
              categories: [0.1, 0.2, 0.4, 0.6, 0.8, 1],
              //   minPadding: 0,
              //   endOnTick: true,
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
              categories: [0.1, 0.2, 0.4, 0.6, 0.8, 1],
              //   minPadding: 0,
              //   endOnTick: true,
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
              //   endOnTick: false,
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
              //   labels: {
              //     format: "{value:.1f}",
              //   },
              labels: {
                formatter: function () {
                  console.log(this);
                  return this.isLast ? "" : this.value.toFixed(1);
                },
              },
              gridLineDashStyle: "Dash",
              gridLineColor: "lightGray",
              lineWidth: 1,
              lineColor: "lightGray",
              height: "30%",
              top: "70%",
              offset: 0,
            },
          ],
          tooltip: {
            enabled: false,
          },
          plotOptions: {
            series: {
              //   pointPlacement: "on",
              maxPointWidth: 25,
              enableMouseTracking: false,
            },
            line: {
              marker: {
                enabled: true,
              },
            },
            column: {
              stacking: "stream",
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
        // chartData.xAxis["categories"] = xCategories;

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
