import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { Document, Page } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import Toolbar from "../../imports/🐣Toolbar";
import Topbar from "../../imports/Topbar";
import "../lib/ensurePdfWorker";
import { ProductionDetailsLineChart } from "./charts/ProductionDetailsLineChart";

const EMBED_MAX_WIDTH = 520;

type CanvasForegroundWidget = "pdf" | "chart" | null;

const WIDGET_Z_BASE = 10;
const WIDGET_Z_FOREGROUND = 20;

interface CanvasDetailsPageProps {
  showTopBar?: boolean;
  onBack?: () => void;
  embeddedPdf?: { fileUrl: string; title: string } | null;
  onClearEmbeddedPdf?: () => void;
  embeddedChart?: { title: string } | null;
  onClearEmbeddedChart?: () => void;
}

function CanvasDetailsTopBar({ onBack }: { onBack?: () => void }) {
  return (
    <div className="bg-white relative shrink-0 w-full" onClick={(e) => {
      // Make the "Canvas" breadcrumb clickable to go back
      const target = e.target as HTMLElement;
      if (target.textContent === "Canvas" && onBack) {
        onBack();
      }
    }}>
      <Topbar />
    </div>
  );
}

export { CanvasDetailsTopBar };

export function CanvasDetailsPage({
  showTopBar = true,
  onBack,
  embeddedPdf = null,
  onClearEmbeddedPdf,
  embeddedChart = null,
  onClearEmbeddedChart,
}: CanvasDetailsPageProps) {
  const [zoomLevel, setZoomLevel] = useState(37);
  const [embedPage, setEmbedPage] = useState(1);
  const [embedNumPages, setEmbedNumPages] = useState<number | null>(null);
  const embedScrollRef = useRef<HTMLDivElement>(null);
  const [embedWidth, setEmbedWidth] = useState(EMBED_MAX_WIDTH);
  const canvasAreaRef = useRef<HTMLDivElement>(null);
  const pdfCardRef = useRef<HTMLDivElement>(null);
  const [pdfCardOffset, setPdfCardOffset] = useState({ x: 48, y: 56 });
  const dragRef = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const chartCardRef = useRef<HTMLDivElement>(null);
  const [chartCardOffset, setChartCardOffset] = useState({ x: 200, y: 48 });
  const chartDragRef = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    origX: number;
    origY: number;
  } | null>(null);

  const [foregroundWidget, setForegroundWidget] = useState<CanvasForegroundWidget>(null);

  useEffect(() => {
    setForegroundWidget((w) => {
      if (w === "pdf" && !embeddedPdf) return null;
      if (w === "chart" && !embeddedChart) return null;
      return w;
    });
  }, [embeddedPdf, embeddedChart]);

  const onPdfCardPointerDownCapture = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setForegroundWidget("pdf");
  }, []);

  const onChartCardPointerDownCapture = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setForegroundWidget("chart");
  }, []);

  const onEmbedLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setEmbedNumPages(pdf.numPages);
    setEmbedPage(1);
  }, []);

  useEffect(() => {
    const el = embedScrollRef.current;
    if (!el || !embeddedPdf) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w && w > 0) {
        setEmbedWidth(Math.min(EMBED_MAX_WIDTH, Math.floor(w)));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [embeddedPdf]);

  const clampPdfPosition = useCallback((x: number, y: number) => {
    const area = canvasAreaRef.current;
    const card = pdfCardRef.current;
    if (!area || !card) return { x, y };
    const maxX = Math.max(0, area.clientWidth - card.offsetWidth);
    const maxY = Math.max(0, area.clientHeight - card.offsetHeight);
    return {
      x: Math.min(maxX, Math.max(0, x)),
      y: Math.min(maxY, Math.max(0, y)),
    };
  }, []);

  useEffect(() => {
    if (!embeddedPdf) {
      setEmbedPage(1);
      setEmbedNumPages(null);
      return;
    }
    const area = canvasAreaRef.current;
    if (!area) return;
    const w = area.clientWidth;
    const h = area.clientHeight;
    setPdfCardOffset({
      x: Math.round(w * 0.08),
      y: Math.round(h * 0.1),
    });
  }, [embeddedPdf]);

  useEffect(() => {
    if (!embeddedPdf) return;
    const onResize = () => {
      setPdfCardOffset((o) => clampPdfPosition(o.x, o.y));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [embeddedPdf, clampPdfPosition]);

  const onPdfDragHandlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("button")) return;
      setForegroundWidget("pdf");
      e.preventDefault();
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      dragRef.current = {
        pointerId: e.pointerId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        origX: pdfCardOffset.x,
        origY: pdfCardOffset.y,
      };
    },
    [pdfCardOffset.x, pdfCardOffset.y],
  );

  const onPdfDragHandlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = dragRef.current;
      if (!d || e.pointerId !== d.pointerId) return;
      const dx = e.clientX - d.startClientX;
      const dy = e.clientY - d.startClientY;
      setPdfCardOffset(clampPdfPosition(d.origX + dx, d.origY + dy));
    },
    [clampPdfPosition],
  );

  const endPdfDrag = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    dragRef.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      /* capture already released */
    }
  }, []);

  const clampChartPosition = useCallback((x: number, y: number) => {
    const area = canvasAreaRef.current;
    const card = chartCardRef.current;
    if (!area || !card) return { x, y };
    const maxX = Math.max(0, area.clientWidth - card.offsetWidth);
    const maxY = Math.max(0, area.clientHeight - card.offsetHeight);
    return {
      x: Math.min(maxX, Math.max(0, x)),
      y: Math.min(maxY, Math.max(0, y)),
    };
  }, []);

  useEffect(() => {
    if (!embeddedChart) return;
    const area = canvasAreaRef.current;
    if (!area) return;
    const w = area.clientWidth;
    const h = area.clientHeight;
    setChartCardOffset({
      x: Math.round(w * 0.35),
      y: Math.round(h * 0.12),
    });
  }, [embeddedChart]);

  useEffect(() => {
    if (!embeddedChart) return;
    const onResize = () => {
      setChartCardOffset((o) => clampChartPosition(o.x, o.y));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [embeddedChart, clampChartPosition]);

  const onChartDragHandlePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("button")) return;
      setForegroundWidget("chart");
      e.preventDefault();
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      chartDragRef.current = {
        pointerId: e.pointerId,
        startClientX: e.clientX,
        startClientY: e.clientY,
        origX: chartCardOffset.x,
        origY: chartCardOffset.y,
      };
    },
    [chartCardOffset.x, chartCardOffset.y],
  );

  const onChartDragHandlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const d = chartDragRef.current;
      if (!d || e.pointerId !== d.pointerId) return;
      const dx = e.clientX - d.startClientX;
      const dy = e.clientY - d.startClientY;
      setChartCardOffset(clampChartPosition(d.origX + dx, d.origY + dy));
    },
    [clampChartPosition],
  );

  const endChartDrag = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const d = chartDragRef.current;
    if (!d || e.pointerId !== d.pointerId) return;
    chartDragRef.current = null;
    try {
      (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
    } catch {
      /* capture already released */
    }
  }, []);

  return (
    <div className="bg-white flex flex-col h-full w-full">
      {/* Top Bar */}
      {showTopBar && <CanvasDetailsTopBar onBack={onBack} />}

      <div className="flex-1 relative overflow-hidden">
        {/* Canvas Area — dotted grid + draggable widgets */}
        <div
          ref={canvasAreaRef}
          className="absolute inset-0 bg-[#f5f5f5]"
          style={{
            backgroundImage: `radial-gradient(circle, #d0d0d0 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        >
          {embeddedPdf ? (
            <motion.div
              ref={pdfCardRef}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
              onPointerDownCapture={onPdfCardPointerDownCapture}
              className="absolute flex max-h-[min(72vh,640px)] w-[min(92vw,560px)] max-w-[560px] min-w-[280px] flex-col overflow-hidden rounded-lg border border-[#e4e6e8] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
              style={{
                left: pdfCardOffset.x,
                top: pdfCardOffset.y,
                zIndex: foregroundWidget === "pdf" ? WIDGET_Z_FOREGROUND : WIDGET_Z_BASE,
              }}
            >
              <div
                role="group"
                aria-label="Drag to move PDF on canvas"
                onPointerDown={onPdfDragHandlePointerDown}
                onPointerMove={onPdfDragHandlePointerMove}
                onPointerUp={endPdfDrag}
                onPointerCancel={endPdfDrag}
                className="flex shrink-0 cursor-grab touch-none items-center justify-between gap-2 border-b border-[#e4e6e8] bg-white px-3 py-2 active:cursor-grabbing"
              >
                <p className="min-w-0 flex-1 select-none truncate font-sans text-[13px] font-medium leading-[18px] text-[#111213]">
                  {embeddedPdf.title}
                </p>
                {onClearEmbeddedPdf ? (
                  <button
                    type="button"
                    onClick={onClearEmbeddedPdf}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#5e666d] hover:bg-[rgba(0,0,0,0.06)]"
                    aria-label="Remove PDF from canvas"
                  >
                    <X className="size-4" strokeWidth={2} />
                  </button>
                ) : null}
              </div>
              <div
                ref={embedScrollRef}
                className="min-h-0 flex-1 overflow-auto bg-[#f5f5f5] px-2 py-3"
              >
                <div className="flex justify-center">
                  <Document
                    file={embeddedPdf.fileUrl}
                    onLoadSuccess={onEmbedLoadSuccess}
                    loading={
                      <p className="py-10 text-center font-sans text-sm text-[#5e666d]">Loading PDF…</p>
                    }
                    className="flex flex-col items-center"
                  >
                    <Page
                      pageNumber={embedPage}
                      width={embedWidth}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="shadow-sm"
                    />
                  </Document>
                </div>
              </div>
              {embedNumPages != null && embedNumPages > 1 ? (
                <div className="flex shrink-0 items-center justify-between gap-2 border-t border-[#e4e6e8] px-3 py-2">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      disabled={embedPage <= 1}
                      onClick={() => setEmbedPage((p) => Math.max(1, p - 1))}
                      className="rounded-md px-2 py-1 font-sans text-xs text-[#111213] disabled:opacity-40 hover:bg-[rgba(0,0,0,0.04)]"
                    >
                      Prev
                    </button>
                    <button
                      type="button"
                      disabled={embedPage >= embedNumPages}
                      onClick={() =>
                        setEmbedPage((p) =>
                          embedNumPages ? Math.min(embedNumPages, p + 1) : p,
                        )
                      }
                      className="rounded-md px-2 py-1 font-sans text-xs text-[#111213] disabled:opacity-40 hover:bg-[rgba(0,0,0,0.04)]"
                    >
                      Next
                    </button>
                  </div>
                  <span className="font-sans text-xs tabular-nums text-[#5e666d]">
                    Page {embedPage} of {embedNumPages}
                  </span>
                </div>
              ) : null}
            </motion.div>
          ) : null}

          {embeddedChart ? (
            <motion.div
              ref={chartCardRef}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
              onPointerDownCapture={onChartCardPointerDownCapture}
              className="absolute flex w-[min(92vw,520px)] max-w-[520px] min-w-[300px] flex-col overflow-hidden rounded-lg border border-[#e4e6e8] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
              style={{
                left: chartCardOffset.x,
                top: chartCardOffset.y,
                zIndex: foregroundWidget === "chart" ? WIDGET_Z_FOREGROUND : WIDGET_Z_BASE,
              }}
            >
              <div
                role="group"
                aria-label="Drag to move chart on canvas"
                onPointerDown={onChartDragHandlePointerDown}
                onPointerMove={onChartDragHandlePointerMove}
                onPointerUp={endChartDrag}
                onPointerCancel={endChartDrag}
                className="flex shrink-0 cursor-grab touch-none items-center justify-between gap-2 border-b border-[#e4e6e8] bg-white px-3 py-2 active:cursor-grabbing"
              >
                <p className="min-w-0 flex-1 select-none truncate font-sans text-[13px] font-medium leading-[18px] text-[#111213]">
                  {embeddedChart.title}
                </p>
                {onClearEmbeddedChart ? (
                  <button
                    type="button"
                    onClick={onClearEmbeddedChart}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-[#5e666d] hover:bg-[rgba(0,0,0,0.06)]"
                    aria-label="Remove chart from canvas"
                  >
                    <X className="size-4" strokeWidth={2} />
                  </button>
                ) : null}
              </div>
              {/* Explicit height: Recharts ResponsiveContainer needs a bounded parent (min-height alone is not enough). */}
              <div className="h-[280px] w-full shrink-0 bg-[#fafbfc] px-2 py-3">
                <ProductionDetailsLineChart className="h-full min-h-0" />
              </div>
            </motion.div>
          ) : null}
        </div>

        {/* Floating Toolbar - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="absolute left-[20px] top-[20px] w-[48px]"
        >
          <Toolbar />
        </motion.div>

        {/* Zoom Controls - Bottom Right */}
        <div className="absolute bottom-[20px] right-[20px] flex items-center gap-[8px] bg-white rounded-[8px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] px-[12px] py-[8px]">
          <button
            onClick={() => setZoomLevel(Math.max(10, zoomLevel - 10))}
            className="p-[4px] hover:bg-[rgba(0,0,0,0.04)] rounded transition-colors"
          >
            <ZoomOut className="w-[14px] h-[14px] text-[#5e666d]" />
          </button>

          <span className="font-sans font-medium text-[13px] leading-[16px] text-[#111213] tracking-[-0.039px] min-w-[40px] text-center">
            {zoomLevel}%
          </span>

          <button
            onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
            className="p-[4px] hover:bg-[rgba(0,0,0,0.04)] rounded transition-colors"
          >
            <ZoomIn className="w-[14px] h-[14px] text-[#5e666d]" />
          </button>

          <div className="w-[1px] h-[16px] bg-[#e4e6e8] mx-[4px]" />

          <button
            onClick={() => setZoomLevel(100)}
            className="p-[4px] hover:bg-[rgba(0,0,0,0.04)] rounded transition-colors"
          >
            <Maximize2 className="w-[14px] h-[14px] text-[#5e666d]" />
          </button>
        </div>
      </div>
    </div>
  );
}
