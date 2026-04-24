import { useState } from "react";
import { Search, Plus, ChevronDown, MoreVertical, List, Grid } from "lucide-react";
import { motion } from "motion/react";

interface ChartsPageProps {
  showTopBar?: boolean;
  onChartClick?: () => void;
}

interface ChartItem {
  name: string;
  owner: string;
  updatedAt: string;
  previewColor: string;
}

function ChartsTopBar() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Contents">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full min-h-[36px]" data-name="Top section">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Heading">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Charts title">
              <p className="flex-[1_0_0] font-sans font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[-0.176px]" style={{ fontFeatureSettings: "'cv05'" }}>
                Charts
              </p>
            </div>
          </div>
          <button className="flex items-center gap-[8px] px-[16px] py-[8px] bg-[#111213] hover:bg-[#2a2d2e] text-white rounded-[8px] transition-colors">
            <Plus className="w-[16px] h-[16px]" />
            <span className="font-sans font-medium text-[14px] leading-[18px] tracking-[-0.04px]">
              New chart
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ChartPreview({ color }: { color: string }) {
  return (
    <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
      <path
        d="M2 20C4 18 6 15 8 12C10 9 12 7 14 8C16 9 18 13 20 16C22 19 24 20 26 18C28 16 30 12 32 9C34 6 36 4 38 6C40 8 42 13 44 17C45 19 46 20 47 20"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export { ChartsTopBar };

export function ChartsPage({ showTopBar = true, onChartClick }: ChartsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"my" | "public">("my");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState("updated");

  const chartItems: ChartItem[] = [
    {
      name: "New chart",
      owner: "RYAN WOOD",
      updatedAt: "a few seconds ago",
      previewColor: "#6366f1",
    },
  ];

  return (
    <div className="bg-white flex flex-col h-full w-full">
      {/* Top Bar */}
      {showTopBar && <ChartsTopBar />}

      {/* Header Section */}
      <div className="px-[20px] py-[24px]">
        <div className="flex items-start justify-between mb-[16px]">
          <div className="flex items-start gap-[12px]">
            {/* Charts Icon */}
            <div className="w-[40px] h-[40px] bg-[#f1f2f3] rounded-[8px] flex items-center justify-center">
              <svg className="w-[20px] h-[20px] text-[#5e666d]" viewBox="0 0 20 20" fill="none">
                <path d="M3 14L7 10L10 13L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13 6H17V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h1 className="font-sans font-semibold text-[20px] leading-[24px] text-[#111213] tracking-[-0.22px]">
                Charts
              </h1>
              <p className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                Explore, trend, and analyse time series and contextualized P&IDs
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters Row */}
        <div className="flex items-center gap-[12px]">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute left-[16px] top-1/2 -translate-y-1/2">
              <Search className="w-[16px] h-[16px] text-[#5e666d]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter charts"
              className="w-full h-[40px] pl-[44px] pr-[16px] rounded-[8px] border border-[#e4e6e8] bg-white font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] placeholder:text-[#9ca3a9] focus:outline-none focus:border-[#1a967a] focus:ring-1 focus:ring-[#1a967a]"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center bg-[#f1f2f3] rounded-[8px] p-[4px]">
              <button
                onClick={() => setFilterType("my")}
                className={`flex items-center gap-[6px] px-[12px] py-[8px] rounded-[6px] transition-colors ${
                  filterType === "my"
                    ? "bg-white text-[#111213] shadow-sm"
                    : "bg-transparent text-[#5e666d] hover:text-[#111213]"
                }`}
              >
                <svg className="w-[14px] h-[14px]" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 12C2 9.79086 3.79086 8 6 8H8C10.2091 8 12 9.79086 12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="font-sans font-normal text-[14px] leading-[18px] tracking-[-0.04px]">
                  My charts
                </span>
              </button>

              <button
                onClick={() => setFilterType("public")}
                className={`flex items-center gap-[6px] px-[12px] py-[8px] rounded-[6px] transition-colors ${
                  filterType === "public"
                    ? "bg-white text-[#111213] shadow-sm"
                    : "bg-transparent text-[#5e666d] hover:text-[#111213]"
                }`}
              >
                <svg className="w-[14px] h-[14px]" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 3C5.5 3 4.5 5 4.5 7C4.5 9 5.5 11 7 11" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 3C8.5 3 9.5 5 9.5 7C9.5 9 8.5 11 7 11" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2.5 7H11.5" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span className="font-sans font-normal text-[14px] leading-[18px] tracking-[-0.04px]">
                  Public charts
                </span>
              </button>
            </div>

            <div className="flex items-center bg-[#f1f2f3] rounded-[8px] p-[4px]">
              <button
                onClick={() => setViewMode("list")}
                className={`p-[8px] rounded-[6px] transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-[#111213] shadow-sm"
                    : "bg-transparent text-[#5e666d] hover:text-[#111213]"
                }`}
              >
                <List className="w-[16px] h-[16px]" />
              </button>

              <button
                onClick={() => setViewMode("grid")}
                className={`p-[8px] rounded-[6px] transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-[#111213] shadow-sm"
                    : "bg-transparent text-[#5e666d] hover:text-[#111213]"
                }`}
              >
                <Grid className="w-[16px] h-[16px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center justify-end mt-[16px]">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-[12px] pr-[32px] py-[6px] border border-[#e4e6e8] rounded-[6px] font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] focus:outline-none focus:border-[#1a967a] focus:ring-1 focus:ring-[#1a967a] cursor-pointer bg-white"
            >
              <option value="updated">Sort by: Updated</option>
              <option value="name">Sort by: Name</option>
              <option value="owner">Sort by: Owner</option>
            </select>
            <div className="absolute right-[8px] top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-[16px] h-[16px] text-[#5e666d]" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto px-[24px] py-[0px]">
        <table className="w-full">
          <thead className="sticky top-0 bg-white border-b border-[rgba(0,0,0,0.1)]">
            <tr>
              <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px] w-[80px]">
                Preview
              </th>
              <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                Name
              </th>
              <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px] w-[200px]">
                Owner
              </th>
              <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px] w-[180px]">
                Updated
              </th>
              <th className="px-[20px] py-[12px] w-[80px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {chartItems.map((chart, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={onChartClick}
                className="border-b border-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.02)] transition-colors cursor-pointer"
              >
                <td className="px-[20px] py-[12px]">
                  <div className="w-[48px] h-[32px] flex items-center justify-center">
                    <ChartPreview color={chart.previewColor} />
                  </div>
                </td>
                <td className="px-[20px] py-[12px]">
                  <span className="font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px]">
                    {chart.name}
                  </span>
                </td>
                <td className="px-[20px] py-[12px]">
                  <span className="font-sans font-medium text-[12px] leading-[14px] text-[#5e666d] tracking-[0.5px] uppercase">
                    {chart.owner}
                  </span>
                </td>
                <td className="px-[20px] py-[12px]">
                  <span className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                    {chart.updatedAt}
                  </span>
                </td>
                <td className="px-[20px] py-[12px]">
                  <div className="flex items-center justify-end">
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                    >
                      <MoreVertical className="w-[16px] h-[16px] text-[#5e666d]" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}