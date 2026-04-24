import { motion } from "motion/react";
import { useState } from "react";
import svgPathsChat from "../../imports/svg-ms7v0l42ok";
import { TypingText } from "./TypingText";

interface AgentMessageProps {
  isSidePanel?: boolean;
  agentName: string;
  agentDescription: string;
}

export function AgentMessage({ isSidePanel = false, agentName, agentDescription }: AgentMessageProps) {
  const [showActions, setShowActions] = useState(false);

  // Generate a contextual greeting based on the agent
  const getAgentGreeting = () => {
    return `Hi! I'm the ${agentName}. ${agentDescription} How can I help you today?`;
  };

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
                          text={getAgentGreeting()}
                          onComplete={() => setShowActions(true)}
                        />
                      </p>
                    </div>

                    {/* Suggested actions appear after typing completes */}
                    {showActions && (
                      <>
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col gap-[12px]"
                        >
                          <div className="flex gap-[8px] items-start">
                            <span className="text-[16px] leading-[20px]">💬</span>
                            <div className="flex flex-col gap-[8px] flex-1">
                              <p className="font-sans font-normal text-[15px] leading-[20px] text-[#5e666d] tracking-[-0.075px]">
                                Ask me anything related to my capabilities, or try one of these suggestions:
                              </p>
                              <div className="flex flex-col gap-[8px]">
                                <button className="bg-[#f9fafa] hover:bg-[#f1f2f3] transition-colors px-[12px] py-[8px] rounded-[6px] text-left border border-[#e4e6e8] w-fit">
                                  <div className="flex items-center gap-[6px]">
                                    <span className="text-[15px]">→</span>
                                    <span className="font-sans font-normal text-[15px] leading-[20px] text-[#111213] tracking-[-0.075px]">
                                      What can you help me with?
                                    </span>
                                  </div>
                                </button>
                                <button className="bg-[#f9fafa] hover:bg-[#f1f2f3] transition-colors px-[12px] py-[8px] rounded-[6px] text-left border border-[#e4e6e8] w-fit">
                                  <div className="flex items-center gap-[6px]">
                                    <span className="text-[15px]">→</span>
                                    <span className="font-sans font-normal text-[15px] leading-[20px] text-[#111213] tracking-[-0.075px]">
                                      Show me an example
                                    </span>
                                  </div>
                                </button>
                              </div>
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
