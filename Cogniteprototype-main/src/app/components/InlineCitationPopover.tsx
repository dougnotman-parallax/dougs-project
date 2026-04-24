import { useEffect, useState, type ReactNode } from "react";
import {
  IconChevronLeft,
  IconChevronRight,
  IconEye,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/aura/badge";
import { Button } from "@/components/ui/aura/button";
import { Separator } from "@/components/ui/aura/separator";
import {
  Popover as AuraPopover,
  PopoverContent as AuraPopoverContent,
  PopoverTrigger as AuraPopoverTrigger,
} from "@/components/ui/aura/popover";
import { cn } from "@/lib/utils";
import type { CitationBadgeKind, CitationDetail } from "../constants/chatResponseScenarios";
import { citationToSelectedSource } from "./citationSource";
import { CitationBadgeIcon } from "./CitationBadgeIcon";
import type { SelectedSource } from "./SourceDetailsPanel";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

function citationDescriptionText(citation: CitationDetail): string {
  return citation.retrieved?.trim() || citation.source;
}

function citationIsPdfFile(citation: CitationDetail, resolvedKind: CitationBadgeKind): boolean {
  const k = citation.kind ?? resolvedKind;
  if (k !== "file") return false;
  return /\.pdf$/i.test(citation.title.trim());
}

function citationShowsChartPreview(_citation: CitationDetail, resolvedKind: CitationBadgeKind): boolean {
  return resolvedKind === "timeSeries";
}

/** Icon + title + description (shared by compact Aura and grouped Radix popovers) */
function CitationPopoverBody({
  citation,
  iconKind,
  onOpenSourceDetails,
  showPdfPreviewButton,
  onPdfPreview,
  showChartPreviewButton,
  onChartPreview,
}: {
  citation: CitationDetail;
  iconKind: CitationBadgeKind;
  /** When set, the title is a control that opens the source details panel */
  onOpenSourceDetails?: () => void;
  showPdfPreviewButton?: boolean;
  onPdfPreview?: () => void;
  showChartPreviewButton?: boolean;
  onChartPreview?: () => void;
}) {
  const description = citationDescriptionText(citation);
  const isDocumentCitation = iconKind === "file";
  const titleClass =
    "block w-full truncate text-left text-sm font-semibold leading-snug text-foreground";

  return (
    <div className="flex gap-3">
      <div
        className="flex shrink-0 items-start pt-0.5 text-foreground [&_svg]:h-[18px] [&_svg]:w-[18px]"
        aria-hidden
      >
        <CitationBadgeIcon kind={iconKind} />
      </div>
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {onOpenSourceDetails ? (
              <button
                type="button"
                className={cn(
                  titleClass,
                  "cursor-pointer rounded-sm border-0 bg-transparent p-0 underline-offset-2 transition-colors hover:text-primary hover:underline",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                title={citation.title}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenSourceDetails();
                }}
              >
                {citation.title}
              </button>
            ) : (
              <p className={titleClass} title={citation.title}>
                {citation.title}
              </p>
            )}
          </div>
          <div className="flex shrink-0 flex-row items-center gap-0.5">
            {showChartPreviewButton && onChartPreview ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0 text-foreground"
                title="Preview chart"
                aria-label={`Preview chart: ${citation.title}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChartPreview();
                }}
              >
                <IconEye className="size-4" stroke={2} aria-hidden />
              </Button>
            ) : null}
            {showPdfPreviewButton && onPdfPreview ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0 text-foreground"
                title="Preview PDF"
                aria-label={`Preview PDF: ${citation.title}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onPdfPreview();
                }}
              >
                <IconEye className="size-4" stroke={2} aria-hidden />
              </Button>
            ) : null}
          </div>
        </div>
        <p className="mt-1 line-clamp-5 text-sm leading-snug text-muted-foreground">
          {isDocumentCitation ? (
            <>
              <span aria-hidden className="text-muted-foreground/80">
                &ldquo;
              </span>
              {description}
              <span aria-hidden className="text-muted-foreground/80">
                &rdquo;
              </span>
            </>
          ) : (
            description
          )}
        </p>
      </div>
    </div>
  );
}

type InlineCitationPopoverProps = {
  /** Text inside the pill, e.g. "+4" or "Asset +3" (optional if only icon is shown) */
  badgeLabel?: string;
  citations: CitationDetail[];
  /** Classes for the Aura Badge (no outer margin; wrap margin in parent if needed) */
  badgeClassName: string;
  /** Optional leading icon inside the badge (interactive citation affordance) */
  badgeIcon?: ReactNode;
  /** Aura badge size: `icon` for square glyph buttons (citation types) */
  badgeSize?: "default" | "icon";
  /**
   * Citation kind for glyph icon badges — used for the compact Aura popover header (single icon only).
   * Defaults to `file` when omitted.
   */
  citationKind?: CitationBadgeKind;
  /** Clicking the citation name opens the split source details panel (same as equipment mint badges) */
  onSourceClick?: (source: SelectedSource) => void;
  /** Unique id for inline PDF preview placement under the cited block */
  pdfPreviewAnchorKey?: string;
  /** Opens inline PDF preview under the anchor; popover closes when preview is requested */
  onRequestPdfPreview?: (
    citation: CitationDetail,
    anchorKey: string,
    /** Badge context (matches popover) when `citation.kind` is missing */
    iconKind: CitationBadgeKind,
  ) => void;
  /** Unique id for inline chart preview placement under the cited block */
  chartPreviewAnchorKey?: string;
  onRequestChartPreview?: (citation: CitationDetail, anchorKey: string) => void;
};

export function InlineCitationPopover({
  badgeLabel,
  citations,
  badgeClassName,
  badgeIcon,
  badgeSize = "default",
  citationKind = "file",
  onSourceClick,
  pdfPreviewAnchorKey = "",
  onRequestPdfPreview,
  chartPreviewAnchorKey = "",
  onRequestChartPreview,
}: InlineCitationPopoverProps) {
  const [index, setIndex] = useState(0);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const n = citations.length;
  const safeIndex = n === 0 ? 0 : Math.min(Math.max(0, index), n - 1);
  const current = citations[safeIndex];
  const ariaName = badgeLabel?.trim() || "Citation source";

  useEffect(() => {
    setIndex(0);
  }, [citations]);

  const badgeInner = (
    <>
      {badgeIcon ? <span className="flex shrink-0 items-center justify-center">{badgeIcon}</span> : null}
      {badgeLabel ? <span className="tabular-nums">{badgeLabel}</span> : null}
    </>
  );

  const triggerButtonClass = cn(
    "inline-flex cursor-pointer items-center rounded-full border-0 bg-transparent p-0 align-baseline",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );

  if (n === 0 || !current) {
    return (
      <Badge variant="secondary" size={badgeSize} className={badgeClassName}>
        {badgeInner}
      </Badge>
    );
  }

  /** Single glyph badge: Aura Popover with title + description (not multi-source “+N” pills) */
  const useCompactAuraPopover = n === 1 && badgeSize === "icon";
  const iconKindForCurrent: CitationBadgeKind = current.kind ?? citationKind;

  const openSourceFromCurrent = () => {
    onSourceClick?.(citationToSelectedSource(current, iconKindForCurrent));
    setPopoverOpen(false);
  };

  const showPdfPreview =
    Boolean(onRequestPdfPreview && pdfPreviewAnchorKey) &&
    citationIsPdfFile(current, iconKindForCurrent);

  const showChartPreview =
    Boolean(onRequestChartPreview && chartPreviewAnchorKey) &&
    citationShowsChartPreview(current, iconKindForCurrent);

  const handlePdfPreview = () => {
    if (!onRequestPdfPreview || !pdfPreviewAnchorKey) return;
    setPopoverOpen(false);
    onRequestPdfPreview(current, pdfPreviewAnchorKey, iconKindForCurrent);
  };

  const handleChartPreview = () => {
    if (!onRequestChartPreview || !chartPreviewAnchorKey) return;
    setPopoverOpen(false);
    onRequestChartPreview(current, chartPreviewAnchorKey);
  };

  if (useCompactAuraPopover) {
    return (
      <AuraPopover
        open={popoverOpen}
        onOpenChange={(open) => {
          if (open) setIndex(0);
          setPopoverOpen(open);
        }}
      >
        <AuraPopoverTrigger
          render={
            <button
              type="button"
              className={triggerButtonClass}
              aria-label={`${ariaName}. Open citation details.`}
              aria-haspopup="dialog"
            >
              <Badge variant="secondary" size={badgeSize} className={badgeClassName}>
                {badgeInner}
              </Badge>
            </button>
          }
        />
        <AuraPopoverContent
          align="start"
          side="bottom"
          sideOffset={6}
          className={cn(
            "w-[min(20rem,calc(100vw-2rem))] max-w-80 gap-0 border-border p-4 shadow-md",
            "bg-popover text-popover-foreground",
          )}
        >
          <CitationPopoverBody
            citation={current}
            iconKind={iconKindForCurrent}
            onOpenSourceDetails={onSourceClick ? openSourceFromCurrent : undefined}
            showPdfPreviewButton={showPdfPreview}
            onPdfPreview={showPdfPreview ? handlePdfPreview : undefined}
            showChartPreviewButton={showChartPreview}
            onChartPreview={showChartPreview ? handleChartPreview : undefined}
          />
        </AuraPopoverContent>
      </AuraPopover>
    );
  }

  return (
    <Popover
      open={popoverOpen}
      onOpenChange={(open) => {
        if (open) setIndex(0);
        setPopoverOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className={triggerButtonClass}
          aria-label={`${ariaName}. Open citation details.`}
          aria-haspopup="dialog"
        >
          <Badge variant="secondary" size={badgeSize} className={badgeClassName}>
            {badgeInner}
          </Badge>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={6}
        className="w-[min(22rem,calc(100vw-2rem))] border-border p-0 shadow-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between gap-2 px-3 pt-2 pb-2">
          <div className="flex gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-foreground disabled:opacity-40"
              disabled={safeIndex <= 0}
              aria-label="Previous citation"
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
            >
              <IconChevronLeft className="size-4" stroke={2} aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 text-foreground disabled:opacity-40"
              disabled={safeIndex >= n - 1}
              aria-label="Next citation"
              onClick={() => setIndex((i) => Math.min(n - 1, i + 1))}
            >
              <IconChevronRight className="size-4" stroke={2} aria-hidden />
            </Button>
          </div>
          <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
            {safeIndex + 1} of {n}
          </span>
        </div>
        <Separator />
        <div className="px-4 py-3">
          <CitationPopoverBody
            citation={current}
            iconKind={iconKindForCurrent}
            onOpenSourceDetails={onSourceClick ? openSourceFromCurrent : undefined}
            showPdfPreviewButton={showPdfPreview}
            onPdfPreview={showPdfPreview ? handlePdfPreview : undefined}
            showChartPreviewButton={showChartPreview}
            onChartPreview={showChartPreview ? handleChartPreview : undefined}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
