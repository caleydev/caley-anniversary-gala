import { useEffect, useRef } from "react";

interface Props {
  intensity?: number; // 0..1
}

interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; color: string; size: number;
  trail?: boolean; flicker?: number;
}

export function FireworksBackground({ intensity = 0.5 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 640;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    // Cohesive luxury palette: warm gold family + subtle blue accent
    const palettes = [
      ["#fff4cc", "#f5d889", "#e8c46a", "#d6a84f"], // gold
      ["#fff4cc", "#ffd98a", "#e8b65a", "#a87f29"], // amber gold
      ["#ffe8b8", "#f5c76b", "#d6a84f", "#8a6824"], // deep gold
      ["#e8f1ff", "#bcd9ff", "#6ab7ff", "#3a8fdc"], // soft blue (rare)
    ];

    const pickColors = () => {
      // 80% gold, 20% blue accent
      const r = Math.random();
      if (r < 0.2) return palettes[3];
      return palettes[Math.floor(Math.random() * 3)];
    };

    // Rising rocket trail before burst
    const rocket = (tx: number, ty: number, onArrive: (x: number, y: number) => void) => {
      const startY = h + 10;
      const startX = tx + (Math.random() - 0.5) * 40;
      const steps = 32;
      let i = 0;
      const trailColors = pickColors();
      const stepFn = () => {
        const t = i / steps;
        const x = startX + (tx - startX) * t;
        const y = startY + (ty - startY) * t;
        particles.push({
          x, y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.2,
          life: 0, max: 18 + Math.random() * 10,
          color: trailColors[0],
          size: 1.1 + Math.random() * 0.6,
          trail: true,
        });
        i++;
        if (i < steps) {
          setTimeout(stepFn, 14);
        } else {
          onArrive(tx, ty);
        }
      };
      stepFn();
    };

    const burst = (x: number, y: number, scale = 1) => {
      const colors = pickColors();
      const count = Math.floor((isMobile ? 36 : 70) * scale);
      const baseSpeed = 1.4 + Math.random() * 1.4;
      // Two-layer burst for realism: outer ring + inner softer ring
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.18;
        const speed = baseSpeed * (0.7 + Math.random() * 1.4);
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          max: 70 + Math.random() * 55,
          color,
          size: 1.2 + Math.random() * 1.4,
          flicker: Math.random() * Math.PI * 2,
        });
      }
      // Inner soft core
      for (let i = 0; i < count * 0.4; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = baseSpeed * (0.2 + Math.random() * 0.5);
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          max: 40 + Math.random() * 30,
          color: colors[0],
          size: 0.9 + Math.random() * 1.0,
          flicker: Math.random() * Math.PI * 2,
        });
      }
    };

    const launch = () => {
      const x = w * (0.1 + Math.random() * 0.8);
      const y = h * (0.12 + Math.random() * 0.45);
      const scale = 0.7 + Math.random() * 0.7;
      // Half the time skip rocket for variety
      if (Math.random() < 0.45) {
        burst(x, y, scale);
      } else {
        rocket(x, y, (bx, by) => burst(bx, by, scale));
      }
      // Occasional twin burst
      if (Math.random() < 0.28) {
        setTimeout(() => {
          burst(
            x + (Math.random() - 0.5) * 220,
            y + (Math.random() - 0.5) * 120,
            scale * 0.75
          );
        }, 220 + Math.random() * 380);
      }
    };

    let raf = 0;
    let lastBurst = 0;
    // Significantly more frequent
    const intensityClamped = Math.max(intensity, 0.15);
    const burstInterval = reduce ? 99999 : (isMobile ? 1200 : 850) / intensityClamped;

    const tick = (t: number) => {
      // Slightly stronger fade for cleaner sky
      ctx.fillStyle = "rgba(10, 14, 30, 0.22)";
      ctx.fillRect(0, 0, w, h);

      if (t - lastBurst > burstInterval) {
        launch();
        lastBurst = t;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        // Gravity + air drag for realism
        p.vy += p.trail ? 0.01 : 0.045;
        p.vx *= 0.985;
        p.vy *= 0.992;

        const lifeRatio = p.life / p.max;
        let alpha = Math.pow(1 - lifeRatio, 1.4);
        if (p.flicker !== undefined) {
          alpha *= 0.75 + 0.25 * Math.sin(p.life * 0.4 + p.flicker);
        }
        if (alpha <= 0.02) { particles.splice(i, 1); continue; }

        // Soft outer glow
        ctx.globalAlpha = alpha * 0.35;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Bright center for sparkle
        if (!p.trail && lifeRatio < 0.4) {
          ctx.globalAlpha = alpha;
          ctx.fillStyle = "#fff8e0";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = p.color;
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
      aria-hidden
    />
  );
}
