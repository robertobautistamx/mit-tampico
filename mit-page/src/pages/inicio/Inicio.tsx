import React from 'react';
import Button from '../../components/buttons/Button';
import Background from '../../components/background/background';

const Inicio: React.FC = () => {
  const styles = {
    section: {
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#090D16',
      overflow: 'hidden',
      padding: 'clamp(6rem, 14vh, 9rem) clamp(2rem, 8vw, 6rem)',
      boxSizing: 'border-box',
      color: '#F8FAFC',
    } as React.CSSProperties,
    content: {
      position: 'relative',
      zIndex: 5,
      maxWidth: '920px',
      width: '100%',
      margin: '0 auto',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem',
    } as React.CSSProperties,
    badge: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.6rem',
      padding: '0.45rem 1.25rem',
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      color: '#60A5FA',
      borderRadius: '50px',
      fontSize: '0.78rem',
      fontWeight: 700,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      border: '1px solid rgba(59, 130, 246, 0.3)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      marginBottom: '0.25rem',
    } as React.CSSProperties,
    statusDot: {
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      backgroundColor: '#60A5FA',
      boxShadow: '0 0 10px #60A5FA',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(2.3rem, 5.5vw, 4.3rem)',
      fontWeight: 900,
      lineHeight: 1.18,
      margin: 0,
      letterSpacing: '-0.03em',
      color: '#FFFFFF',
      textAlign: 'center',
    } as React.CSSProperties,
    highlight: {
      backgroundImage: 'linear-gradient(90deg, #FFFFFF 0%, #60A5FA 60%, #38BDF8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline-block',
      paddingBottom: '0.15em', // Evita recorte en la letra 'g', 'y', 'p'
      lineHeight: 1.18,
    } as React.CSSProperties,
    subtitle: {
      fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
      color: '#CBD5E1',
      maxWidth: '680px',
      lineHeight: 1.7,
      margin: '0 auto',
      fontWeight: 400,
      textAlign: 'center',
    } as React.CSSProperties,
    buttonGroup: {
      display: 'flex',
      gap: '1.25rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '0.75rem',
    } as React.CSSProperties,
  };

  return (
    <section id="inicio" style={styles.section}>
      <Background />

      <div className="inicio-content" style={styles.content}>
        <span className="inicio-tag" style={styles.badge}>
          <span style={styles.statusDot} />
          <span>SERVICIOS GARANTIZADOS</span>
        </span>

        <h1 className="inicio-title" style={styles.title}>
          Soluciones Integrales<br />
          <span className="inicio-highlight" style={styles.highlight}>para tu hogar y empresa</span>
        </h1>

        <p className="inicio-subtitle" style={styles.subtitle}>
          Expertos en refrigeración, sistemas y electricidad. Entregamos ingeniería de precisión para garantizar la continuidad operativa de tus proyectos más críticos.
        </p>

        <div className="inicio-button-group" style={styles.buttonGroup}>
          <Button href="#servicios" variant="primary">Nuestros Servicios →</Button>
          <Button href="#contacto" variant="outline">Contactar a un Asesor</Button>
        </div>
      </div>

      <style>{`
        /* --- ESTILOS RESPONSIVOS EXCLUSIVOS PARA MÓVIL (ALINEADO A LA IZQUIERDA) --- */
        @media (max-width: 768px) {
          .inicio-content {
            align-items: flex-start !important;
            text-align: left !important;
            padding: 0 1.25rem !important;
          }
          .inicio-tag {
            align-self: flex-start !important;
            text-align: left !important;
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            margin-bottom: 1.25rem !important;
            color: #38BDF8 !important;
            font-size: 0.82rem !important;
            letter-spacing: 0.12em !important;
            font-weight: 700 !important;
            box-shadow: none !important;
          }
          .inicio-title {
            text-align: left !important;
            font-size: 2.65rem !important;
            line-height: 1.18 !important;
          }
          .inicio-highlight {
            display: block !important;
            text-align: left !important;
            padding-bottom: 0.15em !important;
          }
          .inicio-subtitle {
            text-align: left !important;
            font-size: 0.98rem !important;
            line-height: 1.65 !important;
            margin-bottom: 1.5rem !important;
          }
          .inicio-button-group {
            flex-direction: column !important;
            align-items: flex-start !important;
            width: 100% !important;
            gap: 0.85rem !important;
          }
          .inicio-button-group a,
          .inicio-button-group button {
            width: auto !important;
            min-width: 180px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Inicio;