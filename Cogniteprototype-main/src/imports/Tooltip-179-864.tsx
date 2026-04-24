import svgPaths from "./svg-13erwmp4zs";

function Beak() {
  return (
    <div className="h-[8px] relative shrink-0 w-[16px]" data-name="Beak">
      <div className="absolute inset-[-12.5%_-0.45%_0_-0.45%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.1436 9">
          <g id="Beak">
            <path d={svgPaths.p36f22b30} fill="var(--fill-0, #2D3134)" id="Vector" />
            <g id="Vector_2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function TopCenterBeak() {
  return (
    <div className="h-0 relative w-full" data-name="Top center beak">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[6px] relative size-full">
          <Beak />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content-stretch flex items-center max-w-[320px] min-h-[36px] px-[12px] py-[8px] relative shrink-0 w-[193px]" data-name="Content">
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] max-w-[420px] min-h-px min-w-px not-italic relative text-[14px] text-white">
        <p className="leading-[18px]">Good response</p>
      </div>
    </div>
  );
}

function TopBottomBeaksContent() {
  return (
    <div className="bg-[#2d3134] content-stretch flex flex-col items-start justify-center relative rounded-[6px] shrink-0" data-name="Top & bottom beaks + content">
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-180 w-full">
          <TopCenterBeak />
        </div>
      </div>
      <Content />
    </div>
  );
}

export default function Tooltip() {
  return (
    <div className="content-stretch flex items-start relative shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] size-full" data-name="Tooltip">
      <TopBottomBeaksContent />
    </div>
  );
}