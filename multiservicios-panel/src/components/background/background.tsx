import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/material/styles';

// ─── keyframes ────────────────────────────────────────────────────────────────

const mistDrift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) scale(1);           opacity: 0.8; }
  50%       { transform: translate3d(40px, -30px, 0) scale(1.1);  opacity: 1;   }
`;

const vignetteBreath = keyframes`
  0%, 100% { opacity: 1;    }
  50%       { opacity: 0.75; }
`;

// ─── particle colours ─────────────────────────────────────────────────────────

const COLORS: [number, number, number][] = [
  [99,  102, 241], // indigo-500
  [56,  189, 248], // sky-400
  [168,  85, 247], // purple-500
  [148, 163, 184], // slate-400
  [34,  211, 238], // cyan-400
  [167, 139, 250], // violet-400
];

// ─── types ────────────────────────────────────────────────────────────────────

interface Particle {
  /** logical pixels */
  x: number; y: number;
  /** logical-pixel radius (NOT scaled by dpr — canvas is pre-scaled) */
  r: number;
  /** logical-pixel velocity per frame */
  dx: number; dy: number;
  col: [number, number, number];
  baseOp: number;
  phase: number;
  speed: number;
}

interface Scene {
  particles: Particle[];
  /** logical dimensions (CSS pixels) */
  W: number;
  H: number;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

/**
 * All coordinates/sizes are in LOGICAL pixels.
 * The canvas context is pre-scaled by dpr, so we never multiply by dpr
 * in draw calls — only in canvas.width / canvas.height.
 */
function buildScene(W: number, H: number): Scene {
  const area = W * H;
  const base = 65;
  const scale = Math.sqrt(area / (1920 * 1080));
  const count = Math.min(180, Math.max(base, Math.round(base * scale)));

  const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
    x:      Math.random() * W,
    y:      Math.random() * H,
    // radius 0.8–2.3 logical px — crisp at any DPR
    r:      0.8 + Math.random() * 1.5,
    // velocity in logical px/frame — independent of DPR
    dx:     (Math.random() - 0.5) * 0.35,
    dy:     (Math.random() - 0.5) * 0.35,
    col:    COLORS[i % COLORS.length],
    baseOp: 0.15 + Math.random() * 0.4,
    phase:  Math.random() * Math.PI * 2,
    speed:  0.005 + Math.random() * 0.008,
  }));

  return { particles, W, H };
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  scene: Scene,
  t: number,
  mouse: { x: number; y: number; active: boolean },
) {
  const { particles, W, H } = scene;
  ctx.clearRect(0, 0, W, H);

  // All distances in logical pixels
  const MOUSE_REPEL  = 150;
  const PLEXUS_DIST  = 120;
  const MOUSE_LINE   = 180;

  // ── draw & move particles ──────────────────────────────────────────────────
  for (const p of particles) {
    const pulse = Math.sin(t * p.speed * 60 + p.phase);
    const op    = p.baseOp * (0.7 + 0.3 * pulse);
    const r     = p.r * (1 + 0.18 * pulse);
    const [R, G, B] = p.col;

    // halo glow
    const haloR = r * 5;
    const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloR);
    grd.addColorStop(0,   `rgba(${R},${G},${B},${(op * 0.45).toFixed(3)})`);
    grd.addColorStop(0.4, `rgba(${R},${G},${B},${(op * 0.18).toFixed(3)})`);
    grd.addColorStop(1,   `rgba(${R},${G},${B},0)`);
    ctx.beginPath();
    ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
    ctx.fillStyle = grd;
    ctx.fill();

    // solid core
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${R},${G},${B},${Math.min(op * 1.6, 0.95).toFixed(3)})`;
    ctx.fill();

    // specular highlight
    ctx.beginPath();
    ctx.arc(p.x, p.y, r * 0.38, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${(op * 0.28).toFixed(3)})`;
    ctx.fill();

    // mouse repulsion
    if (mouse.active) {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_REPEL && dist > 0) {
        const force = (1 - dist / MOUSE_REPEL) * 0.9;
        p.x += (dx / dist) * force * 2;
        p.y += (dy / dist) * force * 2;
      }
    }

    // drift & wrap
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < -50)  p.x = W + 50;
    if (p.x > W+50) p.x = -50;
    if (p.y < -50)  p.y = H + 50;
    if (p.y > H+50) p.y = -50;
  }

  // ── plexus connections ────────────────────────────────────────────────────
  for (let i = 0; i < particles.length; i++) {
    const p1 = particles[i];

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < PLEXUS_DIST * PLEXUS_DIST) {
        const dist = Math.sqrt(dist2);
        ctx.beginPath();
        ctx.strokeStyle = `rgba(148,163,184,${((1 - dist / PLEXUS_DIST) * 0.2).toFixed(3)})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    // mouse lines
    if (mouse.active) {
      const dx = p1.x - mouse.x;
      const dy = p1.y - mouse.y;
      const dist2 = dx * dx + dy * dy;
      if (dist2 < MOUSE_LINE * MOUSE_LINE) {
        const dist = Math.sqrt(dist2);
        const [R, G, B] = p1.col;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${R},${G},${B},${((1 - dist / MOUSE_LINE) * 0.35).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

// ─── ParticleCanvas ───────────────────────────────────────────────────────────

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse     = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf: number;
    let scene: Scene | null = null;
    let ctx: CanvasRenderingContext2D | null = null;

    /**
     * (Re)initialise canvas size and particle scene.
     * Called on mount and whenever the container resizes.
     */
    function init() {
      const parent = canvas!.parentElement ?? document.documentElement;
      const dpr    = Math.min(window.devicePixelRatio ?? 1, 3); // cap at 3× for perf
      const W      = parent.offsetWidth  || window.innerWidth;
      const H      = parent.offsetHeight || window.innerHeight;

      // Physical pixels
      canvas!.width  = W * dpr;
      canvas!.height = H * dpr;

      // CSS pixels (critical — keeps layout correct)
      canvas!.style.width  = `${W}px`;
      canvas!.style.height = `${H}px`;

      ctx = canvas!.getContext('2d');
      if (!ctx) return;

      // Scale ONCE — all subsequent draw calls use logical coords
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      scene = buildScene(W, H);
    }

    init();

    // ── animation loop ────────────────────────────────────────────────────────
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt  = Math.min((now - lastTime) / 16.67, 3); // normalise to 60 fps
      lastTime  = now;
      const t   = now * 0.001; // seconds

      if (ctx && scene) {
        // Apply dt-based drift so speed is fps-independent
        for (const p of scene.particles) {
          p.x += p.dx * (dt - 1);
          p.y += p.dy * (dt - 1);
        }
        drawFrame(ctx, scene, t, mouse.current);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ── resize observer ───────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      init();
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    // ── mouse handlers ────────────────────────────────────────────────────────
    // Use canvas.getBoundingClientRect() so coords survive scrolling/transform
    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.current = {
        x:      e.clientX - rect.left,
        y:      e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => { mouse.current.active = false; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout',  onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout',  onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, display: 'block' }}
    />
  );
};

// ─── mist blobs ───────────────────────────────────────────────────────────────

interface Mist {
  top?: string; bottom?: string;
  left?: string; right?: string;
  width: string; height: string;
  bg: string;
  blur: number;
  duration: string;
  reverse?: boolean;
  delay?: string;
}

const MISTS: Mist[] = [
  {
    top: '-10%', left: '-10%', width: '60%', height: '60%',
    bg: 'radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 60%)',
    blur: 80, duration: '25s',
  },
  {
    bottom: '-15%', right: '-10%', width: '70%', height: '70%',
    bg: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)',
    blur: 90, duration: '30s', reverse: true,
  },
  {
    top: '20%', left: '30%', width: '50%', height: '50%',
    bg: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 60%)',
    blur: 70, duration: '20s', delay: '3s',
  },
  {
    bottom: '10%', left: '10%', width: '45%', height: '45%',
    bg: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 60%)',
    blur: 65, duration: '22s', reverse: true, delay: '2s',
  },
];

// ─── Background ───────────────────────────────────────────────────────────────

const Background: React.FC = () => (
  <Box
    aria-hidden="true"
    sx={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      background: 'linear-gradient(135deg, #09090b 0%, #020617 40%, #0f172a 100%)',
    }}
  >
    {/* mist blobs */}
    {MISTS.map((m, i) => (
      <Box
        key={i}
        sx={{
          position: 'absolute',
          top: m.top, bottom: m.bottom,
          left: m.left, right: m.right,
          width: m.width, height: m.height,
          borderRadius: '50%',
          background: m.bg,
          filter: `blur(${m.blur}px)`,
          animation: `${mistDrift} ${m.duration} ease-in-out infinite${m.reverse ? ' reverse' : ''}`,
          animationDelay: m.delay ?? '0s',
        }}
      />
    ))}

    {/* particle canvas */}
    <ParticleCanvas />

    {/* vignette */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(2,6,23,0.7) 70%, rgba(2,6,23,0.95) 100%)',
        animation: `${vignetteBreath} 25s ease-in-out infinite`,
      }}
    />
  </Box>
);

export default Background;