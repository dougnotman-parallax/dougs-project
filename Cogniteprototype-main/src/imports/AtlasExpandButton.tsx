import svgPaths from "./svg-nxk5pzlkef";

interface AtlasExpandButtonProps {
  isActive?: boolean;
}

export default function AtlasExpandButton({ isActive = false }: AtlasExpandButtonProps) {
  return (
    <div 
      className={`${isActive ? 'bg-[rgba(255,255,255,0.1)]' : ''} content-stretch flex gap-[10px] h-[36px] items-center overflow-clip px-[16px] relative rounded-[10px] shrink-0`} 
      data-name="Atlas"
    >
      <div className="relative shrink-0 size-[16px]" data-name="🌻 Atlas AI logo">
        <div className="-translate-y-1/2 absolute aspect-[20/20] left-[6.25%] right-[6.25%] top-1/2" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p1d14e00} fill={isActive ? "var(--fill-0, #3C5FFB)" : "var(--fill-0, #C6C6C6)"} />
              <path d={svgPaths.p21b59000} fill={isActive ? "var(--fill-0, #3C5FFB)" : "var(--fill-0, #C6C6C6)"} />
            </g>
          </svg>
        </div>
        <div className="-translate-y-1/2 absolute aspect-[20/20] left-[6.25%] right-[6.25%] top-1/2" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <g id="Vector">
              <path d={svgPaths.p3d402300} fill={isActive ? "var(--fill-0, #B7D3FF)" : "var(--fill-0, #6F6F73)"} />
              <path d={svgPaths.p2bc7c400} fill={isActive ? "var(--fill-0, #B7D3FF)" : "var(--fill-0, #6F6F73)"} />
            </g>
          </svg>
        </div>
      </div>
      <p className="font-sans font-normal leading-[normal] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">{`Ask Atlas AI `}</p>
    </div>
  );
}