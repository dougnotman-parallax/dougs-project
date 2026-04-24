import svgPaths from "./svg-s8dqgc9ief";

function Text() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative" data-name="Text">
      <div className="flex flex-[1_0_0] flex-col font-sans font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[14px] text-[rgba(0,0,0,0.55)] tracking-[-0.084px]">
        <p className="leading-[20px]">Ask a question...</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white content-stretch flex items-start min-h-[80px] py-[8px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[rgba(83,88,127,0.16)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="📄 Content (adjust content w/ variables)">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[8px] relative w-full">
            <Text />
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonLabel() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Button label">
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-center text-ellipsis tracking-[-0.084px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Auto</p>
      </div>
    </div>
  );
}

export default function ChatInput() {
  return (
    <div className="relative size-full" data-name="Chat input">
      <div className="absolute content-stretch flex flex-col h-[79px] items-start left-0 min-w-[180px] top-0 w-[439px]" data-name="🔹 Text area">
        <Input />
      </div>
      <div className="absolute content-stretch flex items-start left-[8px] top-[43px]" data-name="🔹 Button">
        <div className="bg-[rgba(88,91,107,0.08)] content-stretch flex gap-[6px] h-[28px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="🏷️ 𝗕𝗨𝗧𝗧𝗢𝗡 𝗪𝗜𝗧𝗛 𝗟𝗔𝗕𝗘𝗟">
          <ButtonLabel />
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="ChevronDown">
            <div className="absolute inset-[38.75%_20%_26.25%_20%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 5.6">
                <path clipRule="evenodd" d={svgPaths.p2e2f4200} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex items-start left-[403px] top-[43px]" data-name="🔹 Button">
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[28px] items-center justify-center px-[6px] relative rounded-[4px] shrink-0" data-name="⭐️ 𝗜𝗖𝗢𝗡 𝗢𝗡𝗟𝗬 𝗕𝗨𝗧𝗧𝗢𝗡">
          <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Send">
            <div className="absolute inset-[6.25%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                <path clipRule="evenodd" d={svgPaths.p21172c00} fill="var(--fill-0, #8C8C8C)" fillRule="evenodd" id="Vector" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}