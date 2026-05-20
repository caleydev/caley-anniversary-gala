import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { copy, type Lang, type Copy } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { EnvelopeReveal } from "@/components/EnvelopeReveal";
import { FireworksBackground } from "@/components/FireworksBackground";
import { ParticleField } from "@/components/ParticleField";
import { FloatingLogo } from "@/components/FloatingLogo";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";
import logo from "@/assets/caley-logo.webp";
import shield from "@/assets/caley-shield.webp";
import {
  Calendar, Clock, MapPin, Users, Music, PartyPopper, Gift, Sparkles,
  UsersRound, Star, Trophy, Ticket, Award, Crown, Sprout, TrendingUp, Heart,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caley Insurance · 8.º Aniversario" },
      { name: "description", content: "Una celebración elegante por el 8.º aniversario de Caley Insurance. 27 de junio de 2026, Miami, FL." },
      { property: "og:title", content: "Caley Insurance · 8.º Aniversario" },
      { property: "og:description", content: "The Event of the Year — 27 de junio de 2026." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Page,
});

const expectIcons = [Music, PartyPopper, Gift, Sparkles, UsersRound, Star];
const prizeIcons = [Trophy, Ticket, Sparkles, Award];
const storyIcons = [Sprout, TrendingUp, Heart, Crown];

function Page() {
  const [lang, setLang] = useState<Lang>("es");
  const [isOpened, setIsOpened] = useState(false);
  const t = copy[lang];

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <BallroomBackground />
      <FireworksBackground intensity={isOpened ? 0.5 : 0.2} />
      <ParticleField count={isOpened ? 40 : 18} />
      <LanguageToggle lang={lang} setLang={setLang} />

      {!isOpened ? (
        <EnvelopeReveal t={t} onOpen={() => setIsOpened(true)} />
      ) : (
        <>
          <FloatingLogo />
          <div className="relative z-10 animate-[fadeIn_1.2s_ease-out]">
            <Hero t={t} />
            <EventDetails t={t} />
            <Expect t={t} />
            <Prizes t={t} />
            <Story t={t} />
            <CountdownSection t={t} />
            <FinalInvitation t={t} />
            <Footer t={t} />
          </div>
          <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </>
      )}
    </main>
  );
}

/* ---------- Cinematic ballroom background ---------- */
function BallroomBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* Deep navy base + ballroom atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(0,87,184,0.35) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 50% 100%, rgba(214,168,79,0.18) 0%, transparent 65%), radial-gradient(ellipse 40% 60% at 12% 60%, rgba(0,166,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 88% 70%, rgba(0,166,255,0.16) 0%, transparent 60%), linear-gradient(180deg, #020817 0%, #04102a 50%, #02071a 100%)",
        }}
      />
      {/* Abstract chandelier silhouette */}
      <div
        className="absolute left-1/2 top-0 h-[40vh] w-[60vw] -translate-x-1/2 opacity-25"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 0%, rgba(245,199,107,0.45), transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Light beams */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            "conic-gradient(from 200deg at 50% -10%, transparent 0deg, rgba(0,166,255,0.08) 20deg, transparent 40deg, transparent 320deg, rgba(245,199,107,0.07) 340deg, transparent 360deg)",
        }}
      />
      {/* Reflective floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[35vh]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,87,184,0.15) 50%, rgba(0,166,255,0.12) 100%)",
          maskImage: "linear-gradient(to bottom, transparent, black 40%)",
        }}
      />
      {/* Bokeh orbs */}
      {Array.from({ length: 14 }).map((_, i) => {
        const top = (i * 73) % 100;
        const left = (i * 41) % 100;
        const size = 8 + ((i * 9) % 28);
        const dim = (i % 2 === 0);
        return (
          <div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              background: dim
                ? "rgba(245,199,107,0.45)"
                : "rgba(0,166,255,0.45)",
              opacity: 0.4,
            }}
          />
        );
      })}
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1140px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/* ---------- Gold divider ornament ---------- */
function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span
        className="h-px w-16 sm:w-24"
        style={{ background: "linear-gradient(to right, transparent, #d6a84f)" }}
      />
      <span className="text-[var(--gold)] text-xs">✦</span>
      <span
        className="h-px w-16 sm:w-24"
        style={{ background: "linear-gradient(to left, transparent, #d6a84f)" }}
      />
    </div>
  );
}

/* ---------- HERO (event poster) ---------- */
function Hero({ t }: { t: Copy }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center py-20 sm:py-24">
      <Container className="relative">
        <Reveal className="mx-auto max-w-4xl rounded-[28px] p-8 text-center sm:p-14"
          style={{
            background:
              "linear-gradient(160deg, rgba(6,20,46,0.85) 0%, rgba(4,16,42,0.75) 100%)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(214,168,79,0.45)",
            boxShadow: "0 40px 80px -30px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,225,160,0.08), 0 0 80px -20px rgba(0,87,184,0.4)",
          }}
        >
          <img src={logo} alt="Caley Insurance" className="mx-auto mb-6 h-12 w-auto sm:h-16" />
          <p
            className="text-[10px] uppercase tracking-[0.55em] text-white/70 sm:text-xs"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {t.heroBrand}
          </p>

          <GoldDivider className="my-7" />

          <p
            className="text-[11px] uppercase tracking-[0.6em] sm:text-sm"
            style={{
              fontFamily: "'Cinzel', serif",
              background: "linear-gradient(180deg, #ffe2a3, #d6a84f)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {t.heroCelebrating}
          </p>

          {/* 8 + Years composition */}
          <div className="relative my-2 flex items-center justify-center sm:my-4">
            <span
              className="leading-none"
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: "clamp(8rem, 22vw, 18rem)",
                background:
                  "linear-gradient(180deg, #fff4d2 0%, #f5c76b 35%, #d6a84f 65%, #8a6824 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 12px 30px rgba(214,168,79,0.35))",
                textShadow: "0 0 60px rgba(245,199,107,0.25)",
              }}
            >
              8
            </span>
            <span
              className="absolute right-[18%] bottom-[12%] sm:right-[20%] sm:bottom-[18%]"
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                color: "#ffe2a3",
                transform: "rotate(-10deg)",
                textShadow: "0 4px 18px rgba(0,0,0,0.6), 0 0 24px rgba(245,199,107,0.5)",
              }}
            >
              {t.heroYears}
            </span>
          </div>

          <p
            className="mt-2 text-[10px] uppercase tracking-[0.42em] text-white/70 sm:text-xs"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {t.heroTagline}
          </p>

          <GoldDivider className="my-8" />

          <h1
            className="text-3xl font-medium sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "'Cinzel', serif",
              letterSpacing: "0.04em",
              background: "linear-gradient(180deg, #ffffff 0%, #cfe7ff 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 40px rgba(0,166,255,0.3)",
            }}
          >
            {t.heroEventTitle}
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
            {t.heroPara1}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
            {t.heroPara2}
          </p>

          {/* Quick details strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.3em] text-white/80 sm:text-sm">
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[var(--gold)]" />{t.dateV}</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-[var(--gold)]" />{t.timeV}</span>
            <span className="hidden h-3 w-px bg-white/20 sm:block" />
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--gold)]" />Miami, FL</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Section title ---------- */
function SectionTitle({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <p
          className="mb-3 text-[10px] uppercase tracking-[0.5em]"
          style={{ fontFamily: "'Cinzel', serif", color: "#d6a84f" }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl sm:text-5xl"
        style={{
          fontFamily: "'Cinzel', serif",
          background: "linear-gradient(180deg, #ffffff 0%, #f5c76b 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          letterSpacing: "0.02em",
        }}
      >
        {title}
      </h2>
      <GoldDivider className="my-5" />
      {sub && <p className="mt-2 text-base text-white/75 sm:text-lg">{sub}</p>}
    </div>
  );
}

/* ---------- Event details ---------- */
function EventDetails({ t }: { t: Copy }) {
  const items = [
    { Icon: Calendar, label: t.dateL, value: t.dateV },
    { Icon: Clock, label: t.timeL, value: t.timeV },
    { Icon: MapPin, label: t.placeL, value: `${t.placeV1} · ${t.placeV2}` },
  ];
  return (
    <section id="details" className="relative py-20 sm:py-24">
      <Container>
        <Reveal><SectionTitle eyebrow={t.detailsEyebrow} title={t.detailsTitle} /></Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {items.map(({ Icon, label, value }, i) => (
            <Reveal key={label} delay={i * 90}>
              <div
                className="group relative h-full overflow-hidden rounded-2xl p-7 text-center transition-all hover:-translate-y-1"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(214,168,79,0.35)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -30px rgba(0,0,0,0.7)",
                }}
              >
                {/* Top gold line */}
                <div
                  className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }}
                />
                {/* Blue glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(0,166,255,0.25), transparent 60%)",
                  }}
                />

                <div
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #fff4d2, #d6a84f 60%, #8a6824)",
                    boxShadow: "0 8px 24px -6px rgba(214,168,79,0.6)",
                  }}
                >
                  <Icon className="h-6 w-6" style={{ color: "#2a1b04" }} strokeWidth={1.5} />
                </div>
                <div
                  className="text-[10px] uppercase tracking-[0.4em] text-white/60"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {label}
                </div>
                <div
                  className="mt-3 text-xl text-white sm:text-2xl"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                >
                  {value}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Guests banner */}
        <Reveal>
          <div
            className="mt-8 flex items-center justify-center gap-3 rounded-full px-6 py-4 text-center text-sm sm:text-base"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,87,184,0.25), rgba(214,168,79,0.18), rgba(0,87,184,0.25))",
              border: "1px solid rgba(214,168,79,0.4)",
              backdropFilter: "blur(14px)",
            }}
          >
            <Users className="h-5 w-5 shrink-0 text-[var(--gold)]" />
            <span className="text-white/90" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem" }}>
              {t.guestsLine}
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- What to expect ---------- */
function Expect({ t }: { t: Copy }) {
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal><SectionTitle title={t.expectTitle} /></Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.expectCards.map((c, i) => {
            const Icon = expectIcons[i];
            return (
              <Reveal key={i} delay={i * 60}>
                <div
                  className="group relative h-full overflow-hidden rounded-2xl p-7 transition-all hover:-translate-y-2"
                  style={{
                    background:
                      "linear-gradient(160deg, rgba(8,20,46,0.7), rgba(4,12,32,0.7))",
                    border: "1px solid rgba(214,168,79,0.3)",
                    backdropFilter: "blur(18px)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 60px -30px rgba(0,0,0,0.6)",
                  }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(214,168,79,0.8), transparent)" }}
                  />
                  <div
                    className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ boxShadow: "0 0 50px -10px rgba(0,166,255,0.5) inset" }}
                  />
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(245,199,107,0.2), rgba(0,166,255,0.2))",
                      border: "1px solid rgba(214,168,79,0.4)",
                    }}
                  >
                    <Icon className="h-5 w-5" style={{ color: "#f5c76b" }} strokeWidth={1.5} />
                  </div>
                  <h3
                    className="text-2xl text-white"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                  >
                    {c.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{c.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Prizes ---------- */
function Prizes({ t }: { t: Copy }) {
  return (
    <section className="relative py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(214,168,79,0.12), transparent 70%)" }}
      />
      <Container className="relative">
        <Reveal><SectionTitle title={t.prizesTitle} sub={t.prizesSub} /></Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {t.prizes.map((p, i) => {
            const Icon = prizeIcons[i];
            return (
              <Reveal key={p} delay={i * 80}>
                <div
                  className="group relative overflow-hidden rounded-2xl p-7 transition-all hover:-translate-y-1"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                    backdropFilter: "blur(22px)",
                    border: "1px solid rgba(214,168,79,0.45)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.1), 0 0 50px -20px rgba(214,168,79,0.5)",
                  }}
                >
                  <Star className="absolute right-5 top-5 h-3 w-3 text-[var(--gold)] opacity-60" />
                  <Sparkles className="absolute right-12 bottom-5 h-3 w-3 text-[var(--gold)] opacity-50" />
                  <div className="flex items-center gap-5">
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, #fff4d2, #f5c76b 50%, #a4781c)",
                        boxShadow: "0 10px 30px -8px rgba(214,168,79,0.7)",
                      }}
                    >
                      <Icon className="h-6 w-6" style={{ color: "#2a1b04" }} strokeWidth={1.5} />
                    </div>
                    <h3
                      className="text-2xl text-white"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                    >
                      {p}
                    </h3>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ---------- Story timeline ---------- */
function Story({ t }: { t: Copy }) {
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal><SectionTitle title={t.storyTitle} sub={t.storySub} /></Reveal>
        <div className="relative">
          <div
            className="absolute left-6 top-0 h-full w-px sm:left-1/2 sm:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(214,168,79,0.6), rgba(0,166,255,0.5), transparent)",
              boxShadow: "0 0 12px rgba(214,168,79,0.5)",
            }}
          />
          <div className="space-y-8">
            {t.timeline.map((s, i) => {
              const Icon = storyIcons[i];
              const left = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className={`relative flex items-start gap-5 sm:items-center ${left ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    <div
                      className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:mx-auto"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 30%, #fff4d2, #d6a84f 60%, #8a6824)",
                        boxShadow: "0 0 24px rgba(214,168,79,0.6)",
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "#2a1b04" }} strokeWidth={1.5} />
                    </div>
                    <div
                      className={`flex-1 rounded-2xl p-6 sm:max-w-md ${left ? "sm:mr-auto sm:text-right" : "sm:ml-auto sm:text-left"}`}
                      style={{
                        background: "linear-gradient(160deg, rgba(8,20,46,0.7), rgba(4,12,32,0.5))",
                        border: "1px solid rgba(214,168,79,0.3)",
                        backdropFilter: "blur(18px)",
                      }}
                    >
                      <div
                        className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3
                        className="mt-2 text-2xl text-white"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
                      >
                        {s.t}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/75">{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CountdownSection({ t }: { t: Copy }) {
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal><SectionTitle title={t.countdownTitle} /></Reveal>
        <Reveal delay={150}>
          <Countdown t={t} />
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Final invitation card ---------- */
function FinalInvitation({ t }: { t: Copy }) {
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-[28px] p-10 text-center sm:p-16"
            style={{
              background:
                "linear-gradient(160deg, rgba(8,20,46,0.85), rgba(4,12,32,0.85))",
              backdropFilter: "blur(22px)",
              border: "1px solid rgba(214,168,79,0.5)",
              boxShadow:
                "0 50px 100px -40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,225,160,0.15), 0 0 100px -30px rgba(0,87,184,0.45)",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }}
            />

            <img
              src={shield}
              alt=""
              className="mx-auto mb-6 h-14 w-14 drop-shadow-[0_0_24px_rgba(245,199,107,0.6)]"
            />
            <p
              className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {t.heroBrand}
            </p>
            <GoldDivider className="my-6" />
            <h2
              className="text-3xl sm:text-5xl"
              style={{
                fontFamily: "'Cinzel', serif",
                background: "linear-gradient(180deg, #fff4d2 0%, #d6a84f 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                letterSpacing: "0.02em",
              }}
            >
              {t.finalTitle}
            </h2>
            <p
              className="mx-auto mt-6 max-w-xl text-base text-white/80 sm:text-lg"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {t.finalBody}
            </p>
            <GoldDivider className="my-8" />
            <p
              className="text-sm uppercase tracking-[0.3em] text-white/85 sm:text-base"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {t.finalDetail}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer({ t }: { t: Copy }) {
  return (
    <footer className="relative py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <p
              className="text-base uppercase tracking-[0.4em] text-white/80 sm:text-lg"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {t.footerMotto}
            </p>
            <p
              className="mt-6 text-2xl text-white sm:text-3xl"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#ffe2a3" }}
            >
              {t.footerThanks}
            </p>
            <p
              className="mt-2 text-xl text-white/85 sm:text-2xl"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#f5c76b" }}
            >
              {t.footerCheers}
            </p>
            <GoldDivider className="my-8" />
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/55">
              {t.footerName}
            </p>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
