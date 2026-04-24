import svgPaths from "./svg-b3pwvegnbl";

function ActionsRight() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions right">
      <div className="bg-[#f1f2f3] content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Send">
          <div className="absolute inset-[6.25%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <path clipRule="evenodd" d={svgPaths.p21172c00} fill="var(--fill-0, #8B949A)" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[172px] items-center justify-end relative shrink-0 w-full" data-name="Actions">
      <ActionsRight />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-white relative rounded-[12px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="content-stretch flex flex-col gap-[52px] items-start p-[12px] relative w-full">
        <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5e666d] text-[16px] tracking-[-0.1px] w-full">
          <p className="leading-[20px]">How can I help?</p>
        </div>
        <Actions />
      </div>
    </div>
  );
}

export default function AiChatInput() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-center relative rounded-[12px] size-full" data-name="AI chat input">
      <div aria-hidden="true" className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Input />
    </div>
  );
}