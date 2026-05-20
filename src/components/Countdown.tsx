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
      <div className="rounded-3xl glass gold-border p-10 text-center">
        <p className="font-display text-3xl gold-text">{t.started}</p>
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
          className="rounded-3xl glass gold-border p-5 text-center pulse-soft sm:p-7"
        >
          <div className="font-display text-4xl font-bold text-white sm:text-6xl">
            {String(it.v).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.3em] gold-text sm:text-sm">
            {it.l}
          </div>
        </div>
      ))}
    </div>
  );
}
