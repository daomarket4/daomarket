// src/components/Progressbar.jsx
import React from "react";

const Progressbar = ({ percentage }) => {
  return (
    <div
      className="progress-bar-container"
      style={{ width: "100%", backgroundColor: "#eee" }}
    >
      <div
        style={{
          height: "24px",
          width: `${percentage}%`,
          backgroundColor: "blue",
          textAlign: "center",
          color: "white",
          lineHeight: "24px",
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default Progressbar;
