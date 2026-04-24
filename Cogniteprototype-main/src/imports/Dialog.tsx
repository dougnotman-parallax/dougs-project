import svgPaths from "./svg-taspv9kr17";

export default function Dialog() {
  return (
    <div className="bg-white relative rounded-[12px] size-full" data-name="Dialog">
      <div className="content-stretch flex flex-col items-start overflow-clip py-[16px] relative rounded-[inherit] size-full">
        <div className="relative shrink-0 w-full" data-name="Header">
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-center pb-[8px] px-[16px] relative w-full">
              <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-name="Header">
                <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Back button + title">
                  <p className="flex-[1_0_0] font-sans font-medium leading-[24px] min-h-px min-w-px not-italic overflow-hidden relative text-[#191b1d] text-[18px] text-ellipsis tracking-[-0.1px] whitespace-nowrap">Leave feedback</p>
                </div>
                <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Close">
                    <div className="absolute inset-[21.88%]" data-name="Vector">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                        <path clipRule="evenodd" d={svgPaths.p39d1ef0} fill="var(--fill-0, #191B1D)" fillRule="evenodd" id="Vector" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[12px] items-start pt-[8px] relative shrink-0 w-full" data-name="Seperators + swap slot">
          <div className="relative shrink-0 w-full" data-name="Body description">
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[16px] relative w-full">
                <p className="flex-[1_0_0] font-sans font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#6d767e] text-[16px] tracking-[-0.1px]">Your agent conversation will be included along with your feedback to help improve your agent responses.</p>
              </div>
            </div>
          </div>
          <div className="relative shrink-0 w-full" data-name="Swap slot">
            <div className="content-stretch flex flex-col items-start px-[20px] relative w-full">
              <div className="content-stretch flex flex-col gap-[4px] h-[80px] items-start relative shrink-0 w-full" data-name="Variant=Default, Style=Outline">
                <div className="bg-white min-h-[80px] relative rounded-[6px] shrink-0 w-full" data-name="Input/Default">
                  <div aria-hidden="true" className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[6px]" />
                  <div className="content-stretch flex gap-[8px] items-start min-h-[inherit] pl-[12px] pr-[16px] py-[8px] relative w-full">
                    <div className="flex flex-[1_0_0] flex-col font-sans font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#8b949a] text-[14px] tracking-[-0.04px]">
                      <p className="leading-[18px]">Type description of your experience</p>
                    </div>
                    <div className="absolute bottom-[2px] right-[2px] size-[16px]" data-name="TextboxResizer">
                      <div className="absolute inset-[14.22%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4499 11.4499">
                          <g id="Vector">
                            <path d={svgPaths.p212f1a00} fill="var(--fill-0, #6D767E)" />
                            <path d={svgPaths.p38f61700} fill="var(--fill-0, #6D767E)" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full" data-name="Footer">
          <div className="flex flex-row items-center justify-end size-full">
            <div className="content-stretch flex gap-[8px] items-center justify-end pt-[12px] px-[16px] relative w-full">
              <div className="bg-white content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[12px] relative rounded-[6px] shrink-0" data-name="Button">
                <div aria-hidden="true" className="absolute border border-[#d4d7d9] border-solid inset-0 pointer-events-none rounded-[6px]" />
                <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#191b1d] text-[14px] whitespace-nowrap">Cancel</p>
              </div>
              <div className="bg-[#212426] content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[12px] relative rounded-[6px] shrink-0" data-name="Button">
                <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#f1f2f3] text-[14px] whitespace-nowrap">Share feedback</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.04),0px_20px_25px_-5px_rgba(0,0,0,0.1)]" />
    </div>
  );
}