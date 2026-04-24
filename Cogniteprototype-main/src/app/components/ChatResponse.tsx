import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import svgPathsChat from "../../imports/svg-ms7v0l42ok";
import {
  resolveChatResponseScenario,
  type CitationBadgeKind,
  type CitationDetail,
} from "../constants/chatResponseScenarios";
import {
  ANALYSE_ACT_TIMELINE_TAG,
  isAnalyseActExpandedMessage,
} from "../constants/suggestedPaths";
import { AnalyseActResponse } from "./AnalyseActResponse";
import { InlineCitationPopover } from "./InlineCitationPopover";
import { InlineChartPreviewCard } from "./InlineChartPreviewCard";
import { InlinePdfPreviewCard } from "./InlinePdfPreviewCard";
import { ResponseActionsFooter } from "./ResponseActionsFooter";
import { TypingText } from "./TypingText";
import type { AddChartToDashboardPayload } from "../constants/chatResponseScenarios";
import type { SelectedSource } from "./SourceDetailsPanel";

interface ChatResponseProps {
  userMessage: string;
  isSidePanel?: boolean;
  /** Clicking a source pill opens split source details; parent may expand from side panel to full screen */
  onSourceClick?: (source: SelectedSource) => void;
  onAddPdfToCanvas?: (payload: { fileUrl: string; title: string }) => void;
  onAddChartToCanvas?: (payload: { title: string }) => void;
  onAddChartToDashboard?: (payload: AddChartToDashboardPayload) => void;
}

/** Visual only (margin lives on a wrapper so the popover trigger stays inline) */
const citationBadgeVisualClass =
  "inline-flex h-5 max-h-5 shrink-0 align-baseline rounded-full border-0 bg-muted px-2 py-0 text-xs font-medium leading-none text-foreground";

export function ChatResponse({
  userMessage,
  isSidePanel = false,
  onSourceClick,
  onAddPdfToCanvas,
  onAddChartToCanvas,
  onAddChartToDashboard,
}: ChatResponseProps) {
  const [typingComplete, setTypingComplete] = useState(false);
  const { scenario, bodyForCopy, citations } = resolveChatResponseScenario(userMessage);
  const defaultCitationLabel = `Sources +${citations.length}`;
  const isAnalyseActPrompt = isAnalyseActExpandedMessage(userMessage);
  const userBubbleParts = isAnalyseActPrompt
    ? userMessage.split(ANALYSE_ACT_TIMELINE_TAG)
    : null;

  useEffect(() => {
    if (scenario?.kind === "analyseAct") {
      setTypingComplete(true);
    } else {
      setTypingComplete(false);
    }
  }, [userMessage, scenario?.kind]);

  const handleTypingComplete = useCallback(() => {
    setTypingComplete(true);
  }, []);

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
  }, [userMessage]);

  const onRequestPdfPreview = useCallback(
    (citation: CitationDetail, anchorKey: string, iconKind: CitationBadgeKind) => {
      setPdfPreview({ citation, anchorKey, iconKind });
    },
    [],
  );

  const onRequestChartPreview = useCallback((citation: CitationDetail, anchorKey: string) => {
    setChartPreview({ citation, anchorKey });
  }, []);

  const handleCopyResponse = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(bodyForCopy);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = bodyForCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand("copy");
        } finally {
          document.body.removeChild(textArea);
        }
      }
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  }, [bodyForCopy]);

  return (
    <div className={`content-stretch flex flex-col items-center justify-start ${isSidePanel ? 'px-[16px]' : 'px-[20px]'} py-[12px] relative w-full`} data-name="Chat">
      <div
        className={`content-stretch flex flex-col gap-[24px] items-start w-full ${isSidePanel ? "" : "max-w-[min(1040px,100%)]"}`}
        data-name="Chat content"
      >
        {/* User message */}
        <div className="relative shrink-0 w-full" data-name="AI user message">
          <div className="flex flex-row items-center justify-end max-w-[inherit] size-full">
            <div className="content-stretch flex items-center justify-end max-w-[inherit] pl-[80px] py-[12px] relative w-full">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#f9fafa] content-stretch flex gap-[4px] items-center justify-end p-[8px] relative rounded-[6px] shrink-0 max-w-[min(395px,100%)]" 
                data-name="Message"
              >
                <div className="flex flex-[1_0_0] flex-col font-sans font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#111213] text-[16px] text-right tracking-[-0.1px]">
                  <p className="leading-[20px] text-pretty">
                    {userBubbleParts && userBubbleParts.length === 2 ? (
                      <>
                        {userBubbleParts[0]}
                        <span
                          className="mx-0.5 inline-flex h-5 items-center rounded-[4px] bg-[#daf9f2] px-1.5 align-middle font-sans text-sm font-medium leading-none text-[#14735e]"
                          data-name="Inline timeline tag"
                        >
                          {ANALYSE_ACT_TIMELINE_TAG}
                        </span>
                        {userBubbleParts[1]}
                      </>
                    ) : (
                      userMessage
                    )}
                  </p>
                </div>
                {!isAnalyseActPrompt ? (
                  <div className="content-stretch flex items-start relative shrink-0" data-name="Citation">
                    <div className="bg-[#daf9f2] content-stretch flex gap-[4px] h-[20px] items-center justify-center px-[4px] relative rounded-[4px] shrink-0" data-name="Badge default">
                      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Number">
                        <div className="absolute inset-[12.5%]" data-name="Vector">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                            <path clipRule="evenodd" d={svgPathsChat.p13f46480} fill="var(--fill-0, #14735E)" fillRule="evenodd" id="Vector" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#14735e] text-[14px] text-center whitespace-nowrap">
                        <p className="leading-[18px]">21PT1019</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </div>
          </div>
        </div>

        {/* AI Response */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.22 }}
          className="content-stretch flex flex-col gap-[16px] items-start relative w-full min-w-0"
          data-name="Response group"
        >
          <div className="relative w-full min-w-0" data-name="AI response">
            <div className="flex w-full min-w-0 flex-col items-stretch justify-start">
              <div className="content-stretch flex flex-col gap-[12px] items-start justify-start pr-[40px] py-[12px] relative w-full min-w-0">
                {scenario?.kind === "analyseAct" ? (
                  <AnalyseActResponse
                    scenario={scenario}
                    onSourceClick={onSourceClick}
                    onAddPdfToCanvas={onAddPdfToCanvas}
                    onAddChartToCanvas={onAddChartToCanvas}
                    onAddChartToDashboard={onAddChartToDashboard}
                  />
                ) : scenario?.kind === "simple" ? (
                  <div
                    className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full"
                    data-name="Scenario response"
                  >
                    <div
                      className="bg-[#daf9f2] content-stretch flex shrink-0 items-center justify-center rounded-[4px] size-[28px]"
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
                    <div className="flex min-w-0 flex-1 flex-col gap-3 font-sans text-[#111213] leading-[1.5]">
                      <h2 className="text-base font-semibold leading-[1.5] tracking-[-0.08px]">
                        {scenario.title}
                      </h2>
                      <h3 className="text-sm font-semibold leading-[1.5] tracking-[-0.04px]">
                        {scenario.sectionHeading}
                      </h3>
                      <div className="flex flex-col gap-2">
                        <p className="text-base leading-[1.5] tracking-[-0.1px]">
                          <TypingText text={scenario.body} speed={8} onComplete={handleTypingComplete} />
                          {typingComplete ? (
                            <span className="ml-1 inline align-baseline" data-name="Inline citation">
                              <InlineCitationPopover
                                badgeLabel={scenario.inlineCitation}
                                citations={citations}
                                badgeClassName={citationBadgeVisualClass}
                                onSourceClick={onSourceClick}
                                pdfPreviewAnchorKey="simple-body"
                                onRequestPdfPreview={onRequestPdfPreview}
                                chartPreviewAnchorKey="simple-body"
                                onRequestChartPreview={onRequestChartPreview}
                              />
                            </span>
                          ) : null}
                        </p>
                        <AnimatePresence mode="popLayout" initial={false}>
                          {pdfPreview?.anchorKey === "simple-body" ? (
                            <InlinePdfPreviewCard
                              key="pdf-simple-body"
                              citation={pdfPreview.citation}
                              onClose={() => setPdfPreview(null)}
                              onAddPdfToCanvas={onAddPdfToCanvas}
                              onSourceClick={onSourceClick}
                              citationBadgeKind={pdfPreview.iconKind}
                            />
                          ) : null}
                        </AnimatePresence>
                        <AnimatePresence mode="popLayout" initial={false}>
                          {chartPreview?.anchorKey === "simple-body" ? (
                            <InlineChartPreviewCard
                              key="chart-simple-body"
                              citation={chartPreview.citation}
                              onClose={() => setChartPreview(null)}
                              onAddChartToCanvas={onAddChartToCanvas}
                              onAddChartToDashboard={onAddChartToDashboard}
                            />
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Avatar + message">
                    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Avatar">
                      <div className="bg-[#daf9f2] content-stretch flex flex-col items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Avatar">
                        <div className="relative shrink-0 size-[16px]" data-name="AtlasOutline">
                          <div className="absolute inset-[6.25%]" data-name="Vector">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                              <path d={svgPathsChat.p2fcff200} fill="var(--fill-0, #14735E)" id="Vector" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex min-h-px min-w-0 w-full flex-[1_0_0] flex-col justify-center font-sans font-normal leading-[1.5] not-italic relative text-[#111213] text-[16px] tracking-[-0.1px]">
                      <div className="flex flex-col gap-2">
                        <p className="leading-[1.5]">
                          <TypingText text={bodyForCopy} speed={8} onComplete={handleTypingComplete} />
                          {typingComplete ? (
                            <span className="ml-1 inline align-baseline" data-name="Inline citation">
                              <InlineCitationPopover
                                badgeLabel={defaultCitationLabel}
                                citations={citations}
                                badgeClassName={citationBadgeVisualClass}
                                onSourceClick={onSourceClick}
                                pdfPreviewAnchorKey="default-body"
                                onRequestPdfPreview={onRequestPdfPreview}
                                chartPreviewAnchorKey="default-body"
                                onRequestChartPreview={onRequestChartPreview}
                              />
                            </span>
                          ) : null}
                        </p>
                        <AnimatePresence mode="popLayout" initial={false}>
                          {pdfPreview?.anchorKey === "default-body" ? (
                            <InlinePdfPreviewCard
                              key="pdf-default-body"
                              citation={pdfPreview.citation}
                              onClose={() => setPdfPreview(null)}
                              onAddPdfToCanvas={onAddPdfToCanvas}
                              onSourceClick={onSourceClick}
                              citationBadgeKind={pdfPreview.iconKind}
                            />
                          ) : null}
                        </AnimatePresence>
                        <AnimatePresence mode="popLayout" initial={false}>
                          {chartPreview?.anchorKey === "default-body" ? (
                            <InlineChartPreviewCard
                              key="chart-default-body"
                              citation={chartPreview.citation}
                              onClose={() => setChartPreview(null)}
                              onAddChartToCanvas={onAddChartToCanvas}
                              onAddChartToDashboard={onAddChartToDashboard}
                            />
                          ) : null}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {typingComplete ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative w-full shrink-0"
              data-name="Response actions"
            >
              <ResponseActionsFooter
                onThumbsUp={() => console.log("Thumbs up clicked")}
                onThumbsDown={() => console.log("Thumbs down clicked")}
                onCopy={handleCopyResponse}
                onRefresh={() => console.log("Refresh clicked")}
                onReasoning={() => console.log("Reasoning clicked")}
                onFeedbackPresetReason={(reason) =>
                  console.log("Negative feedback preset:", reason)
                }
                onFeedbackSubmit={(text) => console.log("Feedback (Other):", text)}
              />
            </motion.div>
          ) : null}
        </motion.div>
      </div>
    </div>
  );
}