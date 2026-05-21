import { useMemo } from "react";
import caleyLogo from "@/assets/caley-logo.webp";

/**
 * Premium luxury night sky background:
 * deep midnight navy, dense layered stars with realistic twinkle,
 * occasional gold "pop" stars, subtle nebula haze, vignette,
 * and an occasional Caley-branded shooting-star sweeping across.
 */
export function NightSkyBackground() {
  const farStars = useMemo(() => makeStars(420, 7.1, 0.4, 1.2), []);
  const midStars = useMemo(() => makeStars(180, 13.3, 0.9, 2.0), []);
  const nearStars = useMemo(() => makeStars(55, 19.7, 1.6, 2.8), []);
  const goldPopStars = useMemo(() => makeStars(28, 23.9, 1.2, 2.4), []);
  const goldDust = useMemo(() => makeStars(60, 27.3, 0.5, 1.3), []);

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

      {/* Soft warm distant glow at top */}
      <div
        className="absolute inset-x-0 top-0 h-[55%] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 55% 70% at 50% 0%, rgba(245,209,128,0.10) 0%, transparent 65%)",
        }}
      />

      {/* Star layers — dense, layered for depth */}
      <StarLayer stars={farStars} colorMix={["#cfd9ee", "#e8eefb"]} baseDur={4.5} />
      <StarLayer stars={midStars} colorMix={["#ffffff", "#f3f6ff"]} baseDur={3.6} withGlow />
      <StarLayer stars={nearStars} colorMix={["#ffffff", "#fff5d0"]} baseDur={3.0} withGlow strong />

      {/* Gold "pop" stars — occasional, elegant celebration accents */}
      <GoldPopLayer stars={goldPopStars} />

      {/* Subtle gold dust */}
      <StarLayer stars={goldDust} colorMix={["#f5d889", "#d6a84f"]} blurPx={0.3} baseDur={5.2} gold />

      {/* Caley-branded shooting stars (staggered, occasional, curved path) */}
      <ShootingStar logo={caleyLogo} variant="topLeftToBottomRight" delay={4} interval={11} />
      <ShootingStar logo={caleyLogo} variant="topRightToBottomLeft" delay={13} interval={14} />


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
          0%, 100% { opacity: var(--o-min, 0.35); transform: scale(1); }
          50% { opacity: var(--o-max, 1); transform: scale(1.15); }
        }
        @keyframes goldPop {
          0%, 88%, 100% {
            opacity: 0.3;
            transform: scale(0.9);
            background: #ffffff;
            box-shadow: 0 0 4px rgba(220,230,255,0.4);
          }
          92% {
            opacity: 1;
            transform: scale(1.8);
            background: #ffe9a8;
            box-shadow: 0 0 18px rgba(245,209,128,0.95), 0 0 36px rgba(245,209,128,0.55);
          }
          96% {
            opacity: 0.8;
            transform: scale(1.3);
            background: #f5d889;
            box-shadow: 0 0 10px rgba(245,209,128,0.6);
          }
        }
        @keyframes shootingStar {
          0% { opacity: 0; transform: translate(0, 0) rotate(var(--ang, 20deg)); }
          4% { opacity: 1; }
          18% { opacity: 1; }
          22% { opacity: 0; transform: translate(140vw, 0) rotate(var(--ang, 20deg)); }
          100% { opacity: 0; transform: translate(140vw, 0) rotate(var(--ang, 20deg)); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-ns-anim] { animation: none !important; }
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
            data-ns-anim
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

function GoldPopLayer({ stars }: { stars: Star[] }) {
  return (
    <div className="absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          data-ns-anim
          className="absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `goldPop ${10 + (i % 6) * 1.5}s ease-in-out ${s.delay * 2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ShootingStar({
  logo,
  startTop,
  startLeft,
  angle,
  duration,
  delay,
  interval,
}: {
  logo: string;
  startTop: number;
  startLeft: number;
  angle: number;
  duration: number;
  delay: number;
  interval: number;
}) {
  // Wrapper carries the path/translation animation; inner content holds logo + trail
  return (
    <div
      data-ns-anim
      className="absolute"
      style={
        {
          top: `${startTop}%`,
          left: `${startLeft}%`,
          width: "1px",
          height: "1px",
          "--ang": `${angle}deg`,
          animation: `shootingStar ${interval}s ease-in-out ${delay}s infinite`,
        } as React.CSSProperties
      }
    >
      <div
        className="relative flex items-center"
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: "left center",
        }}
      >
        {/* Trail */}
        <div
          className="absolute right-full top-1/2 -translate-y-1/2"
          style={{
            width: 220,
            height: 2,
            background:
              "linear-gradient(90deg, rgba(245,209,128,0) 0%, rgba(180,210,255,0.55) 55%, rgba(245,209,128,0.95) 100%)",
            filter: "blur(0.6px)",
            borderRadius: 2,
            boxShadow: "0 0 12px rgba(180,210,255,0.5)",
          }}
        />
        <div
          className="absolute right-full top-1/2 -translate-y-1/2"
          style={{
            width: 90,
            height: 6,
            background:
              "linear-gradient(90deg, rgba(245,209,128,0) 0%, rgba(245,209,128,0.5) 100%)",
            filter: "blur(4px)",
            borderRadius: 8,
          }}
        />
        {/* Caley logo (small, glowing) */}
        <img
          src={logo}
          alt=""
          aria-hidden
          className="block"
          style={{
            width: 36,
            height: "auto",
            opacity: 0.85,
            filter:
              "drop-shadow(0 0 6px rgba(245,209,128,0.9)) drop-shadow(0 0 14px rgba(180,210,255,0.55))",
          }}
        />
      </div>
    </div>
  );
}
