import React, { useState } from 'react';

interface CardProps {
  id?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  variant?: 'service' | 'info';
}

const Card: React.FC<CardProps> = ({ id, title, description, icon, variant = 'service' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isService = variant === 'service';
  
  const styles = {
    card: {
      backgroundColor: isService ? '#FFFFFF' : '#F8FAFC',
      padding: isService ? '3rem 2rem' : '2.5rem 2rem',
      borderRadius: isService ? '12px' : '8px',
      borderTop: isService ? 'none' : '4px solid #2563EB',
      boxShadow: isService 
        ? (isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)')
        : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      transform: isService && isHovered ? 'translateY(-5px)' : 'none',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      scrollMarginTop: '120px',
    } as React.CSSProperties,
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: isService ? '0' : '1rem',
      marginBottom: isService ? '0' : '1rem',
      flexDirection: isService ? 'column' : 'row',
      width: '100%',
    } as React.CSSProperties,
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '64px',
      height: '64px',
      borderRadius: '12px',
      backgroundColor: isHovered ? '#2563EB' : 'rgba(37, 99, 235, 0.08)',
      color: isHovered ? '#FFFFFF' : '#2563EB', // Cambia de azul a blanco al pasar el mouse
      marginBottom: '1.5rem',
      alignSelf: 'flex-start',
      transition: 'background-color 0.3s ease, color 0.3s ease',
    } as React.CSSProperties,
    title: {
      fontSize: isService ? '1.35rem' : '1.25rem',
      fontWeight: 700,
      color: '#0F172A',
      margin: 0,
      marginBottom: isService ? '1rem' : '0',
      alignSelf: 'flex-start',
    } as React.CSSProperties,
    description: {
      color: '#475569',
      lineHeight: 1.7,
      fontSize: isService ? '1rem' : '0.95rem',
      margin: 0,
    } as React.CSSProperties,
  };

  return (
    <div id={id} style={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isService ? (
        <>
          <div style={styles.iconWrapper}>{icon}</div>
          <h3 style={styles.title}>{title}</h3>
        </>
      ) : (
        <div style={styles.header}>
          {icon}
          <h3 style={styles.title}>{title}</h3>
        </div>
      )}
      <p style={styles.description}>{description}</p>
    </div>
  );
};

export default Card;