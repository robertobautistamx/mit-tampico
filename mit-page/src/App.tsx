import React from 'react';
import Header from './pages/header';
import Inicio from './pages/Inicio';
import About from './pages/about';
import Services from './pages/services';
import Projects from './pages/projects';
import Contact from './pages/contact';

function App() {
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
        `}
      </style>
      <Header />
      <Inicio />
      <About />
      <Services />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
