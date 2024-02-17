import React from "react";

const ProgressbarList = ({ percentage }) => {
  return (
    <div
      className="progress-bar-container rounded-lg mt-6"
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
        className="rounded-lg"
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressbarList;
