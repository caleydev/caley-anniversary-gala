import type { Lang } from "@/lib/i18n";

export function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div
      className="fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full p-1 text-sm sm:right-6 sm:top-6"
      role="group"
      aria-label="Language"
      style={{
        background: "linear-gradient(160deg, rgba(10,28,62,0.78), rgba(2,8,22,0.85))",
        border: "1px solid rgba(214,168,79,0.45)",
        backdropFilter: "blur(18px)",
        boxShadow:
          "inset 0 1px 0 rgba(255,235,180,0.12), 0 10px 28px -12px rgba(0,0,0,0.6), 0 0 24px -10px rgba(214,168,79,0.4)",
      }}
    >
      {(["es", "en"] as Lang[]).map((l) => {
        const active = lang === l;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={active}
            className="relative min-w-10 rounded-full px-3 py-1.5 font-semibold uppercase tracking-[0.18em] transition-all"
            style={
              active
                ? {
                    fontFamily: "'Cinzel', serif",
                    background:
                      "linear-gradient(135deg, #fff4d2 0%, #f5c76b 30%, #d6a84f 65%, #a4781c 100%)",
                    color: "#1a1004",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,250,225,0.7), inset 0 -1px 2px rgba(80,55,10,0.45), 0 0 0 1px rgba(255,235,180,0.35), 0 6px 16px -6px rgba(214,168,79,0.7)",
                  }
                : {
                    fontFamily: "'Cinzel', serif",
                    color: "rgba(255,255,255,0.72)",
                  }
            }
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
