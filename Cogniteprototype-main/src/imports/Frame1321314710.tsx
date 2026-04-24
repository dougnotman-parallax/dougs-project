import svgPaths from "./svg-4x89m4gwif";

function IconOnly() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="❌ EllipsisVertical">
        <div className="absolute inset-[9.38%_40.63%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 13">
            <g id="Vector">
              <path d={svgPaths.p3d92b780} fill="black" fillOpacity="0.7" />
              <path d={svgPaths.p260a4200} fill="black" fillOpacity="0.7" />
              <path d={svgPaths.p1802af80} fill="black" fillOpacity="0.7" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function AgentName() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Agent name">
      <div className="relative shrink-0 size-[16px]" data-name="Atlas AI logo">
        <div className="absolute bg-[#491d8b] inset-[0_36%_64%_0] opacity-90 rounded-br-[16px] rounded-tl-[16px]" />
        <div className="absolute flex inset-[64%_0_0_36%] items-center justify-center">
          <div className="flex-none h-[5.76px] rotate-180 w-[10.24px]">
            <div className="bg-[#491d8b] opacity-90 rounded-br-[16px] rounded-tl-[16px] size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[0_0_36%_64%] items-center justify-center">
          <div className="-rotate-90 flex-none h-[5.76px] w-[10.24px]">
            <div className="bg-[#be95ff] rounded-br-[16px] rounded-tl-[16px] size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[36%_64%_0_0] items-center justify-center">
          <div className="-rotate-90 flex-none h-[5.76px] w-[10.24px]">
            <div className="bg-[#be95ff] rounded-br-[16px] rounded-tl-[16px] size-full" />
          </div>
        </div>
      </div>
      <p className="font-sans font-semibold leading-[20px] not-italic overflow-hidden relative shrink-0 text-[16px] text-[rgba(0,0,0,0.9)] text-ellipsis tracking-[-0.176px] w-[106px] whitespace-nowrap" style={{ fontFeatureSettings: "'cv05'" }}>
        Chat title
      </p>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[130px]" data-name="Heading">
      <AgentName />
    </div>
  );
}

function IconOnly1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="❌ Expand">
        <div className="absolute inset-[7.97%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.45 13.45">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p2a4fd300} fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p14dcea80} fill="var(--fill-0, black)" fillOpacity="0.7" fillRule="evenodd" />
            </g>
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

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[36px] items-center justify-center px-[10px] relative rounded-[6px] shrink-0" data-name="Button 2">
        <IconOnly1 />
      </div>
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[36px] items-center justify-center px-[10px] relative rounded-[6px] shrink-0" data-name="Close button">
        <IconOnly2 />
      </div>
    </div>
  );
}

function ButtonGroup() {
  return (
    <div className="content-stretch flex gap-[26px] items-start justify-end relative shrink-0" data-name="Button group">
      <Frame />
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-start justify-end min-h-px min-w-px relative" data-name="Buttons">
      <ButtonGroup />
    </div>
  );
}

function TopSection() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Top section">
      <div className="bg-[rgba(255,255,255,0)] content-stretch flex h-[36px] items-center justify-center px-[10px] relative rounded-[6px] shrink-0" data-name="Button 1">
        <IconOnly />
      </div>
      <Heading />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Buttons />
      </div>
    </div>
  );
}

function Contents() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-0 px-[20px] py-[12px] top-0 w-[358px]" data-name="Contents">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <TopSection />
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="NewMessage">
        <div className="absolute inset-[4.84%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.45 14.45">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.pdb01740} fill="var(--fill-0, #111213)" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p2a09480} fill="var(--fill-0, #111213)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="HistoryAlt">
        <div className="absolute inset-[6.25%_6.62%_6.25%_6.59%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.8871 13.9999">
            <g id="Vector">
              <path d={svgPaths.p3e60bd00} fill="var(--fill-0, #111213)" />
              <path clipRule="evenodd" d={svgPaths.p1fba8900} fill="var(--fill-0, #111213)" fillRule="evenodd" />
              <path d={svgPaths.p3f81c480} fill="var(--fill-0, #111213)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Icon">
      <div className="relative shrink-0 size-[16px]" data-name="Location">
        <div className="absolute inset-[7.97%_7.97%_6.63%_6.63%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6641 13.6641">
            <path clipRule="evenodd" d={svgPaths.p2dd94500} fill="var(--fill-0, #111213)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Frame1() {
  return (
    <div className="bg-white relative size-full">
      <Contents />
      <div className="absolute bg-white content-stretch flex flex-col gap-[4px] h-[126px] items-center left-[13px] py-[4px] rounded-[8px] top-[42px] w-[235px]" data-name="Dropdown menu">
        <div aria-hidden="true" className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.06),0px_1px_3px_0px_rgba(0,0,0,0.1)]" />
        <div className="relative shrink-0 w-full" data-name="Section 1">
          <div className="content-stretch flex flex-col items-start px-[4px] relative w-full">
            <div className="bg-[#f1f2f3] h-[36px] min-w-[128px] relative rounded-[6px] shrink-0 w-full" data-name="Item 1">
              <div className="flex flex-row items-center min-w-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] items-center min-w-[inherit] px-[8px] relative size-full">
                  <Icon />
                  <p className="flex-[1_0_0] font-sans font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111213] text-[16px] tracking-[-0.1px]">New conversation</p>
                </div>
              </div>
            </div>
            <div className="h-[36px] min-w-[128px] relative rounded-[6px] shrink-0 w-full" data-name="Item 3">
              <div className="flex flex-row items-center min-w-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] items-center min-w-[inherit] px-[8px] relative size-full">
                  <Icon1 />
                  <p className="flex-[1_0_0] font-sans font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111213] text-[16px] tracking-[-0.1px]">Conversation History</p>
                </div>
              </div>
            </div>
            <div className="h-[36px] min-w-[128px] relative rounded-[6px] shrink-0 w-full" data-name="Item 4">
              <div className="flex flex-row items-center min-w-[inherit] size-full">
                <div className="content-stretch flex gap-[8px] items-center min-w-[inherit] px-[8px] relative size-full">
                  <Icon2 />
                  <p className="flex-[1_0_0] font-sans font-normal leading-[20px] min-h-px min-w-px not-italic relative text-[#111213] text-[16px] tracking-[-0.1px]">Location</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}