import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";
import svgPathsChat from "../../imports/svg-ms7v0l42ok";
import type {
  AddChartToDashboardPayload,
  ChatResponseScenarioAnalyseAct,
  CitationBadgeKind,
  CitationDetail,
} from "../constants/chatResponseScenarios";
import { CitationBadgeIcon } from "./CitationBadgeIcon";
import { renderTextWithCompressorC19Badges } from "./EquipmentInlineMention";
import { IncidentInlineChartWidget } from "./IncidentInlineChartWidget";
import { AnalyseActSourcesStrip } from "./AnalyseActSourcesStrip";
import { InlineChartPreviewCard } from "./InlineChartPreviewCard";
import { InlineCitationPopover } from "./InlineCitationPopover";
import { InlinePdfPreviewCard } from "./InlinePdfPreviewCard";
import type { SelectedSource } from "./SourceDetailsPanel";

/** Aura `Badge` (+4): secondary surface, compact text */
const auraCitationTextBadgeClass =
  "h-5 max-h-5 shrink-0 gap-1 rounded-md border-0 px-2 py-0 text-xs font-medium leading-none text-secondary-foreground shadow-none";

/** Aura `Badge` (glyph): square icon buttons — Asset / File / Time series / Event / Sequence */
const auraCitationIconBadgeClass =
  "min-h-5 min-w-5 shrink-0 gap-0 rounded-md border-0 p-0 text-foreground shadow-none [&_svg]:size-3.5";

/**
 * First occurrence of each citation kind keeps its icon badge; later repeats are omitted
 * (timeline header → timeline sentences → 5 Whys answers).
 */
function computeFirstOccurrenceSingleBadgeKeys(
  scenario: ChatResponseScenarioAnalyseAct,
): Set<string> {
  const seenKind = new Set<CitationBadgeKind>();
  const show = new Set<string>();

  const take = (kind: CitationBadgeKind, key: string) => {
    if (seenKind.has(kind)) return;
    seenKind.add(kind);
    show.add(key);
  };

  for (const row of scenario.timelineRows) {
    if (row.headerBadge) {
      take(row.headerBadge.kind, `h:${row.id}`);
    }
    row.sentences.forEach((sent, si) => {
      if (sent.tailBadge) {
        take(sent.tailBadge.kind, `t:${row.id}:${si}`);
      }
    });
  }
  for (const row of scenario.fiveWhysRows) {
    if (row.answerTailBadge) {
      take(row.answerTailBadge.kind, `w:${row.id}`);
    }
  }
  return show;
}

/**
 * “Analyse and act” reply: incident +4 pill, and at most one inline icon badge per citation
 * kind (first occurrence in timeline → 5 Whys order).
 */
export function AnalyseActResponse({
  scenario,
  onSourceClick,
  onAddPdfToCanvas,
  onAddChartToCanvas,
  onAddChartToDashboard,
}: {
  scenario: ChatResponseScenarioAnalyseAct;
  /** Mint badge clicks on equipment names (e.g. Compressor C-19) open source details */
  onSourceClick?: (source: SelectedSource) => void;
  onAddPdfToCanvas?: (payload: { fileUrl: string; title: string }) => void;
  onAddChartToCanvas?: (payload: { title: string }) => void;
  onAddChartToDashboard?: (payload: AddChartToDashboardPayload) => void;
}) {
  const singleIconBadgeKeys = useMemo(
    () => computeFirstOccurrenceSingleBadgeKeys(scenario),
    [scenario],
  );

  const [pdfPreview, setPdfPreview] = useState<{
    anchorKey: string;
    citation: CitationDetail;
    iconKind: CitationBadgeKind;
  } | null>(null);

  const [chartPreview, setChartPreview] = useState<{
    anchorKey: string;
    citation: CitationDetail;
  } | null>(null);

  useEffect(() => {
    setPdfPreview(null);
    setChartPreview(null);
  }, [scenario]);

  const onRequestPdfPreview = useCallback(
    (citation: CitationDetail, anchorKey: string, iconKind: CitationBadgeKind) => {
      setPdfPreview({ citation, anchorKey, iconKind });
    },
    [],
  );

  const onRequestChartPreview = useCallback((citation: CitationDetail, anchorKey: string) => {
    setChartPreview({ citation, anchorKey });
  }, []);

  return (
    <div className="relative flex w-full min-w-0 gap-4 items-start" data-name="Analyse act response">
      <div
        className="flex size-7 shrink-0 items-center justify-center rounded-[4px] bg-[#daf9f2]"
        data-name="Agent mark"
        aria-hidden
      >
        <div className="relative size-4">
          <div className="absolute inset-[6.25%]">
            <svg className="block size-full" fill="none" viewBox="0 0 14 14" aria-hidden>
              <path d={svgPathsChat.p2fcff200} fill="var(--fill-0, #14735E)" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-5 font-sans text-[#111213] leading-[1.5]">
        <h2 className="text-base font-semibold leading-[1.5] tracking-[-0.08px]">
          {renderTextWithCompressorC19Badges(scenario.title, onSourceClick)}
        </h2>

        <section className="flex flex-col gap-2" data-name="Incident summary">
          <h3 className="text-sm font-semibold leading-[1.5] tracking-[-0.04px]">{scenario.incidentHeading}</h3>
          <p className="text-base leading-[1.5] tracking-[-0.1px]">
            {renderTextWithCompressorC19Badges(scenario.incidentBody, onSourceClick)}
            <span className="ml-1 inline align-baseline" data-name="Incident citations">
              <InlineCitationPopover
                badgeLabel={scenario.incidentBadgeLabel}
                citations={scenario.incidentBadgeCitations}
                badgeClassName={auraCitationTextBadgeClass}
                badgeSize="default"
                onSourceClick={onSourceClick}
                pdfPreviewAnchorKey="incident"
                onRequestPdfPreview={onRequestPdfPreview}
                chartPreviewAnchorKey="incident"
                onRequestChartPreview={onRequestChartPreview}
              />
            </span>
          </p>
          <AnimatePresence mode="popLayout" initial={false}>
            {pdfPreview?.anchorKey === "incident" ? (
              <InlinePdfPreviewCard
                key="pdf-incident"
                citation={pdfPreview.citation}
                onClose={() => setPdfPreview(null)}
                onAddPdfToCanvas={onAddPdfToCanvas}
                onSourceClick={onSourceClick}
                citationBadgeKind={pdfPreview.iconKind}
              />
            ) : null}
          </AnimatePresence>
          <AnimatePresence mode="popLayout" initial={false}>
            {chartPreview?.anchorKey === "incident" ? (
              <InlineChartPreviewCard
                key="chart-incident"
                citation={chartPreview.citation}
                onClose={() => setChartPreview(null)}
                onAddChartToCanvas={onAddChartToCanvas}
                onAddChartToDashboard={onAddChartToDashboard}
              />
            ) : null}
          </AnimatePresence>
        </section>

        <p className="text-base leading-[1.5] tracking-[-0.1px]" data-name="Severity note">
          {scenario.severityNote}
        </p>

        {scenario.incidentInlineChart ? (
          <IncidentInlineChartWidget
            data={scenario.incidentInlineChart}
            onAddChartToCanvas={onAddChartToCanvas}
            onAddChartToDashboard={onAddChartToDashboard}
          />
        ) : null}

        <section className="flex flex-col gap-4" data-name="Time reconstruction">
          <h3 className="text-sm font-semibold leading-[1.5] tracking-[-0.04px]">{scenario.timeHeading}</h3>
          <div className="flex w-full min-w-0 flex-col gap-6 break-words" role="list">
            {scenario.timelineRows.map((row) => (
              <div key={row.id} className="flex min-w-0 flex-col gap-2" role="listitem">
                <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                  <span className="text-base font-semibold leading-[1.5] tracking-[-0.1px]">{row.headline}</span>
                  {row.headerBadge && singleIconBadgeKeys.has(`h:${row.id}`) ? (
                    <InlineCitationPopover
                      citations={row.headerBadge.citations}
                      citationKind={row.headerBadge.kind}
                      badgeClassName={auraCitationIconBadgeClass}
                      badgeSize="icon"
                      badgeIcon={<CitationBadgeIcon kind={row.headerBadge.kind} />}
                      onSourceClick={onSourceClick}
                      pdfPreviewAnchorKey={`h:${row.id}`}
                      onRequestPdfPreview={onRequestPdfPreview}
                      chartPreviewAnchorKey={`h:${row.id}`}
                      onRequestChartPreview={onRequestChartPreview}
                    />
                  ) : null}
                </div>
                <AnimatePresence mode="popLayout" initial={false}>
                  {pdfPreview?.anchorKey === `h:${row.id}` ? (
                    <InlinePdfPreviewCard
                      key={`pdf-h-${row.id}`}
                      citation={pdfPreview.citation}
                      onClose={() => setPdfPreview(null)}
                      onAddPdfToCanvas={onAddPdfToCanvas}
                      onSourceClick={onSourceClick}
                      citationBadgeKind={pdfPreview.iconKind}
                    />
                  ) : null}
                </AnimatePresence>
                <AnimatePresence mode="popLayout" initial={false}>
                  {chartPreview?.anchorKey === `h:${row.id}` ? (
                    <InlineChartPreviewCard
                      key={`chart-h-${row.id}`}
                      citation={chartPreview.citation}
                      onClose={() => setChartPreview(null)}
                      onAddChartToCanvas={onAddChartToCanvas}
                      onAddChartToDashboard={onAddChartToDashboard}
                    />
                  ) : null}
                </AnimatePresence>
                <p className="text-base italic leading-[1.5] tracking-[-0.1px] text-[#111213]">
                  {row.sentences.map((sent, si) => (
                    <span key={si} className="inline">
                      {si > 0 ? " " : null}
                      <span className="inline">
                        {renderTextWithCompressorC19Badges(sent.text, onSourceClick)}
                      </span>
                      {sent.tailBadge && singleIconBadgeKeys.has(`t:${row.id}:${si}`) ? (
                        <span className="ml-0.5 inline align-baseline">
                          <InlineCitationPopover
                            citations={sent.tailBadge.citations}
                            citationKind={sent.tailBadge.kind}
                            badgeClassName={auraCitationIconBadgeClass}
                            badgeSize="icon"
                            badgeIcon={<CitationBadgeIcon kind={sent.tailBadge.kind} />}
                            onSourceClick={onSourceClick}
                            pdfPreviewAnchorKey={`t:${row.id}:${si}`}
                            onRequestPdfPreview={onRequestPdfPreview}
                            chartPreviewAnchorKey={`t:${row.id}:${si}`}
                            onRequestChartPreview={onRequestChartPreview}
                          />
                        </span>
                      ) : null}
                    </span>
                  ))}
                </p>
                <AnimatePresence mode="popLayout" initial={false}>
                  {pdfPreview != null && pdfPreview.anchorKey.startsWith(`t:${row.id}:`) ? (
                    <InlinePdfPreviewCard
                      key={pdfPreview.anchorKey}
                      citation={pdfPreview.citation}
                      onClose={() => setPdfPreview(null)}
                      onAddPdfToCanvas={onAddPdfToCanvas}
                      onSourceClick={onSourceClick}
                      citationBadgeKind={pdfPreview.iconKind}
                    />
                  ) : null}
                </AnimatePresence>
                <AnimatePresence mode="popLayout" initial={false}>
                  {chartPreview != null && chartPreview.anchorKey.startsWith(`t:${row.id}:`) ? (
                    <InlineChartPreviewCard
                      key={chartPreview.anchorKey}
                      citation={chartPreview.citation}
                      onClose={() => setChartPreview(null)}
                      onAddChartToCanvas={onAddChartToCanvas}
                      onAddChartToDashboard={onAddChartToDashboard}
                    />
                  ) : null}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mt-1 flex flex-col gap-4 border-t border-[#e4e6e8] pt-6"
          data-name="5 Whys root cause path"
        >
          <h3 className="text-sm font-semibold leading-[1.5] tracking-[-0.04px]">
            {scenario.fiveWhysHeading}
          </h3>
          <div className="flex w-full min-w-0 flex-col gap-5">
            {scenario.fiveWhysRows.map((row) => (
              <div key={row.id} className="flex min-w-0 flex-col gap-2">
                <p className="text-base font-semibold leading-[1.5] tracking-[-0.1px]">{row.question}</p>
                <p className="text-base font-normal leading-[1.5] tracking-[-0.1px] not-italic">
                  <span className="inline">{row.answer}</span>
                  {row.answerTailBadge && singleIconBadgeKeys.has(`w:${row.id}`) ? (
                    <span className="ml-0.5 inline align-baseline">
                      <InlineCitationPopover
                        citations={row.answerTailBadge.citations}
                        citationKind={row.answerTailBadge.kind}
                        badgeClassName={auraCitationIconBadgeClass}
                        badgeSize="icon"
                        badgeIcon={<CitationBadgeIcon kind={row.answerTailBadge.kind} />}
                        onSourceClick={onSourceClick}
                        pdfPreviewAnchorKey={`w:${row.id}`}
                        onRequestPdfPreview={onRequestPdfPreview}
                        chartPreviewAnchorKey={`w:${row.id}`}
                        onRequestChartPreview={onRequestChartPreview}
                      />
                    </span>
                  ) : null}
                </p>
                <AnimatePresence mode="popLayout" initial={false}>
                  {pdfPreview?.anchorKey === `w:${row.id}` ? (
                    <InlinePdfPreviewCard
                      key={`pdf-w-${row.id}`}
                      citation={pdfPreview.citation}
                      onClose={() => setPdfPreview(null)}
                      onAddPdfToCanvas={onAddPdfToCanvas}
                      onSourceClick={onSourceClick}
                      citationBadgeKind={pdfPreview.iconKind}
                    />
                  ) : null}
                </AnimatePresence>
                <AnimatePresence mode="popLayout" initial={false}>
                  {chartPreview?.anchorKey === `w:${row.id}` ? (
                    <InlineChartPreviewCard
                      key={`chart-w-${row.id}`}
                      citation={chartPreview.citation}
                      onClose={() => setChartPreview(null)}
                      onAddChartToCanvas={onAddChartToCanvas}
                      onAddChartToDashboard={onAddChartToDashboard}
                    />
                  ) : null}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        <AnalyseActSourcesStrip pills={scenario.sourcesFooterPills} onSourceClick={onSourceClick} />
      </div>
    </div>
  );
}
