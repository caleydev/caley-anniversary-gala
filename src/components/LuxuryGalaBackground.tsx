import { useMemo } from "react";

/**
 * Luxury gala invitation background — midnight navy with gold glitter,
 * elegant stars, soft champagne bokeh, distant sparkle, and subtle
 * balloon clusters near the edges. No decorative ribbons or plants.
 */
export function LuxuryGalaBackground() {
  // Stable randomized sparkles per mount
  const sparkles = useMemo(() => {
    return Array.from({ length: 130 }).map((_, i) => {
      const seed = i * 9301 + 49297;
      const r = (n: number) => (Math.sin(seed * n) + 1) / 2;
      return {
        top: r(1.1) * 100,
        left: r(2.3) * 100,
        size: 1 + r(3.7) * 2.2,
        opacity: 0.3 + r(4.9) * 0.7,
        delay: r(5.1) * 4,
      };
    });
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => {
      const seed = i * 1213 + 7;
      const r = (n: number) => (Math.sin(seed * n) + 1) / 2;
      return {
        top: r(1.7) * 100,
        left: r(2.9) * 100,
        size: 6 + r(3.3) * 10,
        delay: r(4.1) * 5,
        dur: 3 + r(5.7) * 3,
      };
    });
  }, []);

  const bokeh = useMemo(
    () => [
      { top: 6, left: 8, size: 90, c: "rgba(245,209,128,0.18)" },
      { top: 14, left: 22, size: 140, c: "rgba(245,209,128,0.10)" },
      { top: 4, left: 60, size: 70, c: "rgba(255,225,160,0.16)" },
      { top: 22, left: 78, size: 110, c: "rgba(214,168,79,0.12)" },
      { top: 38, left: 6, size: 160, c: "rgba(245,209,128,0.14)" },
      { top: 55, left: 88, size: 130, c: "rgba(214,168,79,0.10)" },
      { top: 70, left: 12, size: 100, c: "rgba(245,209,128,0.10)" },
      { top: 80, left: 70, size: 150, c: "rgba(214,168,79,0.08)" },
      { top: 32, left: 48, size: 60, c: "rgba(120,170,255,0.10)" },
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Midnight navy base with subtle radial fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 35%, #0a1e3a 0%, #061534 35%, #03102a 65%, #010614 100%)",
        }}
      />

      {/* Warm champagne haze in upper portion */}
      <div
        className="absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "radial-gradient(ellipse 75% 80% at 50% 0%, rgba(245,209,128,0.18) 0%, rgba(214,168,79,0.07) 30%, transparent 65%)",
        }}
      />

      {/* Soft gold/blue bokeh discs */}
      {bokeh.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`,
            filter: "blur(8px)",
          }}
        />
      ))}

      {/* Subtle balloon clusters near edges */}
      <BalloonCluster className="absolute -left-6 top-[18%] opacity-60" />
      <BalloonCluster className="absolute -right-4 bottom-[14%] opacity-55" mirror />

      {/* Elegant 4-point stars scattered */}
      {stars.map((s, i) => (
        <Star
          key={i}
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `starTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Dense gold glitter sparkles */}
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: i % 7 === 0 ? "#fff5d0" : i % 3 === 0 ? "#f5d889" : "#d6a84f",
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2}px rgba(245,209,128,0.7)`,
            animation: `gtwinkle ${2.6 + (i % 5) * 0.4}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Fine noise grain */}
      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <style>{`
        @keyframes gtwinkle {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.9) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.15) rotate(45deg); }
        }
        @keyframes balloonFloat {
          0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); }
          50% { transform: translateY(-10px) rotate(calc(var(--rot, 0deg) + 1deg)); }
        }
      `}</style>
    </div>
  );
}

function Star({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="absolute"
      style={style}
      aria-hidden
    >
      <defs>
        <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff5d0" />
          <stop offset="60%" stopColor="#f5d889" />
          <stop offset="100%" stopColor="rgba(214,168,79,0)" />
        </radialGradient>
      </defs>
      <path
        d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z"
        fill="url(#starGrad)"
      />
    </svg>
  );
}

function BalloonCluster({
  className = "",
  mirror = false,
}: {
  className?: string;
  mirror?: boolean;
}) {
  const balloons = [
    { x: 10, y: 0, c1: "#1a3a6e", c2: "#0a1e3a", size: 38, rot: -4 },
    { x: 46, y: 18, c1: "#e8c46a", c2: "#a87f29", size: 46, rot: 3 },
    { x: 78, y: 4, c1: "#d6a84f", c2: "#6b4d10", size: 34, rot: -2 },
    { x: 26, y: 64, c1: "#2a4a8a", c2: "#0a1e3a", size: 30, rot: 4 },
    { x: 62, y: 78, c1: "#f5d889", c2: "#a87f29", size: 28, rot: -3 },
  ];
  return (
    <div
      className={className}
      style={{
        width: 160,
        height: 240,
        transform: mirror ? "scaleX(-1)" : undefined,
        filter: "blur(0.4px)",
      }}
    >
      {balloons.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={
            {
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.size,
              height: b.size * 1.18,
              "--rot": `${b.rot}deg`,
              animation: `balloonFloat ${5 + (i % 3)}s ease-in-out ${i * 0.4}s infinite`,
            } as React.CSSProperties
          }
        >
          <div
            className="h-full w-full rounded-[50%]"
            style={{
              background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.45) 0%, ${b.c1} 35%, ${b.c2} 100%)`,
              boxShadow:
                "inset 0 -6px 10px rgba(0,0,0,0.35), 0 6px 18px rgba(0,0,0,0.45)",
            }}
          />
          {/* tie */}
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: "100%",
              width: 0,
              height: 0,
              borderLeft: "3px solid transparent",
              borderRight: "3px solid transparent",
              borderTop: `5px solid ${b.c2}`,
            }}
          />
          {/* string */}
          <div
            className="absolute left-1/2"
            style={{
              top: "calc(100% + 4px)",
              width: 1,
              height: 60,
              background:
                "linear-gradient(180deg, rgba(245,209,128,0.6), rgba(245,209,128,0))",
            }}
          />
        </div>
      ))}
    </div>
  );
}
