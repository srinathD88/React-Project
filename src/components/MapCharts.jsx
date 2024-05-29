import Highcharts, { color } from "highcharts/highmaps";
import HighchartsReact from "highcharts-react-official";
import worldMap from "@highcharts/map-collection/custom/world.geo.json";
import { useEffect, useState } from "react";
import TiledWebMap from "highcharts/modules/tiledwebmap";
import Geoheatmap from "highcharts/modules/geoheatmap";

TiledWebMap(Highcharts);
Geoheatmap(Highcharts);

const MapCharts = () => {
  const [options, setOptions] = useState(null);

  const getMapData = async () => {
    const response = await fetch(
      "https://code.highcharts.com/mapdata/custom/world-highres.topo.json"
    );
    const vv = await response.json();
    return vv;
  };
  const isPointInPolygon = (latitude, longitude, polygon) => {
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      throw new TypeError(
        "Invalid latitude or longitude. Numbers are expected"
      );
    } else if (!polygon || !Array.isArray(polygon)) {
      throw new TypeError("Invalid polygon. Array with locations expected");
    } else if (polygon.length === 0) {
      throw new TypeError("Invalid polygon. Non-empty Array expected");
    }

    const x = latitude;
    const y = longitude;

    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  };

  const getOptions = async () => {
    const mapData = await getMapData();
    const colors = ["black", "yellow", "green", "red"];
    const data = await fetch(
      "https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population-density.json"
    )
      .then((response) => response.json())
      .then((data) => {
        let cc = data.map((d) => ({
          ...d,
          value: d.value / 10,
          color:
            d.code === "IN"
              ? "red"
              : colors[Math.floor(Math.random() * (3 - 0 + 1) + 0)],
        }));
        return cc;
      });

    const options = {
      chart: {
        // type: "mapline",
        map: mapData,
        borderWidth: 1,
        // backgroundColor: {
        //   linearGradient: [0, 0, 500, 500],
        //   stops: [
        //     [0, "rgb(0, 0, 0)"],
        //     [1, "rgb(200, 200, 255)"],
        //   ],
        // },

        events: {
          load: function () {
            this.showLoading();
          },
          render: function () {
            this.hideLoading();
          },
        },
      },
      title: {
        text: "Add Title here <a href='https://test.com' target='_blank'>link</a>",
      },
      // credits: { href: "", mapText: "" },
      // legend: {
      //   enabled: true,
      //   title: {
      //     text: "legend title",
      //   },
      //   verticalAlign: "bottom",
      //   align: "right",
      //   floating: true,
      //   // layout: "vertical",
      //   valueDecimals: 0,
      //   backgroundColor: "lightBlue",
      //   symbolRadius: 10,
      //   symbolHeight: 20,
      // },
      mapNavigation: {
        enabled: true,
        enableDoubleClickZoomTo: true,
        buttonOptions: {
          verticalAlign: "bottom",
          align: "left",
        },
      },
      mapView: {
        // projection: {
        //   name: "EqualEarth",
        // },
        // zoom: 1.5,
        // center: [78, 20],
      },
      // colorAxis: {
      //   min: 0.001,
      //   max: 100,
      //   type: "logarithmic",
      //   showInLegend: false,
      //   // minColor: "yellow",
      //   // maxColor: "red",
      //   stops: [
      //     [0.3, "yellow"],
      //     [0.7, "lightBlue"],
      //     [1, "red"],
      //   ],
      // },
      // colors: ["cloud", "orange"],

      colorAxis: {
        // dataClasses: [
        //   {
        //     from: 0.001,
        //     color: "lightGreen",
        //   },
        //   {
        //     from: 0.2,
        //     to: 0.75,
        //     color: "yellow",
        //   },
        //   {
        //     from: 0.75,
        //     color: "red",
        //   },
        // ],
        min: 0.1,
        max: 100,
        // minColor: "black",
        // maxColor: "red",
        // type: "logarithmic",
        // stops: [
        //   [0.1, "lightGray"],
        //   [0.3, "#87abd6"],
        //   [0.5, "#5c81b5"],
        //   [0.6, "#5470b3"],
        //   [0.9, "#2843b8"],
        //   [1, "#0f11a6"],
        // ],
      },
      // plotOptions: {
      //   series: {
      //     nullColor: "none",
      //     color: "none",
      //     point: {
      //       events: {
      //         mouseOver: function () {
      //           console.log(this.series.dashStyle);
      //         },
      //         select: function () {
      //           console.log(this);
      //           const text =
      //               "Selected " + this.name + " (" + this.value + "/km²)",
      //             chart = this.series.chart;
      //           if (!chart.selectedLabel) {
      //             chart.selectedLabel = chart.renderer
      //               .label(text, 0, 320)
      //               .add();
      //           } else {
      //             chart.selectedLabel.attr({
      //               text: text,
      //             });
      //           }
      //         },
      //         unselect: function () {
      //           const text =
      //               "Unselected " + this.name + " (" + this.value + "/km²)",
      //             chart = this.series.chart;
      //           if (!chart.unselectedLabel) {
      //             chart.unselectedLabel = chart.renderer
      //               .label(text, 0, 300)
      //               .add();
      //           } else {
      //             chart.unselectedLabel.attr({
      //               text: text,
      //             });
      //           }
      //         },
      //       },
      //     },
      //     states: {
      //       inactive: {
      //         // opacity: 1,
      //       },
      //     },
      //   },
      // },
      plotOptions: {
        map: {
          allAreas: true,
          dataLabels: {
            enabled: true,
            color: "#FFFFFF",
            formatter: function () {
              console.log(this.point);
              return this.point.name;
            },
          },
        },
        series: {
          nullColor: "transparent",
          allowPointSelect: true,
          cursor: "pointer",
          enableMouseTracking: true,
          point: {
            events: {
              mouseOver: function () {
                // console.log(this.name);
              },
              select: function () {
                console.log(this);
              },
              unselect: function () {
                console.log(this.name);
              },
            },
          },
          states: {
            hover: {
              enabled: true,
            },
          },
          tooltip: {
            headerFormat: "",
            pointFormat: "{point.name} <br /> <b>{point.value}%</b>",
            valueDecimals: 2,
          },
        },
      },

      series: [
        // {
        //   type: "tiledwebmap",
        //   provider: {
        //     type: "Esri",
        //     theme: "WorldTopoMap",
        //     subdomain: "a",
        //   },
        // },
        {
          type: "map",
          name: "baseMap",
          states: {
            inactive: {
              enabled: true,
            },
          },
        },
        {
          data: data,
          name: "dataMap",
          joinBy: ["iso-a2", "code"],
          colorKey: "color",
        },
        // {
        //   // type: "map",
        //   name: "Random data",
        //   borderColor: "red",
        //   // showInLegend: true,
        //   // colorKey: "value",
        //   borderWidth: 0.1,
        //   // mapData: mapData,
        //   data: data,
        //   // mapData: Highcharts.geojson(mapData),
        //   joinBy: ["iso-a2", "code"],
        //   allowPointSelect: true,
        //   cursor: "pointer",
        //   states: {
        //     select: {
        //       color: "red",
        //       borderColor: "black",
        //       dashStyle: "dot",
        //     },
        //     hover: {
        //       color: "yellow",
        //     },
        //     unselect: {
        //       borderColor: "",
        //       dashStyle: "smalldots",
        //     },
        //   },
        //   tooltip: {
        //     // valueSuffix: "/km²",
        //     valueDecimals: 1,
        //   },
        //   allAreas: true,
        //   dataLabels: {
        //     enabled: !true,
        //     color: "lightGray",
        //     style: {
        //       fontWeight: "normal",
        //       fontStyle: "italic",
        //     },
        //     filter: {
        //       operator: "!=",
        //       property: "code",
        //       value: "BR",
        //     },
        //     formatter: function () {
        //       if (this.point) {
        //         console.log(this.point);
        //         return this.point.name;
        //         // return this.point["value"]?.toFixed(1);
        //       }
        //     },
        //   },
        // },
        // {
        //   type: "geoheatmap",
        //   name: "Train Stations Near Airports",
        //   opacity: 0.7,
        //   colsize: 5,
        //   rowsize: 5,
        //   borderWidth: 10,
        //   interpolation: {
        //     enabled: true,
        //     blur: 2,
        //   },
        //   borderColor: "red",
        //   data: [
        //     {
        //       lon: 10,
        //       lat: 50,
        //       value: 13,
        //     },
        //     {
        //       lon: 5,
        //       lat: 50,
        //       value: 11,
        //     },
        //     {
        //       lon: 5,
        //       lat: 45,
        //       value: 10,
        //     },
        //     {
        //       lon: 15,
        //       lat: 50,
        //       value: 9,
        //     },
        //     {
        //       lon: 0,
        //       lat: 50,
        //       value: 9,
        //     },
        //     {
        //       lon: 0,
        //       lat: 55,
        //       value: 3,
        //     },
        //     {
        //       lon: 10,
        //       lat: 55,
        //       value: 3,
        //     },
        //     {
        //       lon: 15,
        //       lat: 55,
        //       value: 5,
        //     },
        //     {
        //       lon: 0,
        //       lat: 45,
        //       value: 6,
        //     },
        //     {
        //       lon: 10,
        //       lat: 45,
        //       value: 15,
        //     },
        //     {
        //       lon: 10,
        //       lat: 40,
        //       value: 3,
        //     },
        //     {
        //       lon: 15,
        //       lat: 40,
        //       value: 9,
        //     },
        //     {
        //       lon: -5,
        //       lat: 35,
        //       value: 2,
        //     },
        //     {
        //       lon: 0,
        //       lat: 40,
        //       value: 6,
        //     },
        //     {
        //       lon: -5,
        //       lat: 55,
        //       value: 4,
        //     },
        //     {
        //       lon: -5,
        //       lat: 50,
        //       value: 2,
        //     },
        //     {
        //       lon: 15,
        //       lat: 45,
        //       value: 12,
        //     },
        //     {
        //       lon: 10,
        //       lat: 60,
        //       value: 2,
        //     },
        //     {
        //       lon: 20,
        //       lat: 60,
        //       value: 2,
        //     },
        //     {
        //       lon: 20,
        //       lat: 50,
        //       value: 6,
        //     },
        //     {
        //       lon: -10,
        //       lat: 40,
        //       value: 2,
        //     },
        //     {
        //       lon: -5,
        //       lat: 40,
        //       value: 2,
        //     },
        //     {
        //       lon: 20,
        //       lat: 45,
        //       value: 7,
        //     },
        //     {
        //       lon: 20,
        //       lat: 40,
        //       value: 3,
        //     },
        //     {
        //       lon: 15,
        //       lat: 35,
        //       value: 1,
        //     },
        //     {
        //       lon: 25,
        //       lat: 55,
        //       value: 3,
        //     },
        //     {
        //       lon: -10,
        //       lat: 50,
        //       value: 1,
        //     },
        //     {
        //       lon: 5,
        //       lat: 40,
        //       value: 2,
        //     },
        //     {
        //       lon: 25,
        //       lat: 45,
        //       value: 5,
        //     },
        //     {
        //       lon: 20,
        //       lat: 55,
        //       value: 1,
        //     },
        //     {
        //       lon: -10,
        //       lat: 35,
        //       value: 1,
        //     },
        //     {
        //       lon: 25,
        //       lat: 40,
        //       value: 2,
        //     },
        //     {
        //       lon: 30,
        //       lat: 45,
        //       value: 1,
        //     },
        //     {
        //       lon: 25,
        //       lat: 50,
        //       value: 2,
        //     },
        //     {
        //       lon: -10,
        //       lat: 55,
        //       value: 1,
        //     },
        //     {
        //       lon: 35,
        //       lat: 35,
        //       value: 2,
        //     },
        //     {
        //       lon: 25,
        //       lat: 35,
        //       value: 1,
        //     },
        //     {
        //       lon: 15,
        //       lat: 60,
        //       value: 2,
        //     },
        //     {
        //       lon: 30,
        //       lat: 50,
        //       value: 1,
        //     },
        //     {
        //       lon: 25,
        //       lat: 60,
        //       value: 2,
        //     },
        //     {
        //       lon: -10,
        //       lat: 45,
        //       value: 1,
        //     },
        //   ],
        // },
        {
          type: "mappoint",
          color: "green",
          marker: {
            symbol:
              "url(https://www.highcharts.com/samples/graphics/museum.svg)",
            width: 24,
            height: 24,
          },
          dataLabels: {
            align: "top",
            verticalAlign: "top",
            enabled: false,
            shape: "callout",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: 5,
            style: {
              color: "#FFFFFF",
            },
          },
          animation: true,
          tooltip: {
            pointFormat: "{point.name}",
            headerFormat: "",
          },
          data: [
            {
              lon: 4.9,
              lat: 53.38,
              name: "Amsterdam",
            },
            {
              lon: -118.24,
              lat: 34.05,
              name: "LA",
            },
          ],
        },
        // {
        //   type: "mappoint",
        //   color: "green",
        //   marker: {
        //     symbol:
        //       "url(https://www.highcharts.com/samples/graphics/museum.svg)",
        //     width: 24,
        //     height: 24,
        //   },
        //   dataLabels: {
        //     align: "top",
        //     verticalAlign: "top",
        //     enabled: true,
        //     shape: "callout",
        //     backgroundColor: "rgba(0, 0, 0, 0.7)",
        //     borderRadius: 5,
        //     style: {
        //       color: "#FFFFFF",
        //     },
        //   },
        //   animation: true,
        //   tooltip: {
        //     pointFormat: "{point.name}",
        //     headerFormat: "",
        //   },
        //   data: [
        //     {
        //       lon: 4.9,
        //       lat: 53.38,
        //       name: "Amsterdam",
        //     },
        //     {
        //       lon: -118.24,
        //       lat: 34.05,
        //       name: "LA",
        //     },
        //   ],
        // },
        // {
        //   type: "mapline",
        //   nullColor: "green",
        //   data: [
        //     {
        //       geometry: {
        //         type: "LineString",
        //         coordinates: [
        //           [4.9, 53.38], // Amsterdam
        //           [-118.24, 34.05], // Los Angeles
        //         ],
        //       },
        //     },
        //   ],
        //   tooltip: {
        //     pointFormat: "{point}",
        //     headerFormat: "",
        //   },
        //   lineWidth: 5,
        //   color: "red",
        //   states: {
        //     hover: {
        //       lineWidth: 10,
        //       color: "red",
        //     },
        //   },
        // },
      ],
    };
    setOptions(options);
  };

  useEffect(() => {
    getOptions();
  }, []);

  if (!options) return <p>Loading...</p>;

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"mapChart"}
        options={options}
      />
    </>
  );
};

export default MapCharts;
