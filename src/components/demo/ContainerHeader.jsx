import { useState } from "react";

const ContainerHeader = ({
  tabs,
  activeTab,
  expanded,
  handleTabClick,
  handleToggle,
}) => {
  return (
    <div className="container-header">
      <div className="tabs">
        {tabs.map((tab) => (
          <div
            className={`${activeTab === tab.id ? "tab active" : "tab"}`}
            onClick={() => handleTabClick(tab.id)}
            key={tab.id}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="actions">
        <button onClick={handleToggle}>
          {expanded ? "Collapse" : "Expand"}
        </button>
        <button>Close</button>
      </div>
    </div>
  );
};

export default ContainerHeader;
