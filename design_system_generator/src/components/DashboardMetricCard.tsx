import React from "react";

interface DashboardMetricCardProps {
  title: string;
  value: string | number;
  change: number; // percentage change, e.g., 5.2 for +5.2%
  sparkline?: number[]; // array of numbers for sparkline
}

// Simple inline SVG sparkline generator
const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  if (!data || data.length < 2) return null;
  const width = 80;
  const height = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((d - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.05))" }}
      />
    </svg>
  );
};

export const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({
  title,
  value,
  change,
  sparkline = [],
}) => {
  const isPositive = change >= 0;
  const changeColor = isPositive ? "#38A169" : "#E53E3E"; // green or red
  return (
    <section
      role="region"
      aria-label={title}
      tabIndex={0}
      style={{
        background: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "1.5rem",
        minWidth: "260px",
        maxWidth: "340px",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <h2 style={{ fontSize: "1.1rem", margin: 0, color: "#2D3748" }}>{title}</h2>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.75rem" }}>
        <span style={{ fontSize: "2rem", fontWeight: 700, color: "#1A202C" }}>{value}</span>
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: 500,
            color: changeColor,
            background: isPositive ? "#F0FFF4" : "#FFF5F5",
            borderRadius: "0.5rem",
            padding: "0.15rem 0.5rem",
            minWidth: "56px",
            textAlign: "center",
          }}
          aria-label={isPositive ? "Positive change" : "Negative change"}
        >
          {isPositive ? "+" : "-"}
          {Math.abs(change).toFixed(1)}%
        </span>
      </div>
      {sparkline.length > 1 && (
        <div style={{ marginTop: "0.5rem" }}>
          <Sparkline data={sparkline} color={changeColor} />
        </div>
      )}
    </section>
  );
};
