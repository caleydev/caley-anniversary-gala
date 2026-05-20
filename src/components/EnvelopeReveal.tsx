import { useState } from "react";
import type { Copy } from "@/lib/i18n";
import logo from "@/assets/caley-logo.webp";
import { AnniversarySeal } from "./AnniversarySeal";

export function EnvelopeReveal({ t, onOpen }: { t: Copy; onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1700);
  };

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-16">
      {/* Spotlight & beams */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(0,87,184,0.35), transparent 65%), radial-gradient(ellipse 40% 30% at 50% 100%, rgba(214,168,79,0.25), transparent 70%)",
        }}
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <p
          className={`mb-8 text-[11px] uppercase tracking-[0.55em] text-[var(--gold-soft)] transition-all duration-700 ${opening ? "opacity-0 -translate-y-4" : "opacity-100"}`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {t.presents}
        </p>

        {/* Envelope */}
        <div
          className={`relative w-full max-w-[520px] transition-all duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            opening ? "scale-95 -translate-y-24 opacity-0" : "scale-100 translate-y-0 opacity-100"
          }`}
          style={{ perspective: "1400px" }}
        >
          {/* Soft shadow under envelope */}
          <div
            className="absolute left-1/2 -bottom-6 h-10 w-3/4 -translate-x-1/2 rounded-[50%] blur-2xl"
            style={{ background: "rgba(0,0,0,0.6)" }}
          />

          <div className="relative">
            {/* Envelope body */}
            <div
              role="button"
              tabIndex={0}
              onClick={handleOpen}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
              aria-label={t.openBtn}
              className="relative aspect-[1.55/1] cursor-pointer rounded-[14px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg, #0a1838 0%, #061230 45%, #04102a 100%)",
                boxShadow:
                  "0 50px 80px -30px rgba(0,0,0,0.85), 0 0 0 1px rgba(214,168,79,0.55), inset 0 0 0 2px rgba(255,225,160,0.12), inset 0 0 60px rgba(0,87,184,0.18)",
              }}
            >
              {/* Subtle noise/texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.85 0 0 0 0 0.7 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
                }}
              />

              {/* Inner gold border line */}
              <div
                className="pointer-events-none absolute inset-3 rounded-[10px]"
                style={{ border: "1px solid rgba(245,199,107,0.35)" }}
              />

              {/* Diagonal fold lines (side flaps) */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top right, transparent 49.7%, rgba(214,168,79,0.18) 50%, transparent 50.3%), linear-gradient(to top left, transparent 49.7%, rgba(214,168,79,0.18) 50%, transparent 50.3%)",
                }}
              />

              {/* Logo at TOP of envelope */}
              <div className="absolute inset-x-0 top-5 flex justify-center">
                <img
                  src={logo}
                  alt="Caley Insurance"
                  className="h-9 w-auto opacity-90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] sm:h-11"
                />
              </div>

              {/* Decorative monogram on body */}
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "11rem",
                  color: "rgba(245,199,107,0.05)",
                  lineHeight: 1,
                  paddingTop: "1rem",
                }}
              >
                C
              </div>

              {/* TOP FLAP (triangle) - opens up */}
              <div
                className={`absolute inset-x-0 top-0 origin-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.7,0,0.3,1)] ${
                  opening ? "[transform:rotateX(-180deg)]" : ""
                }`}
                style={{
                  height: "58%",
                  background:
                    "linear-gradient(180deg, #0d1d44 0%, #081539 60%, #050f2c 100%)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  borderBottom: "1px solid rgba(214,168,79,0.5)",
                  boxShadow:
                    "inset 0 -10px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(245,199,107,0.25)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                {/* Fine gold edge along V */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom right, transparent 49.6%, rgba(245,199,107,0.55) 50%, transparent 50.4%), linear-gradient(to bottom left, transparent 49.6%, rgba(245,199,107,0.55) 50%, transparent 50.4%)",
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
                <AnniversarySeal size={120} line1={t.sealLine1} line2={t.sealLine2} />
              </div>

              {/* Light burst on open */}
              {opening && (
                <div
                  className="absolute inset-0 animate-[burst_1.4s_ease-out_forwards]"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 55%, rgba(255,240,200,0.95), rgba(0,166,255,0.5) 25%, transparent 70%)",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <h1
          className={`mt-14 text-3xl font-medium leading-tight text-white sm:text-4xl md:text-5xl transition-all duration-700 ${opening ? "opacity-0 translate-y-4" : "opacity-100"}`}
          style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.01em" }}
        >
          {t.envelopeHeadline}
        </h1>
        <p
          className={`mt-4 max-w-lg text-sm text-white/70 sm:text-base transition-all duration-700 ${opening ? "opacity-0" : "opacity-100"}`}
        >
          {t.envelopeSub}
        </p>

        <button
          onClick={handleOpen}
          disabled={opening}
          className={`mt-10 group relative overflow-hidden rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.35em] transition-all duration-500 ${
            opening ? "opacity-0 translate-y-4" : "opacity-100 hover:scale-105"
          }`}
          style={{
            background: "linear-gradient(135deg, #f5c76b 0%, #d6a84f 50%, #a4781c 100%)",
            color: "#0a1838",
            fontFamily: "'Cinzel', serif",
            boxShadow:
              "0 14px 40px -10px rgba(214,168,79,0.7), inset 0 1px 0 rgba(255,240,200,0.5), inset 0 -2px 4px rgba(80,55,10,0.4)",
          }}
        >
          <span className="relative z-10">{t.openBtn}</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
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
