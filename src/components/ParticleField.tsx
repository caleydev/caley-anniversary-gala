import { useMemo } from "react";

export function ParticleField({ count = 40 }: { count?: number }) {
  const particles = useMemo(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const n = isMobile ? Math.round(count * 0.5) : count;
    return Array.from({ length: n }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 12,
      duration: 14 + Math.random() * 18,
      size: 1 + Math.random() * 2.5,
      gold: Math.random() > 0.55,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="float-particle absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            background: p.gold ? "#f5d889" : "#6ab7ff",
            boxShadow: p.gold
              ? "0 0 8px #f5d889, 0 0 16px #e8c46a"
              : "0 0 8px #6ab7ff, 0 0 16px #3b8fe6",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
