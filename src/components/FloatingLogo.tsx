import { useEffect, useRef } from "react";
import shield from "@/assets/caley-shield.webp";

export function FloatingLogo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 640;
    const size = isMobile ? 56 : 84;
    el.style.width = el.style.height = size + "px";

    let x = window.innerWidth * 0.7;
    let y = window.innerHeight * 0.6;
    let vx = (isMobile ? 0.4 : 0.7) * (Math.random() > 0.5 ? 1 : -1);
    let vy = (isMobile ? 0.35 : 0.55) * (Math.random() > 0.5 ? 1 : -1);
    let raf = 0;

    const tick = () => {
      const w = window.innerWidth - size;
      const h = window.innerHeight - size;
      x += vx;
      y += vy;
      if (x <= 0 || x >= w) { vx = -vx; x = Math.max(0, Math.min(w, x)); }
      if (y <= 0 || y >= h) { vy = -vy; y = Math.max(0, Math.min(h, y)); }
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(tick);
    };

    if (!reduce) raf = requestAnimationFrame(tick);
    else el.style.transform = `translate(${x}px, ${y}px)`;

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-40 flex items-center justify-center rounded-full glass gold-border"
      style={{ opacity: 0.78 }}
      aria-hidden
    >
      <img src={shield} alt="" className="h-3/4 w-3/4 object-contain drop-shadow-[0_0_12px_rgba(245,216,137,0.5)]" />
      <span className="pointer-events-none absolute -inset-2 rounded-full" style={{
        background: "radial-gradient(circle, rgba(245,216,137,0.25), transparent 70%)",
      }} />
    </div>
  );
}
