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
    borderRadius: '8px', // Bordes más modernos y premium
    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
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
      background: isHovered && !disabled 
        ? 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)' 
        : 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
      color: '#FFF',
      boxShadow: isHovered && !disabled 
        ? '0 10px 25px -5px rgba(37, 99, 235, 0.45)' 
        : '0 4px 12px -1px rgba(37, 99, 235, 0.25)',
    },
    secondary: {
      background: isHovered && !disabled 
        ? 'linear-gradient(135deg, #C2410C 0%, #9A3412 100%)' 
        : 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
      color: '#FFF',
      boxShadow: isHovered && !disabled 
        ? '0 10px 25px -5px rgba(234, 88, 12, 0.45)' 
        : '0 4px 12px -1px rgba(234, 88, 12, 0.25)',
    },
    outline: {
      background: isHovered && !disabled ? '#FFFFFF' : 'transparent',
      color: isHovered && !disabled ? '#0F172A' : '#F8FAFC',
      border: '1px solid #FFFFFF',
      boxShadow: isHovered && !disabled ? '0 10px 25px -5px rgba(255, 255, 255, 0.15)' : 'none',
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