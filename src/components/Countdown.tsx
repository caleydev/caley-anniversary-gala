import { useEffect, useState } from "react";
import type { Copy } from "@/lib/i18n";

export const EVENT_DATE = new Date("2026-06-27T18:00:00");

function diff(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return null;
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return { d, h, m, s };
}

export function Countdown({ t }: { t: Copy }) {
  const [time, setTime] = useState(() => diff(EVENT_DATE));

  useEffect(() => {
    const i = setInterval(() => setTime(diff(EVENT_DATE)), 1000);
    return () => clearInterval(i);
  }, []);

  if (!time) {
    return (
      <div
        className="rounded-3xl p-10 text-center"
        style={{
          background: "linear-gradient(160deg, rgba(8,20,46,0.8), rgba(4,12,32,0.8))",
          border: "1px solid rgba(214,168,79,0.5)",
          backdropFilter: "blur(18px)",
        }}
      >
        <p
          className="text-3xl"
          style={{
            fontFamily: "'Cinzel', serif",
            background: "linear-gradient(180deg, #fff4d2, #d6a84f)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {t.started}
        </p>
      </div>
    );
  }

  const items = [
    { v: time.d, l: t.days },
    { v: time.h, l: t.hours },
    { v: time.m, l: t.minutes },
    { v: time.s, l: t.seconds },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
      {items.map((it) => (
        <div
          key={it.l}
          className="relative overflow-hidden rounded-2xl p-5 text-center sm:p-7"
          style={{
            background:
              "linear-gradient(160deg, rgba(8,20,46,0.8), rgba(4,12,32,0.7))",
            border: "1px solid rgba(214,168,79,0.45)",
            backdropFilter: "blur(18px)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.08), 0 0 40px -16px rgba(0,166,255,0.5)",
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #d6a84f, transparent)" }}
          />
          <div
            className="text-4xl font-bold sm:text-6xl"
            style={{
              fontFamily: "'Cinzel', serif",
              background: "linear-gradient(180deg, #fff4d2 0%, #f5c76b 50%, #d6a84f 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 0 30px rgba(245,199,107,0.3)",
            }}
          >
            {String(it.v).padStart(2, "0")}
          </div>
          <div
            className="mt-2 text-[10px] uppercase tracking-[0.4em] text-white/70 sm:text-xs"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
}
