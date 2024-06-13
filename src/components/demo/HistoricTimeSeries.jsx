import { useEffect, useState } from "react";
import ChartElememt from "../charts/ChartElememt";

const HistoricTimeSeries = ({ chartRef }) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getData = async () => {
      try {
        const chartData = {
          chart: {
            zooming: {
              type: "x",
            },
          },
          legend: {
            enabled: true,
            useHTML: true,
            align: "right",
            verticalAlign: "middle",
            margin: 20,
            title: { text: "" },
            layout: "vertical",
            labelFormatter: function () {
              return "Temperature Anomaly";
            },
          },
          title: {
            text: "Historical Time Series",
            align: "left",
            margin: 5,
          },
          subtitle: {
            text: "<p><span><b>Location</b>: 48.5\xB0N 98.5\xB0W</span><span>&nbsp;&nbsp;<b>Period</b>: Weekly</span>&nbsp;&nbsp;<span><b>Variable</b>: Temprature</span></p>",
            align: "left",
            useHTML: true,
            y: 30,
          },
          xAxis: {
            // type: "datetime",
            title: {
              text: "Weekly",
              y: 10,
            },
            labels: {
              //   format: "{value:%Y}",
              formatter: function () {
                console.log(this.value);
                try {
                  return this.value.split("-")[0];
                } catch (err) {
                  return new Date().getFullYear();
                }
              },
            },
            lineColor: "lightGray",
            gridLineWidth: 1,
            tickLength: 0,
            minPadding: 0,
            maxPadding: 0,
            tickInterval: 120,
            showLastLabel: true,
            endOnTick: true,
          },
          yAxis: [
            {
              title: {
                text: "Average Temprature Anomaly (\xB0F)",
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
            enabled: false,
          },
          plotOptions: {
            line: {
              enableMouseTracking: false,
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

        const response = await fetch("historic.csv", { signal });
        const data = await response.text();

        chartData["data"] = {
          csv: data,
          seriesMapping: [
            {
              x: 0,
              y: 1,
              lat: 2,
              lon: 3,
            },
          ],
        };

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

export default HistoricTimeSeries;
