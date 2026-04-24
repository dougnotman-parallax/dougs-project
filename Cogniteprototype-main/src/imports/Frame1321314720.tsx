import svgPaths from "./svg-rjc0t1jil3";

function Group() {
  return (
    <div className="-translate-y-1/2 absolute h-[14px] left-[6.25%] right-[6.25%] top-1/2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group 7155">
          <g id="Vector">
            <path d={svgPaths.p1d14e00} fill="var(--fill-0, #C6C6C6)" />
            <path d={svgPaths.p21b59000} fill="var(--fill-0, #C6C6C6)" />
          </g>
          <g id="Vector_2">
            <path d={svgPaths.p3d402300} fill="var(--fill-0, #6F6F73)" />
            <path d={svgPaths.p2bc7c400} fill="var(--fill-0, #6F6F73)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function AtlasAiLogo() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="🌻 Atlas AI logo">
      <Group />
    </div>
  );
}

function Atlas() {
  return (
    <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[16px] relative rounded-[10px] shrink-0" data-name="Atlas">
      <AtlasAiLogo />
      <p className="font-sans font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">{`Ask Atlas AI `}</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="-translate-y-1/2 absolute h-[14px] left-[6.25%] right-[6.25%] top-1/2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group 7155">
          <g id="Vector">
            <path d={svgPaths.p1d14e00} fill="var(--fill-0, #C6C6C6)" />
            <path d={svgPaths.p21b59000} fill="var(--fill-0, #C6C6C6)" />
          </g>
          <g id="Vector_2">
            <path d={svgPaths.p3d402300} fill="var(--fill-0, #6F6F73)" />
            <path d={svgPaths.p2bc7c400} fill="var(--fill-0, #6F6F73)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function AtlasAiLogo1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="🌻 Atlas AI logo">
      <Group1 />
    </div>
  );
}

function Atlas1() {
  return (
    <div className="content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[6px] shrink-0" data-name="Atlas">
      <AtlasAiLogo1 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[25px] items-center relative size-full">
      <Atlas />
      <Atlas1 />
    </div>
  );
}