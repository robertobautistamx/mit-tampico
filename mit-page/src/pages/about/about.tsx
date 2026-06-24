import React from 'react';
import Card from '../../components/card/Card';
import { useImageGalleryItem } from '../../modules/images/images';
import Button from '../../components/buttons/Button';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const MissionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const VisionIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const ValuesIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const TrophyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
    <path d="M12 2a6 6 0 0 1 6 6v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8a6 6 0 0 1 6-6z"></path>
  </svg>
);

const SparklesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"></path>
  </svg>
);

interface AboutProps {
  isFull?: boolean;
}

const About: React.FC<AboutProps> = ({ isFull = false }) => {
  const { image, loading } = useImageGalleryItem(1);

  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;

    const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:3001/api/v1';
    try {
      const origin = new URL(apiBase).origin;
      const cleanUrl = url.startsWith('/') ? url : `/${url}`;
      return `${origin}${cleanUrl}`;
    } catch (e) {
      return url;
    }
  };

  const defaultImage = "https://images.unsplash.com/photo-1581092921461-7031e4bf0e5c?q=80&w=2070&auto=format&fit=crop";
  const imageSrc = image?.image_url ? getImageUrl(image.image_url) : defaultImage;
  const imageAlt = image?.titulo || "Equipo técnico profesional trabajando";

  const styles = {
    section: {
      padding: isFull ? '0 0 6rem 0' : '6rem 2rem',
      backgroundColor: '#F8FAFC', // Slate 50 para un fondo limpio
      overflow: 'hidden',
    } as React.CSSProperties,
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: isFull ? '0 2rem' : '0',
    } as React.CSSProperties,

    // HERO ORIGINAL E INTUITIVO PARA LA VISTA DETALLADA (Sin copiar a SoftwareOne)
    heroContainer: {
      position: 'relative',
      width: '100%',
      minHeight: '260px', // Altura reducida para hacerlo más chico y dinámico
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      boxSizing: 'border-box',
      padding: '100px 2rem 2.5rem 2rem', // Espacio ajustado para el header transparente
      marginBottom: '4rem',
      overflow: 'hidden',
    } as React.CSSProperties,
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.70), rgba(15, 23, 42, 0.85)), url("https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'blur(8px) brightness(0.55)', // Imagen desenfocada y oscurecida para legibilidad
      transform: 'scale(1.1)', // Para evitar bordes blancos causados por el filtro de desenfoque
      zIndex: 1,
    } as React.CSSProperties,
    heroDecorativeGrid: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      pointerEvents: 'none',
      opacity: 0.8,
      zIndex: 2,
    } as React.CSSProperties,
    heroContent: {
      position: 'relative',
      zIndex: 3,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1.5rem',
      maxWidth: '850px',
    } as React.CSSProperties,
    heroTag: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      backgroundColor: 'rgba(59, 130, 246, 0.15)',
      border: '1px solid rgba(59, 130, 246, 0.25)',
      borderRadius: '100px',
      color: '#60A5FA',
      fontSize: '0.85rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    } as React.CSSProperties,
    heroTitle: {
      fontSize: 'clamp(1.5rem, 3.5vw, 2.35rem)', // Más compacto y balanceado
      fontWeight: 800,
      lineHeight: 1.2,
      color: '#FFFFFF',
      margin: 0,
      maxWidth: '850px',
    } as React.CSSProperties,
    heroHighlight: {
      color: '#3B82F6',
      backgroundImage: 'linear-gradient(90deg, #3B82F6 0%, #60A5FA 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    heroDesc: {
      fontSize: 'clamp(1rem, 2vw, 1.15rem)',
      color: '#CBD5E1', // Gris más claro para excelente legibilidad sobre el fondo desenfocado
      lineHeight: 1.7,
      maxWidth: '650px',
      margin: 0,
    } as React.CSSProperties,

    // FILAS DE CONTENIDO GENERAL
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
      backgroundColor: 'rgba(37, 99, 235, 0.08)',
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
      textAlign: 'justify', // Texto justificado para alineación profesional y limpia
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
      color: '#1E293B',
      fontWeight: 600,
      lineHeight: 1.4,
    } as React.CSSProperties,
    imageWrapper: {
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 25px 30px -5px rgba(0, 0, 0, 0.08), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
      height: isFull ? '460px' : '360px',
      width: '100%',
    } as React.CSSProperties,
    image: {
      width: '100%',
      height: '100%',
      display: 'block',
      objectFit: 'cover',
    } as React.CSSProperties,

    // GRID DE VALORES ORIGINAL (Glow effect cards)
    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2.5rem',
      marginTop: '5rem',
    } as React.CSSProperties,
  };

  const bulletPoints = [
    "Instalación y mantenimiento de aire acondicionado",
    "Proyectos eléctricos residenciales e industriales",
    "Soluciones y soporte informático integral",
    "Técnicos certificados y garantía por escrito",
    "Atención a domicilio y emergencias",
    "Asesoría técnica y soporte post-servicio"
  ];

  return (
    <section id="acerca" style={styles.section}>
      <style>
        {`
          @keyframes shimmer-about {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          .skeleton-about {
            background: linear-gradient(90deg, #E2E8F0 25%, #F1F5F9 50%, #E2E8F0 75%);
            background-size: 200% 100%;
            animation: shimmer-about 1.6s infinite linear;
            border-radius: 16px;
            width: 100%;
            height: ${isFull ? '460px' : '360px'};
          }

          /* --- TARJETAS CREATIVAS DE VALORES --- */
          .creative-value-card {
            position: relative;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.65) 100%);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(226, 232, 240, 0.8);
            border-radius: 24px;
            padding: 3rem 2.25rem 2.75rem 2.25rem;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 10px 30px -15px rgba(15, 23, 42, 0.04);
            z-index: 1;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }
          /* Card accent variables */
          .blue-card {
            --accent-color: #2563EB;
            --glow-color: rgba(59, 130, 246, 0.3);
            --tag-bg: rgba(59, 130, 246, 0.08);
            --tag-color: #2563EB;
            --card-shadow-hover: rgba(37, 99, 235, 0.14);
            --border-hover-color: rgba(37, 99, 235, 0.25);
          }
          .indigo-card {
            --accent-color: #4F46E5;
            --glow-color: rgba(99, 102, 241, 0.3);
            --tag-bg: rgba(99, 102, 241, 0.08);
            --tag-color: #4F46E5;
            --card-shadow-hover: rgba(99, 102, 241, 0.14);
            --border-hover-color: rgba(99, 102, 241, 0.25);
          }
          .sky-card {
            --accent-color: #0284C7;
            --glow-color: rgba(14, 165, 233, 0.3);
            --tag-bg: rgba(14, 165, 233, 0.08);
            --tag-color: #0284C7;
            --card-shadow-hover: rgba(14, 165, 233, 0.14);
            --border-hover-color: rgba(14, 165, 233, 0.25);
          }

          /* Accent top border using absolute positioning */
          .creative-value-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: var(--accent-color);
            opacity: 0.85;
            transition: all 0.4s ease;
          }
          .creative-value-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 30px 50px -20px var(--card-shadow-hover);
            background: rgba(255, 255, 255, 0.98);
            border-color: var(--border-hover-color);
          }
          .creative-value-card:hover::before {
            height: 7px;
            opacity: 1;
          }

          /* Puntos de resplandor (Glow dots) */
          .glow-dot {
            position: absolute;
            width: 180px;
            height: 180px;
            border-radius: 50%;
            filter: blur(45px);
            bottom: -60px;
            right: -60px;
            background: var(--glow-color);
            opacity: 0.15;
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
            z-index: -1;
          }
          .creative-value-card:hover .glow-dot {
            opacity: 0.35;
            transform: scale(1.35) translate(-10px, -10px);
          }

          /* Cabecera de tarjetas creativas */
          .card-creative-header {
            display: flex;
            align-items: center;
            gap: 1.25rem;
          }
          .icon-creative-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 58px;
            height: 58px;
            border-radius: 16px;
            flex-shrink: 0;
            background-color: var(--tag-bg);
            color: var(--tag-color);
            border: 1px solid rgba(255, 255, 255, 0.6);
            box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.03);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .creative-value-card:hover .icon-creative-wrapper {
            transform: translateY(-4px) scale(1.08) rotate(4deg);
            background-color: var(--accent-color);
            color: #FFFFFF;
            box-shadow: 0 8px 20px -4px var(--card-shadow-hover);
            border-color: transparent;
          }

          .card-creative-tag {
            display: inline-block;
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            padding: 0.25rem 0.65rem;
            border-radius: 999px;
            background-color: var(--tag-bg);
            color: var(--tag-color);
            margin-bottom: 0.35rem;
            transition: all 0.3s ease;
          }
          .creative-value-card:hover .card-creative-tag {
            background-color: rgba(255, 255, 255, 0.8);
            transform: scale(0.98);
          }

          .card-creative-title {
            font-size: 1.5rem;
            font-weight: 800;
            color: #0F172A;
            margin: 0;
            letter-spacing: -0.01em;
          }
          .card-creative-text {
            font-size: 0.98rem;
            color: #475569;
            line-height: 1.8;
            margin: 0;
            text-align: justify;
            transition: color 0.3s ease;
          }
          .creative-value-card:hover .card-creative-text {
            color: #1E293B;
          }
        `}
      </style>

      {/* Renderizado de Banner de ancho completo (fuera del container para ir de lado a lado) */}
      {isFull && (
        <div style={styles.heroContainer} className="section-fade">
          <div style={styles.heroBackground} />
          <div style={styles.heroDecorativeGrid} />
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              Comprometidos con la <span style={styles.heroHighlight}>Excelencia Técnica</span> y la <span style={styles.heroHighlight}>Honestidad</span>
            </h1>
          </div>
        </div>
      )}

      <div style={styles.container}>

        {/* Bloque de Contenido y Foto */}
        <div style={styles.topContent}>
          <div style={styles.leftColumn}>
            {isFull ? (
              <>
                <h2 style={styles.title}>
                  ¿Quiénes <span style={styles.highlight}>Somos?</span>
                </h2>
              </>
            ) : (
              <>
                <span style={styles.badge}>Acerca de Nosotros</span>
                <h2 style={styles.title}>
                  <span style={styles.highlight}>10+ Años de experiencia</span> en Multiservicios Integrales
                </h2>
              </>
            )}
            <p style={styles.description}>
              En Multiservicios Integrales Tampico ofrecemos soluciones profesionales en refrigeración, electricidad y sistemas informáticos, atendiendo hogares y negocios con un enfoque en calidad, seguridad y eficiencia.
            </p>
            {isFull ? (
              <>
                <p style={styles.description}>
                  Nuestro compromiso es brindar un servicio confiable y transparente, cuidando cada detalle desde el diagnóstico hasta la entrega final, garantizando la satisfacción de nuestros clientes. Estamos listos para ayudarte con un servicio rápido, confiable y profesional.
                </p>

                <ul style={styles.list}>
                  {bulletPoints.map((item, index) => (
                    <li key={index} style={styles.listItem}>
                      <div style={{ marginTop: '0.15rem', flexShrink: 0 }}><CheckIcon /></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div style={{ marginTop: '2rem', textAlign: 'left' }}>
                <Button href="#acerca" variant="primary">Ver más sobre nosotros</Button>
              </div>
            )}
          </div>

          <div style={styles.rightColumn}>
            {/* Elemento decorativo de desfase elegante */}
            <div style={{
              position: 'absolute',
              top: '15px',
              left: '-15px',
              right: '15px',
              bottom: '-15px',
              backgroundColor: 'rgba(37, 99, 235, 0.05)',
              border: '2px dashed rgba(37, 99, 235, 0.2)',
              borderRadius: '16px',
              zIndex: 1,
            }} />

            {loading ? (
              <div className="skeleton-about" style={{ position: 'relative', zIndex: 2 }} />
            ) : (
              <div style={{ ...styles.imageWrapper, position: 'relative', zIndex: 2 }}>
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  style={styles.image}
                />
              </div>
            )}
          </div>
        </div>

        {/* Misión, Visión, Valores Creativos (Solo se muestra en la versión completa) */}
        {isFull && (
          <div style={styles.cardsGrid}>
            
            {/* CARD 1: MISIÓN */}
            <div className="creative-value-card blue-card">
              <div className="glow-dot blue-glow" />
              <div className="card-creative-header">
                <div className="icon-creative-wrapper blue-icon">
                  <MissionIcon />
                </div>
                <div>
                  <span className="card-creative-tag blue-text">NUESTRO PROPÓSITO</span>
                  <h3 className="card-creative-title">Misión</h3>
                </div>
              </div>
              <p className="card-creative-text">
                Entregar servicios fiables y eficientes en climatización, electricidad y tecnología, asegurando seguridad, calidad y satisfacción en cada trabajo.
              </p>
            </div>

            {/* CARD 2: VISIÓN */}
            <div className="creative-value-card indigo-card">
              <div className="glow-dot indigo-glow" />
              <div className="card-creative-header">
                <div className="icon-creative-wrapper indigo-icon">
                  <VisionIcon />
                </div>
                <div>
                  <span className="card-creative-tag indigo-text">NUESTRO RUMBO</span>
                  <h3 className="card-creative-title">Visión</h3>
                </div>
              </div>
              <p className="card-creative-text">
                Ser la empresa de multiservicios de referencia en la región, reconocida por excelencia técnica, innovación y confianza al cliente.
              </p>
            </div>

            {/* CARD 3: VALORES */}
            <div className="creative-value-card sky-card">
              <div className="glow-dot sky-glow" />
              <div className="card-creative-header">
                <div className="icon-creative-wrapper sky-icon">
                  <ValuesIcon />
                </div>
                <div>
                  <span className="card-creative-tag sky-text">NUESTROS PRINCIPIOS</span>
                  <h3 className="card-creative-title">Valores</h3>
                </div>
              </div>
              <p className="card-creative-text">
                Responsabilidad, honestidad, puntualidad y compromiso con la seguridad y el medio ambiente en todas nuestras soluciones.
              </p>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};

export default About;