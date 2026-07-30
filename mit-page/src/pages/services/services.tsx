import React, { useEffect, useRef, useState } from 'react';
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const styles = {
    section: {
      padding: 'clamp(5rem, 10vh, 7rem) clamp(1rem, 5vw, 2rem)',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 35%, #F1F5F9 100%)',
      position: 'relative',
      overflow: 'hidden',
    } as React.CSSProperties,
    topFadeOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '120px',
      background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0) 100%)',
      pointerEvents: 'none',
      zIndex: 2,
    } as React.CSSProperties,
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 3,
    } as React.CSSProperties,
    headerContainer: {
      textAlign: 'center',
      marginBottom: '4rem',
    } as React.CSSProperties,
    badge: {
      display: 'inline-block',
      padding: '0.45rem 1.25rem',
      backgroundColor: '#FFFFFF',
      color: '#2563EB',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.08)',
      border: '1px solid rgba(37, 99, 235, 0.08)',
      marginBottom: '1rem',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(2rem, 4.5vw, 2.5rem)',
      fontWeight: 800,
      lineHeight: 1.2,
      color: '#0F172A',
      margin: 0,
      letterSpacing: '-0.02em',
    } as React.CSSProperties,
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    } as React.CSSProperties,
  };

  const servicesData = [
    {
      id: 'refrigeracion',
      hash: 'servicio-refrigeracion',
      title: 'Refrigeración',
      colorScheme: 'cyan',
      icon: <AcIcon />,
      badge: 'Climatización',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop',
      tags: ['Aire Acondicionado', 'Mantenimiento', 'Carga de Gas'],
      description: 'Brindamos soluciones profesionales en instalación, mantenimiento y reparación de sistemas de aire acondicionado para hogares y negocios. Garantizamos confort y eficiencia.',
    },
    {
      id: 'sistemas-informaticos',
      hash: 'servicio-sistemas',
      title: 'Sistemas Informáticos',
      colorScheme: 'purple',
      icon: <CodeIcon />,
      badge: 'Tecnología',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
      tags: ['Desarrollo Web', 'Soporte PC'],
      description: 'Ofrecemos soluciones integrales en informática para hogares y negocios. Nos especializamos en creación de páginas web, mantenimiento de cómputo y soporte técnico.',
    },
    {
      id: 'electricidad',
      hash: 'servicio-electricidad',
      title: 'Electricidad',
      colorScheme: 'amber',
      icon: <ZapIcon />,
      badge: 'Instalaciones',
      image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=800&auto=format&fit=crop',
      tags: ['Residencial & Comercial', 'Tableros', 'Emergencias 24/7'],
      description: 'Servicios eléctricos seguros y profesionales para hogares y negocios. Realizamos instalaciones, reparaciones y mantenimiento bajo estrictas normas de seguridad.',
    }
  ];

  return (
    <section id="servicios" ref={sectionRef} style={styles.section}>
      <div style={styles.topFadeOverlay} />
      <style>{`
        .service-card-link {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .service-card-link:hover {
          transform: translateY(-6px);
        }

        /* --- ANIMACIÓN DESVANECIDO DE ENTRADA --- */
        .reveal-header {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-header.is-in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-card {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-card.is-in-view {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div style={styles.container}>
        <div className={`styles.headerContainer reveal-header ${isVisible ? 'is-in-view' : ''}`} style={styles.headerContainer}>
          <span style={styles.badge}>Servicios</span>
          <h2 style={styles.title}>Lo que ofrecemos</h2>
        </div>

        <div style={styles.grid}>
          {servicesData.map((service, index) => (
            <a
              key={service.id}
              href={`#${service.hash || service.id}`}
              className={`service-card-link reveal-card ${isVisible ? 'is-in-view' : ''}`}
              style={{ transitionDelay: `${0.15 * (index + 1)}s` }}
            >
              <Card
                id={service.id}
                variant="service"
                title={service.title}
                description={service.description}
                icon={service.icon}
                colorScheme={service.colorScheme as any}
                image={service.image}
                badge={service.badge}
                tags={service.tags}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
