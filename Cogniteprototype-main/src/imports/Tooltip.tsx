import svgPaths from "./svg-ey10omfb5n";

function Content() {
  return (
    <div className="content-stretch flex items-center max-w-[320px] min-h-[36px] p-[8px] relative shrink-0 w-[201px]" data-name="Content">
      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] max-w-[420px] min-h-px min-w-px not-italic relative text-[14px] text-white">
        <p className="leading-[18px]">Continue conversation here</p>
      </div>
    </div>
  );
}

function Beak() {
  return (
    <div className="h-[8px] relative shrink-0 w-[16px]" data-name="Beak">
      <div className="absolute inset-[-322.77%_0_0_-84.18%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.469 33.8218">
          <g id="Beak">
            <path d={svgPaths.p39f1f1d0} fill="var(--fill-0, #212426)" id="Vector" />
            <g id="Vector_2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function BottomLeftBeak() {
  return (
    <div className="content-stretch flex flex-col h-0 items-center px-[6px] relative shrink-0 w-[28px]" data-name="Bottom left beak">
      <Beak />
    </div>
  );
}

function TopBottomBeaksContent() {
  return (
    <div className="bg-[#212426] content-stretch flex flex-col items-start justify-center relative rounded-[6px] shrink-0" data-name="Top & bottom beaks + content">
      <Content />
      <BottomLeftBeak />
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