import React from "react";

export const ButtonPrimary: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, style, ...props }) => (
  <button
    style={{
      background: '#1976d2',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '8px 18px',
      fontWeight: 700,
      cursor: 'pointer',
      ...style,
    }}
    {...props}
  >
    {children}
  </button>
);

export const ButtonDanger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, style, ...props }) => (
  <button
    style={{
      background: '#e84118',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '8px 12px',
      fontWeight: 700,
      cursor: 'pointer',
      ...style,
    }}
    {...props}
  >
    {children}
  </button>
);

export const ButtonWarning: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, style, ...props }) => (
  <button
    style={{
      background: '#ff9800',
      color: '#fff',
      border: 'none',
      borderRadius: 6,
      padding: '8px 12px',
      fontWeight: 700,
      cursor: 'pointer',
      ...style,
    }}
    {...props}
  >
    {children}
  </button>
);
