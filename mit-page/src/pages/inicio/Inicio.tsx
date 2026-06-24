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
      backgroundColor: '#0F172A', // Coincide con el Header (Slate 900)
      overflow: 'hidden',
      padding: '6rem 2rem 3rem',
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
      backgroundColor: 'transparent',
      color: '#94A3B8',
      borderRadius: '4px',
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.2em', // Letras separadas y elegantes
      textTransform: 'uppercase',
      border: '1px solid rgba(148, 163, 184, 0.3)', // Borde sutil
      marginBottom: '1rem',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(2.5rem, 6vw, 5rem)', // Letras más grandes
      fontWeight: 800,
      lineHeight: 1.05, // Interlineado apretado
      margin: 0,
      letterSpacing: '-0.03em',
    } as React.CSSProperties,
    highlight: {
      color: '#3B82F6',
      backgroundImage: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)', // Texto con degradado
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    subtitle: {
      fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
      color: '#CBD5E1', // Texto un poco más claro para mejor lectura
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