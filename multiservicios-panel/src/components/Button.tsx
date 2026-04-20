import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

const styles: Record<string, React.CSSProperties> = {
  primary: {
    background: "#273c75",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px 0",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(39,60,117,0.08)",
    transition: "background 0.2s",
  },
  secondary: {
    background: "#dcdde1",
    color: "#222",
    border: "none",
    borderRadius: 8,
    padding: "12px 0",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(39,60,117,0.04)",
    transition: "background 0.2s",
  },
  danger: {
    background: "#e84118",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px 0",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(232,65,24,0.08)",
    transition: "background 0.2s",
  },
};

export const Button: React.FC<ButtonProps> = ({ children, variant = "primary", style, ...props }) => (
  <button style={{ ...styles[variant], ...style }} {...props}>
    {children}
  </button>
);
