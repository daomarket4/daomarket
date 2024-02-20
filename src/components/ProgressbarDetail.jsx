// src/components/ProgressbarDetail.jsx
import React from "react";

const ProgressbarDetail = ({ percentage }) => {
  return (
    <div
      className="progress-bar-container rounded-lg mt-6 -ml-20"
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
        className="rounded-lg"
      >
        {percentage}%
      </div>
    </div>
  );
};

export default ProgressbarDetail;
