import { useEffect, useRef } from "react";

interface Props {
  intensity?: number; // 0..1
}

interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; max: number; color: string; size: number;
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
    const colors = ["#f5d889", "#e8c46a", "#fff4cc", "#d6a84f", "#a87f29", "#6ab7ff"];

    const burst = (x: number, y: number) => {
      const count = isMobile ? 28 : 55;
      const color = colors[Math.floor(Math.random() * colors.length)];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
        const speed = 1 + Math.random() * 3.5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          max: 60 + Math.random() * 40,
          color,
          size: 1.2 + Math.random() * 1.6,
        });
      }
    };

    let raf = 0;
    let lastBurst = 0;
    const burstInterval = reduce ? 99999 : (isMobile ? 2600 : 1900) / Math.max(intensity, 0.15);

    const tick = (t: number) => {
      ctx.fillStyle = "rgba(10, 14, 30, 0.18)";
      ctx.fillRect(0, 0, w, h);

      if (t - lastBurst > burstInterval && Math.random() < 0.9) {
        burst(
          w * (0.15 + Math.random() * 0.7),
          h * (0.15 + Math.random() * 0.5)
        );
        lastBurst = t;
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.vx *= 0.99;
        const alpha = 1 - p.life / p.max;
        if (alpha <= 0) { particles.splice(i, 1); continue; }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        // soft trail
        ctx.globalAlpha = alpha * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
        ctx.fill();
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
