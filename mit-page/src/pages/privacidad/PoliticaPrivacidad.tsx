import React, { useEffect, useState } from 'react';
import Button from '../../components/buttons/Button';

// Icons for each section
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const ShieldIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const CookieIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-8 0 4 4 0 0 0-8 0 4 4 0 0 1-4-4 10 10 0 0 0 10-10z"></path>
  </svg>
);

const LinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PoliticaPrivacidad: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduccion');

  const sections = [
    { id: 'introduccion', label: 'Introducción', icon: <InfoIcon /> },
    { id: 'recopilacion', label: 'Información que recopilamos', icon: <EyeIcon /> },
    { id: 'uso', label: 'Uso de la información', icon: <ShieldIcon /> },
    { id: 'proteccion', label: 'Protección de tus datos', icon: <ShieldIcon /> },
    { id: 'cookies', label: 'Cookies', icon: <CookieIcon /> },
    { id: 'enlaces', label: 'Enlaces externos', icon: <LinkIcon /> },
    { id: 'derechos', label: 'Derechos del usuario', icon: <UserIcon /> },
    { id: 'cambios', label: 'Cambios en la política', icon: <EditIcon /> },
    { id: 'contacto', label: 'Contacto', icon: <MailIcon /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const offset = 120;
      const scrollPosition = window.scrollY + offset;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 100;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      <style>{`
        .privacy-hero {
          position: relative;
          width: 100%;
          min-height: 240px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-sizing: border-box;
          padding: 100px 2rem 2.5rem;
          overflow: hidden;
        }
        .privacy-hero-bg {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image: linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.90)),
            url("https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop");
          background-size: cover;
          background-position: center;
          filter: blur(4px) brightness(0.6);
          transform: scale(1.05);
          z-index: 1;
        }
        .privacy-hero-dots {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
          opacity: 0.8;
          z-index: 2;
        }
        .privacy-hero-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
          max-width: 850px;
        }
        .privacy-title {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          font-weight: 800;
          line-height: 1.2;
          color: #FFFFFF;
          margin: 0;
        }
        .privacy-title span {
          color: #22D3EE;
          background-image: linear-gradient(90deg, #22D3EE 0%, #60A5FA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .privacy-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 3rem;
        }
        .privacy-sidebar {
          position: sticky;
          top: 110px;
          height: fit-content;
        }
        .privacy-sidebar-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748B;
          margin-bottom: 1rem;
          padding-left: 0.75rem;
        }
        .privacy-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .privacy-nav-item a {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          color: #64748B;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .privacy-nav-item a:hover {
          color: #2563EB;
          background-color: rgba(37,99,235,0.04);
        }
        .privacy-nav-item.active a {
          color: #2563EB;
          background-color: rgba(37,99,235,0.07);
          font-weight: 600;
        }
        .privacy-content {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .privacy-section-card {
          background-color: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 12px rgba(15,23,42,0.02);
          padding: 2.5rem;
          scroll-margin-top: 110px;
        }
        .privacy-section-card h2 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F172A;
          margin-top: 0;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid #F1F5F9;
          padding-bottom: 0.85rem;
        }
        .privacy-section-card h2 svg {
          color: #3B82F6;
        }
        .privacy-section-card p {
          color: #475569;
          font-size: 0.98rem;
          line-height: 1.75;
          margin-bottom: 1.25rem;
          text-align: justify;
        }
        .privacy-section-card p:last-child {
          margin-bottom: 0;
        }
        .privacy-list {
          padding-left: 1.25rem;
          margin-bottom: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .privacy-list li {
          color: #475569;
          font-size: 0.98rem;
          line-height: 1.5;
        }
        .privacy-list li strong {
          color: #1E293B;
        }
        .privacy-breadcrumb-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 2rem 0;
        }
        @media (max-width: 1024px) {
          .privacy-breadcrumb-container {
            padding: 1.5rem 1rem 0;
          }
        }
        .privacy-breadcrumb {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #64748B;
          margin-bottom: 1.5rem;
        }
        .privacy-breadcrumb a {
          color: #64748B;
          text-decoration: none;
          transition: color 0.2s;
        }
        .privacy-breadcrumb a:hover {
          color: #2563EB;
        }
        .privacy-contact-box {
          background-color: rgba(37,99,235,0.03);
          border: 1px dashed rgba(37,99,235,0.25);
          border-radius: 12px;
          padding: 1.5rem;
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .privacy-contact-box strong {
          color: #1E293B;
          font-size: 1.05rem;
        }
        .privacy-contact-box a {
          color: #2563EB;
          text-decoration: none;
          font-weight: 600;
          transition: text-decoration 0.2s;
          word-break: break-all;
        }
        .privacy-button-group {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .privacy-contact-box a:hover {
          text-decoration: underline;
        }

        @media (max-width: 1024px) {
          .privacy-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            padding: 1.5rem 1rem;
            width: 100%;
            max-width: 100%;
            overflow: hidden;
          }
          .privacy-sidebar {
            position: relative;
            top: 0;
            margin-bottom: 0.5rem;
            width: 100%;
            max-width: 100%;
            min-width: 0; /* Previene el desborde en CSS Grid */
          }
          .privacy-sidebar-title {
            margin-bottom: 0.5rem;
          }
          .privacy-nav-list {
            flex-direction: row;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            gap: 0.5rem;
            padding-bottom: 0.75rem;
            scrollbar-width: none;
            width: 100%;
            max-width: 100%;
          }
          .privacy-nav-list::-webkit-scrollbar {
            display: none;
          }
          .privacy-nav-item {
            flex: 0 0 auto;
            scroll-snap-align: start;
          }
          .privacy-nav-item a {
            font-size: 0.85rem;
            padding: 0.5rem 0.75rem;
          }
          .privacy-content {
            width: 100%;
            max-width: 100%;
            min-width: 0; /* Previene el desborde en CSS Grid */
          }
        }

        @media (max-width: 768px) {
          .privacy-section-card {
            padding: 1.75rem 1.25rem;
            border-radius: 12px;
          }
          .privacy-section-card h2 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
          }
          .privacy-section-card p {
            font-size: 0.92rem;
            line-height: 1.65;
            text-align: left;
          }
          .privacy-button-group {
            flex-direction: column;
            gap: 0.75rem;
          }
          .privacy-button-group a, .privacy-button-group button {
            width: 100% !important;
            padding: 0.85rem 1.5rem !important;
            display: inline-block !important;
            text-align: center !important;
          }
        }
      `}</style>

      {/* HERO BANNER */}
      <div className="privacy-hero">
        <div className="privacy-hero-bg" />
        <div className="privacy-hero-dots" />
        <div className="privacy-hero-content">
          <h1 className="privacy-title">
            Política de <span>Privacidad</span>
          </h1>
        </div>
      </div>

      <div className="privacy-breadcrumb-container">
        {/* Breadcrumb */}
        <div className="privacy-breadcrumb">
          <a href="#inicio">Inicio</a>
          <span>›</span>
          <span style={{ color: '#0F172A', fontWeight: 500 }}>Política de Privacidad</span>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="privacy-container">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="privacy-sidebar">
          <div className="privacy-sidebar-title">Secciones</div>
          <ul className="privacy-nav-list">
            {sections.map((sec) => (
              <li key={sec.id} className={`privacy-nav-item ${activeSection === sec.id ? 'active' : ''}`}>
                <a href={`#${sec.id}`} onClick={(e) => scrollToSection(e, sec.id)}>
                  {sec.icon}
                  <span>{sec.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* CONTENT */}
        <main className="privacy-content">
          
          {/* INTRODUCCIÓN */}
          <section id="introduccion" className="privacy-section-card">
            <h2><InfoIcon /> Política de Privacidad</h2>
            <p>
              En <strong>Multiservicios Integrales</strong> valoramos y respetamos tu privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos la información personal que nos proporcionas a través de nuestro sitio web.
            </p>
          </section>

          {/* INFORMACIÓN QUE RECOPILAMOS */}
          <section id="recopilacion" className="privacy-section-card">
            <h2><EyeIcon /> Información que recopilamos</h2>
            <p>
              Nuestro sitio web recopila únicamente la información que tú decides enviarnos mediante:
            </p>
            <ul className="privacy-list">
              <li>Formularios de contacto</li>
              <li>Formularios de cotización</li>
              <li>Comunicación directa por correo electrónico o WhatsApp</li>
            </ul>
            <p>
              Los datos personales que podemos solicitar son:
            </p>
            <ul className="privacy-list">
              <li><strong>Nombre completo:</strong> Para dirigirnos a ti de manera personalizada.</li>
              <li><strong>Correo electrónico:</strong> Para responder a tus consultas e información de servicios.</li>
              <li><strong>Número de teléfono o WhatsApp:</strong> Para agendar visitas técnicas o dar respuesta oportuna.</li>
              <li><strong>Asunto y mensaje:</strong> Detalles de los requerimientos técnicos solicitados.</li>
            </ul>
            <p>
              <strong>Nota importante:</strong> No recopilamos información de carácter sensible ni datos financieros en esta plataforma.
            </p>
          </section>

          {/* USO DE LA INFORMACIÓN */}
          <section id="uso" className="privacy-section-card">
            <h2><ShieldIcon /> Uso de la información</h2>
            <p>
              La información que nos proporcionas se utiliza exclusivamente para:
            </p>
            <ul className="privacy-list">
              <li>Responder tus mensajes, dudas o solicitudes técnicas.</li>
              <li>Brindarte cotizaciones formales o información detallada sobre nuestros servicios de climatización, electricidad e informática.</li>
              <li>Agendar visitas técnicas a domicilio o planificar trabajos contratados.</li>
              <li>Mejorar continuamente la atención y la calidad de los servicios que ofrecemos.</li>
            </ul>
            <p>
              <strong>Compromiso de Confidencialidad:</strong> No vendemos, compartimos, rentamos ni transferimos tus datos personales a terceros bajo ninguna circunstancia.
            </p>
          </section>

          {/* PROTECCIÓN DE TUS DATOS */}
          <section id="proteccion" className="privacy-section-card">
            <h2><ShieldIcon /> Protección de tus datos</h2>
            <p>
              Aplicamos medidas de seguridad administrativas y técnicas adecuadas para proteger tu información personal contra:
            </p>
            <ul className="privacy-list">
              <li>Acceso o divulgación no autorizados.</li>
              <li>Uso indebido o alteración.</li>
              <li>Pérdida accidental o destrucción de información.</li>
            </ul>
            <p>
              Tus datos están protegidos en entornos seguros y solo personal autorizado de <strong>Multiservicios Integrales</strong> que necesite procesar la solicitud tiene acceso a ellos.
            </p>
          </section>

          {/* COOKIES */}
          <section id="cookies" className="privacy-section-card">
            <h2><CookieIcon /> Cookies</h2>
            <p>
              Nuestro sitio web actualmente <strong>no utiliza cookies</strong> para rastrear, identificar o perfilar a los usuarios.
            </p>
            <p>
              En caso de que en el futuro se implementen cookies (por ejemplo, para análisis estadístico anónimo de visitas a través de herramientas como Google Analytics, o para mejorar la experiencia de usuario), esta política será actualizada inmediatamente y se informará al usuario de manera clara mediante un banner informativo.
            </p>
          </section>

          {/* ENLACES EXTERNOS */}
          <section id="enlaces" className="privacy-section-card">
            <h2><LinkIcon /> Enlaces externos</h2>
            <p>
              Este sitio web puede incluir enlaces interactivos a plataformas externas como WhatsApp, Facebook u otras redes sociales. Nosotros no nos hacemos responsables de las políticas de privacidad ni del tratamiento de datos de dichos sitios externos.
            </p>
            <p>
              Te recomendamos encarecidamente revisar las políticas de privacidad de dichas plataformas al visitarlas y antes de proporcionar datos personales.
            </p>
          </section>

          {/* DERECHOS DEL USUARIO */}
          <section id="derechos" className="privacy-section-card">
            <h2><UserIcon /> Derechos del usuario</h2>
            <p>
              Como titular de tus datos personales, tienes derecho a ejercer tus derechos de control en cualquier momento. Tienes derecho a:
            </p>
            <ul className="privacy-list">
              <li>Solicitar acceso a tu información personal almacenada.</li>
              <li>Solicitar la corrección de datos incorrectos o incompletos.</li>
              <li>Solicitar la eliminación definitiva de tus datos de nuestros registros de contacto.</li>
              <li>Retirar tu consentimiento previo para el tratamiento de tus datos.</li>
            </ul>
            <p>
              Para ejercer cualquiera de estos derechos, puedes escribirnos directamente al correo electrónico de contacto especificado abajo, indicando tu solicitud.
            </p>
          </section>

          {/* CAMBIOS EN LA POLÍTICA */}
          <section id="cambios" className="privacy-section-card">
            <h2><EditIcon /> Cambios en esta Política de Privacidad</h2>
            <p>
              Nos reservamos el derecho de actualizar o modificar esta Política de Privacidad en cualquier momento con el fin de adaptarla a novedades legislativas o requerimientos del servicio. Los cambios entrarán en vigor de forma inmediata a partir del momento en que sean publicados de manera oficial en este sitio web.
            </p>
          </section>

          {/* CONTACTO */}
          <section id="contacto" className="privacy-section-card">
            <h2><MailIcon /> Contacto</h2>
            <p>
              Si tienes dudas, preguntas sobre esta política o deseas realizar alguna solicitud en relación con el tratamiento de tus datos personales, puedes ponerte en contacto con nosotros a través de:
            </p>
            <div className="privacy-contact-box">
              <strong>Multiservicios Integrales Tampico</strong>
              <span>Correo electrónico de contacto:</span>
              <a href="mailto:serv.integralestampico@outlook.com">serv.integralestampico@outlook.com</a>
              <span>Teléfonos de contacto:</span>
              <span style={{ color: '#1E293B', fontWeight: 500 }}>+52 833 310 2201 / +52 833 147 4478</span>
            </div>
            <div className="privacy-button-group">
              <Button variant="secondary" onClick={() => { window.location.hash = '#inicio'; }}>
                Regresar al Inicio
              </Button>
              <Button variant="primary" onClick={() => { window.location.hash = '#contacto'; }}>
                Ir a Contacto
              </Button>
            </div>
          </section>

        </main>

      </div>
    </div>
  );
};

export default PoliticaPrivacidad;
