import svgPaths from "./svg-3hh89g1l96";

interface AtlasProps {
  isActive?: boolean;
}

export default function Atlas({ isActive = false }: AtlasProps) {
  return (
    <div className="relative size-full rounded-[56px]" data-name="Atlas">
      <div className="content-stretch flex items-center justify-center overflow-clip relative rounded-[inherit] size-full">
        <div className="relative shrink-0 size-[16px]" data-name="Atlas">
          <div className="absolute inset-[6.25%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <g id="Vector">
                <path d={svgPaths.p1d14e00} fill={isActive ? "var(--fill-0, white)" : "#E4E6E8"} />
                <path d={svgPaths.p21b59000} fill={isActive ? "var(--fill-0, white)" : "#E4E6E8"} />
                <path d={svgPaths.p2485cd00} fill={isActive ? "var(--fill-0, white)" : "#E4E6E8"} />
                <path d={svgPaths.p2bc7c400} fill={isActive ? "var(--fill-0, white)" : "#E4E6E8"} />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}