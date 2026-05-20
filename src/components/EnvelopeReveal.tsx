import { useState } from "react";
import type { Copy } from "@/lib/i18n";
import logo from "@/assets/caley-logo.webp";
import { AnniversarySeal } from "./AnniversarySeal";
import { LuxuryGalaBackground } from "./LuxuryGalaBackground";

export function EnvelopeReveal({ t, onOpen }: { t: Copy; onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1700);
  };

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
      <LuxuryGalaBackground />

      {/* Center spotlight focused on envelope */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 50% at 50% 52%, rgba(255,225,160,0.16), transparent 65%)",
        }}
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <p
          className={`mb-7 text-[10px] uppercase tracking-[0.6em] transition-all duration-700 sm:text-[11px] ${opening ? "opacity-0 -translate-y-4" : "opacity-100"}`}
          style={{
            fontFamily: "'Cinzel', serif",
            background: "linear-gradient(180deg, #fff4cc, #d6a84f)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {t.presents}
        </p>

        {/* Realistic GOLD envelope */}
        <div
          className={`relative w-full max-w-[480px] transition-all duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            opening ? "scale-95 -translate-y-20 opacity-0" : "scale-100 translate-y-0 opacity-100"
          }`}
          style={{ perspective: "1600px" }}
        >
          {/* Soft realistic shadow under envelope */}
          <div
            className="absolute left-1/2 -bottom-8 h-12 w-[88%] -translate-x-1/2 rounded-[50%] blur-3xl"
            style={{ background: "rgba(0,0,0,0.75)" }}
          />
          <div
            className="absolute left-1/2 -bottom-4 h-6 w-[60%] -translate-x-1/2 rounded-[50%] blur-xl"
            style={{ background: "rgba(214,168,79,0.35)" }}
          />

          <div className="relative">
            <div
              role="button"
              tabIndex={0}
              onClick={handleOpen}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
              aria-label={t.openBtn}
              className="group relative aspect-[1.55/1] cursor-pointer rounded-[10px] overflow-hidden transition-transform duration-500 hover:-translate-y-1"
              style={{
                background:
                  "linear-gradient(155deg, #f5dc92 0%, #d8ad52 18%, #b8862e 40%, #8a601a 55%, #b8862e 72%, #d8ad52 88%, #f5dc92 100%)",
                boxShadow:
                  "0 50px 90px -30px rgba(0,0,0,0.9), 0 0 0 1px rgba(120,85,25,0.7), inset 0 0 0 1px rgba(255,240,200,0.45), inset 0 -20px 40px rgba(80,55,10,0.55), inset 0 30px 50px rgba(255,240,200,0.18)",
              }}
            >
              {/* Satin brushed-metal sheen */}
              <div
                className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  background:
                    "repeating-linear-gradient(115deg, rgba(255,255,255,0.18) 0px, rgba(255,255,255,0.18) 1px, transparent 1px, transparent 4px)",
                }}
              />

              {/* Subtle paper noise */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />

              {/* Inner darker gold border */}
              <div
                className="pointer-events-none absolute inset-[6px] rounded-[7px]"
                style={{
                  border: "1px solid rgba(80,55,10,0.5)",
                  boxShadow: "inset 0 0 0 1px rgba(255,240,200,0.35)",
                }}
              />

              {/* Diagonal envelope fold lines (side flaps) — subtle gold seam */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top right, transparent 49.6%, rgba(80,55,10,0.45) 50%, transparent 50.4%), linear-gradient(to top left, transparent 49.6%, rgba(80,55,10,0.45) 50%, transparent 50.4%)",
                }}
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top right, transparent 49.85%, rgba(255,245,210,0.5) 50%, transparent 50.15%), linear-gradient(to top left, transparent 49.85%, rgba(255,245,210,0.5) 50%, transparent 50.15%)",
                  mixBlendMode: "overlay",
                }}
              />

              {/* Caley logo near top of envelope */}
              <div className="absolute inset-x-0 top-4 flex justify-center sm:top-5">
                <div
                  className="rounded-full px-3 py-1"
                  style={{
                    background: "rgba(20,15,5,0.25)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(255,240,200,0.18)",
                  }}
                >
                  <img
                    src={logo}
                    alt="Caley Insurance"
                    className="h-7 w-auto opacity-95 sm:h-9"
                    style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.6))" }}
                  />
                </div>
              </div>

              {/* Decorative monogram on body */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "12rem",
                  color: "rgba(80,55,10,0.18)",
                  lineHeight: 1,
                  paddingTop: "1.2rem",
                }}
              >
                C
              </div>

              {/* TOP FLAP (triangle) — opens up */}
              <div
                className={`absolute inset-x-0 top-0 origin-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
                  opening ? "[transform:rotateX(-180deg)]" : ""
                }`}
                style={{
                  height: "58%",
                  background:
                    "linear-gradient(180deg, #f5dc92 0%, #d8ad52 35%, #a87f29 75%, #7a5a14 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  boxShadow:
                    "inset 0 -10px 24px rgba(60,40,5,0.5), inset 0 1px 0 rgba(255,245,210,0.55)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Sheen across flap */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,245,210,0.35) 0%, transparent 50%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                />
                {/* Fine gold edge along V */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom right, transparent 49.7%, rgba(255,245,210,0.7) 50%, transparent 50.3%), linear-gradient(to bottom left, transparent 49.7%, rgba(255,245,210,0.7) 50%, transparent 50.3%)",
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                />
              </div>

              {/* Wax/medallion seal at flap close point */}
              <div
                className={`absolute left-1/2 top-[58%] z-20 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                  opening ? "scale-0 opacity-0 rotate-45" : "scale-100 opacity-100"
                }`}
              >
                <AnniversarySeal size={118} line1={t.sealLine1} line2={t.sealLine2} />
              </div>

              {/* Hover shine sweep */}
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                style={{ mixBlendMode: "overlay" }}
              />

              {/* Light burst on open */}
              {opening && (
                <div
                  className="absolute inset-0 animate-[burst_1.4s_ease-out_forwards]"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 55%, rgba(255,245,210,0.95), rgba(245,209,128,0.6) 28%, transparent 72%)",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <h1
          className={`mt-14 text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl transition-all duration-700 ${opening ? "opacity-0 translate-y-4" : "opacity-100"}`}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.01em",
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          }}
        >
          {t.envelopeHeadline}
        </h1>
        <p
          className={`mt-4 max-w-lg text-sm text-white/75 sm:text-base transition-all duration-700 ${opening ? "opacity-0" : "opacity-100"}`}
        >
          {t.envelopeSub}
        </p>

        <button
          onClick={handleOpen}
          disabled={opening}
          className={`mt-10 group relative overflow-hidden rounded-full px-10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.4em] transition-all duration-500 ${
            opening ? "opacity-0 translate-y-4" : "opacity-100 hover:scale-[1.04]"
          }`}
          style={{
            background:
              "linear-gradient(135deg, #fff4cc 0%, #f5d889 35%, #d6a84f 65%, #a4781c 100%)",
            color: "#1a1305",
            fontFamily: "'Cinzel', serif",
            boxShadow:
              "0 16px 40px -10px rgba(214,168,79,0.7), inset 0 1px 0 rgba(255,245,210,0.6), inset 0 -2px 4px rgba(80,55,10,0.45)",
          }}
        >
          <span className="relative z-10">{t.openBtn}</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>

      <style>{`
        @keyframes burst {
          0% { opacity: 0; transform: scale(0.5); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: scale(2.6); }
        }
      `}</style>
    </section>
  );
}
