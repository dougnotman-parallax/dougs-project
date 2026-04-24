import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconThumbDown,
  IconThumbDownFilled,
  IconThumbUp,
  IconThumbUpFilled,
} from "@tabler/icons-react";
import { toast } from "sonner";
import svgPaths from "../../imports/svg-pq4awcjw3z";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";
import { FeedbackModal } from "./FeedbackModal";

const tooltipContentClass =
  "z-[200] border-0 bg-[#191b1d] px-2.5 py-1.5 text-xs font-sans font-normal text-[#f1f2f3] shadow-md";

/** Preset reasons shown after thumbs-down (before optional free-text modal for "Other") */
export type BadResponsePresetReason = "inaccurate" | "irrelevant" | "hallucinations";

const BAD_RESPONSE_CHIPS: {
  id: BadResponsePresetReason | "other";
  label: string;
}[] = [
  { id: "inaccurate", label: "Inaccurate" },
  { id: "irrelevant", label: "Irrelevant" },
  { id: "hallucinations", label: "Hallucinations" },
  { id: "other", label: "Other" },
];

const chipMotionEase = [0.43, 0.13, 0.23, 0.96] as const;

const badResponseChipContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.08,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.055,
      staggerDirection: -1,
    },
  },
};

const badResponseChipItem = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: chipMotionEase },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.24, ease: chipMotionEase },
  },
};

interface ResponseActionsFooterProps {
  onThumbsUp?: () => void;
  onThumbsDown?: () => void;
  onCopy?: () => void;
  onRefresh?: () => void;
  onReasoning?: () => void;
  /** Free-text feedback from the modal (typically after user picks "Other") */
  onFeedbackSubmit?: (feedback: string) => void;
  /** One of the first three preset reasons (no modal) */
  onFeedbackPresetReason?: (reason: BadResponsePresetReason) => void;
}

export function ResponseActionsFooter({
  onThumbsUp,
  onThumbsDown,
  onCopy,
  onRefresh,
  onReasoning,
  onFeedbackSubmit,
  onFeedbackPresetReason,
}: ResponseActionsFooterProps) {
  const [thumbsUpActive, setThumbsUpActive] = useState(false);
  const [thumbsDownActive, setThumbsDownActive] = useState(false);
  /** Shown under actions while thumbs-down is on and user is picking / re-picking a reason */
  const [showBadResponseChips, setShowBadResponseChips] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  /** Increment to replay thumbs-down wiggle after feedback is captured */
  const [thumbsDownWiggleId, setThumbsDownWiggleId] = useState(0);

  const bumpThumbsDownWiggle = () => {
    setThumbsDownWiggleId((n) => n + 1);
  };

  const handleThumbsUp = () => {
    setThumbsUpActive(!thumbsUpActive);
    setThumbsDownActive(false);
    setShowBadResponseChips(false);
    setIsFeedbackModalOpen(false);
    onThumbsUp?.();
    toast("Thank you for submitting your feedback");
  };

  const handleThumbsDown = () => {
    const nextActive = !thumbsDownActive;
    setThumbsDownActive(nextActive);
    setThumbsUpActive(false);
    if (!nextActive) {
      setIsFeedbackModalOpen(false);
      setShowBadResponseChips(false);
    } else {
      setShowBadResponseChips(true);
    }
    onThumbsDown?.();
  };

  const handlePresetReason = (reason: BadResponsePresetReason) => {
    onFeedbackPresetReason?.(reason);
    toast("Thank you for submitting your feedback");
    bumpThumbsDownWiggle();
    setShowBadResponseChips(false);
    setIsFeedbackModalOpen(false);
  };

  const handleOtherClick = () => {
    setIsFeedbackModalOpen(true);
    setShowBadResponseChips(false);
  };

  const handleFeedbackSubmit = (feedback: string) => {
    onFeedbackSubmit?.(feedback);
    toast("Thank you for submitting your feedback");
    bumpThumbsDownWiggle();
    setShowBadResponseChips(false);
    setIsFeedbackModalOpen(false);
  };

  const handleFeedbackModalClose = () => {
    setIsFeedbackModalOpen(false);
    if (thumbsDownActive) {
      setShowBadResponseChips(true);
    }
  };

  const handleCopy = () => {
    onCopy?.();
  };

  const handleRefresh = () => {
    onRefresh?.();
  };

  const handleReasoning = () => {
    onReasoning?.();
  };

  return (
    <div className="relative shrink-0 w-full" data-name="AI actions">
      <div className="flex flex-col items-stretch w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[40px] py-[8px] relative w-full">
            <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Response actions">
              {/* Left Actions */}
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
                {/* Thumbs Up/Down Group */}
                <div className="content-stretch flex items-center relative shrink-0">
                  {/* Thumbs Up */}
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={handleThumbsUp}
                        className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px] transition-colors hover:bg-[rgba(0,0,0,0.04)]"
                        data-name="Button"
                        aria-label="Thumbs up"
                      >
                        <span className="relative flex size-4 items-center justify-center" data-name="ThumbUp">
                          {thumbsUpActive ? (
                            <IconThumbUpFilled className="size-4 text-[#191b1d]" stroke={1.5} aria-hidden />
                          ) : (
                            <IconThumbUp className="size-4 text-[#191b1d]" stroke={2} aria-hidden />
                          )}
                        </span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={6} className={tooltipContentClass}>
                      Good response
                    </TooltipContent>
                  </Tooltip>

                  {/* Thumbs Down */}
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={handleThumbsDown}
                        className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px] transition-colors hover:bg-[rgba(0,0,0,0.04)]"
                        data-name="Button"
                        aria-label="Thumbs down"
                        aria-expanded={thumbsDownActive}
                      >
                        <motion.span
                          key={thumbsDownWiggleId}
                          className="relative flex size-4 items-center justify-center"
                          data-name="ThumbDown"
                          initial={false}
                          animate={
                            thumbsDownWiggleId > 0
                              ? { rotate: [0, -13, 11, -8, 6, 0] }
                              : { rotate: 0 }
                          }
                          transition={{
                            duration: 0.52,
                            ease: [0.34, 1.35, 0.64, 1],
                          }}
                        >
                          {thumbsDownActive ? (
                            <IconThumbDownFilled className="size-4 text-[#191b1d]" stroke={1.5} aria-hidden />
                          ) : (
                            <IconThumbDown className="size-4 text-[#191b1d]" stroke={2} aria-hidden />
                          )}
                        </motion.span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" sideOffset={6} className={tooltipContentClass}>
                      Bad response
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Copy Button */}
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px] hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                      data-name="Button"
                      aria-label="Copy response"
                    >
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Copy">
                        <div className="absolute inset-[6.25%]" data-name="Vector">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                            <g id="Vector">
                              <path clipRule="evenodd" d={svgPaths.p2f1e3400} fill="#191B1D" fillRule="evenodd" />
                              <path clipRule="evenodd" d={svgPaths.p2c643b00} fill="#191B1D" fillRule="evenodd" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={6} className={tooltipContentClass}>
                    Copy response
                  </TooltipContent>
                </Tooltip>

                {/* Refresh Button */}
                <Tooltip delayDuration={200}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={handleRefresh}
                      className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px] hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                      data-name="Button"
                      aria-label="Refresh response"
                    >
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Refresh">
                        <div className="absolute inset-[12.5%_12.5%]" data-name="Vector">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
                            <path clipRule="evenodd" d={svgPaths.p138e4600} fill="#191B1D" fillRule="evenodd" id="Vector" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" sideOffset={6} className={tooltipContentClass}>
                    Regenerate response
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Right Actions - Reasoning Button */}
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleReasoning}
                    className="content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] relative rounded-[6px] shrink-0 hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                    data-name="Button"
                    aria-label="Show reasoning"
                  >
                    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Brain">
                      <div className="absolute inset-[7.04%]" data-name="Union">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.7471 13.7471">
                          <path clipRule="evenodd" d={svgPaths.p2c113200} fill="#191B1D" fillRule="evenodd" id="Union" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={6} className={tooltipContentClass}>
                  Show reasoning
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {thumbsDownActive && showBadResponseChips ? (
            <motion.div
              key="bad-response-reasons"
              className="flex w-full flex-wrap gap-2 px-[40px] pb-[10px] pt-0"
              role="group"
              aria-label="Why was this response not helpful?"
              variants={badResponseChipContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {BAD_RESPONSE_CHIPS.map((chip) => (
                <motion.button
                  key={chip.id}
                  type="button"
                  variants={badResponseChipItem}
                  onClick={() =>
                    chip.id === "other" ? handleOtherClick() : handlePresetReason(chip.id)
                  }
                  className="inline-flex shrink-0 items-center rounded-full border border-[#e4e6e8] bg-white px-3 py-1.5 font-sans text-xs font-medium leading-none tracking-[-0.02px] text-[#111213] transition-colors hover:bg-[#f8f9f9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3F56B5]"
                >
                  {chip.label}
                </motion.button>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={handleFeedbackModalClose}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}
