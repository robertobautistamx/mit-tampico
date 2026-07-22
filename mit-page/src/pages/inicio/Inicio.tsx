import React from 'react';
import Button from '../../components/buttons/Button';
import Background from '../../components/background/background';

const Inicio: React.FC = () => {
  const styles = {
    section: {
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#090D16', // Color de fondo premium súper oscuro (casi negro azulado)
      overflow: 'hidden',
      padding: 'clamp(5rem, 12vh, 8rem) clamp(1rem, 5vw, 2rem) clamp(3rem, 8vh, 5rem)',
      color: '#F8FAFC',
    } as React.CSSProperties,
    content: {
      position: 'relative',
      zIndex: 3,
      maxWidth: '1000px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
    } as React.CSSProperties,
    badge: {
      display: 'inline-block',
      padding: '0.5rem 1.25rem',
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      color: '#60A5FA', // Azul claro vibrante
      borderRadius: '20px', // Totalmente redondeado tipo pastilla moderna
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      border: '1px solid rgba(59, 130, 246, 0.2)', // Borde teñido de azul
      marginBottom: '0.5rem',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(2.25rem, 6.5vw, 4.5rem)',
      fontWeight: 900,
      lineHeight: 1.1,
      margin: 0,
      letterSpacing: '-0.03em',
    } as React.CSSProperties,
    highlight: {
      backgroundImage: 'linear-gradient(90deg, #FFFFFF 0%, #60A5FA 60%, #22D3EE 100%)', // Degradado ultra-elegante Plateado a Azul a Cian
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
    } as React.CSSProperties,
    subtitle: {
      fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
      color: '#94A3B8', // Slate 400
      maxWidth: '650px',
      lineHeight: 1.7,
      margin: '0 0 2rem 0',
      fontWeight: 400,
    } as React.CSSProperties,
    buttonGroup: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
    } as React.CSSProperties,
  };

  return (
    <section id="inicio" style={styles.section}>
      <Background />

      <div style={styles.content}>
        <span style={styles.badge}>Multiservicios Integrales</span>
        <h1 style={styles.title}>
          Soluciones Integrales<br />
          <span style={styles.highlight}>para tu hogar y empresa</span>
        </h1>
        <p style={styles.subtitle}>
          Expertos en refrigeración, sistemas y electricidad. Calidad y confianza en cada servicio
        </p>

        <div style={styles.buttonGroup}>
          <Button href="#servicios" variant="primary">Nuestros Servicios</Button>
          <Button href="#contacto" variant="outline">Contactar a un Asesor</Button>
        </div>
      </div>
    </section>
  );
};

export default Inicio;