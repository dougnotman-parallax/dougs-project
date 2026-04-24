import { useState } from "react";
import { Search, ArrowUpDown, ExternalLink, Plus, Grid } from "lucide-react";

interface CustomAppsPageProps {
  showTopBar?: boolean;
  onWorkorderClick?: () => void;
}

interface AppCard {
  id: string;
  name: string;
  initials: string;
  description: string;
  backgroundColor: string;
  textColor: string;
  iconBgColor: string;
  iconTextColor: string;
}

const appCards: AppCard[] = [
  {
    id: "workorder-manager",
    name: "Workorder Manager",
    initials: "WM",
    description: "Manages workorders in CDF",
    backgroundColor: "#3D0E0E",
    textColor: "#E8A5A5",
    iconBgColor: "#F5E6E6",
    iconTextColor: "#8B3A3A",
  },
  {
    id: "paia",
    name: "Paia",
    initials: "PA",
    description: "Testing paia integration",
    backgroundColor: "#2E1A4D",
    textColor: "#BFA8DB",
    iconBgColor: "#EDE7F6",
    iconTextColor: "#5E4A7E",
  },
];

function CustomAppsTopBar() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Contents">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full min-h-[36px]" data-name="Top section">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Heading">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Custom apps title">
              <p className="flex-[1_0_0] font-sans font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[-0.176px]" style={{ fontFeatureSettings: "'cv05'" }}>
                Custom apps
              </p>
            </div>
          </div>
          <button className="flex items-center gap-[8px] px-[16px] py-[8px] bg-[#111213] hover:bg-[#2a2d2e] text-white rounded-[8px] transition-colors">
            <Plus className="w-[16px] h-[16px]" />
            <span className="font-sans font-medium text-[14px] leading-[18px] tracking-[-0.04px]">
              Add app
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function CustomAppsPage({ showTopBar = true, onWorkorderClick }: CustomAppsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);

  return (
    <div className="bg-white flex flex-col h-full w-full">
      {/* Top Bar */}
      {showTopBar && <CustomAppsTopBar />}

      {/* Header Section */}
      <div className="px-[20px] py-[24px]">
        <div className="flex items-start justify-between mb-[16px]">
          <div className="flex items-start gap-[12px]">
            {/* Custom Apps Icon */}
            <div className="w-[40px] h-[40px] bg-[#f1f2f3] rounded-[8px] flex items-center justify-center">
              <Grid className="w-[20px] h-[20px] text-[#5e666d]" />
            </div>
            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center gap-[8px]">
                <h1 className="font-sans font-semibold text-[20px] leading-[24px] text-[#111213] tracking-[-0.22px]">
                  Custom apps
                </h1>
                <span className="bg-[#E8F0FE] text-[#1967D2] font-sans font-medium text-[10px] px-[6px] py-[2px] rounded-[4px] uppercase tracking-[0.5px]">
                  BETA
                </span>
              </div>
              <p className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                Your organization's custom apps
              </p>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center gap-[4px] text-[#1967D2] font-sans font-normal text-[14px] hover:underline"
          >
            Learn more about Custom apps
            <ExternalLink className="size-[14px]" />
          </a>
        </div>

        {/* Search and Sort Row */}
        <div className="flex items-center gap-[12px]">
          <div className="flex-1 relative">
            <div className="absolute left-[16px] top-1/2 -translate-y-1/2">
              <Search className="w-[16px] h-[16px] text-[#5e666d]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search apps"
              className="w-full h-[40px] pl-[44px] pr-[16px] rounded-[8px] border border-[#e4e6e8] bg-white font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] placeholder:text-[#9ca3a9] focus:outline-none focus:border-[#1a967a] focus:ring-1 focus:ring-[#1a967a]"
            />
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-[6px] h-[40px] px-[12px] rounded-[8px] bg-white text-[#5e666d] hover:bg-[#f9fafa] transition-colors border border-[#e4e6e8]"
            >
              <ArrowUpDown className="w-[14px] h-[14px]" />
              <span className="font-sans font-normal text-[14px] leading-[18px] tracking-[-0.04px]">
                Sort by
              </span>
            </button>
            {showSortMenu && (
              <div className="absolute top-[44px] right-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-[6px] shadow-lg min-w-[180px] z-10">
                <button 
                  onClick={() => setShowSortMenu(false)}
                  className="w-full text-left px-[16px] py-[10px] hover:bg-[#F8F9FA] font-sans font-normal text-[14px] text-[rgba(0,0,0,0.9)] transition-colors"
                >
                  Name (A-Z)
                </button>
                <button 
                  onClick={() => setShowSortMenu(false)}
                  className="w-full text-left px-[16px] py-[10px] hover:bg-[#F8F9FA] font-sans font-normal text-[14px] text-[rgba(0,0,0,0.9)] transition-colors"
                >
                  Name (Z-A)
                </button>
                <button 
                  onClick={() => setShowSortMenu(false)}
                  className="w-full text-left px-[16px] py-[10px] hover:bg-[#F8F9FA] font-sans font-normal text-[14px] text-[rgba(0,0,0,0.9)] transition-colors"
                >
                  Recently added
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content - App Cards Grid */}
      <div className="flex-1 overflow-auto px-[20px] py-[24px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
          {appCards.map((app) => (
            <button
              key={app.id}
              className="group flex flex-col rounded-[8px] border border-[rgba(0,0,0,0.1)] overflow-hidden hover:shadow-md hover:border-[rgba(0,0,0,0.15)] transition-all cursor-pointer text-left"
              onClick={app.id === "workorder-manager" && onWorkorderClick ? onWorkorderClick : undefined}
            >
              {/* Card Header with App Name */}
              <div
                className="h-[160px] flex items-start justify-start p-[20px] rounded-t-[8px]"
                style={{ backgroundColor: app.backgroundColor }}
              >
                <h3
                  className="font-sans font-semibold text-[24px] leading-[30px] tracking-[-0.24px]"
                  style={{ color: app.textColor }}
                >
                  {app.name}
                </h3>
              </div>

              {/* Card Body */}
              <div className="bg-white p-[20px] flex-1 flex flex-col gap-[12px]">
                {/* Icon and Name */}
                <div className="flex items-center gap-[12px]">
                  <div
                    className="size-[40px] rounded-[6px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: app.iconBgColor }}
                  >
                    <span
                      className="font-sans font-semibold text-[14px]"
                      style={{ color: app.iconTextColor }}
                    >
                      {app.initials}
                    </span>
                  </div>
                  <h4 className="font-sans font-semibold text-[16px] leading-[20px] text-[#111213] tracking-[-0.176px]">
                    {app.name}
                  </h4>
                </div>

                {/* Description */}
                <p className="font-sans font-normal text-[14px] leading-[20px] text-[#5e666d] tracking-[-0.04px]">
                  {app.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { CustomAppsTopBar };