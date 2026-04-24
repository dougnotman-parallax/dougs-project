import { motion } from "motion/react";
import { useState } from "react";
import svgPathsChat from "../../imports/svg-ms7v0l42ok";
import { DASHBOARD_SUGGESTED_PATHS } from "../constants/suggestedPaths";
import { TypingText } from "./TypingText";

interface AgentInitialMessageProps {
  isSidePanel?: boolean;
  /** When true, show the empty-state new conversation greeting (e.g. "Ryan, What can we help you with in your CDF work space?") */
  variant?: "dashboard" | "newConversation";
  userName?: string;
  /** Fired when user picks a pre-suggested path (same labels as dashboard chips) */
  onSuggestionSelect?: (suggestion: string) => void;
}

export function AgentInitialMessage({ isSidePanel = false, variant = "dashboard", userName = "Ryan", onSuggestionSelect }: AgentInitialMessageProps) {
  const [showActions, setShowActions] = useState(false);

  const isNewConversation = variant === "newConversation";
  const greetingText = isNewConversation
    ? `${userName}, What can we help you with in your CDF work space?`
    : "Hi Ryan — I've reviewed your current dashboard. Here are a few actions you might want to take right now:";

  return (
    <div className={`content-stretch flex flex-col items-center justify-start ${isSidePanel ? 'px-[16px]' : 'px-[20px]'} py-[12px] relative w-full`}>
      <div className={`content-stretch flex flex-col gap-[24px] items-start ${isSidePanel ? 'w-full' : 'max-w-[800px]'} w-full`}>
        {/* AI Initial Response */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full"
        >
          <div className="relative shrink-0 w-full">
            <div className="flex flex-col justify-center size-full">
              <div className="content-stretch flex flex-col gap-[12px] items-start justify-center pr-[40px] py-[12px] relative w-full">
                <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-col items-start relative shrink-0">
                    <div className="bg-[#daf9f2] content-stretch flex flex-col items-center justify-center relative rounded-[4px] shrink-0 size-[28px]">
                      <div className="relative shrink-0 size-[16px]">
                        <div className="absolute inset-[6.25%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                            <path d={svgPathsChat.p2fcff200} fill="var(--fill-0, #14735E)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-[1_0_0] flex-col gap-[20px] max-w-[800px] min-h-px min-w-px">
                    {/* Greeting with typing animation */}
                    <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic relative text-[#111213] text-[16px] tracking-[-0.1px]">
                      <p className="leading-[20px]">
                        <TypingText 
                          key={greetingText}
                          text={greetingText}
                          onComplete={() => setShowActions(true)}
                        />
                      </p>
                    </div>

                    {/* Pre-suggested paths — same chips as dashboard, after greeting types (new conversation) */}
                    {isNewConversation && showActions && onSuggestionSelect && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`flex flex-wrap gap-[8px] items-center ${isSidePanel ? "w-full" : ""}`}
                      >
                        {DASHBOARD_SUGGESTED_PATHS.map((label) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => onSuggestionSelect(label)}
                            className="relative bg-white content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] rounded-[4px] shrink-0 hover:bg-[#f9fafa] transition-colors"
                          >
                            <span
                              aria-hidden
                              className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[4px]"
                            />
                            <span className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">
                              {label}
                            </span>
                          </button>
                        ))}
                      </motion.div>
                    )}

                    {/* Actions appear after typing completes — only for dashboard variant */}
                    {!isNewConversation && showActions && (
                      <>
                        {/* Action 1 */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col gap-[12px]"
                        >
                          <div className="flex gap-[8px] items-start">
                            <span className="text-[16px] leading-[20px]">⚠️</span>
                            <div className="flex flex-col gap-[8px] flex-1">
                              <p className="font-sans font-medium text-[16px] leading-[20px] text-[#111213] tracking-[-0.1px]">
                                1. Investigate the critical alert on P‑401
                              </p>
                              <p className="font-sans font-normal text-[15px] leading-[20px] text-[#5e666d] tracking-[-0.075px]">
                                Vibration levels exceeded the normal operating range a few minutes ago.
                                I can walk you through a quick incident triage or pull up recent condition‑monitoring trends.
                              </p>
                              <button className="bg-[#f9fafa] hover:bg-[#f1f2f3] transition-colors px-[12px] py-[8px] rounded-[6px] text-left border border-[#e4e6e8] w-fit">
                                <div className="flex items-center gap-[6px]">
                                  <span className="text-[15px]">→</span>
                                  <span className="font-sans font-normal text-[15px] leading-[20px] text-[#111213] tracking-[-0.075px]">
                                    Investigate incident on P‑401
                                  </span>
                                </div>
                              </button>
                            </div>
                          </div>
                        </motion.div>

                        {/* Action 2 */}
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="flex flex-col gap-[12px]"
                        >
                          <div className="flex gap-[8px] items-start">
                            <span className="text-[16px] leading-[20px]">🛠️</span>
                            <div className="flex flex-col gap-[8px] flex-1">
                              <p className="font-sans font-medium text-[16px] leading-[20px] text-[#111213] tracking-[-0.1px]">
                                2. Review overall equipment health
                              </p>
                              <p className="font-sans font-normal text-[15px] leading-[20px] text-[#5e666d] tracking-[-0.075px]">
                                There's a mix of critical, warning, and OK status tiles across key assets.
                                I can generate a consolidated health summary for the plant or help you prioritize attention areas.
                              </p>
                              <button className="bg-[#f9fafa] hover:bg-[#f1f2f3] transition-colors px-[12px] py-[8px] rounded-[6px] text-left border border-[#e4e6e8] w-fit">
                                <div className="flex items-center gap-[6px]">
                                  <span className="text-[15px]">→</span>
                                  <span className="font-sans font-normal text-[15px] leading-[20px] text-[#111213] tracking-[-0.075px]">
                                    Show system‑wide health overview
                                  </span>
                                </div>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}