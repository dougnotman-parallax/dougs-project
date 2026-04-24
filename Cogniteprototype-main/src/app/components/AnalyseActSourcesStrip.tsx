import { IconList } from "@tabler/icons-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/aura/accordion";
import type { SourcesFooterPill } from "../constants/chatResponseScenarios";
import { CitationBadgeIcon } from "./CitationBadgeIcon";
import type { SelectedSource } from "./SourceDetailsPanel";

const pillClassName =
  "inline-flex max-w-full min-w-0 items-center gap-1.5 rounded-md bg-[#f1f2f3] px-2.5 py-1.5 text-xs font-medium leading-none tracking-[-0.02px] text-[#111213] [&_svg]:shrink-0";

/**
 * Collapsible sources row: Aura accordion with list icon + "Sources" trigger, wrapping muted pills.
 */
export function AnalyseActSourcesStrip({
  pills,
  onSourceClick,
}: {
  pills: SourcesFooterPill[];
  onSourceClick?: (source: SelectedSource) => void;
}) {
  if (pills.length === 0) return null;

  return (
    <section
      className="mt-6 w-full min-w-0 border-t border-[#e4e6e8] pt-5 font-sans"
      data-name="Sources strip"
    >
      <Accordion
        type="single"
        collapsible
        defaultValue=""
        className="w-full min-w-0"
        aria-label="Sources referenced in this response"
      >
        <AccordionItem
          value="sources"
          className="mt-0 border-0 bg-transparent shadow-none hover:bg-transparent data-open:bg-transparent"
        >
          <AccordionTrigger
            chevronPlacement="nextToLabel"
            icon={IconList}
            className="text-sm font-medium leading-[1.5] tracking-[-0.04px] text-muted-foreground [&_svg]:stroke-[1.75]"
          >
            Sources
          </AccordionTrigger>
          <AccordionContent className="!px-0 !pb-0 !pt-0">
            <div className="flex flex-wrap gap-2">
              {pills.map((pill, i) => {
                const openable = Boolean(pill.selectedSource && onSourceClick);
                const inner = (
                  <>
                    {pill.kind ? (
                      <span className="text-[#5e666d]" aria-hidden>
                        <CitationBadgeIcon kind={pill.kind} />
                      </span>
                    ) : null}
                    <span className="min-w-0 truncate">{pill.label}</span>
                  </>
                );

                if (openable && pill.selectedSource) {
                  return (
                    <button
                      key={`${i}-${pill.label}`}
                      type="button"
                      className={`${pillClassName} cursor-pointer text-left transition-colors hover:bg-[#e4e6e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F56B5]`}
                      onClick={() => {
                        const s = pill.selectedSource;
                        if (s) onSourceClick(s);
                      }}
                      aria-label={`Open source details for ${pill.label}`}
                    >
                      {inner}
                    </button>
                  );
                }

                return (
                  <span key={`${i}-${pill.label}`} className={pillClassName}>
                    {inner}
                  </span>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
