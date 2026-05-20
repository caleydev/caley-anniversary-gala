import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { copy, type Lang } from "@/lib/i18n";
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
  Calendar, Clock, MapPin, Shirt, Music, UtensilsCrossed, Gift, Sparkles,
  Users, PartyPopper, Trophy, Award, Ticket, Star, Heart, Sprout, TrendingUp, Crown,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caley Insurance · 8.º Aniversario" },
      { name: "description", content: "Una celebración elegante por el 8.º aniversario de Caley Insurance. Música, premios y sorpresas." },
      { property: "og:title", content: "Caley Insurance · 8.º Aniversario" },
      { property: "og:description", content: "Una noche especial. Estás invitado." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Page,
});

const expectIcons = [Music, UtensilsCrossed, Gift, Sparkles, Users, PartyPopper];
const prizeIcons = [Trophy, Ticket, Sparkles, Award];
const storyIcons = [Sprout, TrendingUp, Heart, Crown];

function Page() {
  const [lang, setLang] = useState<Lang>("es");
  const [isOpened, setIsOpened] = useState(false);
  const t = copy[lang];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden text-white">
      <FireworksBackground intensity={isOpened ? 0.6 : 0.25} />
      <ParticleField count={isOpened ? 50 : 24} />
      <LanguageToggle lang={lang} setLang={setLang} />

      {!isOpened ? (
        <EnvelopeReveal t={t} onOpen={() => setIsOpened(true)} />
      ) : (
        <>
          <FloatingLogo />
          <div className="relative z-10 animate-[fadeIn_1.2s_ease-out]">
            <Hero t={t} onRsvp={() => scrollTo("rsvp")} onDetails={() => scrollTo("details")} />
            <EventDetails t={t} />
            <Expect t={t} />
            <Prizes t={t} />
            <Story t={t} />
            <CountdownSection t={t} />
            <RSVP t={t} />
            <Footer t={t} />
          </div>
          <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </>
      )}
    </main>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1120px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

function Hero({ t, onRsvp, onDetails }: { t: ReturnType<typeof copyFor>; onRsvp: () => void; onDetails: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center py-24">
      {/* Background giant 8 */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <span
          className="font-display text-[40rem] leading-none opacity-[0.05]"
          style={{ background: "linear-gradient(180deg, #f5d889, #6ab7ff)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
        >
          8
        </span>
      </div>

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl rounded-3xl glass-strong gold-border p-8 text-center sm:p-14">
          <img src={logo} alt="Caley Insurance" className="mx-auto mb-8 h-12 w-auto sm:h-16" />
          <p className="mb-4 text-xs uppercase tracking-[0.5em] gold-text sm:text-sm">{t.heroEyebrow}</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] text-white sm:text-6xl md:text-7xl">
            {t.heroTitle1}
          </h1>
          <p className="mt-3 font-display text-2xl gold-text sm:text-3xl">{t.heroTitle2}</p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{t.heroPara}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={onRsvp}
              className="shimmer group relative w-full overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-[oklch(0.18_0.06_265)] transition-transform hover:scale-105 sm:w-auto"
              style={{
                background: "linear-gradient(135deg, oklch(0.92 0.08 88), oklch(0.78 0.15 80))",
                boxShadow: "0 10px 40px -10px oklch(0.84 0.13 85 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.4)",
              }}
            >
              {t.rsvpBtn}
            </button>
            <button
              onClick={onDetails}
              className="w-full rounded-full glass gold-border px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:scale-105 sm:w-auto"
            >
              {t.detailsBtn}
            </button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

type CopyT = ReturnType<typeof copyFor>;
function copyFor() { return copy.es; }

function SectionTitle({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && <p className="mb-3 text-xs uppercase tracking-[0.4em] gold-text">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-semibold text-white sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-base text-white/75 sm:text-lg">{sub}</p>}
    </div>
  );
}

function EventDetails({ t }: { t: CopyT }) {
  const items = [
    { Icon: Calendar, label: t.dateL, value: t.soon },
    { Icon: Clock, label: t.timeL, value: t.soon },
    { Icon: MapPin, label: t.placeL, value: t.soon },
    { Icon: Shirt, label: t.dressL, value: t.dress },
  ];
  return (
    <section id="details" className="relative py-24">
      <Container>
        <Reveal><SectionTitle title={t.detailsTitle} /></Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(({ Icon, label, value }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="group flex items-center gap-5 rounded-3xl glass gold-border p-6 transition-all hover:-translate-y-1 hover:gold-glow sm:p-7">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                  style={{ background: "linear-gradient(135deg, oklch(0.92 0.08 88 / 0.2), oklch(0.62 0.18 245 / 0.2))" }}>
                  <Icon className="h-6 w-6 gold-text" style={{ color: "oklch(0.84 0.13 85)" }} />
                </div>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/60">{label}</div>
                  <div className="mt-1 font-display text-2xl text-white">{value}</div>
                  <div className="mt-3 h-px w-12 bg-gradient-to-r from-[oklch(0.84_0.13_85_/_0.7)] to-transparent" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-center text-sm italic text-white/60">{t.detailsNote}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function Expect({ t }: { t: CopyT }) {
  return (
    <section className="relative py-24">
      <Container>
        <Reveal><SectionTitle title={t.expectTitle} /></Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.cards.map((c, i) => {
            const Icon = expectIcons[i];
            return (
              <Reveal key={i} delay={i * 60}>
                <div className="group relative h-full overflow-hidden rounded-3xl glass p-7 transition-all hover:-translate-y-2 hover:gold-glow">
                  <div className="absolute inset-x-0 top-0 h-px"
                    style={{ background: "linear-gradient(90deg, transparent, oklch(0.84 0.13 85 / 0.8), transparent)" }} />
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: "linear-gradient(135deg, oklch(0.84 0.13 85 / 0.25), oklch(0.62 0.18 245 / 0.25))" }}>
                    <Icon className="h-6 w-6" style={{ color: "oklch(0.84 0.13 85)" }} />
                  </div>
                  <h3 className="font-display text-2xl text-white">{c.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/75">{c.d}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Prizes({ t }: { t: CopyT }) {
  return (
    <section className="relative py-24">
      {/* radial glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.84 0.13 85 / 0.12), transparent 70%)" }} />
      <Container className="relative">
        <Reveal><SectionTitle title={t.prizesTitle} sub={t.prizesSub} /></Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {t.prizes.map((p, i) => {
            const Icon = prizeIcons[i];
            return (
              <Reveal key={p} delay={i * 80}>
                <div className="group relative overflow-hidden rounded-3xl glass-strong gold-border p-7 transition-all hover:-translate-y-1 hover:gold-glow">
                  <Star className="absolute right-4 top-4 h-3 w-3 text-[oklch(0.84_0.13_85)] opacity-60" />
                  <Sparkles className="absolute right-10 bottom-4 h-3 w-3 text-[oklch(0.84_0.13_85)] opacity-50" />
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl gold-glow"
                      style={{ background: "linear-gradient(135deg, oklch(0.92 0.08 88), oklch(0.78 0.15 80))" }}>
                      <Icon className="h-6 w-6" style={{ color: "oklch(0.18 0.06 265)" }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-2xl text-white">{p}</h3>
                      <span className="mt-3 inline-block rounded-full border border-[oklch(0.84_0.13_85_/_0.4)] px-3 py-1 text-[10px] uppercase tracking-[0.25em] gold-text">
                        {t.comingSoon}
                      </span>
                    </div>
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

function Story({ t }: { t: CopyT }) {
  return (
    <section className="relative py-24">
      <Container>
        <Reveal><SectionTitle title={t.storyTitle} sub={t.storySub} /></Reveal>
        <div className="relative">
          {/* gold line */}
          <div className="absolute left-6 top-0 h-full w-px sm:left-1/2 sm:-translate-x-1/2"
            style={{ background: "linear-gradient(180deg, transparent, oklch(0.84 0.13 85 / 0.6), oklch(0.62 0.18 245 / 0.5), transparent)" }} />
          <div className="space-y-8">
            {t.timeline.map((s, i) => {
              const Icon = storyIcons[i];
              const left = i % 2 === 0;
              return (
                <Reveal key={i} delay={i * 100}>
                  <div className={`relative flex items-start gap-5 sm:items-center ${left ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    {/* node */}
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full glass gold-border pulse-soft sm:mx-auto">
                      <Icon className="h-5 w-5" style={{ color: "oklch(0.84 0.13 85)" }} />
                    </div>
                    <div className={`flex-1 rounded-3xl glass p-6 sm:max-w-md ${left ? "sm:mr-auto sm:text-right" : "sm:ml-auto sm:text-left"}`}>
                      <div className="text-xs uppercase tracking-[0.3em] gold-text">{String(i + 1).padStart(2, "0")}</div>
                      <h3 className="mt-2 font-display text-2xl text-white">{s.t}</h3>
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

function CountdownSection({ t }: { t: CopyT }) {
  return (
    <section className="relative py-24">
      <Container>
        <Reveal><SectionTitle title={t.countdownTitle} /></Reveal>
        <Reveal delay={150}>
          <Countdown t={t} />
        </Reveal>
      </Container>
    </section>
  );
}

function RSVP({ t }: { t: CopyT }) {
  const [submitted, setSubmitted] = useState(false);
  const [attend, setAttend] = useState<"yes" | "no">("yes");

  return (
    <section id="rsvp" className="relative py-24">
      <Container>
        <Reveal><SectionTitle title={t.rsvpTitle} sub={t.rsvpSub} /></Reveal>
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-3xl glass-strong gold-border p-7 sm:p-10">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full gold-glow"
                  style={{ background: "linear-gradient(135deg, oklch(0.92 0.08 88), oklch(0.78 0.15 80))" }}>
                  <Sparkles className="h-7 w-7" style={{ color: "oklch(0.18 0.06 265)" }} />
                </div>
                <p className="font-display text-2xl gold-text">{t.thanks}</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <Field label={t.nameL}><input required type="text" className={inputCls} /></Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t.phoneL}><input required type="tel" className={inputCls} /></Field>
                  <Field label={t.guestsL}><input required type="number" min={1} defaultValue={1} className={inputCls} /></Field>
                </div>
                <div className="flex gap-3">
                  {(["yes", "no"] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAttend(v)}
                      className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                        attend === v
                          ? "bg-[oklch(0.84_0.13_85)] text-[oklch(0.18_0.06_265)] gold-glow"
                          : "glass text-white/80 hover:text-white"
                      }`}
                    >
                      {v === "yes" ? t.yes : t.no}
                    </button>
                  ))}
                </div>
                <Field label={t.msgL}><textarea rows={3} className={inputCls} /></Field>
                <button
                  type="submit"
                  className="shimmer w-full overflow-hidden rounded-full px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-[oklch(0.18_0.06_265)] transition-transform hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.92 0.08 88), oklch(0.78 0.15 80))",
                    boxShadow: "0 10px 40px -10px oklch(0.84 0.13 85 / 0.7), inset 0 1px 0 oklch(1 0 0 / 0.4)",
                  }}
                >
                  {t.sendBtn}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const inputCls = "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition-all focus:border-[oklch(0.84_0.13_85_/_0.6)] focus:bg-white/10 focus:ring-2 focus:ring-[oklch(0.84_0.13_85_/_0.3)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-white/60">{label}</span>
      {children}
    </label>
  );
}

function Footer({ t }: { t: CopyT }) {
  return (
    <footer className="relative py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-3xl glass-strong gold-border p-10 text-center sm:p-14">
            <img src={shield} alt="" className="mx-auto mb-6 h-14 w-14 drop-shadow-[0_0_20px_rgba(245,216,137,0.5)]" />
            <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{t.footerH}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75">{t.footerSub}</p>
            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-[oklch(0.84_0.13_85)] to-transparent" />
            <p className="mt-6 text-sm uppercase tracking-[0.3em] gold-text">{t.footerName}</p>
            <p className="mt-3 text-xs text-white/50">{t.rights}</p>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
