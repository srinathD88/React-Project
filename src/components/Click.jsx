import React, { useState } from "react";

const Click = () => {
  const [clicks, setClick] = useState([]);

  const handleClick = (e) => {
    const { clientX: x, clientY: y } = e;
    const obj = {
      x,
      y,
    };

    setClick((prev) => [...prev, obj]);
  };

  const handleUndo = (e) => {
    e.stopPropagation();
    console.log("cc");
    const newArr = clicks.slice(0, -1);
    setClick(newArr);
  };

  return (
    <div>
      <div onClick={handleClick} style={{ height: "100vh" }}>
        <button onClick={handleUndo}>Undo</button>
        {clicks?.length > 0 &&
          clicks.map((click, i) => {
            return (
              <p
                key={i}
                style={{ left: click.x, top: click.y, position: "absolute" }}
              >
                {i + 1}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default Click;
