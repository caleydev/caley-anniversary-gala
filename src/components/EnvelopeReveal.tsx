import { useState } from "react";
import type { Copy } from "@/lib/i18n";
import logo from "@/assets/caley-logo.webp";

export function EnvelopeReveal({ t, onOpen }: { t: Copy; onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1400);
  };

  return (
    <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-20">
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, oklch(0.4 0.15 250 / 0.4), transparent 70%)",
        }}
      />

      <div className="relative flex w-full max-w-2xl flex-col items-center text-center">
        <p className={`mb-6 text-xs uppercase tracking-[0.4em] text-white/70 transition-all duration-700 ${opening ? "opacity-0 -translate-y-4" : "opacity-100"}`}>
          {t.presents}
        </p>

        {/* Envelope */}
        <div
          className={`relative w-full max-w-md transition-all duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
            opening ? "scale-90 -translate-y-32 opacity-0" : "scale-100 translate-y-0 opacity-100"
          }`}
          style={{ perspective: "1200px" }}
        >
          <div className={`relative breath`}>
            {/* Envelope body */}
            <div
              role="button"
              tabIndex={0}
              onClick={handleOpen}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
              aria-label={t.openBtn}
              className="shimmer relative aspect-[3/2] cursor-pointer rounded-2xl glass-strong gold-border gold-glow"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.28 0.1 262 / 0.85), oklch(0.18 0.07 268 / 0.9))",
              }}
            >
              {/* Flap */}
              <div
                className={`absolute inset-x-0 top-0 origin-top transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  opening ? "[transform:rotateX(180deg)]" : ""
                }`}
                style={{
                  height: "55%",
                  background:
                    "linear-gradient(180deg, oklch(0.32 0.1 262 / 0.95), oklch(0.22 0.08 265 / 0.95))",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  borderTop: "1px solid oklch(0.84 0.13 85 / 0.5)",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              />

              {/* Logo behind flap */}
              <div className="absolute inset-0 flex items-center justify-center px-10 pb-8 pt-16">
                <img src={logo} alt="Caley Insurance" className="max-h-16 w-auto opacity-90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]" />
              </div>

              {/* Wax seal */}
              <div
                className={`absolute left-1/2 top-[55%] z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full pulse-soft transition-all duration-700 ${
                  opening ? "scale-0 opacity-0" : "scale-100 opacity-100"
                }`}
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.95 0.1 88), oklch(0.78 0.15 80) 50%, oklch(0.55 0.13 70) 100%)",
                  boxShadow:
                    "inset 0 -4px 8px oklch(0.3 0.08 60 / 0.5), inset 0 4px 8px oklch(1 0 0 / 0.3), 0 8px 30px oklch(0.84 0.13 85 / 0.5)",
                  border: "2px solid oklch(0.55 0.13 70)",
                }}
              >
                <span className="font-display text-4xl font-bold text-[oklch(0.25_0.08_60)]">8</span>
              </div>

              {/* Light burst on open */}
              {opening && (
                <div
                  className="absolute inset-0 rounded-2xl animate-[burst_1.2s_ease-out_forwards]"
                  style={{
                    background:
                      "radial-gradient(circle at center, oklch(1 0 0 / 0.9), oklch(0.84 0.13 85 / 0.5) 30%, transparent 70%)",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <h1 className={`mt-10 text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl transition-all duration-700 ${opening ? "opacity-0 translate-y-4" : "opacity-100"}`}>
          {t.envelopeHeadline}
        </h1>
        <p className={`mt-4 max-w-lg text-base text-white/75 sm:text-lg transition-all duration-700 ${opening ? "opacity-0" : "opacity-100"}`}>
          {t.envelopeSub}
        </p>

        <button
          onClick={handleOpen}
          disabled={opening}
          className={`mt-8 group relative overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-widest transition-all duration-500 ${
            opening ? "opacity-0 translate-y-4" : "opacity-100 hover:scale-105"
          }`}
          style={{
            background:
              "linear-gradient(135deg, oklch(0.92 0.08 88), oklch(0.78 0.15 80))",
            color: "oklch(0.18 0.06 265)",
            boxShadow:
              "0 10px 40px -10px oklch(0.84 0.13 85 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.4)",
          }}
        >
          <span className="relative z-10">{t.openBtn}</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
      </div>

      <style>{`
        @keyframes burst {
          0% { opacity: 0; transform: scale(0.6); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: scale(2.4); }
        }
      `}</style>
    </section>
  );
}
