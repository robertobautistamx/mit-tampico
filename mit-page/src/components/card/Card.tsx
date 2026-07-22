import React, { useState } from 'react';

interface CardProps {
  id?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  variant?: 'service' | 'info';
  colorScheme?: 'cyan' | 'purple' | 'amber' | 'blue';
}

const Card: React.FC<CardProps> = ({ id, title, description, icon, variant = 'service', colorScheme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isService = variant === 'service';

  const schemes = {
    cyan: {
      bg: 'rgba(6, 182, 212, 0.08)',
      color: '#0891B2',
      bgHover: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
      shadow: 'rgba(6, 182, 212, 0.15)',
    },
    purple: {
      bg: 'rgba(139, 92, 246, 0.08)',
      color: '#7C3AED',
      bgHover: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      shadow: 'rgba(139, 92, 246, 0.15)',
    },
    amber: {
      bg: 'rgba(245, 158, 11, 0.08)',
      color: '#D97706',
      bgHover: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      shadow: 'rgba(245, 158, 11, 0.15)',
    },
    blue: {
      bg: 'rgba(37, 99, 235, 0.08)',
      color: '#2563EB',
      bgHover: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      shadow: 'rgba(37, 99, 235, 0.15)',
    },
  };

  const selectedScheme = schemes[colorScheme || 'blue'];
  
  const styles = {
    card: {
      backgroundColor: isService ? '#FFFFFF' : '#F8FAFC',
      padding: isService ? '3rem 2rem' : '2.5rem 2rem',
      borderRadius: isService ? '16px' : '10px',
      borderTop: isService ? 'none' : `4px solid ${selectedScheme.color}`,
      boxShadow: isService 
        ? (isHovered ? `0 20px 25px -5px ${selectedScheme.shadow}, 0 10px 10px -5px rgba(0, 0, 0, 0.04)` : '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.01)')
        : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      transform: isService && isHovered ? 'translateY(-6px)' : 'none',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
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
      borderRadius: '14px',
      background: isHovered ? selectedScheme.bgHover : selectedScheme.bg,
      color: isHovered ? '#FFFFFF' : selectedScheme.color,
      marginBottom: '1.5rem',
      alignSelf: 'flex-start',
      transition: 'background 0.3s ease, color 0.3s ease',
    } as React.CSSProperties,
    title: {
      fontSize: isService ? '1.4rem' : '1.25rem',
      fontWeight: 800,
      color: '#0F172A',
      margin: 0,
      marginBottom: isService ? '1rem' : '0',
      alignSelf: 'flex-start',
      letterSpacing: '-0.02em',
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
          <div style={{ ...styles.iconWrapper, width: '48px', height: '48px', marginBottom: 0, borderRadius: '8px' }}>{icon}</div>
          <h3 style={styles.title}>{title}</h3>
        </div>
      )}
      <p style={styles.description}>{description}</p>
    </div>
  );
};

export default Card;