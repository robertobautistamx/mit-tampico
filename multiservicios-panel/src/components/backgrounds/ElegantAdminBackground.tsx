import React, { useRef, useEffect } from "react";

// Fondo animado tipo "partículas conectadas" (network)
export const ElegantAdminBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);

    // Configuración de partículas
    const PARTICLE_COUNT = Math.floor((width * height) / 6000);
    const particles: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
      });
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Fondo gradiente
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#060e11");
      gradient.addColorStop(1, "#09103b");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Dibujar líneas entre partículas cercanas
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = `rgba(173,216,230,${1 - dist / 140})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Dibujar partículas
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "#00c3ff";
        ctx.shadowColor = "#00c3ff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    function animate() {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;
        if (particles[i].x < 0 || particles[i].x > width) particles[i].vx *= -1;
        if (particles[i].y < 0 || particles[i].y > height) particles[i].vy *= -1;
      }
      draw();
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        background: "#0f2027",
        transition: "background 0.5s",
      }}
    />
  );
};
