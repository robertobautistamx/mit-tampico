import React from 'react';
import Button from '../../components/buttons/Button';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ServiceElectricidad: React.FC = () => {
  const servicios = [
    'Instalaciones eléctricas residenciales y comerciales',
    'Reparación de fallas eléctricas y cortocircuitos',
    'Cambio y actualización de tableros eléctricos',
    'Instalación de lámparas, contactos y apagadores',
    'Revisión y certificación de instalaciones',
    'Instalación de sistemas de tierra física',
    'Proyectos eléctricos industriales',
    'Atención a emergencias eléctricas las 24h',
  ];

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <style>{`
        .srv-elec-hero {
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
        .srv-elec-hero-bg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image: linear-gradient(rgba(15,23,42,0.70), rgba(15,23,42,0.85)),
            url("https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          filter: blur(8px) brightness(0.55);
          transform: scale(1.1);
          z-index: 1;
        }
        .srv-elec-hero-dots {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
          opacity: 0.8;
          z-index: 2;
        }
        .srv-elec-hero-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          max-width: 850px;
        }
        .srv-elec-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(251,191,36,0.15);
          border: 1px solid rgba(251,191,36,0.25);
          border-radius: 100px;
          color: #FCD34D;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .srv-elec-title {
          font-size: clamp(1.5rem, 3.5vw, 2.35rem);
          font-weight: 800;
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0;
        }
        .srv-elec-title span {
          background-image: linear-gradient(90deg, #FCD34D 0%, #FDE68A 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .srv-elec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
          margin-top: 2.5rem;
        }
        .srv-elec-item {
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
        .srv-elec-item:hover {
          border-color: #F59E0B;
          box-shadow: 0 6px 20px rgba(245,158,11,0.15);
          transform: translateY(-2px);
        }
        .srv-elec-cta {
          background: linear-gradient(135deg, #451A03 0%, #78350F 100%);
          padding: 5rem 2rem;
          text-align: center;
        }
      `}</style>

      {/* HERO — igual que Acerca de */}
      <div className="srv-elec-hero">
        <div className="srv-elec-hero-bg" />
        <div className="srv-elec-hero-dots" />
        <div className="srv-elec-hero-content">
          <h1 className="srv-elec-title">
            Electricidad Segura y <span>Profesional en tu Hogar</span>
          </h1>
        </div>
      </div>

      {/* LO QUE HACEMOS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span style={{ display: 'inline-block', padding: '0.35rem 1rem', background: 'rgba(245,158,11,0.08)', color: '#D97706', borderRadius: '4px', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Lo que hacemos
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
            Servicios de Electricidad
          </h2>
          <p style={{ color: '#64748B', marginTop: '1rem', fontSize: '1rem', lineHeight: 1.7, maxWidth: '580px', margin: '1rem auto 0' }}>
            Trabajos eléctricos seguros y eficientes con apego a normativa, materiales certificados y garantía en cada instalación.
          </p>
        </div>

        <div className="srv-elec-grid">
          {servicios.map((s, i) => (
            <div key={i} className="srv-elec-item">
              <div style={{ flexShrink: 0, marginTop: '1px' }}><CheckIcon /></div>
              <span style={{ fontSize: '0.95rem', color: '#334155', fontWeight: 500, lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="srv-elec-cta">
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#FEF3C7', margin: '0 0 1rem', lineHeight: 1.2 }}>
          ¿Tienes una emergencia eléctrica?
        </h2>
        <p style={{ color: '#FDE68A', marginBottom: '2rem', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
          Atendemos urgencias eléctricas. Contáctanos y enviamos un técnico lo antes posible.
        </p>
        <Button variant="primary" customStyles={{ padding: '0.9rem 2.5rem', fontSize: '1rem' }}
          onClick={() => { window.location.hash = '#contacto'; }}>
          Contactar ahora
        </Button>
      </div>
    </div>
  );
};

export default ServiceElectricidad;
