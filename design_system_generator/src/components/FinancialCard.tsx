
import React, { CSSProperties } from "react";

export interface FinancialCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  status?: string;
  darkMode?: boolean;
}

const baseStyle: CSSProperties = {
  borderRadius: "1rem",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  padding: "1.5rem",
  minWidth: "260px",
  maxWidth: "340px",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  fontFamily: "Inter, Arial, sans-serif",
  cursor: "pointer",
  transition: "transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1)",
};

const gradientLight = "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)";
const gradientDark = "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)";

export const FinancialCard: React.FC<FinancialCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  status,
  darkMode = false,
}) => {
  const [hovered, setHovered] = React.useState(false);
  const style: CSSProperties = {
    ...baseStyle,
    background: darkMode ? gradientDark : gradientLight,
    color: darkMode ? "#f7fafc" : "#1a202c",
    boxShadow: hovered
      ? "0 4px 16px rgba(0,0,0,0.14)"
      : baseStyle.boxShadow,
    transform: hovered ? "translateY(-2px) scale(1.02)" : "none",
  };
  const subtitleColor = darkMode ? "#cbd5e1" : "#4a5568";
  const statusColor = darkMode ? "#a0aec0" : "#718096";
  return (
    <section
      role="region"
      aria-label={title}
      tabIndex={0}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {icon && <span aria-hidden="true">{icon}</span>}
        <h2 style={{ fontSize: "1.1rem", margin: 0 }}>{title}</h2>
      </div>
      <div style={{ fontSize: "2rem", fontWeight: 700 }}>{value}</div>
      {subtitle && (
        <div style={{ fontSize: "0.95rem", color: subtitleColor }}>{subtitle}</div>
      )}
      {status && (
        <div style={{ fontSize: "0.85rem", color: statusColor }}>{status}</div>
      )}
    </section>
  );
};
