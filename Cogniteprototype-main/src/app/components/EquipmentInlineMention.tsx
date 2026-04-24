import type { ReactNode } from "react";
import type { SelectedSource } from "./SourceDetailsPanel";

/** Matches user-prompt inline tag `# 21PT1019` (ChatResponse “Inline timeline tag”) */
export const INLINE_EQUIPMENT_BADGE_CLASS =
  "mx-0.5 inline-flex h-5 max-w-full shrink-0 items-center rounded-[4px] bg-[#daf9f2] px-1.5 align-middle font-sans text-sm font-medium leading-none text-[#14735e] not-italic";

export const COMPRESSOR_C19_SOURCE: SelectedSource = {
  label: "Compressor C-19",
  kind: "asset",
  displayTitle: "KGQ-34219 — Compressor C-19 Equipment Profile",
};

const COMPRESSOR_C19_SPLIT = /(compressor C-19)/gi;

/**
 * Wraps each “compressor C-19” mention in the mint badge; optional click opens source details.
 */
export function renderTextWithCompressorC19Badges(
  text: string,
  onSourceClick?: (source: SelectedSource) => void,
): ReactNode {
  const parts = text.split(COMPRESSOR_C19_SPLIT);
  return parts.map((part, i) => {
    const isMatch = i % 2 === 1;
    if (!isMatch) {
      return <span key={i}>{part}</span>;
    }
    if (onSourceClick) {
      return (
        <button
          key={i}
          type="button"
          className={`${INLINE_EQUIPMENT_BADGE_CLASS} cursor-pointer border-0 transition-colors hover:bg-[#c8f0e6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#14735e]`}
          onClick={() => onSourceClick(COMPRESSOR_C19_SOURCE)}
        >
          Compressor C-19
        </button>
      );
    }
    return (
      <span key={i} className={INLINE_EQUIPMENT_BADGE_CLASS}>
        Compressor C-19
      </span>
    );
  });
}
