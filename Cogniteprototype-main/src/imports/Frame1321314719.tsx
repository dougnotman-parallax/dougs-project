import svgPaths from "./svg-w2i3hdrglp";

function Atlas() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[16px] relative rounded-[6px] shrink-0" data-name="Atlas">
      <div className="relative shrink-0 size-[16px]" data-name="🌻 Atlas AI logo">
        <div className="-translate-y-1/2 absolute aspect-[20/20] left-[6.25%] right-[6.25%] top-1/2" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p1d14e00} fill="var(--fill-0, #3C5FFB)" />
              <path d={svgPaths.p21b59000} fill="var(--fill-0, #3C5FFB)" />
            </g>
          </svg>
        </div>
        <div className="-translate-y-1/2 absolute aspect-[20/20] left-[6.25%] right-[6.25%] top-1/2" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p3d402300} fill="var(--fill-0, #B7D3FF)" />
              <path d={svgPaths.p2bc7c400} fill="var(--fill-0, #B7D3FF)" />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-sans font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">{`Ask Atlas AI `}</p>
    </div>
  );
}

function Atlas1() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[12px] relative rounded-[6px] shrink-0" data-name="Atlas">
      <div className="relative shrink-0 size-[16px]" data-name="🌻 Atlas AI logo">
        <div className="-translate-y-1/2 absolute aspect-[20/20] left-[6.25%] right-[6.25%] top-1/2" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p1d14e00} fill="var(--fill-0, #3C5FFB)" />
              <path d={svgPaths.p21b59000} fill="var(--fill-0, #3C5FFB)" />
            </g>
          </svg>
        </div>
        <div className="-translate-y-1/2 absolute aspect-[20/20] left-[6.25%] right-[6.25%] top-1/2" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p3d402300} fill="var(--fill-0, #B7D3FF)" />
              <path d={svgPaths.p2bc7c400} fill="var(--fill-0, #B7D3FF)" />
            </g>
          </svg>
        </div>
      </div>
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