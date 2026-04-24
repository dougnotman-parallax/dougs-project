import svgPaths from "./svg-grdyab3m7e";
import imgImage from "figma:asset/c9f28e7204884c6f1acbb0f3becc277e25d04575.png";
import imgAvatarDefault from "figma:asset/a07b0b43d6f080949cc7f3e45da3ec90c1c42f92.png";

function HeaderEmail() {
  return (
    <div className="content-stretch flex flex-col font-sans font-medium gap-[2px] h-full items-start justify-center leading-[14px] not-italic relative shrink-0 text-[12px] tracking-[-0.08px] whitespace-nowrap" data-name="Header + email">
      <p className="relative shrink-0 text-[#e4e6e8]">AkerBP-DEV</p>
      <p className="relative shrink-0 text-[#bbc0c4]">Industrial tools</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Profile">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[2px] relative w-full">
          <div className="relative rounded-[6px] shrink-0 size-[36px]" data-name="image">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
              <img alt="" className="absolute h-full left-[-20.76%] max-w-none top-0 w-[141.51%]" src={imgImage} />
            </div>
          </div>
          <div className="flex flex-row items-center self-stretch">
            <HeaderEmail />
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadingIconLabel() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="WaypointFilled">
        <div className="absolute inset-[6.25%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
            <path clipRule="evenodd" d={svgPaths.p1d7f340} fill="var(--fill-0, #E4E6E8)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">Valhall</p>
    </div>
  );
}

function LeadingIconLabel1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Search">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.p3ae12d00} fill="var(--fill-0, #E4E6E8)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">Search</p>
    </div>
  );
}

function LocationSearch() {
  return (
    <div className="relative shrink-0 w-full" data-name="location + search">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[2px] relative w-full">
        <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Project selector">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
              <LeadingIconLabel />
            </div>
          </div>
        </div>
        <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Search">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
              <LeadingIconLabel1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderLocationSearch() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header + location + search">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[6px] relative w-full">
        <div className="content-stretch flex gap-[4px] h-[40px] items-center relative shrink-0 w-full" data-name="Header">
          <Profile />
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px]" data-name="Project selector">
            <div className="relative shrink-0 size-[16px]" data-name="SidebarRight">
              <div className="absolute inset-[6.25%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9994 13.9994">
                  <path clipRule="evenodd" d={svgPaths.p23c7000} fill="var(--fill-0, #E4E6E8)" fillRule="evenodd" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <LocationSearch />
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="relative shrink-0 w-full" data-name="Separator">
      <div className="content-stretch flex flex-col items-start px-[6px] relative w-full">
        <div className="bg-[#40464a] h-px shrink-0 w-full" data-name="Separator" />
      </div>
    </div>
  );
}

function LeadingIconLabel2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="HomeFilled">
        <div className="absolute inset-[8.33%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3358 13.3332">
            <path d={svgPaths.p3cd5c400} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic relative text-[14px] text-white">Home</p>
    </div>
  );
}

function LeadingIconLabel3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="relative shrink-0 size-[16px]" data-name="Atlas">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p1d14e00} fill="var(--fill-0, #E4E6E8)" />
              <path d={svgPaths.p21b59000} fill="var(--fill-0, #E4E6E8)" />
              <path d={svgPaths.p2485cd00} fill="var(--fill-0, #E4E6E8)" />
              <path d={svgPaths.p2bc7c400} fill="var(--fill-0, #E4E6E8)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic relative text-[#e4e6e8] text-[14px]">Atlas</p>
    </div>
  );
}

function LeadingIconLabel4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="CanvasApp">
        <div className="absolute inset-[4.17%_14.39%_4.17%_11.75%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8167 14.6667">
            <path d={svgPaths.p2ce6da80} fill="var(--fill-0, #E4E6E8)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">Canvas</p>
    </div>
  );
}

function LeadingIconLabel5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="ChartsApp">
        <div className="absolute inset-[4.17%_4.58%_4.17%_6.39%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.2451 14.6667">
            <path d={svgPaths.p299bab00} fill="var(--fill-0, #E4E6E8)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">Charts</p>
    </div>
  );
}

function FixedApps() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Fixed apps">
      <div className="bg-[#5e666d] h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Home">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
            <LeadingIconLabel2 />
          </div>
        </div>
      </div>
      <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Atlas">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
            <LeadingIconLabel3 />
          </div>
        </div>
      </div>
      <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Canvas">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
            <LeadingIconLabel4 />
          </div>
        </div>
      </div>
      <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Charts">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
            <LeadingIconLabel5 />
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadingIconLabel6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Dot">
        <div className="absolute inset-[31.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <g id="Vector">
              <path d={svgPaths.p17b82700} fill="#E4E6E8" />
              <path clipRule="evenodd" d={svgPaths.p969ae00} fill="#E4E6E8" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">App</p>
    </div>
  );
}

function LeadingIconLabel7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Dot">
        <div className="absolute inset-[31.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <g id="Vector">
              <path d={svgPaths.p17b82700} fill="#E4E6E8" />
              <path clipRule="evenodd" d={svgPaths.p969ae00} fill="#E4E6E8" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">App</p>
    </div>
  );
}

function LeadingIconLabel8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Dot">
        <div className="absolute inset-[31.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <g id="Vector">
              <path d={svgPaths.p17b82700} fill="#E4E6E8" />
              <path clipRule="evenodd" d={svgPaths.p969ae00} fill="#E4E6E8" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">App</p>
    </div>
  );
}

function AppList() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="App list">
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#bbc0c4] text-[12px] text-center tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[14px]">Pinned apps</p>
      </div>
      <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="App">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
            <LeadingIconLabel6 />
          </div>
        </div>
      </div>
      <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="App">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
            <LeadingIconLabel7 />
          </div>
        </div>
      </div>
      <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="App">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
            <LeadingIconLabel8 />
          </div>
        </div>
      </div>
    </div>
  );
}

function PinnedApps() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Pinned apps">
      <AppList />
    </div>
  );
}

function MainPages() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Main pages">
      <FixedApps />
      <PinnedApps />
    </div>
  );
}

function Pages() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Pages">
      <div className="content-stretch flex flex-col gap-[12px] items-start px-[8px] relative size-full">
        <MainPages />
      </div>
    </div>
  );
}

function LeadingIconLabel9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="AppsFilled">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p158a8580} fill="var(--fill-0, #E4E6E8)" />
              <path d={svgPaths.p116fe2f0} fill="var(--fill-0, #E4E6E8)" />
              <path d={svgPaths.pd991a80} fill="var(--fill-0, #E4E6E8)" />
              <path d={svgPaths.pb47a680} fill="var(--fill-0, #E4E6E8)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">App library</p>
    </div>
  );
}

function LeadingIconLabel10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="HelpFilled">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.pa094100} fill="var(--fill-0, #F1F2F3)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">Help</p>
    </div>
  );
}

function LeadingIconLabel11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Leading icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="BellFilled">
        <div className="absolute inset-[7.97%_12.13%_7.97%_12.14%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1168 13.45">
            <g id="Vector">
              <path d={svgPaths.p19374b80} fill="var(--fill-0, #F1F2F3)" />
              <path clipRule="evenodd" d={svgPaths.p1d501a00} fill="var(--fill-0, #F1F2F3)" fillRule="evenodd" />
            </g>
          </svg>
        </div>
      </div>
      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">Notifications</p>
    </div>
  );
}

function GeneralPages() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="General pages">
      <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Marketplace">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
            <LeadingIconLabel9 />
          </div>
        </div>
      </div>
      <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Help">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
            <LeadingIconLabel10 />
          </div>
        </div>
      </div>
      <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Notifications">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
            <LeadingIconLabel11 />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderEmail1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start justify-center min-h-px min-w-px not-italic relative text-ellipsis whitespace-nowrap" data-name="Header + email">
      <p className="font-sans font-medium leading-[18px] overflow-hidden relative shrink-0 text-[#e4e6e8] text-[14px] w-full">Elizabeth Fitzgerald</p>
      <p className="font-sans font-normal leading-[14px] overflow-hidden relative shrink-0 text-[#bbc0c4] text-[12px] tracking-[-0.1px] w-full">AkerBP</p>
    </div>
  );
}

function Profile1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Profile">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center pr-[4px] relative w-full">
          <div className="relative rounded-[6px] shrink-0 size-[36px]" data-name=".avatar_default">
            <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[6px] size-full" src={imgAvatarDefault} />
          </div>
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <HeaderEmail1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterContent() {
  return (
    <div className="bg-[#212426] relative shrink-0 w-full" data-name="Footer content">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[6px] relative w-full">
        <GeneralPages />
        <div className="h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="Footer">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center p-[2px] relative size-full">
              <Profile1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NordicGradient() {
  return (
    <div className="absolute h-[913.311px] left-[604.2px] top-[-302.09px] w-[962.293px]" data-name="Nordic gradient">
      <div className="absolute inset-[-15.84%_-20.93%_-10.88%_-21.11%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1366.83 1157.3">
          <g id="Nordic gradient">
            <g filter="url(#filter0_fg_3_3468)" id="Vector" opacity="0.4">
              <path clipRule="evenodd" d={svgPaths.p1ce0d700} fill="url(#paint0_linear_3_3468)" fillOpacity="0.2" fillRule="evenodd" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1157.3" id="filter0_fg_3_3468" width="1366.83" x="7.62939e-06" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_3_3468" stdDeviation="150" />
              <feTurbulence baseFrequency="0.25 0.25" numOctaves="3" seed="2689" type="fractalNoise" />
              <feDisplacementMap height="100%" in="effect1_foregroundBlur_3_3468" result="displacedImage" scale="48" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect2_texture_3_3468">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_3468" x1="434.052" x2="1045.05" y1="424.088" y2="1256.98">
              <stop stopColor="#1A967A" />
              <stop offset="1" stopColor="#7FE9D2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function FjordGradient() {
  return (
    <div className="absolute h-[1021.825px] left-[-421.63px] top-[-167.91px] w-[1076.626px]" data-name="Fjord gradient">
      <div className="absolute inset-[-12.35%_-17.62%_-7.39%_-17.8%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1457.94 1223.52">
          <g id="Fjord gradient">
            <g filter="url(#filter0_fg_3_3471)" id="Vector" opacity="0.4">
              <path clipRule="evenodd" d={svgPaths.p5184780} fill="url(#paint0_linear_3_3471)" fillOpacity="0.2" fillRule="evenodd" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1223.52" id="filter0_fg_3_3471" width="1457.94" x="-7.62939e-06" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_3_3471" stdDeviation="150" />
              <feTurbulence baseFrequency="0.25 0.25" numOctaves="3" seed="2689" type="fractalNoise" />
              <feDisplacementMap height="100%" in="effect1_foregroundBlur_3_3471" result="displacedImage" scale="48" width="100%" xChannelSelector="R" yChannelSelector="G" />
              <feMerge result="effect2_texture_3_3471">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_3471" x1="449.98" x2="706.906" y1="438.831" y2="756.746">
              <stop stopColor="#DFE5FC" />
              <stop offset="1" stopColor="#728DF1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

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

function ChatPromptSuggestions() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0" data-name="Chat + prompt suggestions">
      <div className="bg-white content-stretch flex flex-col gap-[8px] items-center relative rounded-[12px] shrink-0 w-[594px]" data-name="AI chat input">
        <div aria-hidden="true" className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[12px]" />
        <Input />
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="AI suggestion">
        <div className="bg-white content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Button">
          <div aria-hidden="true" className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">Incident investigation</p>
        </div>
        <div className="bg-white content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Button">
          <div aria-hidden="true" className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">Analyse and act</p>
        </div>
        <div className="bg-white content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Button">
          <div aria-hidden="true" className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[4px]" />
          <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">Optimize maintenance</p>
        </div>
      </div>
    </div>
  );
}

function ChatPrompt() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center justify-center py-[60px] relative shrink-0 w-full" data-name="Chat prompt">
      <NordicGradient />
      <FjordGradient />
      <div className="flex flex-col font-['Space_Grotesk:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#111213] text-[28px] whitespace-nowrap">
        <p className="leading-[32px]">Welcome, Doug</p>
      </div>
      <ChatPromptSuggestions />
    </div>
  );
}

function DashboardDate() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Dashboard + date">
      <div className="content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">Dashboard options</p>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="ChevronDown">
          <div className="absolute inset-[38.75%_20%_26.25%_20%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 5.6">
              <path clipRule="evenodd" d={svgPaths.p2e2f4200} fill="var(--fill-0, #111213)" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <div className="content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0" data-name="Button">
        <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">12/17/2024</p>
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Calendar">
          <div className="absolute inset-[7.97%_12.13%_7.97%_12.14%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1167 13.45">
              <path clipRule="evenodd" d={svgPaths.p37618200} fill="var(--fill-0, #111213)" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardControl() {
  return (
    <div className="content-stretch flex items-center py-[4px] relative shrink-0 w-full" data-name="Dashboard control">
      <DashboardDate />
    </div>
  );
}

function IconTitle() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Icon + title">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="ErrorFilled">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.p8a27580} fill="var(--fill-0, #F43D5C)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Critical</p>
      </div>
    </div>
  );
}

function AssetTag() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[24px] relative shrink-0" data-name="Asset tag">
      <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">P-401</p>
      </div>
    </div>
  );
}

function TitleAssetTag() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Title + asset tag">
      <IconTitle />
      <AssetTag />
    </div>
  );
}

function FooterContent1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic pt-[12px] relative shrink-0 text-[14px] w-full" data-name="🦶 Footer content">
      <div className="flex flex-col font-sans font-medium justify-center min-w-full relative shrink-0 text-[#111213] w-[min-content]">
        <p className="leading-[18px]">Vibration levels have exceeded normal operating range</p>
      </div>
      <div className="flex flex-col font-sans font-normal justify-center overflow-hidden relative shrink-0 text-[#5e666d] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">Detected: 5 min ago</p>
      </div>
    </div>
  );
}

function IconTitle1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Icon + title">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="ErrorFilled">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.p8a27580} fill="var(--fill-0, #F43D5C)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Critical</p>
      </div>
    </div>
  );
}

function AssetTag1() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[24px] relative shrink-0" data-name="Asset tag">
      <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">P-401</p>
      </div>
    </div>
  );
}

function TitleAssetTag1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Title + asset tag">
      <IconTitle1 />
      <AssetTag1 />
    </div>
  );
}

function IconTitle2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Icon + title">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="WarningFilled">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.p148c5a80} fill="var(--fill-0, #AF7B00)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Warning</p>
      </div>
    </div>
  );
}

function AssetTag2() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[24px] relative shrink-0" data-name="Asset tag">
      <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">P-401</p>
      </div>
    </div>
  );
}

function TitleAssetTag2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Title + asset tag">
      <IconTitle2 />
      <AssetTag2 />
    </div>
  );
}

function ValueTag() {
  return (
    <div className="content-stretch flex flex-col font-sans font-medium items-start justify-center leading-[0] not-italic relative shrink-0 text-ellipsis whitespace-nowrap" data-name="Value + tag">
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[#111213] text-[16px] tracking-[-0.08px]">
        <p className="leading-[20px] overflow-hidden">Bar</p>
      </div>
      <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[#5e666d] text-[14px]">
        <p className="leading-[18px] overflow-hidden">V-192</p>
      </div>
    </div>
  );
}

function SubtitleIcon() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Subtitle + icon">
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">Since 2hrs ago</p>
      </div>
    </div>
  );
}

function LabelDifference() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-end justify-between min-h-px min-w-px relative" data-name="Label + difference">
      <ValueTag />
      <SubtitleIcon />
    </div>
  );
}

function CountLabel() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Count + label">
      <div className="bg-[#f1f2f3] content-stretch flex flex-col items-center justify-center min-h-[36px] min-w-[36px] px-[2px] relative rounded-[4px] shrink-0" data-name="Count">
        <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#40464a] text-[28px] text-center text-ellipsis tracking-[-0.1px] whitespace-nowrap">
          <p className="leading-[32px] overflow-hidden">4.2</p>
        </div>
      </div>
      <LabelDifference />
    </div>
  );
}

function IconTitle3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Icon + title">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="CheckmarkFilled">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.p3f0d1900} fill="var(--fill-0, #40464A)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Ok</p>
      </div>
    </div>
  );
}

function AssetTag3() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[24px] relative shrink-0" data-name="Asset tag">
      <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">P-401</p>
      </div>
    </div>
  );
}

function TitleAssetTag3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Title + asset tag">
      <IconTitle3 />
      <AssetTag3 />
    </div>
  );
}

function IconTitle4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Icon + title">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="CheckmarkFilled">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.p3f0d1900} fill="var(--fill-0, #40464A)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Ok</p>
      </div>
    </div>
  );
}

function AssetTag4() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[24px] relative shrink-0" data-name="Asset tag">
      <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">P-401</p>
      </div>
    </div>
  );
}

function TitleAssetTag4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Title + asset tag">
      <IconTitle4 />
      <AssetTag4 />
    </div>
  );
}

function BadgeTitle() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Badge + Title">
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Heatmap title</p>
      </div>
      <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="EllipsisVertical">
          <div className="absolute inset-[9.38%_40.63%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 13">
              <g id="Vector">
                <path d={svgPaths.p3d92b780} fill="#111213" />
                <path d={svgPaths.p260a4200} fill="#111213" />
                <path d={svgPaths.p1802af80} fill="#111213" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderContentButton() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-h-px min-w-px relative" data-name="Header content + button">
      <BadgeTitle />
    </div>
  );
}

function YAxis() {
  return (
    <div className="h-full relative shrink-0 w-[106px]" data-name="Y axis">
      <div className="flex flex-col items-end size-full">
        <div className="content-stretch flex flex-col font-sans font-medium items-end justify-between leading-[0] not-italic pb-[14px] pt-[24px] relative size-full text-[#5e666d] text-[10px] text-right tracking-[-0.08px]">
          <div className="flex flex-col justify-center relative shrink-0 w-full">
            <p className="leading-[12px]">Pump P-401</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 w-full">
            <p className="leading-[12px]">Pump P-402</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 w-full">
            <p className="leading-[12px]">Compressor C-101</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 w-full">
            <p className="leading-[12px]">Heat Exchanger E-301</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0 w-full">
            <p className="leading-[12px]">Reactor R-501</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function XAxisLabels() {
  return (
    <div className="relative shrink-0 w-full" data-name="X axis labels">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex font-sans font-medium gap-[12px] items-center leading-[0] not-italic px-[2px] relative text-[#5e666d] text-[10px] text-center tracking-[-0.08px] w-full whitespace-nowrap">
          <div className="flex flex-col justify-center relative shrink-0">
            <p className="leading-[12px]">Vibration</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0">
            <p className="leading-[12px]">Temp</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0">
            <p className="leading-[12px]">Pressure</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0">
            <p className="leading-[12px]">Efficiency</p>
          </div>
          <div className="flex flex-col justify-center relative shrink-0">
            <p className="leading-[12px]">Flow rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeatMap() {
  return (
    <div className="flex-[1_0_0] gap-x-[4px] gap-y-[4px] grid grid-cols-[repeat(5,minmax(0,1fr))] grid-rows-[repeat(5,minmax(0,1fr))] min-h-px min-w-px relative w-full" data-name="Heat map">
      <div className="bg-[rgba(47,85,234,0.2)] col-1 justify-self-stretch relative rounded-[2px] row-1 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.5)] col-2 justify-self-stretch relative rounded-[2px] row-1 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.8)] col-3 justify-self-stretch relative rounded-[2px] row-1 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.2)] col-4 justify-self-stretch relative rounded-[2px] row-1 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.2)] col-5 justify-self-stretch relative rounded-[2px] row-1 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.65)] col-1 justify-self-stretch relative rounded-[2px] row-2 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.8)] col-2 justify-self-stretch relative rounded-[2px] row-2 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[#2f55ea] col-3 justify-self-stretch relative rounded-[2px] row-2 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.5)] col-4 justify-self-stretch relative rounded-[2px] row-2 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.8)] col-5 justify-self-stretch relative rounded-[2px] row-2 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.65)] col-1 justify-self-stretch relative rounded-[2px] row-3 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.5)] col-2 justify-self-stretch relative rounded-[2px] row-3 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[#2f55ea] col-3 justify-self-stretch relative rounded-[2px] row-3 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.2)] col-4 justify-self-stretch relative rounded-[2px] row-3 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[#2f55ea] col-5 justify-self-stretch relative rounded-[2px] row-3 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.5)] col-1 justify-self-stretch relative rounded-[2px] row-4 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.2)] col-2 justify-self-stretch relative rounded-[2px] row-4 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.8)] col-3 justify-self-stretch relative rounded-[2px] row-4 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.2)] col-4 justify-self-stretch relative rounded-[2px] row-4 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.8)] col-5 justify-self-stretch relative rounded-[2px] row-4 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.8)] col-1 justify-self-stretch relative rounded-[2px] row-5 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.2)] col-2 justify-self-stretch relative rounded-[2px] row-5 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.8)] col-3 justify-self-stretch relative rounded-[2px] row-5 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.8)] col-4 justify-self-stretch relative rounded-[2px] row-5 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
      <div className="bg-[rgba(47,85,234,0.2)] col-5 justify-self-stretch relative rounded-[2px] row-5 self-stretch shrink-0" data-name=".Headmap-bar">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="size-full" />
        </div>
      </div>
    </div>
  );
}

function XAxisHeatMap() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-full items-start relative shrink-0 w-[256px]" data-name="X axis + heat map">
      <XAxisLabels />
      <HeatMap />
    </div>
  );
}

function HeatMapLabels() {
  return (
    <div className="content-stretch flex gap-[4px] h-[183px] items-end relative shrink-0" data-name="Heat map + labels">
      <YAxis />
      <XAxisHeatMap />
    </div>
  );
}

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

function BadgeTitle1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Badge + Title">
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Chart title</p>
      </div>
      <div className="content-stretch flex items-center justify-center relative rounded-[4px] shrink-0 size-[28px]" data-name="Button">
        <div className="overflow-clip relative shrink-0 size-[16px]" data-name="EllipsisVertical">
          <div className="absolute inset-[9.38%_40.63%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3 13">
              <g id="Vector">
                <path d={svgPaths.p3d92b780} fill="#111213" />
                <path d={svgPaths.p260a4200} fill="#111213" />
                <path d={svgPaths.p1802af80} fill="#111213" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metadata() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Metadata">
      <div className="flex flex-[1_0_0] flex-col font-sans font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">January - June 2024</p>
      </div>
    </div>
  );
}

function HeaderContentButton1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-h-px min-w-px relative" data-name="Header content + button">
      <BadgeTitle1 />
      <Metadata />
    </div>
  );
}

function Charts() {
  return (
    <div className="h-[139.195px] relative shrink-0 w-full" data-name="Charts">
      <div className="absolute inset-[-0.36%_0_0_-0.11%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 299.183 139.695">
          <g id="Charts">
            <g id="Group">
              <path d={svgPaths.p1220f400} fill="url(#paint0_linear_3_3494)" fillOpacity="0.6" id="Vector" />
              <path d={svgPaths.pfa2e400} id="Vector_2" stroke="var(--stroke-0, #2F55EA)" />
            </g>
            <path d={svgPaths.p17669300} fill="url(#paint1_linear_3_3494)" fillOpacity="0.2" id="Vector_3" />
            <path d={svgPaths.p210ebc80} id="Vector_4" stroke="var(--stroke-0, #2F55EA)" />
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_3494" x1="149.776" x2="149.776" y1="84.6236" y2="139.695">
              <stop stopColor="#2F55EA" stopOpacity="0.8" />
              <stop offset="1" stopColor="#2F55EA" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_3_3494" x1="149.735" x2="149.735" y1="0.500101" y2="117.591">
              <stop stopColor="#2F55EA" stopOpacity="0.65" />
              <stop offset="1" stopColor="#2F55EA" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function TimeValue() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48px]" data-name="Time value">
      <p className="font-sans font-normal leading-[14px] not-italic relative shrink-0 text-[#5e666d] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">Apr 1</p>
    </div>
  );
}

function TimeValue1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48px]" data-name="Time value">
      <p className="font-sans font-normal leading-[14px] not-italic relative shrink-0 text-[#5e666d] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">Apr 7</p>
    </div>
  );
}

function TimeValue2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48px]" data-name="Time value">
      <p className="font-sans font-normal leading-[14px] not-italic relative shrink-0 text-[#5e666d] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">Apr 14</p>
    </div>
  );
}

function TimeValue3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48px]" data-name="Time value">
      <p className="font-sans font-normal leading-[14px] not-italic relative shrink-0 text-[#5e666d] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">Apr 21</p>
    </div>
  );
}

function TimeValue4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-[48px]" data-name="Time value">
      <p className="font-sans font-normal leading-[14px] not-italic relative shrink-0 text-[#5e666d] text-[12px] text-center tracking-[-0.1px] whitespace-nowrap">Apr 30</p>
    </div>
  );
}

function XAxisLabel() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="X axis label">
      <TimeValue />
      <TimeValue1 />
      <TimeValue2 />
      <TimeValue3 />
      <TimeValue4 />
    </div>
  );
}

function ChartXAxis() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Chart + x axis">
      <Charts />
      <XAxisLabel />
    </div>
  );
}

function ColorUnit() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="Color + unit">
      <div className="bg-[rgba(47,85,234,0.8)] rounded-[2px] shrink-0 size-[8px]" data-name="Color legend" />
      <p className="font-sans font-normal leading-[18px] not-italic relative shrink-0 text-[#5e666d] text-[14px] text-center tracking-[-0.04px] whitespace-nowrap">unit</p>
    </div>
  );
}

function ColorUnit1() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="Color + unit">
      <div className="bg-[rgba(47,85,234,0.5)] rounded-[2px] shrink-0 size-[8px]" data-name="Color legend" />
      <p className="font-sans font-normal leading-[18px] not-italic relative shrink-0 text-[#5e666d] text-[14px] text-center tracking-[-0.04px] whitespace-nowrap">unit</p>
    </div>
  );
}

function Legend() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 w-full" data-name="Legend">
      <ColorUnit />
      <ColorUnit1 />
    </div>
  );
}

function ChartLegendXAxisLabels() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Chart + legend + x axis labels">
      <Legend />
    </div>
  );
}

function ChartLegend() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Chart + legend">
      <ChartXAxis />
      <ChartLegendXAxisLabels />
    </div>
  );
}

function SubtitleIcon1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[232px]" data-name="Subtitle + icon">
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#111213] text-[14px] text-ellipsis whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">Trending up by 5.2% this month</p>
      </div>
      <div className="relative shrink-0 size-[16px]" data-name="TrendingZagUp">
        <div className="absolute bottom-[23.58%] left-[6.25%] right-[6.25%] top-1/4" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8.2275">
            <path clipRule="evenodd" d={svgPaths.p24446700} fill="var(--fill-0, #111213)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ColorUnit2() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="Color + unit">
      <div className="bg-[rgba(47,85,234,0.5)] rounded-[2px] shrink-0 size-[8px]" data-name="Color legend" />
      <p className="font-sans font-normal leading-[18px] not-italic relative shrink-0 text-[#5e666d] text-[14px] text-center tracking-[-0.04px] whitespace-nowrap">unit</p>
    </div>
  );
}

function ColorUnitNumber() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Color + unit + number">
      <ColorUnit2 />
      <p className="font-sans font-normal leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] text-center tracking-[-0.04px] whitespace-nowrap">number</p>
    </div>
  );
}

function ColorUnit3() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="Color + unit">
      <div className="bg-[rgba(47,85,234,0.8)] rounded-[2px] shrink-0 size-[8px]" data-name="Color legend" />
      <p className="font-sans font-normal leading-[18px] not-italic relative shrink-0 text-[#5e666d] text-[14px] text-center tracking-[-0.04px] whitespace-nowrap">unit</p>
    </div>
  );
}

function ColorUnitNumber1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Color + unit + number">
      <ColorUnit3 />
      <p className="font-sans font-normal leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] text-center tracking-[-0.04px] whitespace-nowrap">number</p>
    </div>
  );
}

function IconTitle5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Icon + title">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="CheckmarkFilled">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.p3f0d1900} fill="var(--fill-0, #40464A)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Ok</p>
      </div>
    </div>
  );
}

function AssetTag5() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[24px] relative shrink-0" data-name="Asset tag">
      <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">P-401</p>
      </div>
    </div>
  );
}

function TitleAssetTag5() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Title + asset tag">
      <IconTitle5 />
      <AssetTag5 />
    </div>
  );
}

function IconTitle6() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Icon + title">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="CheckmarkFilled">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path clipRule="evenodd" d={svgPaths.p3f0d1900} fill="var(--fill-0, #40464A)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Ok</p>
      </div>
    </div>
  );
}

function AssetTag6() {
  return (
    <div className="content-stretch flex items-center justify-center pl-[24px] relative shrink-0" data-name="Asset tag">
      <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
        <p className="leading-[18px] overflow-hidden">P-401</p>
      </div>
    </div>
  );
}

function TitleAssetTag6() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Title + asset tag">
      <IconTitle6 />
      <AssetTag6 />
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex items-center justify-center pb-[8px] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
        <p className="leading-[20px] overflow-hidden">Continue where you left off</p>
      </div>
    </div>
  );
}

function IconLabel1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Icon + label">
      <div className="relative shrink-0 size-[16px]" data-name="Atlas">
        <div className="absolute inset-[6.25%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p1d14e00} fill="var(--fill-0, #111213)" />
              <path d={svgPaths.p21b59000} fill="var(--fill-0, #111213)" />
              <path d={svgPaths.p2485cd00} fill="var(--fill-0, #111213)" />
              <path d={svgPaths.p2bc7c400} fill="var(--fill-0, #111213)" />
            </g>
          </svg>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#111213] text-[14px]">
        <p className="leading-[18px]">Boiler steam leak near header B</p>
      </div>
    </div>
  );
}

function IconLabel() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Icon + label">
      <IconLabel1 />
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#40464a] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[18px]">28 Nov 2025</p>
      </div>
    </div>
  );
}

function Filler() {
  return <div className="self-stretch shrink-0 w-[24px]" data-name="Filler" />;
}

function Summary() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Summary">
      <Filler />
      <div className="flex flex-[1_0_0] flex-col font-sans font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[14px] text-ellipsis tracking-[-0.04px]">
        <p className="leading-[18px]">{`Ultrasonic survey indicates continuous hiss with elevated condensate returns; small steam leak wasting energy. `}</p>
      </div>
    </div>
  );
}

function IconLabel3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="ChartsApp">
        <div className="absolute inset-[4.17%_4.58%_4.17%_6.39%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.2451 14.6667">
            <path d={svgPaths.p299bab00} fill="var(--fill-0, #111213)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#111213] text-[14px]">
        <p className="leading-[18px]">23-HA-9114/9115 1st stage discharge coolers test</p>
      </div>
    </div>
  );
}

function IconLabel2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Icon + label">
      <IconLabel3 />
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#40464a] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[18px]">28 Nov 2025</p>
      </div>
    </div>
  );
}

function Filler1() {
  return <div className="h-full shrink-0 w-[24px]" data-name="Filler" />;
}

function Summary1() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Summary">
      <div className="flex flex-row items-center self-stretch">
        <Filler1 />
      </div>
      <div className="flex flex-[1_0_0] flex-col font-sans font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[14px] text-ellipsis tracking-[-0.04px]">
        <p className="leading-[18px]">Charts</p>
      </div>
    </div>
  );
}

function IconLabel5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="CanvasApp">
        <div className="absolute inset-[4.17%_14.39%_4.17%_11.75%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8167 14.6667">
            <path d={svgPaths.p2ce6da80} fill="var(--fill-0, #191B1D)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#111213] text-[14px]">
        <p className="leading-[18px]">Work package 241WO77RT</p>
      </div>
    </div>
  );
}

function IconLabel4() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Icon + label">
      <IconLabel5 />
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#40464a] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[18px]">28 Nov 2025</p>
      </div>
    </div>
  );
}

function Filler2() {
  return <div className="h-full shrink-0 w-[24px]" data-name="Filler" />;
}

function Summary2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Summary">
      <div className="flex flex-row items-center self-stretch">
        <Filler2 />
      </div>
      <div className="flex flex-[1_0_0] flex-col font-sans font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[14px] text-ellipsis tracking-[-0.04px]">
        <p className="leading-[18px]">Canvas</p>
      </div>
    </div>
  );
}

function IconLabel7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="CanvasApp">
        <div className="absolute inset-[4.17%_14.39%_4.17%_11.75%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.8167 14.6667">
            <path d={svgPaths.p2ce6da80} fill="var(--fill-0, #191B1D)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#111213] text-[14px]">
        <p className="leading-[18px]">RCA on 23-HX-91144</p>
      </div>
    </div>
  );
}

function IconLabel6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Icon + label">
      <IconLabel7 />
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#40464a] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[18px]">28 Nov 2025</p>
      </div>
    </div>
  );
}

function Filler3() {
  return <div className="h-full shrink-0 w-[24px]" data-name="Filler" />;
}

function Summary3() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Summary">
      <div className="flex flex-row items-center self-stretch">
        <Filler3 />
      </div>
      <div className="flex flex-[1_0_0] flex-col font-sans font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[14px] text-ellipsis tracking-[-0.04px]">
        <p className="leading-[18px]">Canvas</p>
      </div>
    </div>
  );
}

function IconLabel9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Icon + label">
      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="ChartsApp">
        <div className="absolute inset-[4.17%_4.58%_4.17%_6.39%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.2451 14.6667">
            <path d={svgPaths.p299bab00} fill="var(--fill-0, #111213)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#111213] text-[14px]">
        <p className="leading-[18px]">23-HA-9114/9115 3rd stage discharge coolers test</p>
      </div>
    </div>
  );
}

function IconLabel8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Icon + label">
      <IconLabel9 />
      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#40464a] text-[14px] text-center whitespace-nowrap">
        <p className="leading-[18px]">28 Nov 2025</p>
      </div>
    </div>
  );
}

function Filler4() {
  return <div className="h-full shrink-0 w-[24px]" data-name="Filler" />;
}

function Summary4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Summary">
      <div className="flex flex-row items-center self-stretch">
        <Filler4 />
      </div>
      <div className="flex flex-[1_0_0] flex-col font-sans font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[14px] text-ellipsis tracking-[-0.04px]">
        <p className="leading-[18px]">Charts</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Frame">
      <div className="relative rounded-[6px] shrink-0 w-full" data-name="Chat">
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[4px] relative w-full">
          <IconLabel />
          <Summary />
        </div>
      </div>
      <div className="relative rounded-[6px] shrink-0 w-full" data-name="Chat">
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[4px] relative w-full">
          <IconLabel2 />
          <Summary1 />
        </div>
      </div>
      <div className="relative rounded-[6px] shrink-0 w-full" data-name="Chat">
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[4px] relative w-full">
          <IconLabel4 />
          <Summary2 />
        </div>
      </div>
      <div className="relative rounded-[6px] shrink-0 w-full" data-name="Chat">
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[4px] relative w-full">
          <IconLabel6 />
          <Summary3 />
        </div>
      </div>
      <div className="relative rounded-[6px] shrink-0 w-full" data-name="Chat">
        <div className="content-stretch flex flex-col gap-[4px] items-start p-[4px] relative w-full">
          <IconLabel8 />
          <Summary4 />
        </div>
      </div>
    </div>
  );
}

function ChatHistory() {
  return (
    <div className="col-[9/span_4] content-stretch flex flex-col gap-[4px] items-start justify-self-stretch overflow-clip relative row-[2/span_6] self-stretch shrink-0" data-name="Chat history">
      <Header1 />
      <Frame3 />
    </div>
  );
}

function Dashboard() {
  return (
    <div className="gap-x-[16px] gap-y-[16px] grid grid-cols-[repeat(12,minmax(0,1fr))] grid-rows-[repeat(8,minmax(0,1fr))] h-[640.833px] relative shrink-0 w-full" data-name="Dashboard">
      <div className="bg-[#f9fafa] col-[1/span_4] justify-self-stretch relative rounded-[8px] row-[1/span_2] self-stretch shrink-0" data-name="Alert widget">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
            <TitleAssetTag />
            <FooterContent1 />
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] col-[5/span_2] h-[66px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Alert widget">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
            <TitleAssetTag1 />
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] col-[7/span_2] h-[66px] justify-self-stretch relative rounded-[8px] row-1 shrink-0" data-name="Alert widget">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
            <TitleAssetTag2 />
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] col-[1/span_4] justify-self-stretch relative rounded-[8px] row-[3/span_2] self-stretch shrink-0" data-name="Count widget">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
            <CountLabel />
            <div className="bg-[#e4e6e8] h-px shrink-0 w-full" data-name="Separator" />
            <div className="h-[53.473px] relative shrink-0 w-full" data-name="Vector">
              <div className="absolute inset-[-0.94%_-0.2%_-0.94%_-0.19%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 299.658 54.4729">
                  <path d={svgPaths.p3479f4d0} id="Vector" stroke="var(--stroke-0, #2F55EA)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] col-[5/span_2] justify-self-stretch relative rounded-[8px] row-2 self-stretch shrink-0" data-name="Alert widget">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
            <TitleAssetTag3 />
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] col-[7/span_2] justify-self-stretch relative rounded-[8px] row-2 self-stretch shrink-0" data-name="Alert widget">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
            <TitleAssetTag4 />
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] col-[1/span_4] h-[266px] justify-self-stretch relative rounded-[8px] row-[5/span_3] shrink-0" data-name="Heat map widget">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="🎩 Header content">
              <HeaderContentButton />
            </div>
            <HeatMapLabels />
          </div>
        </div>
      </div>
      <div className="col-[9/span_4] content-stretch flex flex-col gap-[4px] items-start justify-self-stretch overflow-clip relative row-1 self-stretch shrink-0" data-name="Pinned apps">
        <Header />
        <Apps />
      </div>
      <div className="bg-[#f9fafa] col-[5/span_4] h-[346px] justify-self-stretch relative rounded-[8px] row-[4/span_4] shrink-0" data-name="Area Chart">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
            <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="🎩 Header content">
              <HeaderContentButton1 />
            </div>
            <ChartLegend />
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="🦶 Footer content">
              <SubtitleIcon1 />
              <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
                <p className="leading-[18px] overflow-hidden">Total visitors for the last 6 months</p>
              </div>
            </div>
            <div className="absolute bg-white content-stretch flex flex-col gap-[4px] items-start justify-center left-[175px] p-[8px] rounded-[6px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.06),0px_4px_6px_0px_rgba(0,0,0,0.1)] top-[84.55px] w-[121px]" data-name=".Chart-popover-double">
              <ColorUnitNumber />
              <ColorUnitNumber1 />
            </div>
            <div className="absolute left-[159.67px] size-[8px] top-[118px]" data-name="Focus">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                <circle cx="4" cy="4" fill="var(--fill-0, #2F55EA)" id="Focus" r="4" />
              </svg>
            </div>
            <div className="absolute left-[159.67px] size-[8px] top-[183px]" data-name="Focus">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
                <circle cx="4" cy="4" fill="var(--fill-0, #2F55EA)" id="Focus" r="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] col-[5/span_2] justify-self-stretch relative rounded-[8px] row-3 self-stretch shrink-0" data-name="Alert widget">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
            <TitleAssetTag5 />
          </div>
        </div>
      </div>
      <div className="bg-[#f9fafa] col-[7/span_2] justify-self-stretch relative rounded-[8px] row-3 self-stretch shrink-0" data-name="Alert widget">
        <div className="overflow-clip rounded-[inherit] size-full">
          <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
            <TitleAssetTag6 />
          </div>
        </div>
      </div>
      <ChatHistory />
    </div>
  );
}

function DashboardToolbarDashboard() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Dashboard toolbar + dashboard">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-[16px] px-[64px] relative w-full">
        <DashboardControl />
        <Dashboard />
      </div>
    </div>
  );
}

function PageContent() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px overflow-clip relative w-full" data-name="Page content">
      <ChatPrompt />
      <DashboardToolbarDashboard />
    </div>
  );
}

function Content() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[1016px] items-start relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full" data-name="Content">
      <PageContent />
    </div>
  );
}

function ContentFrame() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Content frame">
      <div className="content-stretch flex flex-col items-start pr-[8px] pt-[8px] relative w-full">
        <Content />
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-[#212426] content-stretch flex items-center relative size-full" data-name="Landing page">
      <div className="bg-[#212426] content-stretch flex flex-col gap-[12px] h-[1012px] items-start py-[6px] relative rounded-[8px] shrink-0 w-[240px]" data-name="Sidebar">
        <HeaderLocationSearch />
        <Separator />
        <Pages />
        <FooterContent />
      </div>
      <ContentFrame />
      <div className="absolute bg-gradient-to-l from-[rgba(72,106,237,0.8)] left-[1332px] rounded-[56px] size-[36px] to-[rgba(219,177,225,0.8)] top-[962px] via-[49.519%] via-[rgba(173,78,187,0.8)]" data-name="Atlas">
        <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
          <div className="relative shrink-0 size-[16px]" data-name="Atlas">
            <div className="absolute inset-[6.25%]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                <g id="Vector">
                  <path d={svgPaths.p1d14e00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p21b59000} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p2485cd00} fill="var(--fill-0, white)" />
                  <path d={svgPaths.p2bc7c400} fill="var(--fill-0, white)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[56px] shadow-[0px_4px_3px_0px_rgba(0,0,0,0.09)]" />
      </div>
    </div>
  );
}