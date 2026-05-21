import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { copy, type Lang, type Copy } from "@/lib/i18n";
import { LanguageToggle } from "@/components/LanguageToggle";
import { EnvelopeReveal } from "@/components/EnvelopeReveal";
import { FireworksBackground } from "@/components/FireworksBackground";
import { NightSkyBackground } from "@/components/NightSkyBackground";
import { ParticleField } from "@/components/ParticleField";
import { FloatingLogo } from "@/components/FloatingLogo";
import { Countdown } from "@/components/Countdown";
import { Reveal } from "@/components/Reveal";

import logo from "@/assets/caley-logo.webp";
import shield from "@/assets/caley-shield.webp";
import {
  Calendar, Clock, MapPin, Users, Music, PartyPopper, Gift, Sparkles,
  UsersRound, Star, Trophy, Award, Crown,
  ChevronDown, CalendarPlus, Copy as CopyIcon, ExternalLink, Quote,
} from "lucide-react";
import { generateICSFile, openGoogleMaps, copyAddress } from "@/lib/actions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caley Insurance · 8.º Aniversario" },
      { name: "description", content: "Acompáñanos en la gran celebración del 8.º aniversario de Caley Insurance. 27 de junio de 2026, Miami, FL." },
      { property: "og:title", content: "Caley Insurance · 8.º Aniversario" },
      { property: "og:description", content: "The Event of the Year — 27 de junio de 2026." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Page,
});

const expectIcons = [PartyPopper, Gift, Sparkles, UsersRound, Star];

function Page() {
  const [lang, setLang] = useState<Lang>("es");
  const [isOpened, setIsOpened] = useState(false);
  const t = copy[lang];

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <NightSkyBackground />
      </div>
      <FireworksBackground intensity={isOpened ? 0.4 : 0.18} />
      <ParticleField count={isOpened ? 36 : 16} />
      <LanguageToggle lang={lang} setLang={setLang} />

      {!isOpened ? (
        <EnvelopeReveal t={t} onOpen={() => setIsOpened(true)} />
      ) : (
        <>
          <FloatingLogo />
          <div className="relative z-10 animate-[fadeIn_1.2s_ease-out]">
            <Hero t={t} />
            <BrandQuote t={t} />
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

/* ---------- Cinematic midnight ballroom background (inner pages) ---------- */
function BallroomBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(10,40,90,0.55) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 50% 100%, rgba(180,135,55,0.14) 0%, transparent 65%), radial-gradient(ellipse 40% 60% at 10% 55%, rgba(20,60,130,0.22) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 90% 70%, rgba(20,60,130,0.20) 0%, transparent 60%), linear-gradient(180deg, #01030c 0%, #030a1e 45%, #01030c 100%)",
        }}
      />
      <div
        className="absolute left-1/2 top-0 h-[40vh] w-[60vw] -translate-x-1/2 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 50% 0%, rgba(245,209,128,0.45), transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "conic-gradient(from 200deg at 50% -10%, transparent 0deg, rgba(0,120,220,0.06) 20deg, transparent 40deg, transparent 320deg, rgba(245,209,128,0.06) 340deg, transparent 360deg)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[35vh]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10,40,90,0.20) 50%, rgba(0,120,220,0.10) 100%)",
          maskImage: "linear-gradient(to bottom, transparent, black 40%)",
        }}
      />
      {Array.from({ length: 16 }).map((_, i) => {
        const top = (i * 73) % 100;
        const left = (i * 41) % 100;
        const size = 6 + ((i * 9) % 24);
        const gold = i % 3 !== 0;
        return (
          <div
            key={i}
            className="absolute rounded-full blur-2xl"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              background: gold ? "rgba(245,209,128,0.55)" : "rgba(0,120,220,0.45)",
              opacity: 0.4,
            }}
          />
        );
      })}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 75% at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
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

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 sm:w-24" style={{ background: "linear-gradient(to right, transparent, #d6a84f)" }} />
      <span className="text-[var(--gold)] text-xs">✦</span>
      <span className="h-px w-16 sm:w-24" style={{ background: "linear-gradient(to left, transparent, #d6a84f)" }} />
    </div>
  );
}

/* Section divider — ornament between sections to break repetition */
function OrnamentDivider() {
  return (
    <div className="relative flex items-center justify-center py-6 sm:py-8">
      <span className="h-px w-[18%] max-w-[160px]" style={{ background: "linear-gradient(to right, transparent, rgba(214,168,79,0.6))" }} />
      <div
        className="mx-4 flex h-8 w-8 items-center justify-center rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, #fff4d2, #d6a84f 60%, #8a6824)",
          boxShadow: "0 0 18px rgba(214,168,79,0.5)",
        }}
      >
        <span style={{ fontFamily: "'Cinzel', serif", color: "#2a1b04", fontWeight: 700, fontSize: 11 }}>C</span>
      </div>
      <span className="h-px w-[18%] max-w-[160px]" style={{ background: "linear-gradient(to left, transparent, rgba(214,168,79,0.6))" }} />
    </div>
  );
}

/* ---------- HERO (event poster) ---------- */
function Hero({ t }: { t: Copy }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center py-20 sm:py-24">
      <Container className="relative">
        <Reveal
          className="mx-auto max-w-4xl rounded-[28px] p-8 text-center sm:p-14"
          style={{
            background: "linear-gradient(160deg, rgba(6,20,46,0.85) 0%, rgba(4,16,42,0.75) 100%)",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(214,168,79,0.45)",
            boxShadow:
              "0 40px 80px -30px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,225,160,0.08), 0 0 80px -20px rgba(0,87,184,0.4)",
          }}
        >
          <img src={logo} alt="Caley Insurance" className="mx-auto mb-6 h-12 w-auto sm:h-16" />
          <p className="text-[10px] uppercase tracking-[0.55em] text-white/70 sm:text-xs" style={{ fontFamily: "'Cinzel', serif" }}>
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

          <div className="relative my-2 flex items-center justify-center sm:my-4">
            <span
              className="leading-none"
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                fontSize: "clamp(8rem, 22vw, 18rem)",
                background: "linear-gradient(180deg, #fff4d2 0%, #f5c76b 35%, #d6a84f 65%, #8a6824 100%)",
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

          <p className="mt-2 text-[10px] uppercase tracking-[0.42em] text-white/70 sm:text-xs" style={{ fontFamily: "'Cinzel', serif" }}>
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

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{t.heroPara1}</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">{t.heroPara2}</p>
        </Reveal>

        <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:mt-16">
          <p className="text-[10px] uppercase tracking-[0.45em] text-white/60 sm:text-xs" style={{ fontFamily: "'Cinzel', serif" }}>
            {t.scrollCue}
          </p>
          <ChevronDown className="h-5 w-5 text-[var(--gold)]" style={{ animation: "scrollCueBounce 2.4s ease-in-out infinite" }} />
        </div>
        <style>{`@keyframes scrollCueBounce { 0%,100% { transform: translateY(0); opacity: .6; } 50% { transform: translateY(8px); opacity: 1; } }`}</style>
      </Container>
    </section>
  );
}

/* ---------- Brand quote intermission (narrow framed moment) ---------- */
function BrandQuote({ t }: { t: Copy }) {
  return (
    <section className="relative py-14 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <Quote className="mx-auto h-6 w-6 text-[var(--gold)] opacity-80" />
            <p
              className="mt-5 text-2xl leading-snug text-white/90 sm:text-3xl md:text-4xl"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
            >
              "{t.brandQuote}"
            </p>
            <p
              className="mt-6 text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {t.brandQuoteAuthor}
            </p>
          </div>
        </Reveal>
        <OrnamentDivider />
      </Container>
    </section>
  );
}

/* ---------- Section title ---------- */
function SectionTitle({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <p className="mb-3 text-[10px] uppercase tracking-[0.5em]" style={{ fontFamily: "'Cinzel', serif", color: "#d6a84f" }}>
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
function DetailCard({
  Icon, label, value, children, delay = 0,
}: {
  Icon: typeof Calendar; label: string; value: React.ReactNode; children?: React.ReactNode; delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className="group relative flex h-full flex-col items-center overflow-hidden rounded-2xl p-7 text-center transition-all hover:-translate-y-1"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(214,168,79,0.35)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 60px -30px rgba(0,0,0,0.7)",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }} />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(circle at 50% 0%, rgba(0,166,255,0.25), transparent 60%)" }}
        />
        <div
          className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, #fff4d2, #d6a84f 60%, #8a6824)",
            boxShadow: "0 8px 24px -6px rgba(214,168,79,0.6)",
          }}
        >
          <Icon className="h-6 w-6" style={{ color: "#2a1b04" }} strokeWidth={1.5} />
        </div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/60" style={{ fontFamily: "'Cinzel', serif" }}>
          {label}
        </div>
        <div className="mt-3 text-xl text-white sm:text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
          {value}
        </div>
        {children && <div className="mt-5 flex flex-wrap items-center justify-center gap-2">{children}</div>}
      </div>
    </Reveal>
  );
}

function GoldPillButton({ onClick, Icon, children }: { onClick: () => void; Icon: typeof Calendar; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] transition-all hover:scale-[1.03]"
      style={{
        background: "linear-gradient(135deg, #f5c76b 0%, #d6a84f 55%, #a4781c 100%)",
        color: "#0a1838",
        fontFamily: "'Cinzel', serif",
        boxShadow: "0 8px 22px -8px rgba(214,168,79,0.7), inset 0 1px 0 rgba(255,240,200,0.5), inset 0 -1px 2px rgba(80,55,10,0.4)",
      }}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      <span>{children}</span>
    </button>
  );
}

function GhostPillButton({ onClick, Icon, children }: { onClick: () => void; Icon: typeof Calendar; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/85 transition-all hover:bg-white/5 hover:text-white"
      style={{
        fontFamily: "'Cinzel', serif",
        border: "1px solid rgba(214,168,79,0.45)",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(8px)",
      }}
    >
      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      <span>{children}</span>
    </button>
  );
}

function EventDetails({ t }: { t: Copy }) {
  return (
    <section id="details" className="relative py-20 sm:py-24">
      <Container>
        <Reveal><SectionTitle eyebrow={t.detailsEyebrow} title={t.detailsTitle} /></Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          <DetailCard Icon={Calendar} label={t.dateL} value={t.dateV} delay={0}>
            <GoldPillButton
              onClick={() => generateICSFile({ title: t.icsTitle, description: t.icsDescription })}
              Icon={CalendarPlus}
            >
              {t.saveDateBtn}
            </GoldPillButton>
          </DetailCard>

          <DetailCard Icon={Clock} label={t.timeL} value={t.timeV} delay={90} />

          <DetailCard
            Icon={MapPin}
            label={t.placeL}
            value={
              <span className="flex flex-col leading-tight">
                <span>{t.placeV1}</span>
                <span className="text-white/80">{t.placeV2}</span>
              </span>
            }
            delay={180}
          >
            <GoldPillButton onClick={openGoogleMaps} Icon={ExternalLink}>{t.openMapsBtn}</GoldPillButton>
            <GhostPillButton onClick={() => copyAddress(t.addressCopiedToast)} Icon={CopyIcon}>{t.copyAddressBtn}</GhostPillButton>
          </DetailCard>
        </div>

        <Reveal>
          <div
            className="mt-8 flex items-center justify-center gap-3 rounded-full px-6 py-4 text-center text-sm sm:text-base"
            style={{
              background: "linear-gradient(90deg, rgba(0,87,184,0.25), rgba(214,168,79,0.18), rgba(0,87,184,0.25))",
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

/* ---------- What to expect — featured + grid ---------- */
function Expect({ t }: { t: Copy }) {
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal><SectionTitle eyebrow={t.expectEyebrow} title={t.expectTitle} /></Reveal>

        <div className="grid gap-5 lg:grid-cols-5">
          {/* Featured Music card (large, spans 3) */}
          <Reveal className="lg:col-span-3">
            <div
              className="group relative h-full overflow-hidden rounded-3xl p-8 sm:p-10"
              style={{
                background:
                  "linear-gradient(150deg, rgba(0,87,184,0.32) 0%, rgba(6,20,46,0.85) 55%, rgba(2,8,22,0.9) 100%)",
                border: "1px solid rgba(214,168,79,0.45)",
                backdropFilter: "blur(18px)",
                boxShadow:
                  "0 50px 100px -30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 80px -20px rgba(0,166,255,0.45)",
              }}
            >
              {/* Ambient music waves */}
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-60"
                style={{ background: "radial-gradient(circle, rgba(0,166,255,0.35), transparent 70%)", filter: "blur(40px)" }}
              />
              <div
                className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full opacity-50"
                style={{ background: "radial-gradient(circle, rgba(245,209,128,0.35), transparent 70%)", filter: "blur(40px)" }}
              />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                <div
                  className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
                  style={{
                    background: "radial-gradient(circle at 30% 30%, #fff4d2, #d6a84f 60%, #8a6824)",
                    boxShadow: "0 12px 36px -8px rgba(214,168,79,0.7)",
                  }}
                >
                  <Music className="h-9 w-9" style={{ color: "#2a1b04" }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]" style={{ fontFamily: "'Cinzel', serif" }}>
                    {t.expectFeatured.tag}
                  </p>
                  <h3
                    className="text-3xl sm:text-4xl"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                      background: "linear-gradient(180deg, #ffffff, #cfe7ff)",
                      WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                    }}
                  >
                    {t.expectFeatured.t}
                  </h3>
                  <p className="mt-3 max-w-md text-base leading-relaxed text-white/80">{t.expectFeatured.d}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right column: 2 smaller cards stacked */}
          <div className="grid gap-5 lg:col-span-2">
            {t.expectCards.slice(0, 2).map((c, i) => (
              <ExpectMiniCard key={i} t={c.t} d={c.d} Icon={expectIcons[i]} delay={i * 70} />
            ))}
          </div>
        </div>

        {/* Lower row — 3 mini cards */}
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          {t.expectCards.slice(2).map((c, i) => (
            <ExpectMiniCard key={i + 2} t={c.t} d={c.d} Icon={expectIcons[i + 2]} delay={i * 70} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ExpectMiniCard({ t, d, Icon, delay = 0 }: { t: string; d: string; Icon: typeof Music; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div
        className="group relative h-full overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1"
        style={{
          background: "linear-gradient(160deg, rgba(8,20,46,0.7), rgba(4,12,32,0.7))",
          border: "1px solid rgba(214,168,79,0.3)",
          backdropFilter: "blur(18px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 30px 60px -30px rgba(0,0,0,0.6)",
        }}
      >
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(214,168,79,0.8), transparent)" }} />
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(245,199,107,0.22), rgba(0,166,255,0.22))",
              border: "1px solid rgba(214,168,79,0.4)",
            }}
          >
            <Icon className="h-4 w-4" style={{ color: "#f5c76b" }} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
            {t}
          </h3>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/70">{d}</p>
      </div>
    </Reveal>
  );
}

/* ---------- Prizes — featured + chips ---------- */
function Prizes({ t }: { t: Copy }) {
  return (
    <section className="relative py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(214,168,79,0.12), transparent 70%)" }}
      />
      <Container className="relative">
        <Reveal><SectionTitle eyebrow={t.prizesEyebrow} title={t.prizesTitle} sub={t.prizesSub} /></Reveal>

        {/* Featured prize card */}
        <Reveal>
          <div
            className="relative mx-auto max-w-3xl overflow-hidden rounded-[28px] p-8 text-center sm:p-12"
            style={{
              background: "linear-gradient(160deg, rgba(40,28,5,0.55), rgba(6,20,46,0.85))",
              border: "1px solid rgba(214,168,79,0.6)",
              boxShadow:
                "0 50px 100px -30px rgba(0,0,0,0.8), 0 0 90px -10px rgba(214,168,79,0.45), inset 0 1px 0 rgba(255,225,160,0.18)",
            }}
          >
            {/* Subtle moving sparkle */}
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(circle at 18% 22%, rgba(255,245,210,0.85) 0 1.5px, transparent 2px), radial-gradient(circle at 78% 18%, rgba(255,245,210,0.7) 0 1.5px, transparent 2px), radial-gradient(circle at 65% 78%, rgba(255,245,210,0.6) 0 1.5px, transparent 2px), radial-gradient(circle at 25% 75%, rgba(255,245,210,0.5) 0 1.5px, transparent 2px)",
              }}
            />
            <div
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, #fff4d2, #f5c76b 50%, #a4781c)",
                boxShadow: "0 14px 40px -10px rgba(214,168,79,0.8), 0 0 60px rgba(214,168,79,0.35)",
                animation: "trophyPulse 3.5s ease-in-out infinite",
              }}
            >
              <Trophy className="h-9 w-9" style={{ color: "#2a1b04" }} strokeWidth={1.5} />
            </div>
            <p className="mt-5 text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]" style={{ fontFamily: "'Cinzel', serif" }}>
              {t.prizeFeatured.tag}
            </p>
            <h3
              className="mt-2 text-3xl sm:text-4xl"
              style={{
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 600,
                background: "linear-gradient(180deg, #fff4d2 0%, #d6a84f 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
              }}
            >
              {t.prizeFeatured.t}
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/80">{t.prizeFeatured.d}</p>
          </div>
        </Reveal>

        {/* Secondary prize chips */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {t.prizes.map((p, i) => (
            <Reveal key={p} delay={i * 80}>
              <div
                className="flex items-center gap-3 rounded-full px-5 py-4"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  border: "1px solid rgba(214,168,79,0.4)",
                  backdropFilter: "blur(14px)",
                }}
              >
                <Sparkles className="h-4 w-4 shrink-0 text-[var(--gold)]" />
                <span className="text-sm text-white/90" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>
                  {p}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
      <style>{`@keyframes trophyPulse { 0%,100% { transform: scale(1); box-shadow: 0 14px 40px -10px rgba(214,168,79,0.8), 0 0 60px rgba(214,168,79,0.35); } 50% { transform: scale(1.04); box-shadow: 0 14px 40px -10px rgba(214,168,79,1), 0 0 90px rgba(214,168,79,0.55); } }`}</style>
    </section>
  );
}

/* ---------- Story timeline with years ---------- */
function Story({ t }: { t: Copy }) {
  const icons = [Sparkles, Award, Users, Crown];
  return (
    <section className="relative py-20 sm:py-24">
      <Container>
        <Reveal><SectionTitle eyebrow={t.storyEyebrow} title={t.storyTitle} sub={t.storySub} /></Reveal>
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical glowing line */}
          <div
            className="absolute left-6 top-0 h-full w-px sm:left-1/2 sm:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(214,168,79,0.7) 15%, rgba(0,166,255,0.55) 50%, rgba(214,168,79,0.7) 85%, transparent)",
              boxShadow: "0 0 14px rgba(214,168,79,0.55)",
            }}
          />
          <div className="space-y-10">
            {t.timeline.map((s, i) => {
              const Icon = icons[i];
              const left = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className={`relative flex items-start gap-5 ${left ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    {/* Marker */}
                    <div
                      className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:mx-auto"
                      style={{
                        background: "radial-gradient(circle at 30% 30%, #fff4d2, #d6a84f 60%, #8a6824)",
                        boxShadow: "0 0 28px rgba(214,168,79,0.7)",
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "#2a1b04" }} strokeWidth={1.5} />
                      <span
                        className="absolute -bottom-7 text-[10px] tracking-[0.3em] text-[var(--gold)]"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {s.y}
                      </span>
                    </div>

                    <div
                      className={`flex-1 rounded-2xl p-6 sm:max-w-sm ${left ? "sm:mr-auto sm:text-right" : "sm:ml-auto sm:text-left"}`}
                      style={{
                        background: "linear-gradient(160deg, rgba(8,20,46,0.75), rgba(4,12,32,0.55))",
                        border: "1px solid rgba(214,168,79,0.3)",
                        backdropFilter: "blur(18px)",
                      }}
                    >
                      <div className="text-[10px] uppercase tracking-[0.4em] text-[var(--gold)]" style={{ fontFamily: "'Cinzel', serif" }}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-2 text-2xl text-white" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
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

/* ---------- Countdown — wrapped in a luxury frame ---------- */
function CountdownSection({ t }: { t: Copy }) {
  return (
    <section className="relative py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 h-96 -translate-y-1/2"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(0,87,184,0.3), transparent 70%)" }}
      />
      <Container>
        <Reveal>
          <div className="mx-auto mb-10 max-w-xl text-center">
            <p className="mb-3 text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]" style={{ fontFamily: "'Cinzel', serif" }}>
              {t.countdownEyebrow}
            </p>
            <h2
              className="text-3xl sm:text-5xl"
              style={{
                fontFamily: "'Cinzel', serif",
                background: "linear-gradient(180deg, #ffffff 0%, #cfe7ff 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                letterSpacing: "0.02em",
                textShadow: "0 0 40px rgba(0,166,255,0.3)",
              }}
            >
              {t.countdownTitle}
            </h2>
            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-white/65" style={{ fontFamily: "'Cinzel', serif" }}>
              {t.countdownSub}
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div
            className="relative mx-auto max-w-3xl rounded-[28px] p-6 sm:p-10"
            style={{
              background: "linear-gradient(160deg, rgba(6,20,46,0.6), rgba(2,8,22,0.6))",
              border: "1px solid rgba(214,168,79,0.45)",
              boxShadow:
                "0 50px 100px -30px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,225,160,0.12), 0 0 90px -20px rgba(0,87,184,0.45)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }} />
            <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }} />
            <Countdown t={t} />
          </div>
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
              background: "linear-gradient(160deg, rgba(8,20,46,0.85), rgba(4,12,32,0.85))",
              backdropFilter: "blur(22px)",
              border: "1px solid rgba(214,168,79,0.5)",
              boxShadow:
                "0 50px 100px -40px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,225,160,0.15), 0 0 100px -30px rgba(0,87,184,0.45)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }} />
            <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }} />

            <img src={shield} alt="" className="mx-auto mb-6 h-14 w-14 drop-shadow-[0_0_24px_rgba(245,199,107,0.6)]" />
            <p className="text-[10px] uppercase tracking-[0.5em] text-[var(--gold)]" style={{ fontFamily: "'Cinzel', serif" }}>
              {t.finalEyebrow}
            </p>
            <GoldDivider className="my-6" />
            <h2
              className="text-3xl sm:text-5xl"
              style={{
                fontFamily: "'Cinzel', serif",
                background: "linear-gradient(180deg, #fff4d2 0%, #d6a84f 100%)",
                WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
                letterSpacing: "0.02em",
              }}
            >
              {t.finalTitle}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-white/80 sm:text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              {t.finalBody}
            </p>
            <GoldDivider className="my-8" />
            <p className="text-sm uppercase tracking-[0.3em] text-white/85 sm:text-base" style={{ fontFamily: "'Cinzel', serif" }}>
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
            <p className="text-base uppercase tracking-[0.4em] text-white/80 sm:text-lg" style={{ fontFamily: "'Cinzel', serif" }}>
              {t.footerMotto}
            </p>
            <p className="mt-6 text-3xl text-white sm:text-4xl" style={{ fontFamily: "'Great Vibes', cursive", color: "#ffe2a3" }}>
              {t.footerThanks}
            </p>
            <p className="mt-2 text-xl text-white/85 sm:text-2xl" style={{ fontFamily: "'Great Vibes', cursive", color: "#f5c76b" }}>
              {t.footerCheers}
            </p>
            <GoldDivider className="my-8" />
            <p className="text-[11px] uppercase tracking-[0.4em] text-white/55">{t.footerName}</p>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
