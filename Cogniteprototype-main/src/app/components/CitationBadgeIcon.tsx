import {
  IconCalendarEvent,
  IconFile,
  IconHexagon,
  IconSpacingHorizontal,
  IconTimeline,
} from "@tabler/icons-react";
import type { CitationBadgeKind } from "../constants/chatResponseScenarios";

const stroke = 1.75;
const cls = "size-3.5 shrink-0 text-current";

/** Clipboard with check — failure / checklist row (time reconstruction reference). */
function ClipboardCheckIcon() {
  return (
    <svg
      className={cls}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M5.5 3.5h5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M6 2.75h4M7 2.5v.5M9 2.5v.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M6.75 8.25l1.1 1.1 2.4-2.9"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Aura citation-type glyphs (line icons on secondary badges):
 * Asset → hexagon, File → file, Time series → timeline, Event → calendar-event,
 * Sequence → spacing-horizontal, ClipboardCheck → trip/checklist (local SVG).
 * Colors follow `currentColor` on Aura Badge.
 */
export function CitationBadgeIcon({ kind }: { kind: CitationBadgeKind }) {
  switch (kind) {
    case "asset":
      return <IconHexagon className={cls} stroke={stroke} aria-hidden />;
    case "file":
      return <IconFile className={cls} stroke={stroke} aria-hidden />;
    case "timeSeries":
      return <IconTimeline className={cls} stroke={stroke} aria-hidden />;
    case "event":
      return <IconCalendarEvent className={cls} stroke={stroke} aria-hidden />;
    case "sequence":
      return <IconSpacingHorizontal className={cls} stroke={stroke} aria-hidden />;
    case "clipboardCheck":
      return <ClipboardCheckIcon />;
  }
}
