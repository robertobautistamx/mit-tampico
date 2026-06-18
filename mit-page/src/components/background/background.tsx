import React from 'react';

// Generamos las partículas fuera del componente para que se calculen una sola vez
// y se mantengan estables y fluidas aunque React vuelva a renderizar la pantalla.
const particles = Array.from({ length: 40 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  animationDuration: `${Math.random() * 20 + 15}s`, // Movimiento muy lento y elegante (15s a 35s)
  animationDelay: `${Math.random() * 15}s`,
  size: `${Math.random() * 4 + 1}px`, // Tamaños sutiles entre 1px y 5px
  opacity: Math.random() * 0.4 + 0.1, // Transparencia suave para no saturar
}));

const Background: React.FC = () => {
  const styles = {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
    } as React.CSSProperties,
    image: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url("https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop")', // Imagen industrial profesional
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed', // Efecto parallax sutil
      zIndex: 1,
    } as React.CSSProperties,
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.70) 100%)', // Capa oscura corporativa para legibilidad
      zIndex: 2,
    } as React.CSSProperties,
    particlesContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 3, // Por encima del overlay oscuro, pero por debajo del contenido principal
      pointerEvents: 'none', // Asegura que las partículas no bloqueen los clics en los botones
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      <div style={styles.image}></div>
      <div style={styles.overlay}></div>
      
      {/* Sistema de partículas CSS */}
      <div style={styles.particlesContainer}>
        <style>
          {`
            @keyframes floatUp {
              0% { transform: translateY(100vh) translateX(0); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateY(-10vh) translateX(30px); opacity: 0; }
            }
            .mit-particle {
              position: absolute;
              bottom: -10px;
              background: #F8FAFC; /* Color claro para contrastar con el fondo oscuro */
              border-radius: 50%;
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.4); /* Resplandor sutil */
              animation: floatUp linear infinite;
            }
          `}
        </style>
        {particles.map((p) => (
          <div
            key={p.id}
            className="mit-particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animationDuration: p.animationDuration,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Background;