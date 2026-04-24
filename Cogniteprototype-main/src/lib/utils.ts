import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Portal target for Aura overlays (popover, dialog, etc.) */
export function getPortalContainer(): HTMLElement | undefined {
  if (typeof document === "undefined") return undefined;
  return document.body;
}

/** Aura focus rings (see `src/components/ui/aura/effects.tsx`). */
export const focusRing = "focus-visible:shadow-focus-ring outline-none";
export const focusRingDestructive =
  "focus-visible:shadow-focus-ring-destructive outline-none";
