import React, { useEffect, useRef, useState } from 'react';
import { useImageGallery } from '../../modules/images/images';

// --- Canvas Particle System ---
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = [
  'rgba(6, 182, 212,',    // Cian (Refrigeración)
  'rgba(139, 92, 246,',   // Violeta (Sistemas Informáticos)
  'rgba(245, 158, 11,',   // Ámbar (Electricidad)
  'rgba(59, 130, 246,',   // Azul MIT
  'rgba(255, 255, 255,',  // Blanco
];

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COUNT = 50;
    const MAX_DIST = 110; // distancia máxima para trazar línea entre partículas

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Inicializar partículas
    particles.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.2 + 0.07,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.015 + 0.006,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = particles.current;

      // Dibujar líneas de conexión entre partículas cercanas
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const lineAlpha = (1 - dist / MAX_DIST) * 0.07;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(148, 193, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        }
      }

      // Dibujar partículas
      for (const p of pts) {
        p.pulse += p.pulseSpeed;
        const glow = Math.sin(p.pulse) * 0.15 + p.alpha;

        // Halo/glow muy sutil
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `${p.color}${glow * 0.5})`);
        gradient.addColorStop(1, `${p.color}0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Núcleo de la partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.min(glow + 0.1, 0.6)})`;
        ctx.fill();

        // Mover
        p.x += p.vx;
        p.y += p.vy;

        // Rebotar en bordes
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 3,
        pointerEvents: 'none',
      }}
    />
  );
};

// --- Background Component ---
const Background: React.FC = () => {
  const { images } = useImageGallery();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filtramos imágenes válidas de la base de datos
  const validImages = images.filter((img) => !!img.image_url);

  useEffect(() => {
    if (validImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
    }, 6000); // Cambia de imagen cada 6 segundos
    return () => clearInterval(interval);
  }, [validImages]);

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
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      zIndex: 1,
    } as React.CSSProperties,
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(9, 13, 22, 0.96) 0%, rgba(9, 13, 22, 0.80) 100%)', // Gradiente más oscuro a juego con la marca
      zIndex: 2,
    } as React.CSSProperties,
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop';

  return (
    <div style={styles.container}>
      {/* Si no hay imágenes en la base de datos, mostramos la de fallback */}
      {validImages.length === 0 ? (
        <div style={{ ...styles.image, backgroundImage: `url("${fallbackImage}")` }} />
      ) : (
        validImages.map((img, index) => (
          <div
            key={img.id}
            style={{
              ...styles.image,
              backgroundImage: `url("${getImageUrl(img.image_url)}")`,
              opacity: index === currentImageIndex ? 1 : 0,
              transition: 'opacity 1.8s ease-in-out', // Suave fundido de entrada y salida
            }}
          />
        ))
      )}
      
      <div style={styles.overlay} />
      {/* Canvas con partículas interconectadas tipo tech */}
      <ParticleCanvas />
    </div>
  );
};

export default Background;