import { useState } from "react";
import { motion } from "motion/react";
import svgPaths from "../../imports/svg-rkayf8ipki";
import { Trash2, MoreHorizontal, Eye, Info, ChevronDown, Bell, Clock, TrendingUp, BarChart3 } from "lucide-react";
import { ProductionDetailsLineChart } from "./charts/ProductionDetailsLineChart";

interface ChartsDetailsPageProps {
  showTopBar?: boolean;
  onBack?: () => void;
}

// Table data for time series
const tableData = [
  {
    id: 1,
    name: "FT-000105",
    status: "",
    tag: "R001-UTIL-1-8200-SYS01-...",
    description: "FT-000105 - Condensate flow",
    min: "428",
    max: "566",
    mean: "510",
    unit: "m3/h *",
    pids: "",
    color: "#7C3AED", // Purple color for the icon
    visible: true,
  },
  {
    id: 2,
    name: "PT-000287",
    status: "",
    tag: "R001-UTIL-1-8200-SYS02-...",
    description: "PT-000287 - Pressure sensor",
    min: "245",
    max: "389",
    mean: "312",
    unit: "bar",
    pids: "",
    color: "#2b588a", // Blue
    visible: true,
  },
];

function ChartsDetailsTopBar({ onBack }: { onBack?: () => void }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState("2021-03-25 8:00  – 2021-03-26 8:00");

  return (
    <div className="bg-white relative shrink-0 w-full" onClick={(e) => {
      // Make the "Charts" breadcrumb clickable to go back
      const target = e.target as HTMLElement;
      if (target.textContent === "Charts" && onBack) {
        onBack();
      }
    }}>
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex isolate items-center justify-between px-[20px] py-[12px] relative size-full">
          {/* Left Content - Breadcrumbs */}
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 z-[4]" data-name="Left content">
            <div className="content-stretch flex items-center relative shrink-0" data-name="👉 Breadcrumbs">
              <div className="content-stretch flex gap-[6px] items-center justify-center py-[2px] relative shrink-0" data-name="↳ Subapp page">
                {/* Charts Icon Badge */}
                <div className="bg-[#f3f3f3] content-stretch flex items-center justify-center p-[6px] relative rounded-[1000px] shrink-0" data-name="Subapp icon badge">
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-name="↳ Subapp icon">
                    <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
                      <path d="M3 11L6 8L9 10L13 6" stroke="#3C5FFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 6H13V9" stroke="#3C5FFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                {/* Charts Text - Clickable */}
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Content">
                  <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.7)] tracking-[-0.084px] whitespace-nowrap cursor-pointer hover:text-[rgba(0,0,0,0.9)] transition-colors" style={{ fontFeatureSettings: "'ss04'" }}>
                    <p className="leading-[20px]">Charts</p>
                  </div>
                </div>
              </div>
              {/* Separator and Chart Name */}
              <div className="content-stretch flex items-center py-[2px] relative shrink-0" data-name="↳ Last page link">
                <div className="content-stretch flex items-start overflow-clip pl-[5px] pr-[6px] relative shrink-0" data-name=".slash">
                  <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#d9d9d9] text-[14px] tracking-[-0.084px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss04'" }}>
                    <p className="leading-[20px]">/</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start justify-center relative shrink-0" data-name="Breadcrumb + chevron + metadata + description">
                  <div className="content-stretch flex gap-[6px] items-center relative shrink-0" data-name="Breadcrumb + chevron + metadata">
                    <div className="content-stretch flex items-center relative shrink-0" data-name="Breadcrumb + chevron">
                      <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] tracking-[-0.084px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss04'" }}>
                        <p className="leading-[20px]">Production chart</p>
                      </div>
                      <div className="overflow-clip relative shrink-0 size-[16px]" data-name="ChevronDownSmall">
                        <div className="absolute inset-[38.75%_26.25%_32.5%_26.25%]" data-name="Vector">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.6 4.6">
                            <path clipRule="evenodd" d={svgPaths.p2e2f4200} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filler */}
          <div className="flex-[1_0_0] h-[17px] min-h-px min-w-[12px] z-[3]" data-name="Filler" />

          {/* Filler */}
          <div className="flex-[1_0_0] h-[17px] min-h-px min-w-[12px] z-[2]" data-name="Filler" />

          {/* Right Content */}
          <div className="content-stretch flex gap-[8px] isolate items-center justify-end relative shrink-0 z-[1]" data-name="Right content">
            {/* Chart Toolbar Buttons */}
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 z-[3]" data-name="👉 Metadata">
              <div className="content-stretch flex items-start relative shrink-0" data-name="↳ Element 1">
                <div className="bg-[rgba(255,255,255,0)] hover:bg-[rgba(83,88,127,0.08)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors" data-name="💠 Button 2">
                  <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
                    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="MinMaxValue">
                      <div className="absolute inset-[6.25%_6.25%_83.75%_6.25%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 1.6">
                          <path clipRule="evenodd" d={svgPaths.p14773970} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" opacity="0.4" />
                        </svg>
                      </div>
                      <div className="absolute inset-[83.75%_6.25%_6.25%_6.25%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 1.6">
                          <path clipRule="evenodd" d={svgPaths.p14773970} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" opacity="0.4" />
                        </svg>
                      </div>
                      <div className="absolute bottom-1/4 left-[12.5%] right-[12.5%] top-1/4" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                          <path clipRule="evenodd" d={svgPaths.p1de7f680} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0" data-name="↳ Element 2">
                <div className="bg-[rgba(255,255,255,0)] hover:bg-[rgba(83,88,127,0.08)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors" data-name="💠 Button 2">
                  <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
                    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="StackedChart">
                      <div className="absolute inset-[6.25%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                          <g id="Vector">
                            <path clipRule="evenodd" d={svgPaths.p2ae6b780} fill="black" fillOpacity="0.9" fillRule="evenodd" />
                            <path clipRule="evenodd" d={svgPaths.p1e8418c0} fill="black" fillOpacity="0.9" fillRule="evenodd" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0" data-name="↳ Element 3">
                <div className="bg-[rgba(255,255,255,0)] hover:bg-[rgba(83,88,127,0.08)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors" data-name="💠 Button 2">
                  <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Icon Only">
                    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="YAxis">
                      <div className="absolute inset-[57.5%_7.5%_7.5%_20%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6 5.6">
                          <path clipRule="evenodd" d={svgPaths.p23a66400} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" opacity="0.4" />
                        </svg>
                      </div>
                      <div className="absolute inset-[7.5%_57.5%_20%_7.5%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.6 11.6">
                          <path clipRule="evenodd" d={svgPaths.p1642de80} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0" data-name="↳ Element 4">
                <div className="bg-[rgba(255,255,255,0)] hover:bg-[rgba(83,88,127,0.08)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors" data-name="💠 Button 2">
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-name="GridLines">
                    <div className="absolute inset-[7.97%]" data-name="Vector">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.45 13.45">
                        <path clipRule="evenodd" d={svgPaths.p38a05780} fill="var(--fill-0, #3F56B5)" fillRule="evenodd" id="Vector" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#d9d9d9] h-[16px] rounded-[4px] shrink-0 w-px" data-name="💠 Divider" />
            </div>

            {/* Date Range Selector */}
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 z-[2]" data-name="👉 Metadata">
              <div className="content-stretch flex items-start relative shrink-0" data-name="↳ Date Range">
                <div className="relative">
                  <button
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="bg-[rgba(83,88,127,0.08)] hover:bg-[rgba(83,88,127,0.12)] content-stretch flex gap-[6px] h-[28px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors"
                    data-name="💠 Date Range Button"
                  >
                    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Calendar">
                      <div className="absolute inset-[7.97%_12.13%_7.97%_12.14%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1167 13.45">
                          <path clipRule="evenodd" d={svgPaths.p37618200} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] tracking-[-0.036px] whitespace-nowrap" style={{ fontFeatureSettings: "'ss04'" }}>
                      <p className="leading-[16px]">{dateRange}</p>
                    </div>
                  </button>
                  {/* Date Picker Dropdown */}
                  {showDatePicker && (
                    <div className="absolute top-[32px] right-0 bg-white shadow-lg rounded-[8px] border border-[#e4e6e8] p-[12px] z-[100] min-w-[280px]">
                      <div className="flex flex-col gap-[8px]">
                        <button
                          onClick={() => {
                            setDateRange("Last 24 hours");
                            setShowDatePicker(false);
                          }}
                          className="text-left px-[12px] py-[8px] hover:bg-[#f1f2f3] rounded-[4px] font-sans font-normal text-[14px] text-[rgba(0,0,0,0.9)] transition-colors"
                        >
                          Last 24 hours
                        </button>
                        <button
                          onClick={() => {
                            setDateRange("Last 7 days");
                            setShowDatePicker(false);
                          }}
                          className="text-left px-[12px] py-[8px] hover:bg-[#f1f2f3] rounded-[4px] font-sans font-normal text-[14px] text-[rgba(0,0,0,0.9)] transition-colors"
                        >
                          Last 7 days
                        </button>
                        <button
                          onClick={() => {
                            setDateRange("Last 30 days");
                            setShowDatePicker(false);
                          }}
                          className="text-left px-[12px] py-[8px] hover:bg-[#f1f2f3] rounded-[4px] font-sans font-normal text-[14px] text-[rgba(0,0,0,0.9)] transition-colors"
                        >
                          Last 30 days
                        </button>
                        <button
                          onClick={() => {
                            setDateRange("2021-03-25 8:00  – 2021-03-26 8:00");
                            setShowDatePicker(false);
                          }}
                          className="text-left px-[12px] py-[8px] hover:bg-[#f1f2f3] rounded-[4px] font-sans font-normal text-[14px] text-[rgba(0,0,0,0.9)] transition-colors"
                        >
                          Custom range
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-[#d9d9d9] h-[16px] rounded-[4px] shrink-0 w-px" data-name="💠 Divider" />
            </div>

            {/* Local Actions */}
            <div className="content-stretch flex gap-[4px] isolate items-center justify-end relative shrink-0 z-[1]" data-name="👉 Local actions">
              <div className="content-stretch flex items-start relative shrink-0 z-[3]" data-name="↳ Add Time Series">
                <div className="bg-[rgba(83,88,127,0.08)] hover:bg-[rgba(83,88,127,0.12)] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[8px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors" data-name="💠 Button">
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-name="AddLarge">
                    <div className="absolute inset-[12.5%]" data-name="Vector">
                      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                        <path clipRule="evenodd" d={svgPaths.p3910a60} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" id="Vector" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.9)] tracking-[-0.036px] whitespace-nowrap" style={{ fontFeatureSettings: "'cv05'" }}>
                    <p className="leading-[16px]">Add time series</p>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-start relative shrink-0 z-[2]" data-name="↳ Primary button">
                <div className="bg-[#111213] hover:bg-[#2a2d2e] content-stretch flex gap-[4px] h-[28px] items-center justify-center px-[6px] py-[4px] relative rounded-[4px] shrink-0 cursor-pointer transition-colors" data-name="💠 Button 2">
                  <div className="content-stretch flex items-center justify-center pl-[2px] relative shrink-0" data-name="Left Icon">
                    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="Add">
                      <div className="absolute inset-[21.88%]" data-name="Vector">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
                          <path clipRule="evenodd" d={svgPaths.p3910a60} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-center px-[2px] relative shrink-0" data-name="Text">
                    <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.084px] whitespace-nowrap" style={{ fontFeatureSettings: "'cv05'" }}>
                      <p className="leading-[20px]">Add data</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ChartsDetailsTopBar };

export function ChartsDetailsPage({ showTopBar = true, onBack }: ChartsDetailsPageProps) {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const toggleRowSelection = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white flex flex-col h-full w-full overflow-hidden">
      {/* Top Bar */}
      {showTopBar && <ChartsDetailsTopBar onBack={onBack} />}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chart Section */}
        <div className="h-[60%] border-b border-[rgba(0,0,0,0.1)] p-[20px] relative">
          {/* Right-side Floating Toolbar */}
          <div className="absolute right-[28px] top-[28px] flex flex-col gap-[8px] z-20">
            {/* Alerts/Notifications Button */}
            <button 
              className="bg-white hover:bg-[#f9f9f9] border border-[rgba(0,0,0,0.1)] rounded-[6px] p-[10px] shadow-sm transition-colors cursor-pointer group"
              title="Alerts"
            >
              <Bell className="size-[18px] text-[rgba(0,0,0,0.6)] group-hover:text-[rgba(0,0,0,0.9)]" />
            </button>
            
            {/* Time/History Button */}
            <button 
              className="bg-white hover:bg-[#f9f9f9] border border-[rgba(0,0,0,0.1)] rounded-[6px] p-[10px] shadow-sm transition-colors cursor-pointer group"
              title="Time History"
            >
              <Clock className="size-[18px] text-[rgba(0,0,0,0.6)] group-hover:text-[rgba(0,0,0,0.9)]" />
            </button>
            
            {/* Trend Analysis Button */}
            <button 
              className="bg-white hover:bg-[#f9f9f9] border border-[rgba(0,0,0,0.1)] rounded-[6px] p-[10px] shadow-sm transition-colors cursor-pointer group"
              title="Trend Analysis"
            >
              <TrendingUp className="size-[18px] text-[rgba(0,0,0,0.6)] group-hover:text-[rgba(0,0,0,0.9)]" />
            </button>
            
            {/* Analytics/Stats Button */}
            <button 
              className="bg-white hover:bg-[#f9f9f9] border border-[rgba(0,0,0,0.1)] rounded-[6px] p-[10px] shadow-sm transition-colors cursor-pointer group"
              title="Analytics"
            >
              <BarChart3 className="size-[18px] text-[rgba(0,0,0,0.6)] group-hover:text-[rgba(0,0,0,0.9)]" />
            </button>
          </div>

          <div className="h-full w-full min-h-0">
            <ProductionDetailsLineChart />
          </div>
        </div>

        {/* Data Table Section */}
        <div className="h-[40%] overflow-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-[#f9f9f9] border-b border-[rgba(0,0,0,0.1)] z-10">
              <tr>
                <th className="p-[12px] text-left w-[60px]">
                  <div className="flex items-center gap-[8px]">
                    <input 
                      type="checkbox" 
                      className="cursor-pointer"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(tableData.map(row => row.id));
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                      checked={selectedRows.length === tableData.length}
                    />
                    <span className="font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                      STYLE
                    </span>
                  </div>
                </th>
                <th className="p-[12px] text-left">
                  <div className="flex items-center gap-[4px]">
                    <Eye className="size-[12px] text-[rgba(0,0,0,0.5)]" />
                    <span className="font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                      NAME
                    </span>
                  </div>
                </th>
                <th className="p-[12px] text-left font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  STATUS
                </th>
                <th className="p-[12px] text-left font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  TAG
                </th>
                <th className="p-[12px] text-left font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  DESCRIPTION
                </th>
                <th className="p-[12px] text-right font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  MIN
                </th>
                <th className="p-[12px] text-right font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  MAX
                </th>
                <th className="p-[12px] text-right font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  MEAN
                </th>
                <th className="p-[12px] text-left font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  UNIT
                </th>
                <th className="p-[12px] text-left font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  P&IDS
                </th>
                <th className="p-[12px] text-center font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  REMOVE
                </th>
                <th className="p-[12px] text-center font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  INFO
                </th>
                <th className="p-[12px] text-center font-sans font-normal text-[10px] text-[rgba(0,0,0,0.5)] uppercase tracking-[0.5px]" style={{ fontFeatureSettings: "'ss04'" }}>
                  MORE
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr 
                  key={row.id} 
                  className={`border-b border-[rgba(0,0,0,0.05)] hover:bg-[#f9f9f9] transition-colors ${ 
                    selectedRows.includes(row.id) ? 'bg-[#f1f5ff]' : ''
                  }`}
                >
                  {/* Style Column with Checkbox and Color Icon */}
                  <td className="p-[12px]">
                    <div className="flex items-center gap-[8px]">
                      <input 
                        type="checkbox" 
                        className="cursor-pointer"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRowSelection(row.id)}
                      />
                      <div 
                        className="size-[12px] rounded-[2px]" 
                        style={{ backgroundColor: row.color }}
                      />
                    </div>
                  </td>
                  
                  {/* Name Column with Eye Icon */}
                  <td className="p-[12px]">
                    <div className="flex items-center gap-[6px]">
                      <Eye className="size-[14px] text-[rgba(0,0,0,0.5)]" />
                      <span className="font-sans font-normal text-[12px] text-[rgba(0,0,0,0.9)]" style={{ fontFeatureSettings: "'ss04'" }}>
                        {row.name}
                      </span>
                    </div>
                  </td>
                  
                  {/* Status Column */}
                  <td className="p-[12px] font-sans font-normal text-[12px] text-[rgba(0,0,0,0.7)]" style={{ fontFeatureSettings: "'ss04'" }}>
                    {row.status}
                  </td>
                  
                  {/* Tag Column */}
                  <td className="p-[12px] font-sans font-normal text-[12px] text-[rgba(0,0,0,0.7)]" style={{ fontFeatureSettings: "'ss04'" }}>
                    {row.tag}
                  </td>
                  
                  {/* Description Column */}
                  <td className="p-[12px] font-sans font-normal text-[12px] text-[rgba(0,0,0,0.7)]" style={{ fontFeatureSettings: "'ss04'" }}>
                    {row.description}
                  </td>
                  
                  {/* Min Column */}
                  <td className="p-[12px] text-right font-sans font-normal text-[12px] text-[rgba(0,0,0,0.9)]" style={{ fontFeatureSettings: "'ss04'" }}>
                    {row.min}
                  </td>
                  
                  {/* Max Column */}
                  <td className="p-[12px] text-right font-sans font-normal text-[12px] text-[rgba(0,0,0,0.9)]" style={{ fontFeatureSettings: "'ss04'" }}>
                    {row.max}
                  </td>
                  
                  {/* Mean Column */}
                  <td className="p-[12px] text-right font-sans font-normal text-[12px] text-[rgba(0,0,0,0.9)]" style={{ fontFeatureSettings: "'ss04'" }}>
                    {row.mean}
                  </td>
                  
                  {/* Unit Column with Dropdown */}
                  <td className="p-[12px]">
                    <div className="flex items-center gap-[4px]">
                      <span className="font-sans font-normal text-[12px] text-[rgba(0,0,0,0.9)]" style={{ fontFeatureSettings: "'ss04'" }}>
                        {row.unit}
                      </span>
                      <ChevronDown className="size-[12px] text-[rgba(0,0,0,0.5)]" />
                    </div>
                  </td>
                  
                  {/* P&IDS Column */}
                  <td className="p-[12px] font-sans font-normal text-[12px] text-[rgba(0,0,0,0.7)]" style={{ fontFeatureSettings: "'ss04'" }}>
                    {row.pids}
                  </td>
                  
                  {/* Remove Button */}
                  <td className="p-[12px] text-center">
                    <button className="p-[4px] hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] transition-colors cursor-pointer">
                      <Trash2 className="size-[14px] text-[rgba(0,0,0,0.5)] hover:text-red-600" />
                    </button>
                  </td>
                  
                  {/* Info Button */}
                  <td className="p-[12px] text-center">
                    <button className="p-[4px] hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] transition-colors cursor-pointer">
                      <Info className="size-[14px] text-[rgba(0,0,0,0.5)]" />
                    </button>
                  </td>
                  
                  {/* More Button */}
                  <td className="p-[12px] text-center">
                    <button className="p-[4px] hover:bg-[rgba(0,0,0,0.05)] rounded-[4px] transition-colors cursor-pointer">
                      <MoreHorizontal className="size-[14px] text-[rgba(0,0,0,0.5)]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}