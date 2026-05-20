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
            "radial-gradient(ellipse 50% 55% at 50% 48%, rgba(255,225,160,0.18), transparent 65%)",
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

        {/* Envelope stage */}
        <div
          className={`group relative w-full max-w-[460px] cursor-pointer select-none transition-all duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            opening
              ? "scale-[1.18] -translate-y-6 opacity-0"
              : "scale-100 translate-y-0 opacity-100 hover:scale-[1.025]"
          }`}
          role="button"
          tabIndex={0}
          aria-label={t.openBtn}
          onClick={handleOpen}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
        >
          {/* Realistic drop shadow under envelope */}
          <div
            className="absolute left-1/2 -bottom-6 h-10 w-[78%] -translate-x-1/2 rounded-[50%] blur-3xl"
            style={{ background: "rgba(0,0,0,0.85)" }}
          />
          <div
            className="absolute left-1/2 -bottom-2 h-4 w-[55%] -translate-x-1/2 rounded-[50%] blur-xl opacity-80"
            style={{ background: "rgba(214,168,79,0.45)" }}
          />

          {/* Ambient gold glow that pulses on hover */}
          <div
            className="pointer-events-none absolute -inset-10 rounded-[40%] opacity-60 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(245,209,128,0.45), transparent 70%)",
            }}
          />

          {/* The envelope image */}
          <div className="relative">
            <img
              src={envelopeImg}
              alt=""
              className="relative z-10 w-full select-none"
              draggable={false}
              style={{
                filter:
                  "drop-shadow(0 30px 50px rgba(0,0,0,0.75)) drop-shadow(0 0 25px rgba(245,209,128,0.25))",
              }}
            />

            {/* Caley logo embossed on the seal (centered over the wax seal area) */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ width: "16%" }}
            >
              <div
                className="relative aspect-square w-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255,245,210,0.18) 0%, rgba(120,85,25,0.0) 60%)",
                }}
              >
                <img
                  src={logo}
                  alt="Caley Insurance"
                  className="absolute inset-0 m-auto h-[78%] w-[78%] object-contain"
                  style={{
                    filter:
                      "drop-shadow(0 1px 0 rgba(255,245,210,0.7)) drop-shadow(0 -1px 0 rgba(60,40,5,0.6)) brightness(0.92) contrast(1.05)",
                    mixBlendMode: "multiply",
                    opacity: 0.92,
                  }}
                />
                {/* "8" mini emboss beneath logo */}
                <span
                  className="absolute left-1/2 top-[88%] -translate-x-1/2 text-[10px] font-bold tracking-[0.2em]"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: "#3a2608",
                    textShadow: "0 1px 0 rgba(255,245,210,0.55)",
                  }}
                >
                  · 8 ·
                </span>
              </div>
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

          {/* Tap hint */}
          <p
            className={`mt-5 text-[9px] uppercase tracking-[0.45em] text-white/55 transition-opacity duration-500 sm:text-[10px] ${opening ? "opacity-0" : "opacity-100"}`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {t.envelopeHint}
          </p>
        </div>

        {/* Copy block */}
        <h1
          className={`mt-10 text-3xl font-medium leading-tight text-white sm:mt-14 sm:text-4xl md:text-5xl transition-all duration-700 ${opening ? "opacity-0 translate-y-4" : "opacity-100"}`}
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

        <button
          onClick={handleOpen}
          disabled={opening}
          className={`group/btn mt-8 relative overflow-hidden rounded-full px-10 py-3.5 text-[11px] font-semibold uppercase tracking-[0.4em] transition-all duration-500 sm:mt-10 ${
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
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
        </button>
      </div>

      <style>{`
        @keyframes envBurst {
          0% { opacity: 0; transform: scale(0.5); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: scale(2.8); }
        }
      `}</style>
    </section>
  );
}
