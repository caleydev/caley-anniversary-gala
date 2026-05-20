import { useEffect, useRef } from "react";
import shield from "@/assets/caley-shield.webp";

export function FloatingLogo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 640;
    const size = isMobile ? 44 : 64;
    el.style.width = el.style.height = size + "px";

    let x = window.innerWidth * 0.78;
    let y = window.innerHeight * 0.65;
    const speed = isMobile ? 0.15 : 0.28;
    let vx = speed * (Math.random() > 0.5 ? 1 : -1);
    let vy = speed * 0.8 * (Math.random() > 0.5 ? 1 : -1);
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
      className="pointer-events-none fixed left-0 top-0 z-40 flex items-center justify-center rounded-full"
      style={{
        opacity: 0.45,
        background: "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(214,168,79,0.4)",
        boxShadow:
          "0 0 24px -6px rgba(0,166,255,0.5), 0 0 32px -8px rgba(214,168,79,0.35)",
      }}
      aria-hidden
    >
      <img
        src={shield}
        alt=""
        className="h-3/4 w-3/4 object-contain drop-shadow-[0_0_8px_rgba(245,199,107,0.5)]"
      />
    </div>
  );
}
