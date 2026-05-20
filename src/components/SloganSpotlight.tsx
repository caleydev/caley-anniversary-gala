import slogan from "@/assets/slogan-call-someone-special.png";
import type { Copy } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export function SloganSpotlight({ t }: { t: Copy }) {
  return (
    <section className="relative py-20 sm:py-28">
      {/* Section glow tint */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,87,184,0.22), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1140px] px-5 sm:px-8">
        <Reveal>
          <div className="mx-auto max-w-5xl">
            <p
              className="mb-5 text-center text-[10px] uppercase tracking-[0.5em]"
              style={{ fontFamily: "'Cinzel', serif", color: "#d6a84f" }}
            >
              {t.sloganEyebrow}
            </p>

            {/* Frame */}
            <div
              className="relative overflow-hidden rounded-[24px] sm:rounded-[32px]"
              style={{
                border: "1px solid rgba(214,168,79,0.5)",
                boxShadow:
                  "0 50px 100px -30px rgba(0,0,0,0.8), 0 0 80px -20px rgba(0,87,184,0.55), inset 0 0 0 1px rgba(255,225,160,0.12)",
                background:
                  "linear-gradient(160deg, rgba(6,20,46,0.6), rgba(2,8,22,0.6))",
              }}
            >
              {/* Top gold hairline */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }}
              />

              {/* Slogan image — color matched into the dark navy field */}
              <div className="relative">
                <img
                  src={slogan}
                  alt="Call someone special today"
                  className="block h-auto w-full select-none"
                  draggable={false}
                  style={{
                    mixBlendMode: "screen",
                    filter:
                      "saturate(1.1) contrast(1.05) drop-shadow(0 0 30px rgba(80,150,255,0.35))",
                  }}
                />
                {/* Edge fade so the rectangle disappears into the page */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 50%, rgba(2,8,22,0.85) 100%)",
                  }}
                />
                {/* Subtle gold sparkles overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle at 12% 22%, rgba(245,209,128,0.5) 0 1.5px, transparent 2px), radial-gradient(circle at 85% 18%, rgba(245,209,128,0.5) 0 1.5px, transparent 2px), radial-gradient(circle at 78% 80%, rgba(245,209,128,0.45) 0 1.5px, transparent 2px), radial-gradient(circle at 20% 75%, rgba(245,209,128,0.45) 0 1.5px, transparent 2px)",
                  }}
                />
              </div>
            </div>

            <p
              className="mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t.sloganCaption}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
