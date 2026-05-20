import { useMemo } from "react";

/**
 * Luxury gala invitation background — midnight navy with gold glitter,
 * soft champagne bokeh, distant sparkle, and flowing gold ribbons in the
 * corners. Inspired by premium printed gala invitations.
 */
export function LuxuryGalaBackground() {
  // Stable randomized sparkles per mount
  const sparkles = useMemo(() => {
    return Array.from({ length: 110 }).map((_, i) => {
      const seed = i * 9301 + 49297;
      const r = (n: number) => ((Math.sin(seed * n) + 1) / 2);
      return {
        top: r(1.1) * 100,
        left: r(2.3) * 100,
        size: 1 + r(3.7) * 2.4,
        opacity: 0.3 + r(4.9) * 0.7,
        delay: r(5.1) * 4,
      };
    });
  }, []);

  const bokeh = useMemo(() => {
    return [
      { top: 6, left: 8, size: 90, c: "rgba(245,209,128,0.18)" },
      { top: 14, left: 22, size: 140, c: "rgba(245,209,128,0.10)" },
      { top: 4, left: 60, size: 70, c: "rgba(255,225,160,0.16)" },
      { top: 22, left: 78, size: 110, c: "rgba(214,168,79,0.12)" },
      { top: 38, left: 6, size: 160, c: "rgba(245,209,128,0.14)" },
      { top: 55, left: 88, size: 130, c: "rgba(214,168,79,0.10)" },
      { top: 70, left: 12, size: 100, c: "rgba(245,209,128,0.10)" },
      { top: 80, left: 70, size: 150, c: "rgba(214,168,79,0.08)" },
    ];
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Midnight navy base with subtle radial fade (lighter top, deeper bottom) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 35%, #0a1e3a 0%, #061534 35%, #03102a 65%, #010614 100%)",
        }}
      />

      {/* Warm champagne haze in upper portion (top glow from above) */}
      <div
        className="absolute inset-x-0 top-0 h-[55%]"
        style={{
          background:
            "radial-gradient(ellipse 75% 80% at 50% 0%, rgba(245,209,128,0.18) 0%, rgba(214,168,79,0.07) 30%, transparent 65%)",
        }}
      />

      {/* Soft gold bokeh discs (out-of-focus light) */}
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

      {/* Subtle lens flare spark left side */}
      <div
        className="absolute"
        style={{
          top: "44%",
          left: "8%",
          width: 5,
          height: 5,
          background: "white",
          borderRadius: "50%",
          boxShadow:
            "0 0 8px 2px rgba(255,255,255,0.9), 0 0 20px 6px rgba(245,209,128,0.6), 0 0 40px 16px rgba(245,209,128,0.25)",
        }}
      />

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

      {/* Gold ribbons in 4 corners (SVG, satin metallic) */}
      <CornerRibbon className="absolute -left-4 -top-4" />
      <CornerRibbon className="absolute -right-4 -top-4" mirror />
      <CornerRibbon className="absolute -left-4 -bottom-4" flipV />
      <CornerRibbon className="absolute -right-4 -bottom-4" mirror flipV />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 70% at 50% 50%, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Fine noise grain for paper-like depth */}
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
      `}</style>
    </div>
  );
}

function CornerRibbon({
  className = "",
  mirror = false,
  flipV = false,
}: {
  className?: string;
  mirror?: boolean;
  flipV?: boolean;
}) {
  const transform = `${mirror ? "scaleX(-1)" : ""} ${flipV ? "scaleY(-1)" : ""}`.trim();
  return (
    <div
      className={`${className} h-[180px] w-[220px] sm:h-[260px] sm:w-[320px]`}
      style={{ transform }}
    >
      <svg viewBox="0 0 320 260" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="rib1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff4cc" />
            <stop offset="30%" stopColor="#f5d889" />
            <stop offset="55%" stopColor="#a87f29" />
            <stop offset="80%" stopColor="#f5d889" />
            <stop offset="100%" stopColor="#7a5a14" />
          </linearGradient>
          <linearGradient id="rib2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d6a84f" />
            <stop offset="50%" stopColor="#fff4cc" />
            <stop offset="100%" stopColor="#6b4d10" />
          </linearGradient>
          <filter id="ribshadow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Shadow under ribbon */}
        <path
          d="M -10 -10 C 80 30, 140 60, 200 110 C 230 135, 250 170, 280 230"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="22"
          fill="none"
          filter="url(#ribshadow)"
          opacity="0.6"
        />

        {/* Main ribbon body — flowing curve */}
        <path
          d="M -20 -20 C 70 20, 130 50, 190 100 C 220 125, 240 165, 270 220"
          stroke="url(#rib1)"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />

        {/* Highlight stripe on ribbon (satin sheen) */}
        <path
          d="M -20 -20 C 70 20, 130 50, 190 100 C 220 125, 240 165, 270 220"
          stroke="rgba(255,245,210,0.6)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Twist / fold detail */}
        <path
          d="M 140 60 C 165 70, 175 95, 160 115 C 145 95, 150 75, 140 60 Z"
          fill="url(#rib2)"
          opacity="0.95"
        />
        <path
          d="M 140 60 C 165 70, 175 95, 160 115"
          stroke="rgba(255,245,210,0.7)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Trailing end with curl */}
        <path
          d="M 240 180 C 260 200, 280 215, 300 220 C 280 230, 260 232, 240 226 C 244 210, 244 195, 240 180 Z"
          fill="url(#rib2)"
        />
        <path
          d="M 240 180 C 260 200, 280 215, 300 220"
          stroke="rgba(255,245,210,0.5)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </div>
  );
}
