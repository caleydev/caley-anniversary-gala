import type { Lang } from "@/lib/i18n";

export function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div
      className="fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full glass p-1 text-sm sm:right-6 sm:top-6"
      role="group"
      aria-label="Language"
    >
      {(["es", "en"] as Lang[]).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={`min-w-10 rounded-full px-3 py-1.5 font-medium uppercase tracking-wider transition-all ${
              active
                ? "bg-[oklch(0.84_0.13_85)] text-[oklch(0.18_0.06_265)] gold-glow"
                : "text-white/70 hover:text-white"
            }`}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
