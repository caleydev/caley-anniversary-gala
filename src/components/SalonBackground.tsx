import shield from "@/assets/caley-shield.webp";

/**
 * Luxury grand salon atmosphere: deep navy walls, warm chandelier bokeh,
 * blue & gold balloon clusters, soft Caley logo watermark projections,
 * gold light beams and reflective floor. Pure CSS — no people, no faces.
 */
export function SalonBackground({ intensity = 1 }: { intensity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Deep salon base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 110%, rgba(0,87,184,0.35) 0%, transparent 65%), radial-gradient(ellipse 70% 50% at 50% -10%, rgba(214,168,79,0.22) 0%, transparent 65%), linear-gradient(180deg, #02060f 0%, #04102a 45%, #020816 100%)",
        }}
      />

      {/* Warm chandelier glow */}
      <div
        className="absolute left-1/2 top-0 h-[55vh] w-[80vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(255,225,160,0.45), transparent 70%)",
          filter: "blur(40px)",
          opacity: 0.55 * intensity,
        }}
      />

      {/* Gold light beams */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "conic-gradient(from 200deg at 50% -10%, transparent 0deg, rgba(245,199,107,0.10) 18deg, transparent 36deg, transparent 320deg, rgba(0,166,255,0.10) 340deg, transparent 360deg)",
          opacity: 0.7 * intensity,
        }}
      />

      {/* Left balloon cluster (blue + gold) */}
      <BalloonCluster className="absolute -left-10 top-[10%] sm:left-2" />
      {/* Right balloon cluster */}
      <BalloonCluster className="absolute -right-10 top-[18%] sm:right-2" mirrored />

      {/* Bottom corner balloon arches */}
      <BalloonCluster className="absolute -left-6 bottom-[8%] scale-90 opacity-80" />
      <BalloonCluster className="absolute -right-6 bottom-[12%] scale-90 opacity-80" mirrored />

      {/* Chandelier bokeh dots */}
      {Array.from({ length: 18 }).map((_, i) => {
        const top = (i * 53) % 80;
        const left = (i * 37) % 100;
        const size = 6 + ((i * 11) % 22);
        const gold = i % 2 === 0;
        return (
          <div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              background: gold ? "rgba(245,199,107,0.55)" : "rgba(0,166,255,0.5)",
              opacity: 0.45 * intensity,
            }}
          />
        );
      })}

      {/* Caley logo watermark projections */}
      <img
        src={shield}
        alt=""
        className="absolute left-[6%] top-[34%] h-24 w-24 sm:h-36 sm:w-36"
        style={{ opacity: 0.05, filter: "blur(0.5px) drop-shadow(0 0 24px rgba(245,199,107,0.4))" }}
      />
      <img
        src={shield}
        alt=""
        className="absolute right-[7%] top-[55%] h-20 w-20 sm:h-32 sm:w-32"
        style={{ opacity: 0.05, filter: "blur(0.5px) drop-shadow(0 0 24px rgba(0,166,255,0.4))" }}
      />
      <img
        src={shield}
        alt=""
        className="absolute left-1/2 top-[8%] h-16 w-16 -translate-x-1/2 sm:h-24 sm:w-24"
        style={{ opacity: 0.04, filter: "blur(0.3px)" }}
      />

      {/* Reflective polished floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40vh]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,87,184,0.25) 45%, rgba(0,166,255,0.18) 80%, rgba(245,199,107,0.12) 100%)",
          maskImage: "linear-gradient(to bottom, transparent, black 35%)",
        }}
      />
      {/* Floor reflection highlight */}
      <div
        className="absolute inset-x-0 bottom-0 h-[18vh] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255,225,160,0.18), transparent 70%)",
        }}
      />

      {/* Dark glass blur overlay at edges for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(2,6,15,0.55) 90%)",
        }}
      />

      {/* Subtle noise grain */}
      <div
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

function BalloonCluster({ className = "", mirrored = false }: { className?: string; mirrored?: boolean }) {
  // Cluster of soft circular shapes that read as balloons in blue & gold
  const balloons = [
    { x: 0, y: 0, size: 70, color: "rgba(0,120,220,0.55)", glow: "rgba(0,166,255,0.5)" },
    { x: 50, y: -20, size: 60, color: "rgba(245,199,107,0.55)", glow: "rgba(245,199,107,0.55)" },
    { x: 30, y: 50, size: 80, color: "rgba(0,87,184,0.6)", glow: "rgba(0,166,255,0.5)" },
    { x: 90, y: 30, size: 55, color: "rgba(255,225,160,0.5)", glow: "rgba(245,199,107,0.5)" },
    { x: 70, y: 90, size: 65, color: "rgba(0,120,220,0.5)", glow: "rgba(0,166,255,0.4)" },
    { x: 10, y: 110, size: 50, color: "rgba(214,168,79,0.5)", glow: "rgba(245,199,107,0.45)" },
  ];
  return (
    <div
      className={className}
      style={{
        width: 200,
        height: 280,
        transform: mirrored ? "scaleX(-1)" : undefined,
        opacity: 0.85,
      }}
    >
      {balloons.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size * 1.18,
            background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.45), ${b.color} 55%, rgba(0,0,0,0.4) 100%)`,
            boxShadow: `0 0 40px ${b.glow}, inset -8px -10px 20px rgba(0,0,0,0.35)`,
            filter: "blur(0.4px)",
          }}
        >
          {/* String */}
          <div
            className="absolute left-1/2 top-full h-16 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, rgba(245,199,107,0.5), transparent)" }}
          />
        </div>
      ))}
    </div>
  );
}
