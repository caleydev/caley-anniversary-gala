import { useState } from "react";
import type { Copy } from "@/lib/i18n";
import envelopeImg from "@/assets/envelope-gold.png";
import { LuxuryGalaBackground } from "./LuxuryGalaBackground";

export function EnvelopeReveal({ t, onOpen }: { t: Copy; onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1400);
  };

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4 py-14 sm:py-16">
      <LuxuryGalaBackground />

      {/* Stage spotlight on envelope */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(255,225,160,0.22), transparent 65%)",
        }}
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        {/* Eyebrow */}
        <p
          className={`mb-8 text-[10px] uppercase tracking-[0.6em] transition-all duration-700 sm:mb-10 sm:text-[11px] ${opening ? "opacity-0 -translate-y-4" : "opacity-100"}`}
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

        {/* Envelope — the only clickable opener. Uploaded asset is the source of truth. */}
        <button
          type="button"
          aria-label={t.envelopeHint}
          onClick={handleOpen}
          disabled={opening}
          className={`group relative block w-full max-w-[520px] cursor-pointer select-none outline-none transition-all duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] focus-visible:ring-2 focus-visible:ring-[#f5d889]/70 rounded-2xl ${
            opening
              ? "scale-[1.18] -translate-y-6 opacity-0"
              : "scale-100 translate-y-0 opacity-100 hover:scale-[1.03] animate-[envBreathe_5s_ease-in-out_infinite]"
          }`}
        >
          {/* Realistic drop shadow */}
          <div
            className="pointer-events-none absolute left-1/2 -bottom-4 h-10 w-[75%] -translate-x-1/2 rounded-[50%] blur-3xl"
            style={{ background: "rgba(0,0,0,0.85)" }}
          />
          <div
            className="pointer-events-none absolute left-1/2 bottom-0 h-4 w-[55%] -translate-x-1/2 rounded-[50%] blur-xl opacity-80"
            style={{ background: "rgba(214,168,79,0.45)" }}
          />

          {/* Ambient gold glow */}
          <div
            className="pointer-events-none absolute -inset-10 rounded-[40%] opacity-55 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(245,209,128,0.5), transparent 70%)",
            }}
          />

          <div className="relative">
            <img
              src={envelopeImg}
              alt="Caley Insurance invitation envelope"
              className="relative z-10 block w-full select-none"
              draggable={false}
              style={{
                filter:
                  "drop-shadow(0 30px 50px rgba(0,0,0,0.75)) drop-shadow(0 0 25px rgba(245,209,128,0.28))",
              }}
            />

            {/* Subtle sheen sweep on hover */}
            <div
              className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-2xl"
              aria-hidden
            >
              <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-1000 group-hover:left-full group-hover:opacity-100" />
            </div>

            {/* Light burst on open */}
            {opening && (
              <div
                className="pointer-events-none absolute inset-0 z-40 animate-[envBurst_1.4s_ease-out_forwards]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(255,245,210,0.95), rgba(245,209,128,0.55) 28%, transparent 72%)",
                  borderRadius: "10%",
                }}
              />
            )}
          </div>
        </button>

        {/* Helper instruction */}
        <p
          className={`mt-7 text-[10px] uppercase tracking-[0.45em] transition-opacity duration-500 sm:mt-8 sm:text-[11px] ${opening ? "opacity-0" : "opacity-80"}`}
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
