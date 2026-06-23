import React, { useState } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
  children: React.ReactNode;
  customStyles?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', href, children, customStyles, onClick }) => {
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
    cursor: 'pointer',
    border: '1px solid transparent',
    fontFamily: 'inherit',
    fontSize: '1rem',
    letterSpacing: '0.02em',
    transform: isHovered ? 'translateY(-2px)' : 'none',
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: isHovered ? '#1D4ED8' : '#2563EB', // Azul corporativo más profundo
      color: '#FFF',
      boxShadow: isHovered ? '0 10px 25px -5px rgba(37, 99, 235, 0.4)' : '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
    },
    secondary: {
      backgroundColor: isHovered ? '#C2410C' : '#EA580C',
      color: '#FFF',
      boxShadow: isHovered ? '0 10px 25px -5px rgba(234, 88, 12, 0.4)' : '0 4px 6px -1px rgba(234, 88, 12, 0.2)',
    },
    outline: {
      backgroundColor: isHovered ? '#FFFFFF' : 'transparent',
      color: isHovered ? '#0F172A' : '#F8FAFC', // Al hacer hover se vuelve blanco con texto oscuro
      border: '1px solid #FFFFFF',
      boxShadow: isHovered ? '0 10px 25px -5px rgba(255, 255, 255, 0.2)' : 'none',
    }
  };

  const combinedStyles = { ...baseStyles, ...variants[variant], ...customStyles };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      style={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick as any}
    >
      {children}
    </Component>
  );
};

export default Button;