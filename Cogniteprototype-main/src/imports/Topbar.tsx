import svgPaths from "./svg-rd9dr84mqe";

function SubappIconBadge() {
  return (
    <div className="bg-[#f3f3f3] content-stretch flex items-center justify-center p-[6px] relative rounded-[1000px] shrink-0" data-name="Subapp icon badge">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="↳ Subapp icon">
        <div className="absolute inset-[32.33%_11.85%_4.17%_10.52%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4208 10.1609">
            <path d={svgPaths.p1ce4e600} fill="var(--fill-0, #3C5FFB)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[4.17%_11.85%_32.33%_10.52%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4208 10.1609">
            <path d={svgPaths.p302c0200} fill="var(--fill-0, #A5C8FF)" id="Vector" opacity="0.8" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Content">
      <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[-0.084px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss04'" }}>
        <p className="leading-[20px]">Canvas</p>
      </div>
    </div>
  );
}

function ItemContent() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Item content">
      <div className="content-stretch flex items-start overflow-clip pl-[5px] pr-[6px] relative shrink-0" data-name=".slash">
        <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#d9d9d9] text-[14px] tracking-[-0.084px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss04'" }}>
          <p className="leading-[20px]">/</p>
        </div>
      </div>
    </div>
  );
}

function BreadcrumbChevron() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Breadcrumb + chevron">
      <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[-0.084px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss04'" }}>
        <p className="leading-[20px]">My new canvas</p>
      </div>
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="ChevronDownSmall">
        <div className="absolute inset-[38.75%_26.25%_32.5%_26.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.6 4.6">
            <path clipRule="evenodd" d={svgPaths.p3691ae00} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BreadcrumbChevronMetadata() {
  return (
    <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Breadcrumb + chevron + metadata">
      <BreadcrumbChevron />
    </div>
  );
}

function BreadcrumbChevronMetadataDescription() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Breadcrumb + chevron + metadata + description">
      <BreadcrumbChevronMetadata />
    </div>
  );
}

function LeftContent() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 z-[4]" data-name="Left content">
      <div className="content-stretch flex items-center relative shrink-0" data-name="👉 Breadcrumbs">
        <div className="content-stretch flex gap-[6px] items-center justify-center py-[2px] relative shrink-0" data-name="↳ Subapp page">
          <SubappIconBadge />
          <Content />
        </div>
        <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="↳ Last page link">
          <ItemContent />
          <BreadcrumbChevronMetadataDescription />
        </div>
      </div>
    </div>
  );
}

function Filler() {
  return <div className="flex-[1_0_0] h-[17px] min-h-px min-w-[12px] z-[3]" data-name="Filler" />;
}

function Filler1() {
  return <div className="flex-[1_0_0] h-[17px] min-h-px min-w-[12px] z-[2]" data-name="Filler" />;
}

function IconOnly() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Restore">
        <div className="absolute inset-[6.25%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
            <path clipRule="evenodd" d={svgPaths.pf519400} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconOnly1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Refresh">
        <div className="absolute inset-[6.25%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
            <path clipRule="evenodd" d={svgPaths.p138e4600} fill="var(--fill-0, #8C8C8C)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Metadata() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 z-[3]" data-name="👉 Metadata">
      <div className="content-stretch flex items-start relative shrink-0" data-name="↳ Element 3">
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="💠 Button 2">
          <IconOnly />
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0" data-name="↳ Element 4">
        <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="💠 Button 2">
          <IconOnly1 />
        </div>
      </div>
      <div className="bg-[#d9d9d9] h-[16px] rounded-[4px] shrink-0 w-px" data-name="💠 Divider" />
    </div>
  );
}

function IconOnly2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="relative shrink-0 size-[16px]" data-name="Comments">
        <div className="absolute inset-[7.97%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.45 13.45">
            <g id="Vector">
              <path clipRule="evenodd" d={svgPaths.p2d31a280} fill="black" fillOpacity="0.9" fillRule="evenodd" />
              <path clipRule="evenodd" d={svgPaths.p2a13a500} fill="black" fillOpacity="0.9" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconOnly3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="History">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.p2dc07300} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconOnly4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="EllipsisHorizontal">
        <div className="absolute inset-[40.63%_9.38%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 3">
            <path clipRule="evenodd" d={svgPaths.p3edb8000} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconOnly5() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Share">
        <div className="absolute inset-[6.25%_13.01%_6.25%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.9182 14">
            <path clipRule="evenodd" d={svgPaths.p100e5000} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function LeftIcon() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[2px] relative shrink-0" data-name="Left Icon">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Add">
        <div className="absolute inset-[21.88%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
            <path clipRule="evenodd" d={svgPaths.p39fea100} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text">
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.084px] whitespace-nowrap" style={{ fontFeatureSettings: "'cv05'" }}>
        <p className="leading-[20px]">Add data</p>
      </div>
    </div>
  );
}

function LocalActions() {
  return (
    <div className="content-stretch flex gap-[4px] isolate items-center justify-end relative shrink-0 z-[1]" data-name="👉 Local actions">
      <div className="content-stretch flex items-start relative shrink-0 z-[7]" data-name="↳ Element 3">
        <div className="bg-[rgba(83,88,127,0.08)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="💠 Button 2">
          <IconOnly2 />
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 z-[6]" data-name="↳ Element 2">
        <div className="bg-[rgba(83,88,127,0.08)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="💠 Button 2">
          <IconOnly3 />
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 z-[5]" data-name="↳ Element 1">
        <div className="content-stretch flex items-start relative shrink-0" data-name="💠 DateTime range picker">
          <div className="content-stretch flex items-start relative shrink-0" data-name="Date range button">
            <div className="bg-[rgba(83,88,127,0.08)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="💠 Button">
              <IconOnly4 />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start pr-[4px] relative shrink-0 z-[4]" data-name="↳ 💠 Avatar">
        <div className="content-stretch flex flex-col items-start mr-[-4px] relative shrink-0" data-name="Avatar 1">
          <div className="bg-[#cee1fe] content-stretch flex flex-col items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="↳ Avatar 1">
            <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#031c6a] text-[12px] text-center whitespace-nowrap" style={{ fontFeatureSettings: "'ss04'" }}>
              <p className="leading-[16px]">GR</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 z-[3]" data-name="↳ Element 9">
        <div className="content-stretch flex items-start relative shrink-0" data-name="💠 DateTime range picker">
          <div className="content-stretch flex items-start relative shrink-0" data-name="Date range button">
            <div className="bg-[rgba(83,88,127,0.08)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0" data-name="💠 Button">
              <IconOnly5 />
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start relative shrink-0 z-[2]" data-name="↳ Primary button">
        <div className="content-stretch flex items-start relative shrink-0" data-name="↳ Primary button">
          <div className="bg-[#111213] hover:bg-[#2a2d2e] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors" data-name="💠 Button 2">
            <LeftIcon />
            <Text />
          </div>
        </div>
      </div>
    </div>
  );
}

function RightContent() {
  return (
    <div className="content-stretch flex gap-[8px] isolate items-center justify-end relative shrink-0 z-[1]" data-name="Right content">
      <Metadata />
      <div className="content-stretch flex gap-[8px] items-center relative shrink-0 z-[2]" data-name="👉 Metadata">
        <div className="content-stretch flex font-sans font-normal gap-[2px] items-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.55)] whitespace-nowrap" data-name="↳ Metadata tag">
          <div className="flex flex-col justify-center relative shrink-0" style={{ fontFeatureSettings: "'ss04'" }}>
            <p className="leading-[16px]">Edited</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0" style={{ fontFeatureSettings: "'ss04'" }}>
            <p className="leading-[16px]">1 d ago</p>
          </div>
        </div>
        <div className="bg-[#d9d9d9] h-[16px] rounded-[4px] shrink-0 w-px" data-name="💠 Divider" />
      </div>
      <LocalActions />
    </div>
  );
}

function Topbar1() {
  return (
    <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative" data-name="💠 Topbar">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex isolate items-center justify-between px-[20px] py-[12px] relative size-full">
          <LeftContent />
          <Filler />
          <Filler1 />
          <RightContent />
        </div>
      </div>
    </div>
  );
}

export default function Topbar() {
  return (
    <div className="content-stretch flex items-center relative size-full" data-name="Topbar">
      <Topbar1 />
    </div>
  );
}