import svgPaths from "./svg-i45f68huoa";

function Header() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[8px] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Pinned apps</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Frame">
      <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">App name</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Frame">
      <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">App name</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Frame">
      <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">App name</p>
    </div>
  );
}

function Row() {
  return (
    <div className="content-center flex flex-wrap gap-[8px] items-center relative shrink-0 w-full" data-name="Row 1">
      <div className="bg-[#f9fafa] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name=".Pinned_widget_app">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[4px] items-center p-[8px] relative w-full">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Placeholder">
              <div className="absolute inset-[6.25%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <g id="Vector">
                    <path d={svgPaths.p25c27870} fill="#111213" />
                    <path d={svgPaths.p31ad1980} fill="#111213" />
                    <path d={svgPaths.p2a2f9b00} fill="#111213" />
                    <path d={svgPaths.p15514080} fill="#111213" />
                    <path d={svgPaths.p11f11380} fill="#111213" />
                    <path d={svgPaths.p1ba17e00} fill="#111213" />
                    <path d={svgPaths.p3e1dab00} fill="#111213" />
                    <path d={svgPaths.p3768b480} fill="#111213" />
                  </g>
                </svg>
              </div>
            </div>
            <Frame />
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name=".Pinned_widget_app">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[4px] items-center p-[8px] relative w-full">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Placeholder">
              <div className="absolute inset-[6.25%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <g id="Vector">
                    <path d={svgPaths.p25c27870} fill="#111213" />
                    <path d={svgPaths.p31ad1980} fill="#111213" />
                    <path d={svgPaths.p2a2f9b00} fill="#111213" />
                    <path d={svgPaths.p15514080} fill="#111213" />
                    <path d={svgPaths.p11f11380} fill="#111213" />
                    <path d={svgPaths.p1ba17e00} fill="#111213" />
                    <path d={svgPaths.p3e1dab00} fill="#111213" />
                    <path d={svgPaths.p3768b480} fill="#111213" />
                  </g>
                </svg>
              </div>
            </div>
            <Frame1 />
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] flex-[1_0_0] min-h-px min-w-px relative rounded-[4px]" data-name=".Pinned_widget_app">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[4px] items-center p-[8px] relative w-full">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Placeholder">
              <div className="absolute inset-[6.25%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                  <g id="Vector">
                    <path d={svgPaths.p25c27870} fill="#111213" />
                    <path d={svgPaths.p31ad1980} fill="#111213" />
                    <path d={svgPaths.p2a2f9b00} fill="#111213" />
                    <path d={svgPaths.p15514080} fill="#111213" />
                    <path d={svgPaths.p11f11380} fill="#111213" />
                    <path d={svgPaths.p1ba17e00} fill="#111213" />
                    <path d={svgPaths.p3e1dab00} fill="#111213" />
                    <path d={svgPaths.p3768b480} fill="#111213" />
                  </g>
                </svg>
              </div>
            </div>
            <Frame2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Row1() {
  return <div className="content-center flex flex-wrap gap-[8px] items-center shrink-0 w-full" data-name="Row 2" />;
}

function Apps() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Apps">
      <Row />
      <Row1 />
    </div>
  );
}

export default function PinnedApps() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative size-full" data-name="Pinned apps">
      <Header />
      <Apps />
    </div>
  );
}