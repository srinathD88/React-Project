import React from "react";

const ContainerFooter = ({ handleScreenshot, handleDownload }) => {
  return (
    <div className="container-footer">
      <button onClick={handleScreenshot}>Screenshot</button>
      <button onClick={handleDownload}>Download CSV</button>
    </div>
  );
};

export default ContainerFooter;
