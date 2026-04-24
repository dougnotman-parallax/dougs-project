import { useState } from "react";
import { Search, Filter, Grid3x3, List, MoreHorizontal, FileText, FileArchive, File, Database, HelpCircle, Settings } from "lucide-react";
import { motion } from "motion/react";

interface SearchPageProps {
  showTopBar?: boolean;
}

interface FileItem {
  name: string;
  description?: string;
  type: "Compressed" | "Plain Text" | "PDF" | "Tabular Data" | "Other";
  createdTime: string;
}

interface CategoryItem {
  label: string;
  count: number;
  icon?: string;
}

function SearchTopBar() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Contents">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full min-h-[36px]" data-name="Top section">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Heading">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Search title">
              <p className="flex-[1_0_0] font-sans font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[-0.176px]" style={{ fontFeatureSettings: "'cv05'" }}>
                Search
              </p>
            </div>
          </div>
          <button className="flex items-center justify-center w-[36px] h-[36px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors">
            <Settings className="w-[18px] h-[18px] text-[#5e666d]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export { SearchTopBar };

function FileTypeIcon({ type }: { type: string }) {
  const iconClass = "w-4 h-4";
  
  switch (type) {
    case "Compressed":
      return <FileArchive className={`${iconClass} text-[#4285f4]`} />;
    case "Plain Text":
      return <FileText className={`${iconClass} text-[#4285f4]`} />;
    case "PDF":
      return <File className={`${iconClass} text-[#ea4335]`} />;
    case "Tabular Data":
      return <Database className={`${iconClass} text-[#34a853]`} />;
    case "Other":
      return <HelpCircle className={`${iconClass} text-[#fbbc04]`} />;
    default:
      return <File className={`${iconClass} text-[#5e666d]`} />;
  }
}

function CategoryButton({ label, count, isActive, onClick }: { 
  label: string; 
  count: number; 
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full px-[12px] py-[8px] rounded-[6px] text-left transition-colors ${
        isActive 
          ? 'bg-[#f1f2f3] text-[#111213]' 
          : 'hover:bg-[rgba(0,0,0,0.02)] text-[#5e666d]'
      }`}
    >
      <div className="flex items-center gap-[8px]">
        {label === 'Time series' && (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
            <path d="M2 12L5 9L8 11L14 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        {label === 'Event' && (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="4" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M6 2V4M10 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
        {label === 'Sequence' && (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
            <path d="M3 3H6V6H3V3Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M3 10H6V13H3V10Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M10 3H13V6H10V3Z" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )}
        {label === 'Activity' && (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
        {label === 'Equipment' && (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
            <rect x="3" y="3" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        )}
        {label === 'Notification' && (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
            <path d="M6 5C6 3.89543 6.89543 3 8 3C9.10457 3 10 3.89543 10 5C10 7 11 7.5 11 9H5C5 7.5 6 7 6 5Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M7 11V12C7 12.5523 7.44772 13 8 13C8.55228 13 9 12.5523 9 12V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        )}
        {(label === 'Asset' || label === 'File') && (
          <svg className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none">
            <path d="M8 2L3 5V11L8 14L13 11V5L8 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <span className={`font-sans font-normal text-[14px] leading-[18px] tracking-[-0.04px] ${
          isActive ? 'font-medium' : ''
        }`}>
          {label}
        </span>
      </div>
      <span className={`font-sans font-normal text-[14px] leading-[18px] tracking-[-0.04px] ${
        isActive ? 'text-[#111213]' : 'text-[#5e666d]'
      }`}>
        {count.toLocaleString()}
      </span>
    </button>
  );
}

export function SearchPage({ showTopBar = true }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("File");
  const [activeTab, setActiveTab] = useState("File");

  const defaultCategories: CategoryItem[] = [
    { label: "Asset", count: 0 },
    { label: "File", count: 446 },
    { label: "Time series", count: 8096 },
    { label: "Event", count: 0 },
    { label: "Sequence", count: 0 },
  ];

  const otherCategories: CategoryItem[] = [
    { label: "Asset", count: 103 },
    { label: "File", count: 74 },
    { label: "Time series", count: 383 },
    { label: "Activity", count: 2850 },
    { label: "Equipment", count: 0 },
    { label: "Notification", count: 0 },
  ];

  const fileResults: FileItem[] = [
    { name: "Model1.okwnz", type: "Compressed", createdTime: "07/17/2025 8:45 PM" },
    { name: "cog-mcp-experimental-test.zip", type: "Compressed", createdTime: "02/24/2026 7:09 PM" },
    { name: "MyFile_24.ipynb", description: "{'metadata': {'kernelspec': {'name': 'python', 'display_name': 'Python (...", type: "Plain Text", createdTime: "06/17/2025 10:47 AM" },
    { name: "2021_5.pdf", description: "229 Tag Number Service DB#3824; 13 Usa Data 14 16 16 17 18 18 We...", type: "PDF", createdTime: "06/22/2023 6:40 AM" },
    { name: "MyFile_23.ipynb", description: "{'metadata': {'kernelspec': {'name': 'python', 'display_name': 'Python (...", type: "PDF", createdTime: "06/18/2024 8:21 AM" },
    { name: "MyFile_23.ipynb", description: "{'metadata': {'kernelspec': {'name': 'python', 'display_name': 'Python (...", type: "Plain Text", createdTime: "06/17/2025 10:44 AM" },
    { name: "SKILL.md", description: "return: person info description: Conducts a friendly interview w...", type: "Other", createdTime: "01/23/2026 10:50 AM" },
    { name: "MyFile_28.ipynb", description: "{'metadata': {'kernelspec': {'name': 'python', 'display_name': 'Python (...", type: "Plain Text", createdTime: "06/17/2025 10:45 AM" },
    { name: "SKILL.md", description: ": return: person info description : Summarize all files in file...", type: "Other", createdTime: "01/30/2026 5:35 PM" },
    { name: "RE_API_schemas (copy).ipynb", description: "{'metadata': {'kernelspec': {'name': 'python', 'display_name': 'Py...", type: "Plain Text", createdTime: "02/28/2025 2:01 PM" },
    { name: "atlai_ai_python_sandbox-emia.zip", type: "Compressed", createdTime: "02/19/2026 12:45 PM" },
    { name: "My Atlas AI Metering-source.json", description: "{'description': 'Ingest meteringdata', 'externalld': '', 'isair': 'firs...", type: "Other", createdTime: "06/16/2025 7:31 AM" },
    { name: "bibtblit_20280221_223034", description: "agent_space agent_schema_id agent_name agent_description agent...", type: "Tabular Data", createdTime: "02/21/2026 3:30 PM" },
    { name: "MyFile_36.ipynb", description: "{'metadata': {'kernelspec': {'name': 'python', 'display_name': 'Python (...", type: "Plain Text", createdTime: "06/17/2025 10:45 AM" },
    { name: "MyFile_48.ipynb", description: "{'metadata': {'kernelspec': {'name': 'python', 'display_name': 'Python (...", type: "Plain Text", createdTime: "06/17/2025 10:45 AM" },
    { name: "tables_20280311_185021", description: "agent_id agent_name agent_description sequenced modal created_time last...", type: "Tabular Data", createdTime: "03/11/2026 11:50 AM" },
    { name: "test.ipynb", description: "{'metadata': {'kernelspec': {'name': 'python', 'display_name': 'Py...", type: "Plain Text", createdTime: "03/10/2025 10:22 PM" },
  ];

  return (
    <div className="bg-white flex flex-col h-full w-full">
      {/* Top Bar */}
      {showTopBar && <SearchTopBar />}

      {/* Search Input */}
      <div className="px-[20px] py-[16px]">
        <div className="relative">
          <div className="absolute left-[16px] top-1/2 -translate-y-1/2">
            <Search className="w-[16px] h-[16px] text-[#5e666d]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets, files, time series, and more..."
            className="w-full h-[40px] pl-[44px] pr-[16px] rounded-[8px] border border-[#e4e6e8] bg-white font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] placeholder:text-[#5e666d] focus:outline-none focus:border-[#1a967a] focus:ring-1 focus:ring-[#1a967a]"
          />
        </div>
      </div>

      {/* Data Model Info */}
      <div className="px-[20px] pb-[16px]">
        <div className="flex items-center gap-[8px] text-[14px]">
          <span className="font-sans font-normal text-[#5e666d] tracking-[-0.04px]">
            Search results from data in
          </span>
          <button className="font-sans font-medium text-[#111213] tracking-[-0.04px] hover:underline">
            Process Industries Data Model - vahvalt
          </button>
          <svg className="w-[12px] h-[12px] text-[#5e666d]" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[240px] border-r border-[rgba(0,0,0,0.1)] overflow-y-auto">
          <div className="p-[12px]">
            {/* Default Categories */}
            <div className="mb-[24px]">
              <div className="px-[12px] py-[8px] mb-[8px]">
                <span className="font-sans font-medium text-[12px] leading-[14px] text-[#5e666d] uppercase tracking-[0.5px]">
                  Default categories
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                {defaultCategories.map((category) => (
                  <CategoryButton
                    key={category.label}
                    label={category.label}
                    count={category.count}
                    isActive={activeCategory === category.label}
                    onClick={() => setActiveCategory(category.label)}
                  />
                ))}
              </div>
            </div>

            {/* Other Categories */}
            <div>
              <div className="px-[12px] py-[8px] mb-[8px]">
                <span className="font-sans font-medium text-[12px] leading-[14px] text-[#5e666d] uppercase tracking-[0.5px]">
                  Other categories
                </span>
              </div>
              <div className="flex flex-col gap-[2px]">
                {otherCategories.map((category) => (
                  <CategoryButton
                    key={`other-${category.label}`}
                    label={category.label}
                    count={category.count}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <div className="border-b border-[rgba(0,0,0,0.1)] px-[20px] flex items-center justify-between">
            <div className="flex items-center gap-[2px]">
              <button
                onClick={() => setActiveTab("File")}
                className={`px-[12px] py-[10px] font-sans font-normal text-[14px] leading-[18px] tracking-[-0.04px] border-b-2 transition-colors ${
                  activeTab === "File"
                    ? "border-[#1a967a] text-[#111213] font-medium"
                    : "border-transparent text-[#5e666d] hover:text-[#111213]"
                }`}
              >
                File
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-[8px]">
              <button className="flex items-center gap-[6px] px-[12px] py-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                <Filter className="w-[16px] h-[16px] text-[#5e666d]" />
                <span className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                  Filters
                </span>
              </button>
              <div className="h-[20px] w-px bg-[rgba(0,0,0,0.1)]" />
              <button className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                <List className="w-[16px] h-[16px] text-[#5e666d]" />
              </button>
              <button className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                <Grid3x3 className="w-[16px] h-[16px] text-[#5e666d]" />
              </button>
              <button className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.02)] transition-colors">
                <MoreHorizontal className="w-[16px] h-[16px] text-[#5e666d]" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-white border-b border-[rgba(0,0,0,0.1)]">
                <tr>
                  <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                    Name
                  </th>
                  <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px] w-[200px]">
                    Type
                  </th>
                  <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px] w-[200px]">
                    Created time
                  </th>
                </tr>
              </thead>
              <tbody>
                {fileResults.map((file, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02, duration: 0.3 }}
                    className="border-b border-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.02)] transition-colors cursor-pointer"
                  >
                    <td className="px-[20px] py-[12px]">
                      <div className="flex flex-col gap-[4px]">
                        <span className="font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px]">
                          {file.name}
                        </span>
                        {file.description && (
                          <span className="font-sans font-normal text-[13px] leading-[16px] text-[#5e666d] tracking-[-0.039px] truncate max-w-[500px]">
                            {file.description}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-[20px] py-[12px]">
                      <div className="flex items-center gap-[8px]">
                        <FileTypeIcon type={file.type} />
                        <span className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                          {file.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-[20px] py-[12px]">
                      <span className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                        {file.createdTime}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {/* Show More Button */}
            <div className="flex items-center justify-center py-[24px]">
              <button className="px-[16px] py-[8px] rounded-[6px] bg-[#f9fafa] hover:bg-[#f1f2f3] transition-colors font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px]">
                Show more
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}