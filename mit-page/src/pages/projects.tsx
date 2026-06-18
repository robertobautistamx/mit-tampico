import React from 'react';
import ProjectCard from '../ProjectCard';

const Projects: React.FC = () => {
  const styles = {
    section: {
      padding: '6rem 2rem',
      backgroundColor: '#0F172A', // Fondo oscuro para resaltar las imágenes
    } as React.CSSProperties,
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    } as React.CSSProperties,
    headerContainer: {
      textAlign: 'center',
      marginBottom: '4rem',
    } as React.CSSProperties,
    badge: {
      display: 'inline-block',
      padding: '0.4rem 1rem',
      backgroundColor: 'rgba(96, 165, 250, 0.15)',
      color: '#60A5FA', // Azul claro brillante
      borderRadius: '4px',
      fontSize: '0.85rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: '1rem',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 800,
      lineHeight: 1.2,
      color: '#F8FAFC', // Texto blanco
      margin: 0,
    } as React.CSSProperties,
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
    } as React.CSSProperties,
  };

  // Generamos los 6 campos solicitados temporalmente con la misma imagen
  const projectsData = Array(6).fill({
    title: 'Refrigeración',
    img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop'
  });

  return (
    <section id="proyectos" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.headerContainer}>
          <span style={styles.badge}>Proyectos</span>
          <h2 style={styles.title}>Galería de nuestros trabajos</h2>
        </div>
        <div style={styles.grid}>
          {projectsData.map((project, index) => (
            <ProjectCard key={index} title={project.title} img={project.img} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;