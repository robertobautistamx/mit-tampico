import React from 'react';

const GuaranteeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);

const FastSpeedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const TrainedStaffIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <polyline points="17 11 19 13 23 9"></polyline>
  </svg>
);

const SupportIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Garantía en todos los trabajos',
      description: 'Respaldo escrito y compromiso de calidad en cada servicio.',
      icon: <GuaranteeIcon />,
    },
    {
      title: 'Atención rápida',
      description: 'Respuesta inmediata para resolver tus requerimientos sin demora.',
      icon: <FastSpeedIcon />,
    },
    {
      title: 'Personal capacitado',
      description: 'Técnicos especialistas certificados y con amplia experiencia.',
      icon: <TrainedStaffIcon />,
    },
    {
      title: 'Soporte personalizado',
      description: 'Asesoría directa adaptada a las necesidades de tu hogar o empresa.',
      icon: <SupportIcon />,
    },
  ];

  return (
    <section id="por-que-elegirnos" style={{
      position: 'relative',
      backgroundColor: '#F1F5F9', // Tono Slate suave que armoniza perfectamente
      backgroundImage: 'linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)',
      padding: 'clamp(5rem, 9vh, 6.5rem) clamp(1.25rem, 5vw, 3rem)',
      color: '#0F172A',
      overflow: 'hidden',
    }}>
      {/* DIVISOR TRIANGULAR SUPERIOR (Blanco puro para conectar con Acerca de Nosotros) */}
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: '-1px',
          left: 0,
          width: '100%',
          height: 'clamp(30px, 4vw, 50px)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <polygon points="0,0 720,50 1440,0" fill="#FFFFFF" />
      </svg>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 4,
      }}>
        {/* Encabezado de la sección */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span style={{
            display: 'inline-block',
            padding: '0.4rem 1.1rem',
            backgroundColor: 'rgba(37, 99, 235, 0.08)',
            color: '#2563EB',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            border: '1px solid rgba(37, 99, 235, 0.2)',
            marginBottom: '0.75rem',
          }}>
            VENTAJAS EXCLUSIVAS
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 900,
            color: '#0F172A',
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            ¿Por qué <span style={{
              backgroundImage: 'linear-gradient(90deg, #1E40AF 0%, #2563EB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>elegirnos?</span>
          </h2>
        </div>

        {/* 4 Tarjetas pequeñas en cuadrícula con paleta clara elegante */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '1.25rem',
        }}>
          {features.map((item, idx) => (
            <div
              key={idx}
              className="why-card"
              style={{
                backgroundColor: '#FFFFFF',
                padding: '1.5rem 1.25rem',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.85rem',
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '12px',
                backgroundColor: 'rgba(37, 99, 235, 0.08)',
                border: '1px solid rgba(37, 99, 235, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {item.icon}
              </div>

              <div>
                <h3 style={{
                  fontSize: '1.02rem',
                  fontWeight: 700,
                  color: '#0F172A',
                  margin: '0 0 0.35rem 0',
                  lineHeight: 1.3,
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '0.88rem',
                  color: '#64748B',
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIVISOR TRIANGULAR INFERIOR (Fondo de Servicios abajo) */}
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: '-1px',
          left: 0,
          width: '100%',
          height: 'clamp(30px, 4vw, 50px)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        <polygon points="0,50 720,0 1440,50 1440,60 0,60" fill="#FFFFFF" />
      </svg>

      <style>{`
        .why-card:hover {
          transform: translateY(-5px);
          border-color: rgba(37, 99, 235, 0.35) !important;
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.12) !important;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
