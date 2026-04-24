import { motion } from "motion/react";
import svgPaths from "../../imports/svg-bga34fwplu";

interface ChatHistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function IconOnly() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="PushRight">
        <div className="absolute inset-[26.72%_14.22%_26.72%_26.72%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.45 7.45">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.pba88400} fill="var(--fill-0, white)" fillOpacity="0.82" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.pc711680} fill="var(--fill-0, white)" fillOpacity="0.82" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconOnly1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="❌ Search">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.p3ae12d00} fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconOnly2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="❌ CloseLarge">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path clipRule="evenodd" d={svgPaths.pf1cbe80} fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

interface ChatItemProps {
  title: string;
  time: string;
  isActive?: boolean;
}

function ChatItem({ title, time, isActive = false }: ChatItemProps) {
  return (
    <button className={`relative rounded-[8px] shrink-0 w-full hover:bg-[rgba(0,0,0,0.02)] transition-colors ${isActive ? 'bg-[rgba(0,0,0,0.02)]' : ''} text-left`} data-name="HEADER">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[12px] py-[8px] relative w-full">
        <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Badge + title">
          <div className={`flex flex-col ${isActive ? "font-sans font-medium" : "font-sans font-medium"} justify-start leading-[0] max-w-[600px] not-italic overflow-hidden relative text-[14px] ${isActive ? 'text-[rgba(0,0,0,0.9)]' : 'text-[#111827]'} text-ellipsis tracking-[-0.084px] whitespace-nowrap w-full`}>
            <p className={`${isActive ? 'leading-[20px]' : 'leading-[18px]'} overflow-hidden text-left`}>{title}</p>
          </div>
        </div>
        <div className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full" data-name="Description">
          <p className="font-sans font-medium leading-[18px] max-w-[600px] not-italic overflow-hidden relative text-[13px] text-[rgba(0,0,0,0.55)] text-ellipsis tracking-[-0.039px] whitespace-nowrap text-left">{time}</p>
        </div>
      </div>
    </button>
  );
}

export function ChatHistorySidebar({ isOpen, onClose }: ChatHistorySidebarProps) {
  const chatHistory = [
    { title: "High temperature anomaly in Turbine A-04", time: "Now", isActive: true },
    { title: "Finalizing maintenance schedules for Q4", time: "10m ago" },
    { title: "Reviewing emergency response protocols", time: "1hr ago" },
    { title: "Analyzing supply chain disruptions", time: "2d ago" },
    { title: "Documenting maintenance schedules", time: "12d ago" },
    { title: "Conducting staff training sessions", time: "13d ago" },
    { title: "Monitoring compliance with safety regulations", time: "22 May 2025" },
    { title: "Monitoring compliance with safety regulations", time: "22 May 2025" },
    { title: "Monitoring compliance with safety regulations", time: "22 May 2025" },
  ];

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: 332, opacity: 1 }}
      exit={{ width: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="bg-white content-stretch flex flex-col h-full items-start relative shrink-0 overflow-hidden rounded-tl-[8px] rounded-tr-[8px]"
      data-name="Sidebar"
    >
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-r border-solid inset-0 pointer-events-none" />
      
      {/* Header */}
      <div className="content-stretch flex flex-col h-[60px] items-start relative shrink-0 w-[332px]" data-name=".Header section Atlas AI">
        <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b border-solid inset-0 pointer-events-none" />
        <div className="relative shrink-0 w-full" data-name="Contents">
          <div className="content-stretch flex flex-col items-start pt-[12px] px-[20px] relative w-full">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Top section">
              <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Heading">
                <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Agent name">
                  <p className="flex-[1_0_0] font-sans font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[-0.176px]" style={{ fontFeatureSettings: "'cv05'" }}>
                    My Agent Chats
                  </p>
                </div>
              </div>
              <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-start justify-end min-h-px min-w-px relative" data-name="Buttons">
                  <div className="content-stretch flex gap-[4px] items-start justify-end relative shrink-0" data-name="Button group">
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[36px] items-center justify-center px-[10px] relative rounded-[6px] shrink-0" data-name="Close button">
                      <IconOnly1 />
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[4px] items-start justify-end relative shrink-0" data-name="Button group">
                    <button 
                      onClick={onClose}
                      className="bg-[rgba(255,255,255,0)] content-stretch flex h-[36px] items-center justify-center px-[10px] relative rounded-[6px] shrink-0 hover:bg-[rgba(0,0,0,0.05)] transition-colors" 
                      data-name="Close button"
                    >
                      <IconOnly2 />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat History List */}
      <div className="flex-[1_0_0] min-h-px min-w-px overflow-y-auto relative w-[332px]">
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[8px] relative w-full">
          {chatHistory.map((chat, index) => (
            <ChatItem key={index} title={chat.title} time={chat.time} isActive={chat.isActive} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}