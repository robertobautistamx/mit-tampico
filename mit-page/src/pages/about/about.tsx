import React from 'react';
import Card from '../../components/card/Card';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const MissionIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);

const VisionIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);

const ValuesIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

const About: React.FC = () => {
  const styles = {
    section: {
      padding: '6rem 2rem',
      background: 'linear-gradient(to bottom, #FFFFFF 0%, #F8FAFC 100%)', // Gradiente sutil
    } as React.CSSProperties,
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    } as React.CSSProperties,
    topContent: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '4rem',
      alignItems: 'center',
    } as React.CSSProperties,
    leftColumn: {
      flex: '1 1 500px',
    } as React.CSSProperties,
    rightColumn: {
      flex: '1 1 500px',
      position: 'relative',
    } as React.CSSProperties,
    badge: {
      display: 'inline-block',
      padding: '0.4rem 1rem',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      color: '#2563EB',
      borderRadius: '4px',
      fontSize: '0.85rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      marginBottom: '1.5rem',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 800,
      lineHeight: 1.2,
      color: '#0F172A',
      margin: '0 0 1.5rem 0',
    } as React.CSSProperties,
    highlight: {
      color: '#2563EB',
    },
    description: {
      fontSize: '1.05rem',
      color: '#475569',
      lineHeight: 1.8,
      marginBottom: '1.5rem',
    } as React.CSSProperties,
    list: {
      listStyle: 'none',
      padding: 0,
      margin: '2rem 0 0 0',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1.25rem',
    } as React.CSSProperties,
    listItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      fontSize: '0.95rem',
      color: '#0F172A',
      fontWeight: 600,
      lineHeight: 1.4,
    } as React.CSSProperties,
    imageWrapper: {
      position: 'relative',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    } as React.CSSProperties,
    image: {
      width: '100%',
      height: 'auto',
      display: 'block',
      objectFit: 'cover',
    } as React.CSSProperties,
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginTop: '5rem',
    } as React.CSSProperties,
  };

  const bulletPoints = [
    "Instalación y mantenimiento de aire acondicionado",
    "Proyectos eléctricos residenciales e industriales",
    "Soluciones y soporte informático",
    "Técnicos certificados y garantía en trabajos",
    "Atención a domicilio y emergencias",
    "Soporte post-servicio y asesoría"
  ];

  return (
    <section id="acerca" style={styles.section}>
      <div style={styles.container}>

        {/* Contenido Superior */}
        <div style={styles.topContent}>
          <div style={styles.leftColumn}>
            <span style={styles.badge}>Acerca de Nosotros</span>
            <h2 style={styles.title}>
              <span style={styles.highlight}>10+ Años de experiencia</span> en Multiservicios Integrales
            </h2>
            <p style={styles.description}>
              En Multiservicios Integrales ofrecemos soluciones profesionales en refrigeración, electricidad y sistemas informáticos, atendiendo hogares y negocios con un enfoque en calidad, seguridad y eficiencia.
            </p>
            <p style={styles.description}>
              Nuestro compromiso es brindar un servicio confiable y transparente, cuidando cada detalle desde el diagnóstico hasta la entrega final, garantizando la satisfacción de nuestros clientes. Estamos listos para ayudarte con un servicio rápido, confiable y profesional.
            </p>

            <ul style={styles.list}>
              {bulletPoints.map((item, index) => (
                <li key={index} style={styles.listItem}>
                  <div style={{ marginTop: '0.1rem' }}><CheckIcon /></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.rightColumn}>
            <div style={styles.imageWrapper}>
              {/* Imagen representativa industrial o de equipo */}
              <img
                src="https://images.unsplash.com/photo-1581092921461-7031e4bf0e5c?q=80&w=2070&auto=format&fit=crop"
                alt="Equipo técnico profesional trabajando"
                style={styles.image}
              />
            </div>
          </div>
        </div>

        {/* Grid de Tarjetas (Misión, Visión, Valores) */}
        <div style={styles.cardsGrid}>
          <Card
            variant="info"
            icon={<MissionIcon />}
            title="Misión"
            description="Entregar servicios fiables y eficientes en climatización, electricidad y tecnología, asegurando seguridad, calidad y satisfacción en cada trabajo."
          />

          <Card
            variant="info"
            icon={<VisionIcon />}
            title="Visión"
            description="Ser la empresa de multiservicios de referencia en la región, reconocida por excelencia técnica, innovación y confianza al cliente."
          />

          <Card
            variant="info"
            icon={<ValuesIcon />}
            title="Valores"
            description="Responsabilidad, honestidad, puntualidad y compromiso con la seguridad y el medio ambiente en todas nuestras soluciones."
          />
        </div>

      </div>
    </section>
  );
};

export default About;