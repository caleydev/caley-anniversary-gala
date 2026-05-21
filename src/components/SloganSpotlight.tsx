import slogan from "@/assets/slogan-call-someone-special-cutout.png";
import type { Copy } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * Slogan floats directly in the night sky — uses the real asset (background removed),
 * no card, no frame. Surrounded by a soft bloom that blends it into the starry sky.
 */
export function SloganSpotlight({ t }: { t: Copy }) {
  return (
    <section className="relative py-24 sm:py-36">
      <style>{`
        @keyframes sloganHaze {
          0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.05); }
        }
        @keyframes sloganBreathe {
          0%, 100% { filter: drop-shadow(0 0 18px rgba(120,180,255,0.45)) drop-shadow(0 0 50px rgba(60,130,230,0.25)); }
          50% { filter: drop-shadow(0 0 28px rgba(160,210,255,0.7)) drop-shadow(0 0 90px rgba(80,160,255,0.45)); }
        }
        @keyframes sloganTwinkle {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.65; }
        }
      `}</style>

      {/* Atmospheric sky glow behind the slogan */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[85%] blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(80,160,255,0.32), rgba(30,70,170,0.12) 45%, transparent 75%)",
          animation: "sloganHaze 8s ease-in-out infinite",
        }}
      />

      {/* Tiny nearby star sparkles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 38%, rgba(255,255,255,0.9) 0 1px, transparent 2px), radial-gradient(circle at 82% 30%, rgba(200,220,255,0.85) 0 1px, transparent 2px), radial-gradient(circle at 76% 70%, rgba(255,235,180,0.8) 0 1px, transparent 2px), radial-gradient(circle at 22% 68%, rgba(255,255,255,0.85) 0 1px, transparent 2px), radial-gradient(circle at 50% 14%, rgba(255,255,255,0.75) 0 1px, transparent 2px), radial-gradient(circle at 50% 86%, rgba(200,220,255,0.75) 0 1px, transparent 2px)",
          animation: "sloganTwinkle 5s ease-in-out infinite",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-5xl text-center">
            <p
              className="mb-10 text-[10px] uppercase tracking-[0.5em]"
              style={{ fontFamily: "'Cinzel', serif", color: "#d6a84f" }}
            >
              {t.sloganEyebrow}
            </p>

            {/* The real asset, free-floating in the sky */}
            <div className="relative mx-auto w-full max-w-[920px]">
              <img
                src={slogan}
                alt="Call someone special today"
                draggable={false}
                className="block h-auto w-full select-none"
                style={{
                  animation: "sloganBreathe 5.5s ease-in-out infinite",
                }}
              />
            </div>

            <p
              className="mx-auto mt-12 max-w-2xl text-balance text-sm leading-relaxed text-white/65 sm:text-base"
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
