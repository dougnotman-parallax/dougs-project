import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  buildCitationPreviewDetails,
  CitationPreviewDetailsPanel,
} from "./CitationPreviewDetailsPanel";
import { motion } from "motion/react";
import {
  IconArrowsMaximize,
  IconChevronLeft,
  IconChevronRight,
  IconRefresh,
  IconX,
  IconZoomIn,
  IconZoomOut,
} from "@tabler/icons-react";
import { Plus } from "lucide-react";
import { Document, Page } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import "react-pdf/dist/Page/TextLayer.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardHeaderRight,
  CardTitle,
} from "@/components/ui/aura/card";
import { Button } from "@/components/ui/aura/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/aura/dialog";
import { cn } from "@/lib/utils";
import { CANVAS_OPTIONS } from "../constants/canvases";
import type { CitationBadgeKind, CitationDetail } from "../constants/chatResponseScenarios";
import { citationToSelectedSource } from "./citationSource";
import type { SelectedSource } from "./SourceDetailsPanel";
import { DEFAULT_INLINE_PDF_URL } from "../constants/defaultInlinePdf";
import "../lib/ensurePdfWorker";
import {
  buildHighlightPhrases,
  findBestPageForPhrases,
  makePdfHighlightTextRenderer,
} from "../lib/pdfHighlightUtils";

const motionEase = [0.43, 0.13, 0.23, 0.96] as const;

const MAX_PAGE_WIDTH = 520;
const ZOOM_MIN = 50;
const ZOOM_MAX = 200;
const ZOOM_STEP = 25;
const MODAL_MIN_PAGE_WIDTH = 120;

export function InlinePdfPreviewCard({
  citation,
  onClose,
  className,
  onAddPdfToCanvas,
  onSourceClick,
  citationBadgeKind,
}: {
  citation: CitationDetail;
  onClose: () => void;
  className?: string;
  onAddPdfToCanvas?: (payload: { fileUrl: string; title: string }) => void;
  /** Opens the source details panel (same as citation popover title link). */
  onSourceClick?: (source: SelectedSource) => void;
  /** Fallback when `citation.kind` is missing; matches the inline badge context. */
  citationBadgeKind?: CitationBadgeKind;
}) {
  const iconKind: CitationBadgeKind = citation.kind ?? citationBadgeKind ?? "file";
  const fileUrl = citation.pdfPreviewUrl ?? DEFAULT_INLINE_PDF_URL;
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [pageWidth, setPageWidth] = useState(MAX_PAGE_WIDTH);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [addToCanvasOpen, setAddToCanvasOpen] = useState(false);
  const [modalZoomPercent, setModalZoomPercent] = useState(100);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const [modalContainerWidth, setModalContainerWidth] = useState(960);
  const modalDetailsData = useMemo(() => buildCitationPreviewDetails(citation), [citation]);
  const modalDetailsPanelId = useId();

  const highlightPhrases = useMemo(
    () => buildHighlightPhrases(citation.retrieved),
    [citation.retrieved],
  );
  const highlightPhrasesRef = useRef(highlightPhrases);
  highlightPhrasesRef.current = highlightPhrases;

  const customTextRenderer = useMemo(
    () => makePdfHighlightTextRenderer(highlightPhrases),
    [highlightPhrases],
  );

  const onDocumentLoadSuccess = useCallback(async (pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
    setLoadError(null);
    setPage(1);
    const phrases = highlightPhrasesRef.current;
    if (!phrases.length) return;
    try {
      const best = await findBestPageForPhrases(pdf, phrases);
      if (best != null) setPage(best);
    } catch {
      /* stay on page 1 */
    }
  }, []);

  /** Modal mounts its own Document; do not reset page or re-scan — keep inline navigation. */
  const onModalDocumentLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
    setLoadError(null);
  }, []);

  const onDocError = useCallback(() => {
    setLoadError("Could not load PDF preview.");
    setNumPages(null);
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w && w > 0) {
        setPageWidth(Math.min(MAX_PAGE_WIDTH, Math.floor(w)));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const el = modalScrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w && w > 0) {
        setModalContainerWidth(Math.floor(w));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [modalOpen]);

  const modalPageWidth = Math.max(
    MODAL_MIN_PAGE_WIDTH,
    Math.floor((modalContainerWidth * modalZoomPercent) / 100),
  );

  const canPrev = page > 1;
  const canNext = numPages != null && page < numPages;
  const canZoomOut = modalZoomPercent > ZOOM_MIN;
  const canZoomIn = modalZoomPercent < ZOOM_MAX;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.3, ease: motionEase }}
      className={cn("w-full min-w-0", className)}
      role="region"
      aria-label={`PDF preview: ${citation.title}`}
    >
      <Card className="border border-border shadow-sm">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="min-w-0 pr-2 text-base" title={citation.title}>
            {onSourceClick ? (
              <button
                type="button"
                className={cn(
                  "w-full truncate rounded-sm border-0 bg-transparent p-0 text-left text-base font-medium tracking-tightest text-foreground",
                  "underline-offset-2 transition-colors hover:text-primary hover:underline",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                onClick={() => onSourceClick(citationToSelectedSource(citation, iconKind))}
              >
                {citation.title}
              </button>
            ) : (
              <span className="block truncate">{citation.title}</span>
            )}
          </CardTitle>
          {highlightPhrases.length > 0 ? (
            <CardDescription className="text-xs leading-snug text-muted-foreground">
              Yellow highlights approximate the cited excerpt where it appears in this PDF.
            </CardDescription>
          ) : null}
          <CardHeaderRight className="flex flex-row items-center gap-1">
            {onAddPdfToCanvas ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0 text-foreground"
                aria-label="Add to canvas"
                onClick={() => setAddToCanvasOpen(true)}
              >
                <Plus className="size-4" strokeWidth={2} aria-hidden />
              </Button>
            ) : null}
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-foreground"
              aria-label="Expand PDF preview"
              onClick={() => setModalOpen(true)}
            >
              <IconArrowsMaximize className="size-4" stroke={2} aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-foreground"
              aria-label="Close PDF preview"
              onClick={onClose}
            >
              <IconX className="size-4" stroke={2} aria-hidden />
            </Button>
          </CardHeaderRight>
        </CardHeader>
        <CardContent ref={contentRef} className="max-h-[min(70vh,520px)] overflow-auto bg-muted/30 px-2 py-3">
          {loadError ? (
            <p className="px-2 py-8 text-center text-sm text-muted-foreground">{loadError}</p>
          ) : (
            <div className="pdf-inline-preview flex justify-center">
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocError}
                loading={
                  <p className="py-12 text-center text-sm text-muted-foreground">Loading PDF…</p>
                }
                className="flex flex-col items-center"
              >
                <Page
                  pageNumber={page}
                  width={pageWidth}
                  renderTextLayer
                  customTextRenderer={highlightPhrases.length > 0 ? customTextRenderer : undefined}
                  renderAnnotationLayer={false}
                  className="shadow-sm"
                />
              </Document>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-3 border-t border-border pt-4">
          <div className="flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={!canPrev}
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <IconChevronLeft className="size-4" stroke={2} aria-hidden />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={!canNext}
              aria-label="Next page"
              onClick={() => setPage((p) => (numPages ? Math.min(numPages, p + 1) : p))}
            >
              <IconChevronRight className="size-4" stroke={2} aria-hidden />
            </Button>
          </div>
          <span className="text-sm tabular-nums text-muted-foreground">
            {numPages != null ? (
              <>
                Page {page} of {numPages}
              </>
            ) : (
              "—"
            )}
          </span>
        </CardFooter>
      </Card>

      <Dialog open={addToCanvasOpen} onOpenChange={setAddToCanvasOpen}>
        <DialogContent className="sm:max-w-md" showCloseButton>
          <DialogHeader>
            <DialogTitle>Add to canvas</DialogTitle>
            <DialogDescription>
              Choose a canvas to add this PDF to. You will be taken to the canvas view.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 py-2">
            {CANVAS_OPTIONS.map((c) => (
              <Button
                key={c.id}
                type="button"
                variant="outline"
                className="h-auto justify-start py-3 text-left font-medium"
                onClick={() => {
                  onAddPdfToCanvas?.({ fileUrl, title: citation.title });
                  setAddToCanvasOpen(false);
                }}
              >
                {c.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setModalDetailsOpen(false);
        }}
      >
        <DialogContent
          showCloseButton
          className={cn(
            "fixed top-1/2 left-1/2 z-50 flex h-[min(92vh,900px)] max-h-[min(92vh,900px)] -translate-x-1/2 -translate-y-1/2 flex-col gap-0 border p-0 shadow-xl transition-[width,max-width] duration-200 ease-out",
            "inset-x-auto mb-0",
            modalDetailsOpen
              ? "w-[min(96vw,1540px)] max-w-[min(96vw,1540px)] sm:max-w-[min(96vw,1540px)]"
              : "w-[min(96vw,1200px)] max-w-[min(96vw,1200px)] sm:max-w-[min(96vw,1200px)]",
          )}
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-row overflow-hidden">
            <div className="flex min-h-0 min-w-0 flex-1 flex-col">
              <DialogHeader className="shrink-0 border-b border-border px-5 pt-5 pb-3 pr-14">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  {onSourceClick ? (
                    <>
                      <DialogTitle className="sr-only">{citation.title}</DialogTitle>
                      <button
                        type="button"
                        className="min-w-0 flex-1 cursor-pointer truncate rounded-sm border-0 bg-transparent p-0 text-left text-lg font-semibold leading-6 tracking-tightest text-foreground underline-offset-2 transition-colors hover:text-primary hover:underline"
                        title={citation.title}
                        onClick={() => onSourceClick(citationToSelectedSource(citation, iconKind))}
                      >
                        {citation.title}
                      </button>
                    </>
                  ) : (
                    <DialogTitle
                      className="min-w-0 flex-1 truncate pr-1 text-left"
                      title={citation.title}
                    >
                      {citation.title}
                    </DialogTitle>
                  )}
                  <Button
                    type="button"
                    variant={modalDetailsOpen ? "secondary" : "outline"}
                    size="sm"
                    className="shrink-0"
                    aria-expanded={modalDetailsOpen}
                    aria-controls={modalDetailsPanelId}
                    onClick={() => setModalDetailsOpen((v) => !v)}
                  >
                    {modalDetailsOpen ? "Hide details" : "Details"}
                  </Button>
                </div>
              </DialogHeader>
              <div
                ref={modalScrollRef}
                className="min-h-0 flex-1 overflow-auto bg-muted/30 px-3 py-4"
              >
                {modalOpen ? (
                  loadError ? (
                    <p className="px-2 py-8 text-center text-sm text-muted-foreground">{loadError}</p>
                  ) : (
                    <div className="pdf-inline-preview flex min-w-0 justify-center">
                      <Document
                        file={fileUrl}
                        onLoadSuccess={onModalDocumentLoadSuccess}
                        onLoadError={onDocError}
                        loading={
                          <p className="py-12 text-center text-sm text-muted-foreground">Loading PDF…</p>
                        }
                        className="flex flex-col items-center"
                      >
                        <Page
                          pageNumber={page}
                          width={modalPageWidth}
                          renderTextLayer
                          customTextRenderer={
                            highlightPhrases.length > 0 ? customTextRenderer : undefined
                          }
                          renderAnnotationLayer={false}
                          className="shadow-sm"
                        />
                      </Document>
                    </div>
                  )
                ) : null}
              </div>
              <DialogFooter
                className={cn(
                  "shrink-0 flex flex-row flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 sm:flex-row",
                )}
              >
            <div className="flex flex-wrap items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={!canZoomOut}
                aria-label="Zoom out"
                onClick={() =>
                  setModalZoomPercent((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))
                }
              >
                <IconZoomOut className="size-4" stroke={2} aria-hidden />
              </Button>
              <span className="min-w-[3.25rem] text-center text-sm tabular-nums text-muted-foreground">
                {modalZoomPercent}%
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={!canZoomIn}
                aria-label="Zoom in"
                onClick={() =>
                  setModalZoomPercent((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))
                }
              >
                <IconZoomIn className="size-4" stroke={2} aria-hidden />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={modalZoomPercent === 100}
                aria-label="Reset zoom"
                onClick={() => setModalZoomPercent(100)}
              >
                <IconRefresh className="size-4" stroke={2} aria-hidden />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  disabled={!canPrev}
                  aria-label="Previous page"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <IconChevronLeft className="size-4" stroke={2} aria-hidden />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  disabled={!canNext}
                  aria-label="Next page"
                  onClick={() => setPage((p) => (numPages ? Math.min(numPages, p + 1) : p))}
                >
                  <IconChevronRight className="size-4" stroke={2} aria-hidden />
                </Button>
              </div>
              <span className="text-sm tabular-nums text-muted-foreground">
                {numPages != null ? (
                  <>
                    Page {page} of {numPages}
                  </>
                ) : (
                  "—"
                )}
              </span>
            </div>
              </DialogFooter>
            </div>
            <div
              id={modalDetailsPanelId}
              className={cn(
                "shrink-0 overflow-hidden border-l border-border bg-muted/20 transition-[width] duration-200 ease-out",
                modalDetailsOpen ? "w-[min(100%,360px)]" : "w-0 border-l-0",
              )}
              aria-hidden={!modalDetailsOpen}
            >
              <div className="h-full min-w-0 w-[min(100%,360px)] max-w-full overflow-y-auto overflow-x-hidden">
                {modalDetailsOpen ? <CitationPreviewDetailsPanel data={modalDetailsData} /> : null}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
