import React from "react";
import Spline from "./Spline";
import TimeSeries from "./TimeSeries";

const ContainerBody = ({ chartRef, activeTab }) => {
  return (
    <div className="container-body">
      {activeTab === "distribution" && <Spline chartRef={chartRef} />}
      {activeTab === "time_series" && <TimeSeries chartRef={chartRef} />}
    </div>
  );
};

export default ContainerBody;
