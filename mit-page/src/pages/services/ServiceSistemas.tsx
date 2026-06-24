import React from 'react';
import Button from '../../components/buttons/Button';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ServiceSistemas: React.FC = () => {
  const servicios = [
    'Desarrollo de páginas web profesionales y landing pages',
    'Mantenimiento y actualización de sitios web existentes',
    'Reparación y diagnóstico de computadoras y laptops',
    'Instalación y configuración de software y sistemas operativos',
    'Soporte técnico remoto y a domicilio',
    'Configuración de redes locales y Wi-Fi',
    'Recuperación de datos y respaldos',
    'Asesoría tecnológica para pequeñas empresas',
  ];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <style>{`
        .srv-sis-hero {
          position: relative;
          width: 100%;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
          padding: 100px 2rem 2.5rem;
          overflow: hidden;
        }
        .srv-sis-hero-bg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image: linear-gradient(rgba(15,23,42,0.70), rgba(15,23,42,0.85)),
            url("https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          filter: blur(8px) brightness(0.55);
          transform: scale(1.1);
          z-index: 1;
        }
        .srv-sis-hero-dots {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
          opacity: 0.8;
          z-index: 2;
        }
        .srv-sis-hero-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          max-width: 850px;
        }
        .srv-sis-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 100px;
          color: #A5B4FC;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .srv-sis-title {
          font-size: clamp(1.5rem, 3.5vw, 2.35rem);
          font-weight: 800;
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0;
        }
        .srv-sis-title span {
          background-image: linear-gradient(90deg, #A5B4FC 0%, #C7D2FE 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .srv-sis-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          margin-top: 2.5rem;
        }
        .srv-sis-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 1.1rem 1.3rem;
          background: #FFFFFF;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all 0.25s ease;
        }
        .srv-sis-item:hover {
          border-color: #6366F1;
          box-shadow: 0 6px 20px rgba(99,102,241,0.12);
          transform: translateY(-2px);
        }
        .srv-sis-cta {
          background: linear-gradient(135deg, #1E1B4B 0%, #312E81 100%);
          padding: 5rem 2rem;
          text-align: center;
        }
      `}</style>

      {/* HERO — igual que Acerca de */}
      <div className="srv-sis-hero">
        <div className="srv-sis-hero-bg" />
        <div className="srv-sis-hero-dots" />
        <div className="srv-sis-hero-content">
          <h1 className="srv-sis-title">
            Tecnología e Informática <span>al Alcance de Todos</span>
          </h1>
        </div>
      </div>

      {/* LO QUE HACEMOS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1rem', background: 'rgba(99,102,241,0.08)', color: '#4F46E5', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Lo que hacemos
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
            Sistemas Informáticos
          </h2>
          <p style={{ color: '#64748B', marginTop: '1rem', fontSize: '1rem', lineHeight: 1.7, maxWidth: '580px', margin: '1rem auto 0' }}>
            Soluciones tecnológicas completas, desde desarrollo web hasta soporte técnico presencial o remoto.
          </p>
        </div>

        <div className="srv-sis-grid">
          {servicios.map((s, i) => (
            <div key={i} className="srv-sis-item">
              <div style={{ flexShrink: 0, marginTop: '1px' }}><CheckIcon /></div>
              <span style={{ fontSize: '0.95rem', color: '#334155', fontWeight: 500, lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="srv-sis-cta">
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#F8FAFC', margin: '0 0 1rem', lineHeight: 1.2 }}>
          ¿Necesitas soporte o tu sitio web?
        </h2>
        <p style={{ color: '#C7D2FE', marginBottom: '2rem', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Cuéntanos tu proyecto o problema y lo resolvemos con rapidez y profesionalismo.
        </p>
        <Button variant="primary" customStyles={{ padding: '0.9rem 2.5rem', fontSize: '1rem' }}
          onClick={() => { window.location.hash = '#contacto'; }}>
          Contactar ahora
        </Button>
      </div>
    </div>
  );
};

export default ServiceSistemas;
