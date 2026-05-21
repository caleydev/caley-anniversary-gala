import type { Copy } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * Slogan written directly in the night sky — no box, no card.
 * "CAL" (CALL), the "E" in SPECIAL, and the final "Y" in TODAY glow blue.
 * Other letters glow soft luminous white.
 */
export function SloganSpotlight({ t }: { t: Copy }) {
  const white = "rgba(245,250,255,0.97)";
  const blue = "#7cc4ff";

  const whiteGlow =
    "0 0 6px rgba(255,255,255,0.55), 0 0 18px rgba(180,210,255,0.45), 0 0 38px rgba(120,170,255,0.28)";
  const blueGlow =
    "0 0 8px rgba(160,210,255,0.95), 0 0 22px rgba(80,160,255,0.85), 0 0 48px rgba(40,120,255,0.7), 0 0 90px rgba(40,120,255,0.45)";

  const whiteStyle: React.CSSProperties = {
    color: white,
    textShadow: whiteGlow,
  };
  const blueStyle: React.CSSProperties = {
    color: blue,
    textShadow: blueGlow,
    filter: "drop-shadow(0 0 14px rgba(80,160,255,0.55))",
    animation: "sloganPulse 4.2s ease-in-out infinite",
  };

  return (
    <section className="relative py-24 sm:py-36">
      {/* Scoped keyframes + shimmer */}
      <style>{`
        @keyframes sloganPulse {
          0%, 100% { filter: drop-shadow(0 0 12px rgba(80,160,255,0.45)); }
          50% { filter: drop-shadow(0 0 22px rgba(120,190,255,0.85)); }
        }
        @keyframes sloganHaze {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50% { opacity: 0.85; transform: scale(1.04); }
        }
        @keyframes sloganShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .slogan-shimmer {
          background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          animation: sloganShimmer 7s linear infinite;
          mix-blend-mode: screen;
          pointer-events: none;
        }
      `}</style>

      {/* Atmospheric haze behind the slogan — blends into the sky */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(60,120,220,0.22), rgba(20,40,90,0.08) 45%, transparent 75%)",
          animation: "sloganHaze 8s ease-in-out infinite",
        }}
      />
      {/* Smoky blue bloom directly behind text */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[80%] -translate-x-1/2 -translate-y-1/2 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(80,160,255,0.28), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-5xl text-center">
            <p
              className="mb-8 text-[10px] uppercase tracking-[0.5em]"
              style={{ fontFamily: "'Cinzel', serif", color: "#d6a84f" }}
            >
              {t.sloganEyebrow}
            </p>

            <h2
              className="relative mx-auto select-none leading-[0.95]"
              style={{
                fontFamily: "'Great Vibes', 'Cormorant Garamond', cursive",
                fontWeight: 400,
                fontSize: "clamp(3.2rem, 11vw, 9rem)",
              }}
              aria-label="Call someone special today"
            >
              <span className="block">
                <span style={blueStyle}>Cal</span>
                <span style={whiteStyle}>l&nbsp;Someone</span>
              </span>
              <span className="mt-2 block">
                <span style={whiteStyle}>Sp</span>
                <span style={blueStyle}>e</span>
                <span style={whiteStyle}>cial&nbsp;Toda</span>
                <span style={blueStyle}>y</span>
              </span>
              {/* subtle shimmer overlay */}
              <span
                aria-hidden
                className="slogan-shimmer absolute inset-0"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "clamp(3.2rem, 11vw, 9rem)",
                  lineHeight: 0.95,
                }}
              >
                <span className="block">Call&nbsp;Someone</span>
                <span className="mt-2 block">Special&nbsp;Today</span>
              </span>
            </h2>

            <p
              className="mx-auto mt-10 max-w-2xl text-balance text-sm leading-relaxed text-white/65 sm:text-base"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
            >
              {t.sloganCaption}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
