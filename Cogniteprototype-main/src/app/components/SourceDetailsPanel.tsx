import { useRef, useCallback, useState } from "react";
import {
  OIL_ANALYSIS_REPORT_FILE_TITLE,
  VALVE_PRESSURE_DISCHARGE_TITLE,
} from "../constants/sourceDocuments";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  GripVertical,
  LineChart,
  List,
  MoreVertical,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

export interface SelectedSource {
  label: string;
  kind: "asset" | "file" | "other";
  /** Shown in panel header (e.g. truncated PDF name) */
  displayTitle?: string;
}

const SOURCE_PANEL_MIN_WIDTH = 280;

function getSourcePanelMaxWidth(): number {
  if (typeof window === "undefined") return 720;
  return Math.min(720, Math.floor(window.innerWidth * 0.58));
}

/** Default width matching previous min(420px, 42vw), clamped */
export function getInitialSourcePanelWidth(): number {
  if (typeof window === "undefined") return 400;
  const preferred = Math.min(420, Math.floor(window.innerWidth * 0.42));
  return clampSourcePanelWidth(Math.max(SOURCE_PANEL_MIN_WIDTH, preferred));
}

export function clampSourcePanelWidth(w: number): number {
  return Math.min(Math.max(SOURCE_PANEL_MIN_WIDTH, Math.round(w)), getSourcePanelMaxWidth());
}

interface SourceDetailsPanelProps {
  source: SelectedSource;
  onClose: () => void;
  /** Panel width in px (controlled) */
  width: number;
  onWidthChange: (width: number) => void;
}

const tabs = ["Overview", "Properties", "Hierarchy"] as const;

export { OIL_ANALYSIS_REPORT_FILE_TITLE, VALVE_PRESSURE_DISCHARGE_TITLE };

function isOilAnalysisReportSource(source: SelectedSource): boolean {
  const t = (source.displayTitle ?? source.label ?? "").trim();
  if (source.kind !== "file") return false;
  return (
    t === OIL_ANALYSIS_REPORT_FILE_TITLE ||
    t.toLowerCase() === OIL_ANALYSIS_REPORT_FILE_TITLE.toLowerCase()
  );
}

function isValvePressureDischargeSource(source: SelectedSource): boolean {
  const t = (source.displayTitle ?? source.label ?? "").trim();
  return (
    t === VALVE_PRESSURE_DISCHARGE_TITLE ||
    t.toLowerCase() === VALVE_PRESSURE_DISCHARGE_TITLE.toLowerCase()
  );
}

/** Mini line chart: dip then spike (value anomaly) — matches citation story */
function ValvePressureDischargeChartSvg() {
  const w = 300;
  const h = 112;
  const padL = 34;
  const padR = 10;
  const padT = 6;
  const padB = 22;
  const gw = w - padL - padR;
  const gh = h - padT - padB;
  const y0 = padT + gh;
  const valToY = (v: number) => y0 - ((v - 5) / 25) * gh;
  const xs = (t: number) => padL + t * gw;
  const pts: [number, number][] = [
    [xs(0.02), valToY(8)],
    [xs(0.2), valToY(5)],
    [xs(0.24), valToY(30)],
    [xs(0.42), valToY(13)],
    [xs(0.62), valToY(11.5)],
    [xs(0.98), valToY(10.5)],
  ];
  const lineD = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const gridYs = [5, 10, 15, 20, 25, 30];
  const xLabels = [
    { t: 0.12, text: "Jul 2024" },
    { t: 0.38, text: "Jan 2025" },
    { t: 0.62, text: "Jul 2025" },
    { t: 0.88, text: "Jan 2026" },
  ];

  return (
    <svg
      className="h-[140px] w-full text-[#111213]"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <text
        x={12}
        y={h / 2 + 18}
        className="fill-[#5e666d] font-sans text-[9px]"
        transform={`rotate(-90 12 ${h / 2})`}
        textAnchor="middle"
      >
        {VALVE_PRESSURE_DISCHARGE_TITLE}
      </text>
      {gridYs.map((gv) => (
        <line
          key={gv}
          x1={padL}
          x2={w - padR}
          y1={valToY(gv)}
          y2={valToY(gv)}
          className="stroke-[#e8eaec]"
          strokeWidth={1}
        />
      ))}
      {gridYs.map((gv) => (
        <text
          key={`y-${gv}`}
          x={padL - 4}
          y={valToY(gv) + 3}
          className="fill-[#8b949a] font-sans text-[8px]"
          textAnchor="end"
        >
          {gv}
        </text>
      ))}
      <path d={lineD} fill="none" className="stroke-[#3F56B5]" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[1][0]} cy={pts[1][1]} r={3.5} className="fill-[#3F56B5]" />
      <circle cx={pts[2][0]} cy={pts[2][1]} r={3.5} className="fill-[#3F56B5]" />
      {xLabels.map(({ t, text }) => (
        <text
          key={text}
          x={xs(t)}
          y={h - 4}
          className="fill-[#8b949a] font-sans text-[8px]"
          textAnchor="middle"
        >
          {text}
        </text>
      ))}
    </svg>
  );
}

/** Chart preview for Valve_PRESSURE_DISCHARGE time series (Overview tab) */
function ValvePressureChartPreviewCard() {
  return (
    <section
      className="shrink-0 overflow-hidden rounded-[8px] border border-[#e4e6e8] bg-white"
      data-name="Chart preview"
    >
      <div className="flex items-center justify-between border-b border-[#e4e6e8] px-[12px] py-[10px]">
        <div className="flex min-w-0 items-center gap-[8px]">
          <LineChart className="size-[16px] shrink-0 text-[#5e666d]" strokeWidth={2} aria-hidden />
          <span className="font-sans font-medium text-[14px] leading-[18px] text-[#111213]">Chart preview</span>
        </div>
        <button
          type="button"
          className="flex size-[32px] shrink-0 items-center justify-center rounded-[6px] text-[#40464a] transition-colors hover:bg-[rgba(0,0,0,0.05)]"
          aria-label="Expand chart"
        >
          <ArrowUpRight className="size-[16px]" strokeWidth={2} />
        </button>
      </div>
      <div className="flex flex-col gap-2 border-b border-[#e4e6e8] px-[12px] py-[10px]">
        <button
          type="button"
          className="flex h-8 w-full max-w-[200px] items-center justify-between rounded-md border border-[#e4e6e8] bg-white px-2 font-sans text-[12px] text-[#111213] shadow-sm"
        >
          <span>Other: 2Y</span>
          <ChevronDown className="size-4 text-[#5e666d]" strokeWidth={2} aria-hidden />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-[#f1f2f3] px-3 py-2 font-sans text-[11px] leading-tight text-[#5e666d]">
          <Calendar className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          <span className="min-w-0 truncate">04/01/2024 5:14 PM – 04/01/2026 5:14 PM</span>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-md border border-[#e4e6e8] bg-[#f9fafa] text-[#40464a] hover:bg-[#f1f2f3]"
            aria-label="Zoom out"
          >
            <ZoomOut className="size-3.5" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-md border border-[#e4e6e8] bg-[#f9fafa] text-[#40464a] hover:bg-[#f1f2f3]"
            aria-label="Reset zoom"
          >
            <RotateCcw className="size-3.5" strokeWidth={2} />
          </button>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-md border border-[#e4e6e8] bg-[#f9fafa] text-[#40464a] hover:bg-[#f1f2f3]"
            aria-label="Zoom in"
          >
            <ZoomIn className="size-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>
      <div className="min-h-[160px] bg-[#fafbfc] px-2 pb-3 pt-1">
        <ValvePressureDischargeChartSvg />
      </div>
    </section>
  );
}

/** Dot-grid canvas + mock first-page thumbnail for oil analysis PDF */
function OilAnalysisFilePreviewCard() {
  return (
    <section
      className="overflow-hidden rounded-[8px] border border-[#e4e6e8] bg-white"
      data-name="File preview"
    >
      <div className="flex items-center justify-between border-b border-[#e4e6e8] px-[12px] py-[10px]">
        <div className="flex min-w-0 items-center gap-[8px]">
          <FileText className="size-[16px] shrink-0 text-[#5e666d]" strokeWidth={2} aria-hidden />
          <span className="font-sans font-medium text-[14px] leading-[18px] text-[#111213]">
            File preview
          </span>
        </div>
        <button
          type="button"
          className="flex size-[32px] shrink-0 items-center justify-center rounded-[6px] text-[#40464a] transition-colors hover:bg-[rgba(0,0,0,0.05)]"
          aria-label="Expand file preview"
        >
          <ChevronRight className="size-[16px]" strokeWidth={2} />
        </button>
      </div>
      <div
        className="relative min-h-[200px] p-[16px]"
        style={{
          backgroundColor: "#f1f2f3",
          backgroundImage: "radial-gradient(#d4d7da 0.55px, transparent 0.55px)",
          backgroundSize: "10px 10px",
        }}
      >
        <div className="mx-auto flex max-w-[220px] flex-col overflow-hidden rounded-[4px] border border-[#e4e6e8] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="border-b border-[#f1f2f3] bg-[#fafbfc] px-[12px] py-[10px]">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.04em] text-[#5e666d]">
              Laboratory report
            </p>
            <p className="mt-1 truncate font-sans text-[13px] font-semibold leading-snug text-[#111213]">
              {OIL_ANALYSIS_REPORT_FILE_TITLE}
            </p>
          </div>
          <div className="space-y-2 px-[12px] py-[12px]">
            <div className="h-2 w-full rounded-sm bg-[#e8eaec]" />
            <div className="h-2 w-[92%] rounded-sm bg-[#e8eaec]" />
            <div className="h-2 w-[88%] rounded-sm bg-[#e8eaec]" />
            <div className="mt-3 rounded border border-[#e4e6e8] bg-[#f9fafa] p-2">
              <p className="font-sans text-[10px] font-medium text-[#5e666d]">Key findings</p>
              <p className="mt-1 font-sans text-[10px] leading-relaxed text-[#6b7280]">
                Particle count & ISO class vs. filter capacity…
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SourcePanelResizeHandle({
  width,
  onWidthChange,
}: {
  width: number;
  onWidthChange: (w: number) => void;
}) {
  const dragSession = useRef<{ pointerId: number; startX: number; startWidth: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      dragSession.current = {
        pointerId: e.pointerId,
        startX: e.clientX,
        startWidth: clampSourcePanelWidth(width),
      };
    },
    [width],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const s = dragSession.current;
      if (!s || e.pointerId !== s.pointerId) return;
      const delta = s.startX - e.clientX;
      onWidthChange(clampSourcePanelWidth(s.startWidth + delta));
    },
    [onWidthChange],
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const s = dragSession.current;
    if (!s || e.pointerId !== s.pointerId) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    dragSession.current = null;
  }, []);

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize source details panel"
      className="absolute left-0 top-0 bottom-0 z-20 flex w-[10px] -translate-x-1/2 cursor-col-resize items-center justify-center touch-none select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <span className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[#e4e6e8]" aria-hidden />
      <span
        className="pointer-events-none relative flex items-center justify-center rounded-[6px] border border-[#e4e6e8] bg-white px-[3px] py-[10px] shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        aria-hidden
      >
        <GripVertical className="size-[14px] text-[#6b7280]" strokeWidth={2} />
      </span>
    </div>
  );
}

export function SourceDetailsPanel({ source, onClose, width, onWidthChange }: SourceDetailsPanelProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");

  const headerTitle =
    source.displayTitle ??
    source.label ??
    "Source";

  const kindBadge =
    source.kind === "asset" ? "Asset" : source.kind === "file" ? "File" : "Source";

  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{ width: clampSourcePanelWidth(width) }}
      className="relative flex h-full min-h-0 shrink-0 flex-col border-l border-[#e4e6e8] bg-white"
      data-name="Source details"
    >
      <SourcePanelResizeHandle width={width} onWidthChange={onWidthChange} />

      {/* Header */}
      <div className="flex shrink-0 flex-col gap-[12px] border-b border-[#e4e6e8] px-[16px] py-[12px]">
        <div className="flex items-start justify-between gap-[8px]">
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-sans text-[15px] font-semibold leading-[20px] tracking-[-0.08px] text-[#111213]">
              {headerTitle}
            </h2>
            <div className="mt-[6px] flex flex-wrap items-center gap-[8px]">
              <span className="inline-flex items-center rounded-[4px] bg-[#f1f2f3] px-[8px] py-[2px] font-sans font-medium text-[12px] leading-[16px] text-[#52595f]">
                {kindBadge}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-[4px]">
            <button
              type="button"
              className="h-[32px] rounded-[6px] bg-[#f1f2f3] px-[12px] font-sans font-medium text-[13px] text-[#111213] transition-colors hover:bg-[#e4e6e8]"
            >
              Open
            </button>
            <button
              type="button"
              className="flex size-[32px] items-center justify-center rounded-[6px] text-[#40464a] hover:bg-[rgba(0,0,0,0.05)]"
              aria-label="More options"
            >
              <MoreVertical className="size-[16px]" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex size-[32px] items-center justify-center rounded-[6px] text-[#40464a] hover:bg-[rgba(0,0,0,0.05)]"
              aria-label="Close source details"
            >
              <X className="size-[18px]" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="-mb-px flex gap-[20px] border-b border-transparent">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`-mb-px border-b-2 pb-[8px] font-sans font-medium text-[14px] leading-[18px] transition-colors ${
                activeTab === tab
                  ? "border-[#3F56B5] text-[#3F56B5]"
                  : "border-transparent text-[#5e666d] hover:text-[#111213]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col gap-[16px] overflow-y-auto px-[16px] py-[16px]">
        {activeTab === "Overview" && (
          <>
            {isValvePressureDischargeSource(source) ? <ValvePressureChartPreviewCard /> : null}
            {isOilAnalysisReportSource(source) ? <OilAnalysisFilePreviewCard /> : null}

            {/* Properties card */}
            <section className="overflow-hidden rounded-[8px] border border-[#e4e6e8] bg-white">
              <button
                type="button"
                className="flex w-full items-center justify-between px-[12px] py-[10px] text-left transition-colors hover:bg-[#f9fafa]"
              >
                <div className="flex items-center gap-[8px]">
                  <List className="size-[16px] text-[#5e666d]" strokeWidth={2} />
                  <span className="font-sans font-medium text-[14px] text-[#111213]">Properties</span>
                </div>
                <ChevronRight className="size-[16px] text-[#8b949a]" />
              </button>
              <div className="px-[12px] pb-[12px]">
                <div className="grid grid-cols-3 gap-x-[12px] gap-y-[8px] text-[12px]">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="contents">
                      <div className="font-sans font-normal text-[#5e666d]">Name</div>
                      <div className="col-span-2 truncate font-sans font-normal text-[#111213]">
                        Value
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tree view card */}
            <section className="overflow-hidden rounded-[8px] border border-[#e4e6e8] bg-white">
              <div className="flex items-center justify-between border-b border-[#e4e6e8] px-[12px] py-[10px]">
                <span className="font-sans font-medium text-[14px] text-[#111213]">Hierarchy</span>
                <ChevronRight className="size-[16px] text-[#8b949a]" />
              </div>
              <div className="space-y-[8px] p-[12px]">
                <div className="grid grid-cols-[1fr_2fr] gap-[8px] border-b border-[#f1f2f3] pb-[6px] font-sans font-medium text-[12px] text-[#5e666d]">
                  <span>Name</span>
                  <span>Description</span>
                </div>
                {[1, 2, 3].map((row) => (
                  <div
                    key={row}
                    className="grid grid-cols-[1fr_2fr] items-center gap-[8px] text-[13px] text-[#111213]"
                  >
                    <div className="flex min-w-0 items-center gap-[6px]">
                      <ChevronDown className="size-[14px] shrink-0 text-[#5e666d]" />
                      <span className="truncate font-sans font-normal">Node {row}</span>
                    </div>
                    <span className="truncate font-sans font-normal text-[#5e666d]">
                      Related equipment context
                    </span>
                  </div>
                ))}
                <button
                  type="button"
                  className="font-sans font-medium text-[13px] text-[#3F56B5] hover:underline"
                >
                  Load more
                </button>
              </div>
            </section>

            {/* Expandable rows */}
            {[
              { label: "Time series", count: 0, icon: "📈" },
              { label: "Activities", count: 123, icon: "📋" },
              { label: "Files", count: 123, icon: "📁" },
            ].map((row) => (
              <button
                key={row.label}
                type="button"
                className="flex w-full items-center justify-between rounded-[8px] border border-[#e4e6e8] px-[12px] py-[12px] text-left transition-colors hover:bg-[#f9fafa]"
              >
                <div className="flex min-w-0 items-center gap-[10px]">
                  <span className="text-[16px]" aria-hidden>
                    {row.icon}
                  </span>
                  <span className="font-sans font-medium text-[14px] text-[#111213]">
                    {row.label} ({row.count})
                  </span>
                </div>
                <ChevronRight className="size-[16px] shrink-0 text-[#8b949a]" />
              </button>
            ))}
          </>
        )}

        {activeTab === "Properties" && (
          <p className="font-sans font-normal text-[14px] text-[#5e666d]">
            Properties for <strong className="text-[#111213]">{source.label}</strong> will appear here.
          </p>
        )}

        {activeTab === "Hierarchy" && (
          <p className="font-sans font-normal text-[14px] text-[#5e666d]">
            Hierarchy view for <strong className="text-[#111213]">{source.label}</strong> will appear here.
          </p>
        )}
      </div>
    </motion.aside>
  );
}
