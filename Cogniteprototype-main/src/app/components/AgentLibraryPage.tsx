import { useState } from "react";
import { Search, ArrowUpDown, Plus, Grid, List, ChevronRight } from "lucide-react";

interface AgentLibraryPageProps {
  showTopBar?: boolean;
  onAgentClick?: (agent: Agent) => void;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: "Published" | "Draft";
  badge: string;
  badgeColor: string;
}

const agents: Agent[] = [
  {
    id: "eos-system-agent",
    name: "Eos system agent",
    description: "The system agent for the Eos lending page.",
    status: "Published",
    badge: "A",
    badgeColor: "#D3E3FD",
  },
  {
    id: "jakobs-useless-agent",
    name: "Jakob's useless agent",
    description: "Does nothing, for testing",
    status: "Published",
    badge: "IS",
    badgeColor: "#C5D9F7",
  },
  {
    id: "joes-test-agent",
    name: "Joe's Test Agent",
    description: "Testing 123",
    status: "Published",
    badge: "ID",
    badgeColor: "#F4CCCC",
  },
  {
    id: "maintenance-data-insights",
    name: "Maintenance data insights agent",
    description: "Ask questions about your maintenance data, including assets and their associated maintenance orders.",
    status: "Published",
    badge: "DL",
    badgeColor: "#B8E6E0",
  },
  {
    id: "sam-agent",
    name: "Sam Agent",
    description: "My test agent",
    status: "Published",
    badge: "IS",
    badgeColor: "#E8E8E8",
  },
  {
    id: "test-system-prompt",
    name: "Test system prompt",
    description: "eos test system prompt",
    status: "Published",
    badge: "SO",
    badgeColor: "#FFD6D6",
  },
];

function AgentLibraryTopBar() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Contents">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full min-h-[36px]" data-name="Top section">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Heading">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Agent library title">
              <p className="flex-[1_0_0] font-sans font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[-0.176px]" style={{ fontFeatureSettings: "'cv05'" }}>
                Agent library
              </p>
            </div>
          </div>
          <button className="flex items-center gap-[8px] px-[16px] py-[8px] bg-[#111213] hover:bg-[#2a2d2e] text-white rounded-[8px] transition-colors">
            <Plus className="w-[16px] h-[16px]" />
            <span className="font-sans font-medium text-[14px] leading-[18px] tracking-[-0.04px]">
              Create agent
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function AgentLibraryPage({ showTopBar = true, onAgentClick }: AgentLibraryPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="bg-white flex flex-col h-full w-full">
      {/* Top Bar */}
      {showTopBar && <AgentLibraryTopBar />}

      {/* Header Section */}
      <div className="px-[20px] py-[24px]">
        <div className="flex items-start justify-between mb-[16px]">
          <div className="flex items-start gap-[12px]">
            {/* Agent Library Icon */}
            <div className="w-[40px] h-[40px] bg-[#f1f2f3] rounded-[8px] flex items-center justify-center">
              <svg className="w-[20px] h-[20px] text-[#5e666d]" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 17C5 14.2386 7.23858 12 10 12C12.7614 12 15 14.2386 15 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M10 2L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h1 className="font-sans font-semibold text-[20px] leading-[24px] text-[#111213] tracking-[-0.22px]">
                Agent library
              </h1>
              <p className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                Explore available AI agents to automate complex tasks and your workflows
              </p>
            </div>
          </div>
        </div>

        {/* Search and View Toggle Row */}
        <div className="flex items-center gap-[12px]">
          <div className="flex-1 relative">
            <div className="absolute left-[16px] top-1/2 -translate-y-1/2">
              <Search className="w-[16px] h-[16px] text-[#5e666d]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents"
              className="w-full h-[40px] pl-[44px] pr-[16px] rounded-[8px] border border-[#e4e6e8] bg-white font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] placeholder:text-[#9ca3a9] focus:outline-none focus:border-[#1a967a] focus:ring-1 focus:ring-[#1a967a]"
            />
          </div>
          
          <div className="flex items-center gap-[4px] border border-[#e4e6e8] rounded-[8px] p-[4px]">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-[6px] rounded-[4px] transition-colors ${
                viewMode === "grid" ? "bg-[#f1f2f3] text-[#111213]" : "text-[#9ca3a9] hover:text-[#5e666d]"
              }`}
            >
              <Grid className="w-[16px] h-[16px]" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-[6px] rounded-[4px] transition-colors ${
                viewMode === "list" ? "bg-[#f1f2f3] text-[#111213]" : "text-[#9ca3a9] hover:text-[#5e666d]"
              }`}
            >
              <List className="w-[16px] h-[16px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Agent Cards Grid */}
      <div className="flex-1 overflow-auto px-[20px] py-[24px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[16px]">
          {agents.map((agent) => (
            <button
              key={agent.id}
              className="group flex flex-col gap-[16px] p-[20px] rounded-[8px] border border-[rgba(0,0,0,0.1)] bg-white hover:shadow-md hover:border-[rgba(0,0,0,0.15)] transition-all cursor-pointer text-left relative"
              onClick={() => onAgentClick?.(agent)}
            >
              {/* Arrow Icon */}
              <div className="absolute top-[20px] right-[20px]">
                <ChevronRight className="w-[16px] h-[16px] text-[#9ca3a9] group-hover:text-[#5e666d] transition-colors" />
              </div>

              {/* Agent Icon */}
              <div className="w-[48px] h-[48px] bg-[#5B21B6] rounded-full flex items-center justify-center shrink-0">
                <svg className="w-[24px] h-[24px] text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L14 8L19 9L15 13L16 18L12 15L8 18L9 13L5 9L10 8L12 3Z" fill="currentColor" />
                </svg>
              </div>

              {/* Agent Info */}
              <div className="flex flex-col gap-[8px] pr-[24px]">
                <h3 className="font-sans font-semibold text-[16px] leading-[20px] text-[#111213] tracking-[-0.176px]">
                  {agent.name}
                </h3>
                <p className="font-sans font-normal text-[14px] leading-[20px] text-[#5e666d] tracking-[-0.04px]">
                  {agent.description}
                </p>
              </div>

              {/* Status and Badge Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[6px] px-[8px] py-[4px] bg-[#E6F4EA] rounded-[4px]">
                  <div className="w-[6px] h-[6px] bg-[#1E8E3E] rounded-full" />
                  <span className="font-sans font-medium text-[12px] leading-[16px] text-[#1E8E3E]">
                    {agent.status}
                  </span>
                </div>
                <div
                  className="flex items-center justify-center px-[8px] py-[4px] rounded-[4px] min-w-[32px]"
                  style={{ backgroundColor: agent.badgeColor }}
                >
                  <span className="font-sans font-semibold text-[12px] leading-[16px] text-[#111213]">
                    {agent.badge}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { AgentLibraryTopBar };