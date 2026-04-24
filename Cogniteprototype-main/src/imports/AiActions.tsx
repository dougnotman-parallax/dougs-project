import svgPaths from "./svg-10622mi4a5";

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="bg-[#40464a] content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
        <div className="relative shrink-0 size-[16px]" data-name="ThumbUp">
          <div className="absolute inset-[12.34%_5.47%_11.91%_5.47%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.25 12.1202">
              <path clipRule="evenodd" d={svgPaths.p263fde80} fill="var(--fill-0, #F1F2F3)" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Actions">
      <Frame />
      <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
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
      </div>
      <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[28px]" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Refresh">
          <div className="absolute inset-[6.25%_12.5%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
              <path clipRule="evenodd" d={svgPaths.p138e4600} fill="var(--fill-0, #191B1D)" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResponseActions() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px min-w-px relative" data-name="Response actions">
      <Actions />
      <div className="content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] relative rounded-[6px] shrink-0" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Brain">
          <div className="absolute inset-[7.04%]" data-name="Union">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.7471 13.7471">
              <path clipRule="evenodd" d={svgPaths.p2c113200} fill="var(--fill-0, #191B1D)" fillRule="evenodd" id="Union" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AiActions() {
  return (
    <div className="content-stretch flex items-center px-[40px] py-[8px] relative size-full" data-name="AI actions">
      <ResponseActions />
    </div>
  );
}