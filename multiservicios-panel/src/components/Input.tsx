import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: "block", marginBottom: 6, color: "#222", fontWeight: 500 }}>{label}</label>}
    <input
      {...props}
      style={{
        padding: "12px 14px",
        borderRadius: 8,
        border: error ? "1.5px solid #e84118" : "1px solid #dcdde1",
        fontSize: 16,
        outline: "none",
        transition: "border 0.2s",
        width: "100%",
        boxSizing: "border-box",
        ...props.style,
      }}
    />
    {error && <div style={{ color: "#e84118", fontSize: 13, marginTop: 4 }}>{error}</div>}
  </div>
);
