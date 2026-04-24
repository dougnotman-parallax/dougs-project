import { useState } from "react";
import { Search, Plus, Info, ChevronDown, Copy, Trash2, ExternalLink, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { motion } from "motion/react";
import { CANVAS_OPTIONS } from "../constants/canvases";

interface CanvasPageProps {
  showTopBar?: boolean;
  onCanvasClick?: () => void;
}

interface CanvasItem {
  name: string;
  labels: string[];
  updatedAt: string;
  updatedBy: string;
  created: string;
  owner: string;
  isPrivate: boolean;
}

function CanvasTopBar() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Contents">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full min-h-[36px]" data-name="Top section">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Heading">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Canvas title">
              <p className="flex-[1_0_0] font-sans font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[-0.176px]" style={{ fontFeatureSettings: "'cv05'" }}>
                Canvas
              </p>
            </div>
          </div>
          <button className="flex items-center gap-[8px] px-[16px] py-[8px] bg-[#111213] hover:bg-[#2a2d2e] text-white rounded-[8px] transition-colors">
            <Plus className="w-[16px] h-[16px]" />
            <span className="font-sans font-medium text-[14px] leading-[18px] tracking-[-0.04px]">
              Create canvas
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { CanvasTopBar };

export function CanvasPage({ showTopBar = true, onCanvasClick }: CanvasPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "private" | "public">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);

  const canvasItems: CanvasItem[] = [
    {
      name: CANVAS_OPTIONS[0]!.name,
      labels: [],
      updatedAt: "2 months ago",
      updatedBy: "me",
      created: "2025-12-15",
      owner: "RW",
      isPrivate: false,
    },
  ];

  const totalPages = Math.ceil(canvasItems.length / itemsPerPage);

  return (
    <div className="bg-white flex flex-col h-full w-full">
      {/* Top Bar */}
      {showTopBar && <CanvasTopBar />}

      {/* Header Section */}
      <div className="px-[20px] py-[24px]">
        <div className="flex items-start justify-between mb-[16px]">
          <div className="flex items-start gap-[12px]">
            {/* Canvas Icon */}
            <div className="w-[40px] h-[40px] bg-[#f1f2f3] rounded-[8px] flex items-center justify-center">
              <svg className="w-[20px] h-[20px] text-[#5e666d]" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="11" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="3" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <rect x="11" y="11" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h1 className="font-sans font-semibold text-[20px] leading-[24px] text-[#111213] tracking-[-0.22px]">
                Industrial Canvas
              </h1>
              <p className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                Search, explore, and manage canvases
              </p>
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-[16px] top-1/2 -translate-y-1/2">
            <Search className="w-[16px] h-[16px] text-[#5e666d]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Browse canvases"
            className="w-full h-[40px] pl-[44px] pr-[16px] rounded-[8px] border border-[#e4e6e8] bg-white font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] placeholder:text-[#9ca3a9] focus:outline-none focus:border-[#1a967a] focus:ring-1 focus:ring-[#1a967a]"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="px-[20px] py-[16px] flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <button className="flex items-center gap-[8px] px-[12px] py-[6px] border border-[#e4e6e8] rounded-[6px] hover:bg-[rgba(0,0,0,0.02)] transition-colors">
            <span className="font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px]">
              Manage labels
            </span>
            <Info className="w-[14px] h-[14px] text-[#5e666d]" />
          </button>
        </div>

        <div className="flex items-center gap-[8px]">
          <button
            onClick={() => setFilterType("private")}
            className={`flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] transition-colors ${
              filterType === "private"
                ? "bg-[#111213] text-white"
                : "bg-white text-[#5e666d] hover:bg-[#f9fafa]"
            }`}
          >
            <svg className="w-[14px] h-[14px]" viewBox="0 0 14 14" fill="none">
              <rect x="3" y="6" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 6V4C5 2.89543 5.89543 2 7 2C8.10457 2 9 2.89543 9 4V6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="font-sans font-normal text-[14px] leading-[18px] tracking-[-0.04px]">
              Private
            </span>
          </button>

          <button
            onClick={() => setFilterType("public")}
            className={`flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] transition-colors ${
              filterType === "public"
                ? "bg-[#111213] text-white"
                : "bg-white text-[#5e666d] hover:bg-[#f9fafa]"
            }`}
          >
            <svg className="w-[14px] h-[14px]" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 3C5.5 3 4.5 5 4.5 7C4.5 9 5.5 11 7 11" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 3C8.5 3 9.5 5 9.5 7C9.5 9 8.5 11 7 11" stroke="currentColor" strokeWidth="1.5" />
              <path d="M2.5 7H11.5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="font-sans font-normal text-[14px] leading-[18px] tracking-[-0.04px]">
              Public
            </span>
          </button>

          <button
            onClick={() => setFilterType("all")}
            className={`px-[12px] py-[6px] rounded-[6px] transition-colors ${
              filterType === "all"
                ? "bg-[#111213] text-white"
                : "bg-white text-[#5e666d] hover:bg-[#f9fafa]"
            }`}
          >
            <span className="font-sans font-normal text-[14px] leading-[18px] tracking-[-0.04px]">
              All
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto px-[24px] py-[0px]">
        <table className="w-full">
          <thead className="sticky top-0 bg-white border-b border-[rgba(0,0,0,0.1)]">
            <tr>
              <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                Name
              </th>
              <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                <div className="flex items-center gap-[6px]">
                  Labels
                  <ChevronDown className="w-[14px] h-[14px]" />
                </div>
              </th>
              <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px] w-[180px]">
                Updated at
              </th>
              <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px] w-[150px]">
                Created
              </th>
              <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px] w-[120px]">
                Owner
              </th>
              <th className="px-[20px] py-[12px] w-[140px]"></th>
            </tr>
          </thead>
          <tbody>
            {canvasItems.map((canvas, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                onClick={onCanvasClick}
                className="border-b border-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.02)] transition-colors cursor-pointer"
              >
                <td className="px-[20px] py-[12px]">
                  <div className="flex items-center gap-[12px]">
                    <svg className="w-[16px] h-[16px] text-[#5e666d]" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="2" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="9" y="2" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="2" y="9" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="9" y="9" width="5" height="5" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px]">
                      {canvas.name}
                    </span>
                  </div>
                </td>
                <td className="px-[20px] py-[12px]">
                  {canvas.labels.length > 0 ? (
                    <div className="flex gap-[6px]">
                      {canvas.labels.map((label, i) => (
                        <span
                          key={i}
                          className="px-[8px] py-[4px] bg-[#f1f2f3] rounded-[4px] font-sans font-normal text-[13px] leading-[16px] text-[#5e666d] tracking-[-0.039px]"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="font-sans font-normal text-[14px] leading-[18px] text-[#9ca3a9] tracking-[-0.04px]">
                      —
                    </span>
                  )}
                </td>
                <td className="px-[20px] py-[12px]">
                  <div className="flex flex-col gap-[2px]">
                    <span className="font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px]">
                      {canvas.updatedAt}
                    </span>
                    <span className="font-sans font-normal text-[13px] leading-[16px] text-[#5e666d] tracking-[-0.039px]">
                      by {canvas.updatedBy}
                    </span>
                  </div>
                </td>
                <td className="px-[20px] py-[12px]">
                  <span className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                    {canvas.created}
                  </span>
                </td>
                <td className="px-[20px] py-[12px]">
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[24px] h-[24px] rounded-full bg-[#e8d4ff] flex items-center justify-center">
                      <span className="font-sans font-medium text-[12px] leading-[14px] text-[#111213]">
                        {canvas.owner}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-[20px] py-[12px]">
                  <div className="flex items-center gap-[4px] justify-end">
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                    >
                      <Trash2 className="w-[16px] h-[16px] text-[#ea4335]" />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                    >
                      <Copy className="w-[16px] h-[16px] text-[#5e666d]" />
                    </button>
                    <button 
                      onClick={(e) => e.stopPropagation()}
                      className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors"
                    >
                      <ExternalLink className="w-[16px] h-[16px] text-[#5e666d]" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-[20px] py-[16px] border-t border-[rgba(0,0,0,0.1)] flex items-center justify-end gap-[12px]">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
          className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronsLeft className="w-[16px] h-[16px] text-[#5e666d]" />
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-[16px] h-[16px] text-[#5e666d]" />
        </button>

        <div className="flex items-center gap-[8px]">
          <span className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
            {currentPage} / {totalPages}
          </span>
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-[16px] h-[16px] text-[#5e666d]" />
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronsRight className="w-[16px] h-[16px] text-[#5e666d]" />
        </button>

        <select
          value={itemsPerPage}
          onChange={(e) => setItemsPerPage(Number(e.target.value))}
          className="ml-[12px] px-[12px] py-[6px] border border-[#e4e6e8] rounded-[6px] font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] focus:outline-none focus:border-[#1a967a] focus:ring-1 focus:ring-[#1a967a]"
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>
    </div>
  );
}