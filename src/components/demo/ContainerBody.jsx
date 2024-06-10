import React from "react";
import Spline from "./Spline";
import TimeSeries from "./TimeSeries";
import LineWithBar from "./LineWithBar";

const ContainerBody = ({ chartRef, activeTab }) => {
  return (
    <div className="container-body">
      {activeTab === "distribution" && <Spline chartRef={chartRef} />}
      {activeTab === "time_series" && <TimeSeries chartRef={chartRef} />}
      {activeTab === "confidence" && <LineWithBar chartRef={chartRef} />}
    </div>
  );
};

export default ContainerBody;
