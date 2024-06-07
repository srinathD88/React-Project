import { useEffect, useState } from "react";
import ChartElememt from "../charts/ChartElememt";

const Spline = ({ chartRef }) => {
  const [options, setOptions] = useState(null);

  const formatSeriesData = (data) => {
    const lines = data.split("\n");

    const series = {};
    // Ignore first row
    for (let i = 1; i < lines.length - 1; i++) {
      const [category, firCol, secCol] = lines[i].split(",");

      if (category && !series[category]) {
        series[category] = {
          name: category,
          data: [],
        };
      }

      series[category]?.data.push({
        y: parseFloat(secCol),
        x: parseFloat(firCol),
      });
    }
    return { series };
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const getData = async () => {
      try {
        const chartData = {
          chart: {
            type: "spline",
            events: {
              load: function () {
                this.series.map((series) => {
                  const { itemWidth } = series;
                  if (series.checkbox) {
                    series.checkbox.style["margin-left"] = `${
                      -itemWidth + 20
                    }px`;
                  }

                  return series;
                });
              },
            },
          },
          legend: {
            enabled: true,
            align: "right",
            verticalAlign: "middle",
            title: { text: "Climatology" },
            layout: "vertical",
            // labelFormatter: function () {
            //   return `<div>${this.name}</div>`;
            // },
            itemCheckboxStyle: {
              width: "16px",
              height: "16px",
            },
          },
          title: {
            text: "Forecast Distribution",
            align: "left",
            margin: 5,
          },
          subtitle: {
            text: "<p><span><b>Location</b>: 48.5\xB0N 98.5\xB0W</span><span>&nbsp;&nbsp;<b>Period</b>: 2024-01-30 to 2024-02-30</span>&nbsp;&nbsp;<span><b>Last Updated</b>: 2024-02-30</span></p>",
            align: "left",
            useHTML: true,
            y: 30,
          },
          xAxis: {
            title: {
              text: "Average Temprature Anamoly (\xB0F)",
              y: 10,
            },
            labels: {
              format: "{value}",
            },
            gridLineDashStyle: "solid",
            gridLineWidth: 1,
            startOnTick: true,
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
              text: "Density",
              x: -5,
            },
            labels: {
              format: "{value:.2f}",
            },
            gridLineDashStyle: "Dash",
            gridLineColor: "lightGray",
            crosshair: {
              width: 2,
              color: "green",
              dashStyle: "shortdot",
            },
          },
          tooltip: {
            shared: true,
            useHTML: true,
            // followPointer: true,
            snap: 200,
            headerFormat: "<table>",
            pointFormat:
              '<tr><td style="color: {series.color}">{series.name} ' +
              "</td>" +
              '<td style="text-align: right"><b>{point.x} \xB0F</b></td></tr>',
            footerFormat: "</table>",
          },
          plotOptions: {
            series: {
              showCheckbox: true,
              selected: true,
              // legendSymbol: "none",
              events: {
                checkboxClick: function () {
                  this.setVisible(!this.visible);
                },
                legendItemClick: function () {
                  const seriesIndex = this.index;
                  this.chart.series[seriesIndex].select();
                },
              },
              states: {
                hover: {
                  enabled: false,
                },
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
          },
        };

        const response = await fetch("data.csv", { signal });
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

  console.log(options);
  return (
    <>
      <ChartElememt options={options} ref={chartRef} />
    </>
  );
};

export default Spline;
