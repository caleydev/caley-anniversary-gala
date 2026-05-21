import { useEffect, useState } from "react";
import type { Copy } from "@/lib/i18n";
import envelopeImg from "@/assets/envelope-gold.png";
import { NightSkyBackground } from "./NightSkyBackground";

type Stage = "idle" | "seal" | "glow" | "open" | "emerge" | "done";

export function EnvelopeReveal({ t, onOpen }: { t: Copy; onOpen: () => void }) {
  const [stage, setStage] = useState<Stage>("idle");
  const opening = stage !== "idle";

  useEffect(() => {
    if (stage === "idle") return;
    const timers: number[] = [];
    // Sequence: seal (0) → glow (350) → open (650) → emerge (1050) → done (1500)
    timers.push(window.setTimeout(() => setStage("glow"), 350));
    timers.push(window.setTimeout(() => setStage("open"), 650));
    timers.push(window.setTimeout(() => setStage("emerge"), 1050));
    timers.push(window.setTimeout(() => onOpen(), 1500));
    return () => timers.forEach(clearTimeout);
  }, [stage, onOpen]);

  const handleOpen = () => {
    if (opening) return;
    setStage("seal");
  };

  const showGlow = stage === "glow" || stage === "open" || stage === "emerge";
  const showSplit = stage === "open" || stage === "emerge";
  const showEmerge = stage === "emerge";

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

        {/* Envelope — the only clickable opener */}
        <button
          type="button"
          aria-label={t.envelopeHint}
          onClick={handleOpen}
          disabled={opening}
          className={`group relative block w-full max-w-[520px] cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[#f5d889]/70 rounded-2xl ${
            !opening ? "animate-[envBreathe_5s_ease-in-out_infinite] hover:scale-[1.03] transition-transform duration-500" : ""
          }`}
          style={{
            transition: "transform 1100ms cubic-bezier(0.65,0,0.35,1), opacity 900ms ease-out",
            transform: showEmerge
              ? "scale(1.22) translateY(-10px)"
              : showSplit
                ? "scale(1.06)"
                : undefined,
            opacity: showEmerge ? 0 : 1,
          }}
        >
          {/* Ground shadow */}
          <div
            className="pointer-events-none absolute left-1/2 -bottom-4 h-10 w-[75%] -translate-x-1/2 rounded-[50%] blur-3xl"
            style={{ background: "rgba(0,0,0,0.85)" }}
          />

          {/* Hover ambient glow */}
          <div
            className="pointer-events-none absolute -inset-10 rounded-[40%] opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(245,209,128,0.55), transparent 70%)",
            }}
          />

          <div className="relative">
            {/* SEAL hotspot reaction — a gold ring + pulse over the seal center */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "22%",
                aspectRatio: "1 / 1",
              }}
            >
              {/* Pulsing ring when seal stage triggers */}
              {(stage === "seal" || stage === "glow") && (
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "1.5px solid rgba(245,209,128,0.9)",
                    animation: "sealPulse 600ms ease-out forwards",
                  }}
                />
              )}
              {/* Inner bright flash on the seal */}
              {stage === "seal" && (
                <span
                  className="absolute inset-[15%] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,245,210,0.9), rgba(245,209,128,0.5) 50%, transparent 75%)",
                    animation: "sealFlash 550ms ease-out forwards",
                    mixBlendMode: "screen",
                  }}
                />
              )}
            </div>

            {/* Top half of envelope (splits upward) */}
            <div
              className="absolute inset-0 z-10 overflow-hidden"
              style={{
                clipPath: "inset(0 0 50% 0)",
                transition: "transform 700ms cubic-bezier(0.65,0,0.35,1)",
                transform: showSplit ? "translateY(-8%) rotateX(12deg)" : "translateY(0)",
                transformOrigin: "top center",
                filter: showSplit ? "drop-shadow(0 -10px 18px rgba(0,0,0,0.55))" : undefined,
              }}
            >
              <img
                src={envelopeImg}
                alt=""
                className="block w-full select-none"
                draggable={false}
                style={{
                  filter:
                    "drop-shadow(0 30px 50px rgba(0,0,0,0.75)) drop-shadow(0 0 25px rgba(245,209,128,0.28))",
                }}
              />
            </div>

            {/* Bottom half (stays / slight settle) */}
            <div
              className="relative z-0 overflow-hidden"
              style={{
                clipPath: "inset(50% 0 0 0)",
                transition: "transform 700ms cubic-bezier(0.65,0,0.35,1)",
                transform: showSplit ? "translateY(3%)" : "translateY(0)",
              }}
            >
              <img
                src={envelopeImg}
                alt="Caley Insurance invitation envelope"
                className="block w-full select-none"
                draggable={false}
                style={{
                  filter:
                    "drop-shadow(0 30px 50px rgba(0,0,0,0.75)) drop-shadow(0 0 25px rgba(245,209,128,0.28))",
                }}
              />
            </div>

            {/* Base envelope (fallback layer, hidden once split) — gives full silhouette before split */}
            <img
              src={envelopeImg}
              alt=""
              aria-hidden
              className="absolute inset-0 block w-full select-none transition-opacity duration-300"
              draggable={false}
              style={{
                opacity: showSplit ? 0 : 1,
                filter:
                  "drop-shadow(0 30px 50px rgba(0,0,0,0.75)) drop-shadow(0 0 25px rgba(245,209,128,0.28))",
                pointerEvents: "none",
              }}
            />

            {/* Light burst emerging from the seal/center */}
            {showGlow && (
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "120%",
                  aspectRatio: "1 / 1",
                  background:
                    "radial-gradient(circle, rgba(255,248,220,0.95), rgba(245,209,128,0.55) 25%, rgba(245,209,128,0.15) 50%, transparent 72%)",
                  animation: "centerBurst 900ms ease-out forwards",
                  mixBlendMode: "screen",
                }}
              />
            )}

            {/* Invitation card rising from inside */}
            {showEmerge && (
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-40 -translate-x-1/2"
                style={{
                  width: "78%",
                  height: "120%",
                  animation: "cardRise 700ms cubic-bezier(0.22,1,0.36,1) forwards",
                }}
              >
                <div
                  className="h-full w-full rounded-md"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,250,230,0.95), rgba(245,232,196,0.9))",
                    boxShadow:
                      "0 30px 80px rgba(0,0,0,0.6), 0 0 60px rgba(245,209,128,0.7), inset 0 0 0 1px rgba(214,168,79,0.6)",
                  }}
                />
              </div>
            )}

            {/* Subtle sheen sweep on hover (before opening) */}
            {!opening && (
              <div
                className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-2xl"
                aria-hidden
              >
                <span className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-1000 group-hover:left-full group-hover:opacity-100" />
              </div>
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
        @keyframes envBreathe {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes sealPulse {
          0% { transform: scale(0.85); opacity: 0; box-shadow: 0 0 0 0 rgba(245,209,128,0.7); }
          40% { opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; box-shadow: 0 0 40px 10px rgba(245,209,128,0); }
        }
        @keyframes sealFlash {
          0% { transform: scale(0.6); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes centerBurst {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
          30% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2.4); }
        }
        @keyframes cardRise {
          0% { opacity: 0; transform: translate(-50%, -10%) scaleY(0.4); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%, -90%) scaleY(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          .group { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
