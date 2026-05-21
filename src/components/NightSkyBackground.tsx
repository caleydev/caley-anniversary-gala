import { useMemo } from "react";

/**
 * Premium luxury night sky background:
 * deep midnight navy, realistic layered stars (varying size/brightness),
 * subtle nebula haze, faint gold dust, soft vignette.
 * No cartoon shapes, no plants, no balloons.
 */
export function NightSkyBackground() {
  // Three layers of stars for depth
  const farStars = useMemo(() => makeStars(220, 7.1, 0.4, 1.2), []);
  const midStars = useMemo(() => makeStars(90, 13.3, 0.9, 2.0), []);
  const nearStars = useMemo(() => makeStars(28, 19.7, 1.6, 2.8), []);
  const goldDust = useMemo(() => makeStars(40, 27.3, 0.6, 1.4), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Midnight navy base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 30%, #0b1c3a 0%, #061230 35%, #030a20 70%, #01050f 100%)",
        }}
      />

      {/* Faint nebula haze */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 20% 25%, rgba(60,110,190,0.18), transparent 60%), radial-gradient(ellipse 50% 35% at 80% 70%, rgba(80,60,160,0.14), transparent 65%), radial-gradient(ellipse 70% 45% at 50% 95%, rgba(40,80,150,0.12), transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Soft warm glow upper center (distant city/light) */}
      <div
        className="absolute inset-x-0 top-0 h-[55%] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 50% 0%, rgba(245,209,128,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Star layers */}
      <StarLayer stars={farStars} colorMix={["#cfd9ee", "#e8eefb"]} blurPx={0} baseDur={4.5} />
      <StarLayer stars={midStars} colorMix={["#ffffff", "#f3f6ff"]} blurPx={0} baseDur={3.6} withGlow />
      <StarLayer stars={nearStars} colorMix={["#ffffff", "#fff5d0"]} blurPx={0} baseDur={3.0} withGlow strong />

      {/* Subtle gold dust */}
      <StarLayer stars={goldDust} colorMix={["#f5d889", "#d6a84f"]} blurPx={0.3} baseDur={5.2} gold />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <style>{`
        @keyframes nsTwinkle {
          0%, 100% { opacity: var(--o-min, 0.35); }
          50% { opacity: var(--o-max, 1); }
        }
      `}</style>
    </div>
  );
}

type Star = { top: number; left: number; size: number; delay: number; dur: number; oMin: number; oMax: number };

function makeStars(count: number, seedBase: number, minSize: number, maxSize: number): Star[] {
  return Array.from({ length: count }).map((_, i) => {
    const seed = i * seedBase + 13;
    const r = (n: number) => (Math.sin(seed * n) + 1) / 2;
    return {
      top: r(1.3) * 100,
      left: r(2.7) * 100,
      size: minSize + r(3.5) * (maxSize - minSize),
      delay: r(4.9) * 6,
      dur: 2.4 + r(5.3) * 3.4,
      oMin: 0.15 + r(6.1) * 0.25,
      oMax: 0.6 + r(7.7) * 0.4,
    };
  });
}

function StarLayer({
  stars,
  colorMix,
  blurPx = 0,
  baseDur = 3.5,
  withGlow = false,
  strong = false,
  gold = false,
}: {
  stars: Star[];
  colorMix: [string, string];
  blurPx?: number;
  baseDur?: number;
  withGlow?: boolean;
  strong?: boolean;
  gold?: boolean;
}) {
  return (
    <div className="absolute inset-0" style={{ filter: blurPx ? `blur(${blurPx}px)` : undefined }}>
      {stars.map((s, i) => {
        const color = i % 3 === 0 ? colorMix[1] : colorMix[0];
        const glow = withGlow
          ? `0 0 ${s.size * (strong ? 6 : 3)}px ${gold ? "rgba(245,209,128,0.7)" : "rgba(220,230,255,0.55)"}`
          : undefined;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={
              {
                top: `${s.top}%`,
                left: `${s.left}%`,
                width: s.size,
                height: s.size,
                background: color,
                boxShadow: glow,
                opacity: s.oMin,
                animation: `nsTwinkle ${baseDur + (i % 5) * 0.3}s ease-in-out ${s.delay}s infinite`,
                "--o-min": s.oMin,
                "--o-max": s.oMax,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
