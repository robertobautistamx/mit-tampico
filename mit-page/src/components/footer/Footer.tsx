import React from 'react';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../header/header.icons';

const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const isAboutPage = window.location.hash === '#acerca';

    if (isAboutPage) {
      // Si estamos en la página Acerca de completa, permitimos que el hash cambie naturalmente
      if (id === 'inicio') {
        window.location.hash = '#inicio';
      } else {
        window.location.hash = '#' + id;
      }
    } else {
      e.preventDefault();
      window.location.hash = '#' + id; // Sincroniza el hash
      if (id === 'inicio') {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Sube hasta el tope
      } else {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 90; // Distancia para compensar el header flotante
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const styles = {
    footer: {
      backgroundColor: '#0B0F19',
      color: '#94A3B8',
      padding: '4rem 2rem 2.5rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.03)',
    } as React.CSSProperties,
    footerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
    } as React.CSSProperties,
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '3rem',
      marginBottom: '3rem',
    } as React.CSSProperties,
    footerTitle: {
      color: '#F8FAFC',
      fontSize: '1.08rem',
      fontWeight: 700,
      marginBottom: '1.25rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    } as React.CSSProperties,
    footerText: {
      lineHeight: 1.75,
      fontSize: '0.92rem',
      marginBottom: '0.85rem',
    } as React.CSSProperties,
    socialContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.85rem',
      marginTop: '1.25rem',
    } as React.CSSProperties,
    socialIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      color: '#94A3B8',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    } as React.CSSProperties,
    bottomBar: {
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      paddingTop: '2rem',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.85rem',
      color: '#64748B',
    } as React.CSSProperties,
  };

  return (
    <footer style={styles.footer}>
      <style>
        {`
          .footer-link { color: #94A3B8; text-decoration: none; display: block; margin-bottom: 0.65rem; transition: color 0.2s, transform 0.2s; font-size: 0.92rem; }
          .footer-link:hover { color: #3B82F6 !important; transform: translateX(2px); }
          .footer-social-icon:hover { background-color: #3B82F6 !important; color: #FFFFFF !important; transform: translateY(-3px); }
        `}
      </style>
      <div style={styles.footerContainer}>
        <div style={styles.footerGrid}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <img src="/Logo-PNG.png" alt="Logo Multiservicios" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#FFF', letterSpacing: '-0.01em', lineHeight: 1.2 }}>Multiservicios Integrales</h3>
                <p style={{ margin: 0, color: '#3B82F6', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.02em', textTransform: 'uppercase' }}>Tampico</p>
              </div>
            </div>
            <p style={{ ...styles.footerText, color: '#60A5FA', fontWeight: 600 }}>Climatización · Electricidad · Informática</p>
            <p style={styles.footerText}>
              <strong>Horario de atención:</strong><br />
              Lun - Vie: 08:00 - 18:00 | Sáb: 08:00 - 13:00
            </p>
            <div style={styles.socialContainer}>
              <a href="#facebook" className="footer-social-icon" style={styles.socialIcon} aria-label="Facebook"><FacebookIcon /></a>
              <a href="#instagram" className="footer-social-icon" style={styles.socialIcon} aria-label="Instagram"><InstagramIcon /></a>
              <a href="#whatsapp" className="footer-social-icon" style={styles.socialIcon} aria-label="WhatsApp"><WhatsAppIcon /></a>
            </div>
          </div>
          <div>
            <h3 style={styles.footerTitle}>Contacto</h3>
            <p style={styles.footerText}><strong>Dirección:</strong> Tampico, Madero, Altamira y alrededores (Tamaulipas), Villahermosa (Tabasco)</p>
            <p style={styles.footerText}><strong>Email:</strong> serv.integralestampico@outlook.com</p>
            <p style={styles.footerText}><strong>Tel:</strong> +52 833 310 2201<br /><strong>Tel:</strong> +52 833 147 4478</p>
          </div>
          <div>
            <h3 style={styles.footerTitle}>Enlaces</h3>
            <a href="#inicio" className="footer-link" onClick={(e) => handleNavClick(e, 'inicio')}>Inicio</a>
            <a href="#acerca" className="footer-link" onClick={(e) => handleNavClick(e, 'acerca')}>Acerca de</a>
            <a href="#servicios" className="footer-link" onClick={(e) => handleNavClick(e, 'servicios')}>Servicios</a>
            <a href="#proyectos" className="footer-link" onClick={(e) => handleNavClick(e, 'proyectos')}>Proyectos</a>
            <a href="#contacto" className="footer-link" onClick={(e) => handleNavClick(e, 'contacto')}>Contacto</a>
          </div>
        </div>
        <div style={styles.bottomBar}>
          <div>© {new Date().getFullYear()} Multiservicios Integrales Tampico</div>
          <div>
            <a href="#privacidad" className="footer-link" style={{ display: 'inline', marginRight: '1rem', fontSize: '0.8rem' }}>Privacidad</a>
            <span>·</span>
            <span style={{ marginLeft: '1rem' }}>Design by robertobautistamx</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
