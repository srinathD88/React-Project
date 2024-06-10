import ContainerBody from "./ContainerBody";
import ContainerFooter from "./ContainerFooter";
import ContainerHeader from "./ContainerHeader";

import "./Container.css";
import { useRef, useState } from "react";

const tabs_list = [
  {
    id: "distribution",
    label: "Distribution",
  },
  {
    id: "time_series",
    label: "Time Series",
  },
  {
    id: "confidence",
    label: "Confidence",
  },
];

const Container = () => {
  const [tabs, setTabs] = useState(tabs_list);
  const [activeTab, setActiveTab] = useState("distribution");

  const containerRef = useRef(null);
  const chartRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleScreenshot = () => {
    try {
      // will send data to server and send image back
      // chartRef.current.chart.exportChart({
      //   filename: "graph-chart",
      // });

      // offline export, no API call
      chartRef.current.chart.exportChartLocal({
        filename: "graph-chart",
      });
    } catch (err) {
      console.log("Chart hasn't been rendered yet");
    }
  };
  const handleDownload = () => {
    try {
      chartRef.current.chart.downloadCSV();
    } catch (err) {
      console.log("Chart hasn't been rendered yet");
    }
  };

  const handleToggle = () => {
    try {
      setExpanded(!expanded);

      const width = expanded ? "65%" : "80%";
      const height = expanded ? "65%" : "70%";

      containerRef.current.style.width = width;
      containerRef.current.style.height = height;
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  return (
    <div className="Container" ref={containerRef}>
      <ContainerHeader
        tabs={tabs}
        activeTab={activeTab}
        expanded={expanded}
        handleTabClick={handleTabClick}
        handleToggle={handleToggle}
      />
      <ContainerBody chartRef={chartRef} activeTab={activeTab} />
      <ContainerFooter
        handleScreenshot={handleScreenshot}
        handleDownload={handleDownload}
      />
    </div>
  );
};

export default Container;
