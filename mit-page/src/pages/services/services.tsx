import React from 'react';
import Card from '../../components/card/Card';

const AcIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20"></path><path d="M4 10l8-8 8 8"></path><path d="M4 14l8 8 8-8"></path><path d="M2 12h20"></path>
  </svg>
);

const CodeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
);

const ZapIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const Services: React.FC = () => {
  const styles = {
    section: {
      padding: '6rem 2rem',
      background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', // Gradiente azul claro moderno
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
      backgroundColor: '#FFFFFF',
      color: '#2563EB',
      borderRadius: '4px',
      fontSize: '0.85rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.1)',
      marginBottom: '1rem',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 800,
      lineHeight: 1.2,
      color: '#0F172A',
      margin: 0,
    } as React.CSSProperties,
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '2.5rem',
    } as React.CSSProperties,
  };

  const servicesData = [
    {
      id: 'refrigeracion',
      title: 'Refrigeración',
      icon: <AcIcon />,
      description: 'Brindamos soluciones profesionales en instalación, mantenimiento y reparación de sistemas de aire acondicionado para hogares y negocios. Nuestro compromiso es garantizar tu confort mediante trabajos de calidad, atención rápida y precios justos.',
    },
    {
      id: 'sistemas-informaticos',
      title: 'Sistemas Informáticos',
      icon: <CodeIcon />,
      description: 'Ofrecemos soluciones integrales en informática para hogares, negocios y emprendedores. Nos especializamos en creación de páginas web, mantenimiento de equipos de cómputo y reparación de dispositivos, garantizando un servicio confiable y de calidad.',
    },
    {
      id: 'electricidad',
      title: 'Electricidad',
      icon: <ZapIcon />,
      description: 'Brindamos servicios eléctricos seguros y profesionales para hogares y negocios. Realizamos instalaciones, reparaciones y mantenimiento con atención a los detalles y cumplimiento de normas para garantizar un funcionamiento eficiente y sin riesgos.',
    }
  ];

  return (
    <section id="servicios" style={styles.section}>
      <div style={styles.container}>
        <div style={styles.headerContainer}>
          <span style={styles.badge}>Servicios</span>
          <h2 style={styles.title}>Lo que ofrecemos</h2>
        </div>

        <div style={styles.grid}>
          {servicesData.map((service) => (
            <Card
              key={service.id}
              id={service.id}
              variant="service"
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;