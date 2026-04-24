import svgPaths from "./svg-inah5jhg9v";

export default function Atlas() {
  return (
    <div className="relative rounded-[10px] size-full" data-name="Atlas">
      <div className="content-stretch flex gap-[8px] items-center overflow-clip px-[16px] relative rounded-[inherit] size-full">
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
        <p className="font-sans font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">{`Atlas AI Agent `}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none rounded-[10px] shadow-[0px_4px_3px_0px_rgba(0,0,0,0.09)]" />
    </div>
  );
}