import { useEffect, useRef, useState } from "react";
import type { Copy } from "@/lib/i18n";
import envelopeImg from "@/assets/envelope-gold.png";
import { NightSkyBackground } from "./NightSkyBackground";

export function EnvelopeReveal({ t, onOpen }: { t: Copy; onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    timerRef.current = window.setTimeout(() => {
      onOpen();
    }, 750);
  };

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-4 py-14 sm:py-16">
      <NightSkyBackground />

      {/* Soft stage spotlight on envelope */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 50%, rgba(255,225,160,0.14), transparent 65%)",
        }}
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        {/* Eyebrow */}
        <p
          className={`mb-8 text-[10px] uppercase tracking-[0.6em] transition-all duration-500 sm:mb-10 sm:text-[11px] ${opening ? "opacity-0 -translate-y-2" : "opacity-100"}`}
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
          style={{ pointerEvents: opening ? "none" : "auto" }}
          className={`group relative block w-full max-w-[520px] cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#f5d889]/70 rounded-2xl transition-all duration-700 ease-out ${
            opening
              ? "scale-[1.04] -translate-y-2 opacity-0"
              : "animate-[envBreathe_5s_ease-in-out_infinite] hover:scale-[1.03]"
          }`}
        >
          {/* Ground shadow */}
          <div
            className="pointer-events-none absolute left-1/2 -bottom-4 h-10 w-[75%] -translate-x-1/2 rounded-[50%] blur-3xl"
            style={{ background: "rgba(0,0,0,0.85)" }}
          />

          {/* Hover ambient glow */}
          <div
            className="pointer-events-none absolute -inset-10 rounded-[40%] opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(245,209,128,0.55), transparent 70%)",
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

            {/* Quick light burst from seal/center on open */}
            {opening && (
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "130%",
                  aspectRatio: "1 / 1",
                  background:
                    "radial-gradient(circle, rgba(255,250,225,1), rgba(245,209,128,0.7) 22%, rgba(245,209,128,0.2) 48%, transparent 72%)",
                  animation: "flashBurst 700ms ease-out forwards",
                  mixBlendMode: "screen",
                }}
              />
            )}

            {/* Subtle sheen sweep on hover */}
            {!opening && (
              <div
                className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-2xl"
                aria-hidden
              >
                <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-1000 group-hover:left-full group-hover:opacity-100" />
              </div>
            )}
          </div>
        </button>

        {/* Helper instruction */}
        <p
          className={`mt-7 text-[10px] uppercase tracking-[0.45em] transition-opacity duration-300 sm:mt-8 sm:text-[11px] ${opening ? "opacity-0" : "opacity-80"}`}
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
          className={`mt-8 text-3xl font-medium leading-tight text-white sm:mt-10 sm:text-4xl md:text-5xl transition-all duration-500 ${opening ? "opacity-0 translate-y-2" : "opacity-100"}`}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            letterSpacing: "0.01em",
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          }}
        >
          {t.envelopeHeadline}
        </h1>
        <p
          className={`mt-3 max-w-lg text-sm text-white/75 sm:mt-4 sm:text-base transition-all duration-500 ${opening ? "opacity-0" : "opacity-100"}`}
        >
          {t.envelopeSub}
        </p>
      </div>

      <style>{`
        @keyframes envBreathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes flashBurst {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
          25% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2.2); }
        }
      `}</style>
    </section>
  );
}
