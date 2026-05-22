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
