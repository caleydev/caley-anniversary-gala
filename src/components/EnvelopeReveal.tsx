import { useState } from "react";
import type { Copy } from "@/lib/i18n";
import logo from "@/assets/caley-logo.webp";
import envelopeImg from "@/assets/envelope-gold.png";
import { LuxuryGalaBackground } from "./LuxuryGalaBackground";

export function EnvelopeReveal({ t, onOpen }: { t: Copy; onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1500);
  };

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-14 sm:py-16">
      <LuxuryGalaBackground />

      {/* Stage spotlight on envelope */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 55% at 50% 50%, rgba(255,225,160,0.20), transparent 65%)",
        }}
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        {/* Eyebrow */}
        <p
          className={`mb-6 text-[10px] uppercase tracking-[0.6em] transition-all duration-700 sm:mb-8 sm:text-[11px] ${opening ? "opacity-0 -translate-y-4" : "opacity-100"}`}
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

        {/* Envelope — the only clickable opener */}
        <button
          type="button"
          aria-label={t.envelopeHint}
          onClick={handleOpen}
          disabled={opening}
          className={`group relative block w-full max-w-[460px] cursor-pointer select-none rounded-[14px] outline-none transition-all duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] focus-visible:ring-2 focus-visible:ring-[#f5d889]/70 ${
            opening
              ? "scale-[1.18] -translate-y-6 opacity-0"
              : "scale-100 translate-y-0 opacity-100 hover:scale-[1.03] animate-[envBreathe_5s_ease-in-out_infinite]"
          }`}
        >
          {/* Realistic drop shadow under envelope */}
          <div
            className="pointer-events-none absolute left-1/2 -bottom-6 h-10 w-[78%] -translate-x-1/2 rounded-[50%] blur-3xl"
            style={{ background: "rgba(0,0,0,0.85)" }}
          />
          <div
            className="pointer-events-none absolute left-1/2 -bottom-2 h-4 w-[55%] -translate-x-1/2 rounded-[50%] blur-xl opacity-80"
            style={{ background: "rgba(214,168,79,0.45)" }}
          />

          {/* Ambient gold glow that intensifies on hover */}
          <div
            className="pointer-events-none absolute -inset-10 rounded-[40%] opacity-55 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(245,209,128,0.5), transparent 70%)",
            }}
          />

          {/* The envelope image + overlays */}
          <div className="relative">
            <img
              src={envelopeImg}
              alt=""
              className="relative z-10 w-full select-none"
              draggable={false}
              style={{
                filter:
                  "drop-shadow(0 30px 50px rgba(0,0,0,0.75)) drop-shadow(0 0 25px rgba(245,209,128,0.28))",
              }}
            />

            {/* Caley logo — embossed on the TOP part of the envelope */}
            <div
              className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2"
              style={{ top: "18%", width: "26%" }}
            >
              <img
                src={logo}
                alt="Caley Insurance"
                className="block w-full object-contain"
                style={{
                  filter:
                    "drop-shadow(0 1px 0 rgba(255,245,210,0.55)) drop-shadow(0 -1px 0 rgba(60,40,5,0.55)) brightness(0.9) contrast(1.05) sepia(0.25) hue-rotate(-10deg) saturate(1.1)",
                  mixBlendMode: "multiply",
                  opacity: 0.85,
                }}
              />
            </div>

            {/* "8" — perfectly centered on the wax seal */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ width: "10%", aspectRatio: "1 / 1" }}
            >
              <span
                className="leading-none"
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 700,
                  fontSize: "2.6vw",
                  color: "#2a1b04",
                  textShadow:
                    "0 1px 0 rgba(255,245,210,0.7), 0 -1px 0 rgba(40,25,2,0.7)",
                }}
              >
                8
              </span>
            </div>

            {/* Soft sheen sweep on hover */}
            <div
              className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-[6%]"
              aria-hidden
            >
              <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 transition-all duration-1000 group-hover:left-full group-hover:opacity-100" />
            </div>

            {/* Light burst on open */}
            {opening && (
              <div
                className="pointer-events-none absolute inset-0 z-40 animate-[envBurst_1.4s_ease-out_forwards]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255,245,210,0.95), rgba(245,209,128,0.55) 28%, transparent 72%)",
                  borderRadius: "8%",
                }}
              />
            )}
          </div>
        </button>

        {/* Helper instruction */}
        <p
          className={`mt-6 text-[10px] uppercase tracking-[0.45em] transition-opacity duration-500 sm:mt-7 sm:text-[11px] ${opening ? "opacity-0" : "opacity-80"}`}
          style={{
            fontFamily: "'Cinzel', serif",
            background: "linear-gradient(180deg, #fff4cc, #d6a84f)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {opening ? t.envelopeOpening : t.envelopeHint}
        </p>

        {/* Copy block */}
        <h1
          className={`mt-8 text-3xl font-medium leading-tight text-white sm:mt-10 sm:text-4xl md:text-5xl transition-all duration-700 ${opening ? "opacity-0 translate-y-4" : "opacity-100"}`}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.01em",
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          }}
        >
          {t.envelopeHeadline}
        </h1>
        <p
          className={`mt-3 max-w-lg text-sm text-white/75 sm:mt-4 sm:text-base transition-all duration-700 ${opening ? "opacity-0" : "opacity-100"}`}
        >
          {t.envelopeSub}
        </p>
      </div>

      <style>{`
        @keyframes envBurst {
          0% { opacity: 0; transform: scale(0.5); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: scale(2.8); }
        }
        @keyframes envBreathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}
