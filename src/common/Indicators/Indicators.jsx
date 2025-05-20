import React from "react";
import "./Indicators.style.css";

function Indicators({ total, current }) {
  return (
    <div className="card-indicators">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="dot"
          style={{ opacity: i + 1 === current ? 1 : 0.35 }}
          aria-hidden
        />
      ))}
    </div>
  );
}

export default Indicators;
