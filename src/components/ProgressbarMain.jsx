import React from "react";

const ProgressbarMain = ({ percentage }) => {
  return (
    <div
      className="progress-bar-container rounded-lg mt-6"
      style={{ width: "100%", backgroundColor: "gray" }}
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
        className="rounded-lg pl-2"
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressbarMain;
