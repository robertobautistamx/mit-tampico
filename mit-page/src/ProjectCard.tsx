import React, { useState } from 'react';

interface ProjectCardProps {
  title: string;
  img: string;
}

const PlusIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ProjectCard: React.FC<ProjectCardProps> = ({ title, img }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    card: {
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      aspectRatio: '4 / 3',
      cursor: 'pointer',
    } as React.CSSProperties,
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
    } as React.CSSProperties,
    overlay: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.75) 100%)', // Gradiente negro sutil solo abajo
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      padding: '1.5rem',
      opacity: isHovered ? 1 : 0,
      transition: 'opacity 0.3s ease',
    } as React.CSSProperties,
    title: {
      color: '#FFFFFF',
      fontSize: '1.25rem',
      fontWeight: 700,
      transition: 'transform 0.3s ease',
      transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.card} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={img} alt={title} style={styles.img} />
      <div style={styles.overlay}>
        <span style={styles.title}>{title}</span>
        <PlusIcon />
      </div>
    </div>
  );
};

export default ProjectCard;