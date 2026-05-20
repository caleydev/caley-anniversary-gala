import { toast } from "sonner";

export const EVENT_ADDRESS = "18750 SW 160 ST, Miami, FL 33187";

export function openGoogleMaps() {
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(EVENT_ADDRESS)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export async function copyAddress(message: string) {
  try {
    await navigator.clipboard.writeText(EVENT_ADDRESS);
    toast.success(message);
  } catch {
    toast.error(message);
  }
}

export function generateICSFile({ title, description }: { title: string; description: string }) {
  const pad = (n: number) => String(n).padStart(2, "0");
  // Miami in June = EDT (UTC-4). 6:00 PM EDT -> 22:00 UTC. Midnight EDT -> 04:00 UTC next day.
  const dtStart = "20260627T220000Z";
  const dtEnd = "20260628T040000Z";
  const now = new Date();
  const dtStamp =
    now.getUTCFullYear().toString() +
    pad(now.getUTCMonth() + 1) +
    pad(now.getUTCDate()) +
    "T" +
    pad(now.getUTCHours()) +
    pad(now.getUTCMinutes()) +
    pad(now.getUTCSeconds()) +
    "Z";

  const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Caley Insurance//8th Anniversary//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:caley-8th-anniversary-2026@caleyinsurance`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${escape(title)}`,
    `DESCRIPTION:${escape(description)}`,
    `LOCATION:${escape(EVENT_ADDRESS)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "caley-insurance-8th-anniversary.ics";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
