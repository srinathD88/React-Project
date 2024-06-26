import { useEffect, useState } from "react";
import ChartElememt from "../charts/ChartElememt";

const Spline = ({ chartRef }) => {
  const [options, setOptions] = useState(null);

  const formatSeriesData = (data) => {
    const lines = data.split("\n");

    const series = {};
    // Ignore first line as it is a column header row
    for (let i = 1; i <= lines.length - 1; i++) {
      const [category, firCol, secCol] = lines[i].split(",");

      if (category && !series[category]) {
        series[category] = {
          name: category,
          data: [],
          id: category,
        };
      }

      if (secCol === "" || secCol === undefined || secCol === null) {
        const marker = `${category}_marker`;
        if (!series[marker]) {
          series[marker] = {
            name: marker,
            id: marker,
            linkedTo: category,
            marker: {
              symbol: "triangle",
            },
            data: [],
          };
        }

        series[marker].data.push({ y: 0, x: parseFloat(firCol) });
      } else {
        series[category]?.data.push({
          y: parseFloat(secCol),
          x: parseFloat(firCol),
        });
      }
    }

    // series["marker1"] = {
    //   linkedTo: "Salient Climatology",
    //   lineWidth: 0,
    //   marker: {
    //     symbol: "triangle",
    //   },
    //   enableMouseTracking: false,
    //   color: "rgb(44, 175, 254)",
    //   data: [
    //     {
    //       x: -7,
    //       y: 0,
    //     },
    //   ],
    // };

    // series["marker2"] = {
    //   linkedTo: "Salient v8",
    //   lineWidth: 0,
    //   marker: {
    //     symbol: "triangle",
    //   },
    //   enableMouseTracking: false,
    //   color: "rgb(84, 79, 197)",
    //   data: [
    //     {
    //       x: -2,
    //       y: 0,
    //     },
    //   ],
    // };

    // series["marker3"] = {
    //   linkedTo: "Salient v8",
    //   lineWidth: 0,
    //   marker: {
    //     symbol: "triangle",
    //   },
    //   enableMouseTracking: false,
    //   color: "gray",
    //   data: [
    //     {
    //       x: 2,
    //       y: 0,
    //     },
    //   ],
    // };

    // series["marker4"] = {
    //   linkedTo: "Salient v8",
    //   lineWidth: 0,
    //   marker: {
    //     symbol: "triangle",
    //   },
    //   enableMouseTracking: false,
    //   color: "black",
    //   data: [
    //     {
    //       x: 3,
    //       y: 0,
    //     },
    //   ],
    // };
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
          colors: ["rgb(44, 175, 254)", "rgb(84, 79, 197)"],
          legend: {
            enabled: true,
            useHTML: true,
            align: "right",
            verticalAlign: "middle",
            title: { text: "" },
            layout: "vertical",
            width: "30%",
            y: 30,
            margin: 30,
            labelFormatter: function () {
              return `<div>
              <b>${this.name}</b>
              <br>
              <table>
              <tr><td style="color:${this.color}; padding-right: 10px">\u2e3a</td>
              <td>Avg Temprature Anamony</td></tr>
              <tr><td style="color:${this.color}">\u25b2</td>
              <td>Median</td></tr>
              </table>
              </div>`;
            },
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
            backgroundColor: "#1e558b",
            style: {
              color: "white",
            },
            // followPointer: true,
            snap: 200,
            headerFormat: "<table>",
            pointFormat:
              "<tr><td>{series.name} " +
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
            allowHTML: true,
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
