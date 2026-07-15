import React, { useState } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  children: React.ReactNode;
  customStyles?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', href, type, disabled, children, customStyles, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem 2.5rem',
    textDecoration: 'none',
    fontWeight: 600,
    borderRadius: '4px', // Bordes más cuadrados y serios
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: '1px solid transparent',
    fontFamily: 'inherit',
    fontSize: '1rem',
    letterSpacing: '0.02em',
    transform: isHovered && !disabled ? 'translateY(-2px)' : 'none',
    opacity: disabled ? 0.6 : 1,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: isHovered && !disabled ? '#1D4ED8' : '#2563EB', // Azul corporativo más profundo
      color: '#FFF',
      boxShadow: isHovered && !disabled ? '0 10px 25px -5px rgba(37, 99, 235, 0.4)' : '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
    },
    secondary: {
      backgroundColor: isHovered && !disabled ? '#C2410C' : '#EA580C',
      color: '#FFF',
      boxShadow: isHovered && !disabled ? '0 10px 25px -5px rgba(234, 88, 12, 0.4)' : '0 4px 6px -1px rgba(234, 88, 12, 0.2)',
    },
    outline: {
      backgroundColor: isHovered && !disabled ? '#FFFFFF' : 'transparent',
      color: isHovered && !disabled ? '#0F172A' : '#F8FAFC', // Al hacer hover se vuelve blanco con texto oscuro
      border: '1px solid #FFFFFF',
      boxShadow: isHovered && !disabled ? '0 10px 25px -5px rgba(255, 255, 255, 0.2)' : 'none',
    }
  };

  const combinedStyles = { ...baseStyles, ...variants[variant], ...customStyles };

  if (href) {
    return (
      <a
        href={href}
        style={combinedStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick as any}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      style={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick as any}
    >
      {children}
    </button>
  );
};

export default Button;