import React, { useState, useEffect } from 'react';
import Header from './pages/header/header';
import Inicio from './pages/inicio/Inicio';
import About from './pages/about/about';
import Services from './pages/services/services';
import Projects from './pages/projects/projects';
import Contact from './pages/contact/contact';
import Footer from './components/footer/Footer';
import ServiceRefrigeracion from './pages/services/ServiceRefrigeracion';
import ServiceSistemas from './pages/services/ServiceSistemas';
import ServiceElectricidad from './pages/services/ServiceElectricidad';

function App() {
  const [hash, setHash] = useState(window.location.hash || '#inicio');

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash || '#inicio');
    };
    // Evento personalizado del header para navegación directa y confiable
    const handleMitNavigate = (e: Event) => {
      const id = (e as CustomEvent).detail;
      setHash('#' + id);
    };
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('mitNavigate', handleMitNavigate);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('mitNavigate', handleMitNavigate);
    };
  }, []);

  const isAboutFull = hash === '#acerca';
  const isServRefrig = hash === '#servicio-refrigeracion';
  const isServSistemas = hash === '#servicio-sistemas';
  const isServElec = hash === '#servicio-electricidad';
  const isFullPage = isAboutFull || isServRefrig || isServSistemas || isServElec;

  // Desplazamiento suave al cambiar de hash en la página principal
  useEffect(() => {
    if (isFullPage) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const currentHash = hash.replace('#', '');
    if (currentHash && currentHash !== 'inicio' && currentHash !== 'acerca') {
      const timer = setTimeout(() => {
        const element = document.getElementById(currentHash);
        if (element) {
          const headerOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 120);
      return () => clearTimeout(timer);
    } else if (currentHash === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, isFullPage]);

  const renderFullPage = () => {
    if (isAboutFull) return <About isFull={true} />;
    if (isServRefrig) return <ServiceRefrigeracion />;
    if (isServSistemas) return <ServiceSistemas />;
    if (isServElec) return <ServiceElectricidad />;
    return null;
  };

  return (
    <div className="App">
      <style>
        {`
          html {
            scroll-behavior: smooth;
          }
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          body {
            margin: 0;
            background-color: #f8f9fa;
            font-family: 'Inter', sans-serif;
          }

          /* --- Personalización de la barra de desplazamiento (Scrollbar) --- */
          ::-webkit-scrollbar {
            width: 12px; /* Grosor de la barra */
          }
          ::-webkit-scrollbar-track {
            background: #F8FAFC; /* Fondo del carril */
          }
          ::-webkit-scrollbar-thumb {
            background: #CBD5E1; /* Color de la barra inactiva */
            border-radius: 10px;
            border: 3px solid #F8FAFC; /* Crea un efecto de padding interior */
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #3B82F6; /* Azul corporativo al pasar el ratón */
          }

          /* Transición de entrada premium para las secciones */
          .section-fade {
            animation: fadeInSection 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes fadeInSection {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
      <Header />
      
      {isFullPage ? (
        <div key={hash} className="section-fade">
          {renderFullPage()}
        </div>
      ) : (
        <div key="main-page" className="section-fade">
          <Inicio />
          <About isFull={false} />
          <Services />
          <Projects />
          <Contact />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;

