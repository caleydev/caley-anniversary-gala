import { useEffect, useRef } from "react";
import shield from "@/assets/caley-shield.webp";

export function FloatingLogo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 640;
    const size = isMobile ? 36 : 52;
    el.style.width = el.style.height = size + "px";

    let x = window.innerWidth * 0.82;
    let y = window.innerHeight * 0.7;
    const speed = isMobile ? 0.08 : 0.14;
    let vx = speed * (Math.random() > 0.5 ? 1 : -1);
    let vy = speed * 0.7 * (Math.random() > 0.5 ? 1 : -1);
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
        opacity: 0.28,
        background:
          "radial-gradient(circle at 30% 30%, rgba(255,245,210,0.18), rgba(10,20,50,0.35) 70%)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(214,168,79,0.32)",
        boxShadow:
          "0 0 18px -4px rgba(245,209,128,0.35), inset 0 0 14px rgba(245,209,128,0.18)",
      }}
      aria-hidden
    >
      <img
        src={shield}
        alt=""
        className="h-3/4 w-3/4 object-contain"
        style={{ filter: "drop-shadow(0 0 6px rgba(245,209,128,0.55))", opacity: 0.85 }}
      />
    </div>
  );
}
