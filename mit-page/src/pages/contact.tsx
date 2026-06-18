import React from 'react';
import Button from '../components/buttons/Button';
import Input from '../Input';
import Textarea from '../Textarea';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from '../components/header/header.icons';

const Contact: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 90;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const styles = {
    section: {
      padding: '6rem 2rem',
      background: 'linear-gradient(135deg, #1E3A8A 0%, #172554 100%)', // Gradiente azul profundo
    } as React.CSSProperties,
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF',
      borderRadius: '12px',
      padding: '3rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
    } as React.CSSProperties,
    headerContainer: {
      textAlign: 'center',
      marginBottom: '3rem',
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
      marginBottom: '1rem',
    } as React.CSSProperties,
    title: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      fontWeight: 800,
      lineHeight: 1.2,
      color: '#0F172A',
      margin: 0,
    } as React.CSSProperties,
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    } as React.CSSProperties,
    
    // FOOTER STYLES
    footer: {
      backgroundColor: '#0F172A',
      color: '#94A3B8',
      padding: '5rem 2rem 2rem',
    } as React.CSSProperties,
    footerContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
    } as React.CSSProperties,
    footerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '3rem',
      marginBottom: '4rem',
    } as React.CSSProperties,
    footerTitle: {
      color: '#F8FAFC',
      fontSize: '1.2rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
    } as React.CSSProperties,
    footerText: {
      lineHeight: 1.8,
      fontSize: '0.95rem',
      marginBottom: '1rem',
    } as React.CSSProperties,
    socialContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginTop: '1.5rem',
    } as React.CSSProperties,
    socialIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#F8FAFC',
      textDecoration: 'none',
      transition: 'all 0.3s ease',
    } as React.CSSProperties,
    bottomBar: {
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      paddingTop: '2rem',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.85rem',
    } as React.CSSProperties,
  };

  return (
    <>
      <section id="contacto" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.headerContainer}>
            <span style={styles.badge}>Contacto</span>
            <h2 style={styles.title}>Recibe información de nosotros</h2>
          </div>
          
          <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
            <Input label="Nombre" type="text" placeholder="Tu nombre completo" />
            <Input label="Correo" type="email" placeholder="tu@correo.com" />
            <Input label="Asunto" type="text" placeholder="¿En qué podemos ayudarte?" />
            <Textarea label="Mensaje" placeholder="Escribe tu mensaje aquí..." />
            <Button variant="primary" customStyles={{ marginTop: '1rem', width: '100%' }}>Enviar Mensaje</Button>
          </form>
        </div>
      </section>

      <footer style={styles.footer}>
        <style>
          {`
            .footer-link { color: #94A3B8; text-decoration: none; display: block; margin-bottom: 0.8rem; transition: color 0.2s; }
            .footer-link:hover { color: #3B82F6 !important; }
            .footer-social-icon:hover { background-color: #3B82F6 !important; transform: translateY(-3px); }
          `}
        </style>
        <div style={styles.footerContainer}>
          <div style={styles.footerGrid}>
            <div>
              <img src="/logo.png" alt="Logo Multiservicios" style={{ height: '40px', marginBottom: '1rem' }} />
              <h3 style={{...styles.footerTitle, margin: '0 0 0.5rem 0', color: '#FFF'}}>Multiservicios Integrales</h3>
              <p style={{...styles.footerText, color: '#3B82F6', fontWeight: 600}}>Climatización · Electricidad · Informática</p>
              <p style={styles.footerText}><strong>Horario de atención:</strong><br/>Lun - Vie: 08:00 - 18:00<br/>Sáb: 08:00 - 13:00</p>
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
              <p style={styles.footerText}><strong>Tel:</strong> +52 833 310 2201<br/><strong>Tel:</strong> +52 833 147 4478</p>
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
            <div><a href="#privacidad" className="footer-link" style={{ display: 'inline', marginRight: '1rem' }}>Privacidad</a><span>·</span><span style={{ marginLeft: '1rem' }}>Design by robertobautistamx</span></div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;