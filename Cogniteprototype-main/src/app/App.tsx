import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "sonner";
import svgPaths from "../imports/svg-grdyab3m7e";
import svgPathsCollapsed from "../imports/svg-grcs4n21d5";
import svgPathsChat from "../imports/svg-ms7v0l42ok";
import svgPathsChatInput from "../imports/svg-s8dqgc9ief";
import svgPathsAtlasCollapsed from "../imports/svg-1vrsqz78zs";
import svgPathsNavIcons from "../imports/svg-n4mybpwgkh";
import imgImage from "figma:asset/c9f28e7204884c6f1acbb0f3becc277e25d04575.png";
import imgAvatarDefault from "figma:asset/a07b0b43d6f080949cc7f3e45da3ec90c1c42f92.png";
import { AreaChart } from "./components/AreaChart";
import { HeatmapChart } from "./components/HeatmapChart";
import { LineChart } from "./components/LineChart";
import { StatusCard } from "./components/StatusCard";
import { ChatTopBar } from "./components/ChatTopBar";
import { ChatResponse } from "./components/ChatResponse";
import {
  SourceDetailsPanel,
  type SelectedSource,
  getInitialSourcePanelWidth,
  clampSourcePanelWidth,
} from "./components/SourceDetailsPanel";
import { DashboardTopBar, DashboardToolbarUtilities } from "./components/DashboardTopBar";
import { ChatHistorySidebar } from "./components/ChatHistorySidebar";
import { AgentInitialMessage } from "./components/AgentInitialMessage";
import { DASHBOARD_SUGGESTED_PATHS, expandDashboardSuggestion } from "./constants/suggestedPaths";
import { Badge } from "@/components/ui/aura/badge";
import { getPageTabLabel } from "./constants/pageTitles";
import { SearchPage, SearchTopBar } from "./components/SearchPage";
import { CanvasPage, CanvasTopBar } from "./components/CanvasPage";
import { CanvasDetailsPage, CanvasDetailsTopBar } from "./components/CanvasDetailsPage";
import { ChartsPage, ChartsTopBar } from "./components/ChartsPage";
import { ChartsDetailsPage, ChartsDetailsTopBar } from "./components/ChartsDetailsPage";
import { ProjectsPage, ProjectsTopBar } from "./components/ProjectsPage";
import { ProjectDetailsPage, ProjectsDetailsTopBar } from "./components/ProjectDetailsPage";
import {
  SEED_PROJECTS,
  buildNewProject,
  duplicateProject,
  type CreateProjectInput,
  type Project as ProjectRecord,
} from "./constants/projects";
import { CustomAppsPage, CustomAppsTopBar } from "./components/CustomAppsPage";
import { AgentLibraryPage, AgentLibraryTopBar } from "./components/AgentLibraryPage";
import type { Agent } from "./components/AgentLibraryPage";
import { AgentMessage } from "./components/AgentMessage";
import { WorkorderManagerPage, WorkorderManagerTopBar } from "./components/WorkorderManagerPage";
import Atlas from "../imports/Atlas";
import AtlasExpandButton from "../imports/AtlasExpandButton";
import ChatHistory from "../imports/ChatHistory";
import PinnedApps from "../imports/PinnedApps";
import Tooltip from "../imports/Tooltip";
import { AgentChatFloatButton } from "./components/AgentChatFloatButton";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/aura/button";
import { ProductionDetailsLineChart } from "./components/charts/ProductionDetailsLineChart";
import { IncidentInlineChartWidget } from "./components/IncidentInlineChartWidget";
import type { AddChartToDashboardPayload } from "./constants/chatResponseScenarios";

type PinnedDashboardChart = AddChartToDashboardPayload & { id: string };

function newPinnedDashboardId() {
  return globalThis.crypto?.randomUUID?.() ?? `dsh-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function HeaderEmail() {
  return (
    <div className="content-stretch flex flex-col font-sans font-medium gap-[2px] h-full items-start justify-center leading-[14px] not-italic relative shrink-0 text-[12px] tracking-[-0.08px] whitespace-nowrap" data-name="Header + email">
      <p className="relative shrink-0 text-[#e4e6e8]">AkerBP-DEV</p>
      <p className="relative shrink-0 text-[#bbc0c4]">Industrial tools</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative rounded-[6px]" data-name="Profile">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center p-[2px] relative w-full">
          <div className="relative rounded-[6px] shrink-0 size-[36px]" data-name="image">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
              <img alt="" className="absolute h-full left-[-20.76%] max-w-none top-0 w-[141.51%]" src={imgImage} />
            </div>
          </div>
          <div className="flex flex-row items-center self-stretch">
            <HeaderEmail />
          </div>
        </div>
      </div>
    </div>
  );
}

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onOpenAtlas: () => void;
  isChatOpen: boolean;
}

function Sidebar({ activeTab, onTabChange, isCollapsed, onToggleCollapse, onOpenAtlas, isChatOpen }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: "HomeFilled", pathData: svgPaths.p3cd5c400 },
    { id: "projects", label: "Projects", icon: "Projects", pathData: null },
    { id: "search", label: "Search", icon: "Search", pathData: svgPaths.p3ae12d00, isSearch: true },
    { id: "canvas", label: "Canvas", icon: "CanvasApp", pathData: svgPaths.p2ce6da80 },
    { id: "charts", label: "Charts", icon: "ChartsApp", pathData: svgPaths.p299bab00 },
    { id: "custom-apps", label: "Custom apps", icon: "AppsFilled", pathData: null, badge: "BETA", isGrid: true },
    { id: "agent-library", label: "Agent library", icon: "AgentLibrary", pathData: svgPathsAtlasCollapsed.p1d14e00, isAgent: true },
  ];

  if (isCollapsed) {
    return (
      <motion.div 
        initial={{ width: 240 }}
        animate={{ width: 56 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#212426] content-stretch flex flex-col gap-[12px] items-center py-[12px] relative rounded-[8px] shrink-0 h-full" 
        data-name="Sidebar"
      >
        <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Heading">
          <button 
            onClick={onToggleCollapse}
            className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px] hover:bg-[#40464a] transition-colors" 
            data-name="Project selector"
          >
            <div className="relative shrink-0 size-[16px]" data-name="SidebarRight">
              <div className="absolute inset-[6.25%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9994 13.9994">
                  <path clipRule="evenodd" d={svgPathsCollapsed.p23c7000} fill="var(--fill-0, #E4E6E8)" fillRule="evenodd" id="Vector" />
                </svg>
              </div>
            </div>
          </button>
          <div className="h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="Header">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center p-[2px] relative size-full">
                <div className="relative rounded-[6px] shrink-0 size-[36px]" data-name="image">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[6px]">
                    <img alt="" className="absolute h-full left-[-20.76%] max-w-none top-0 w-[141.51%]" src={imgImage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px] hover:bg-[#40464a] transition-colors" data-name="Project selector">
            <div className="overflow-clip relative shrink-0 size-[16px]" data-name="WaypointFilled">
              <div className="absolute inset-[6.25%_12.5%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
                  <path clipRule="evenodd" d={svgPathsCollapsed.p1d7f340} fill="var(--fill-0, #E4E6E8)" fillRule="evenodd" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative shrink-0 w-full" data-name="Separator">
          <div className="content-stretch flex flex-col items-start px-[8px] relative w-full">
            <div className="bg-[#40464a] h-px shrink-0 w-full" data-name="Separator" />
          </div>
        </div>

        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-center min-h-px min-w-px relative" data-name="Pages">
          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0" data-name="Main pages">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="Fixed apps">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                const darkFill = isActive ? "white" : "#6F6F73";
                const lightFill = isActive ? "white" : "#C6C6C6";
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px] ${
                      isActive ? "bg-[#5e666d]" : "hover:bg-[#40464a]"
                    } transition-colors`}
                    data-name={item.label}
                  >
                    {item.id === "home" ? (
                      <div className="relative shrink-0 size-[16px]">
                        <div className="absolute inset-[12.99%_7.15%_4.2%_7.15%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.7121 13.2495">
                            <path d={svgPathsNavIcons.p2909c200} fill={darkFill} />
                          </svg>
                        </div>
                        <div className="absolute inset-[4.17%_4.17%_35.88%_4.17%]">
                          <div className="absolute inset-[0_0_15.15%_0]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 8.14011">
                              <path d={svgPathsNavIcons.p3ece6470} fill={lightFill} opacity="0.8" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute inset-[59.89%_35.72%_4.2%_35.72%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.57071 5.74582">
                            <path d={svgPathsNavIcons.p3334af80} fill={lightFill} opacity="0.8" />
                          </svg>
                        </div>
                      </div>
                    ) : item.id === "projects" ? (
                      <div className="relative shrink-0 size-[16px]" aria-hidden>
                        <svg className="absolute size-full" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M2.5 6.25V5.25C2.5 4.56 3.06 4 3.75 4H6.2L7.45 2.5H12.25C12.94 2.5 13.5 3.06 13.5 3.75V6.25"
                            stroke={darkFill}
                            strokeWidth="1.2"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2.5 6.25H13.5V12.25C13.5 12.94 12.94 13.5 12.25 13.5H3.75C3.06 13.5 2.5 12.94 2.5 12.25V6.25Z"
                            fill={darkFill}
                            opacity="0.92"
                          />
                          <path d="M4.5 8.5H11.5" stroke={lightFill} strokeWidth="1" opacity="0.85" />
                        </svg>
                      </div>
                    ) : item.id === "search" ? (
                      <div className="overflow-clip relative shrink-0 size-[16px]">
                        <div className="absolute bottom-1/4 left-[12.5%] right-1/4 top-[12.5%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                            <path d={svgPathsNavIcons.p1a89e300} fill={darkFill} />
                          </svg>
                        </div>
                        <div className="absolute inset-[4.17%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                            <path clipRule="evenodd" d={svgPathsNavIcons.p778ce40} fill={lightFill} fillRule="evenodd" opacity="0.8" />
                          </svg>
                        </div>
                      </div>
                    ) : item.id === "canvas" ? (
                      <div className="overflow-clip relative shrink-0 size-[16px]">
                        <div className="absolute inset-[32.33%_11.85%_4.17%_10.52%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4208 10.1609">
                            <path d={svgPathsNavIcons.p1ce4e600} fill={darkFill} />
                          </svg>
                        </div>
                        <div className="absolute inset-[4.17%_11.85%_32.33%_10.52%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4208 10.1609">
                            <path d={svgPathsNavIcons.p302c0200} fill={lightFill} opacity="0.8" />
                          </svg>
                        </div>
                      </div>
                    ) : item.id === "charts" ? (
                      <div className="content-stretch flex h-[16px] items-start pl-[4px] relative shrink-0 w-[20px]">
                        <div className="overflow-clip relative shrink-0 size-[16px]">
                          <div className="absolute inset-[4.4%_51.34%_41.67%_5.64%]">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.88191 8.63007">
                              <path clipRule="evenodd" d={svgPathsNavIcons.p1e91b780} fill={lightFill} fillRule="evenodd" opacity="0.8" />
                            </svg>
                          </div>
                          <div className="absolute inset-[4.17%_25.4%_4.17%_22.09%]">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.40154 14.6667">
                              <path clipRule="evenodd" d={svgPathsNavIcons.p4a7a000} fill={darkFill} fillRule="evenodd" />
                            </svg>
                          </div>
                          <div className="absolute inset-[33.33%_4.58%_4.17%_46.39%]">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.84384 10">
                              <path clipRule="evenodd" d={svgPathsNavIcons.p38893500} fill={lightFill} fillRule="evenodd" opacity="0.8" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : item.id === "custom-apps" ? (
                      <div className="relative shrink-0 size-[16px]">
                        <div className="absolute inset-[17.24%_16.67%_16.1%_16.67%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                            <path d={svgPathsNavIcons.p28e0a700} fill={darkFill} />
                          </svg>
                        </div>
                        <div className="absolute inset-[8.63%_6.25%_7.49%_7.76%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.758 13.4213">
                            <g opacity="0.8">
                              <path d={svgPathsNavIcons.p7158f80} fill={lightFill} />
                              <path d={svgPathsNavIcons.p39c57e00} fill={lightFill} />
                              <path d={svgPathsNavIcons.p3a4661f0} fill={lightFill} />
                              <path d={svgPathsNavIcons.p3a55d600} fill={lightFill} />
                            </g>
                          </svg>
                        </div>
                      </div>
                    ) : item.id === "agent-library" ? (
                      <div className="relative shrink-0 size-[16px]">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                          <rect x="4" y="5" width="8" height="7" rx="1" fill={darkFill} />
                          <circle cx="6.5" cy="8" r="1" fill={lightFill} opacity="0.8" />
                          <circle cx="9.5" cy="8" r="1" fill={lightFill} opacity="0.8" />
                          <rect x="5.5" y="10" width="5" height="0.8" rx="0.4" fill={lightFill} opacity="0.8" />
                          <rect x="7.5" y="2" width="1" height="3" fill={lightFill} opacity="0.8" />
                          <circle cx="8" cy="1.5" r="1" fill={lightFill} opacity="0.8" />
                          <rect x="2" y="7" width="2" height="1" rx="0.5" fill={darkFill} />
                          <rect x="12" y="7" width="2" height="1" rx="0.5" fill={darkFill} />
                          <rect x="7" y="12" width="2" height="2" fill={lightFill} opacity="0.8" />
                        </svg>
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
            
            {/* Atlas AI Agent Button - Collapsed - moved up from footer */}
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0">
              <div className="content-stretch flex flex-col h-[22px] items-center justify-center relative shrink-0 w-full" data-name="Separator">
                <div className="bg-[#40464a] h-px shrink-0 w-full" data-name="Separator" />
              </div>
              <button 
                onClick={onOpenAtlas}
                className={`content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px] transition-all ${
                  isChatOpen 
                    ? 'bg-[rgba(255,255,255,0.1)]' 
                    : 'hover:bg-[#40464a]'
                }`}
                data-name="Atlas"
              >
                <div className="relative shrink-0 size-[16px]" data-name="🌻 Atlas AI logo">
                  <div className="-translate-y-1/2 absolute aspect-[20/20] left-[6.25%] right-[6.25%] top-1/2" data-name="Vector">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                      <g id="Vector">
                        <path d={svgPathsAtlasCollapsed.p1d14e00} fill={isChatOpen ? "var(--fill-0, #3C5FFB)" : "var(--fill-0, #E4E6E8)"} />
                        <path d={svgPathsAtlasCollapsed.p21b59000} fill={isChatOpen ? "var(--fill-0, #3C5FFB)" : "var(--fill-0, #E4E6E8)"} />
                      </g>
                    </svg>
                  </div>
                  <div className="-translate-y-1/2 absolute aspect-[20/20] left-[6.25%] right-[6.25%] top-1/2" data-name="Vector">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                      <g id="Vector">
                        <path d={svgPathsAtlasCollapsed.p3d402300} fill={isChatOpen ? "var(--fill-0, #B7D3FF)" : "var(--fill-0, #E4E6E8)"} />
                        <path d={svgPathsAtlasCollapsed.p2bc7c400} fill={isChatOpen ? "var(--fill-0, #B7D3FF)" : "var(--fill-0, #E4E6E8)"} />
                      </g>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Footer">
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0" data-name="General pages">
            <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px] hover:bg-[#40464a] transition-colors" data-name="Marketplace">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="AppsFilled">
                <div className="absolute inset-[6.25%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g id="Vector">
                      <path d={svgPathsCollapsed.p158a8580} fill="var(--fill-0, #E4E6E8)" />
                      <path d={svgPathsCollapsed.p116fe2f0} fill="var(--fill-0, #E4E6E8)" />
                      <path d={svgPathsCollapsed.pd991a80} fill="var(--fill-0, #E4E6E8)" />
                      <path d={svgPathsCollapsed.pb47a680} fill="var(--fill-0, #E4E6E8)" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <div className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px] hover:bg-[#40464a] transition-colors" data-name="Notifications">
              <div className="overflow-clip relative shrink-0 size-[16px]" data-name="BellFilled">
                <div className="absolute inset-[7.97%_12.13%_7.97%_12.14%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.1168 13.45">
                    <g id="Vector">
                      <path d={svgPathsCollapsed.p19374b80} fill="var(--fill-0, #F1F2F3)" />
                      <path clipRule="evenodd" d={svgPathsCollapsed.p1d501a00} fill="var(--fill-0, #F1F2F3)" fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="content-stretch flex h-[40px] items-center justify-center p-[2px] relative shrink-0" data-name="Footer">
            <div className="relative rounded-[6px] shrink-0 size-[36px]" data-name=".avatar_default">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[6px] size-full" src={imgAvatarDefault} />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ width: 56 }}
      animate={{ width: 240 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-[#212426] content-stretch flex flex-col gap-[12px] h-full items-start py-[12px] relative rounded-[8px] shrink-0" 
      data-name="Sidebar"
    >
      <div className="relative shrink-0 w-full" data-name="Header + location + search">
        <div className="content-stretch flex flex-col gap-[4px] items-start px-[6px] relative w-full">
          <div className="content-stretch flex gap-[4px] h-[40px] items-center relative shrink-0 w-full" data-name="Header">
            <Profile />
            <button 
              onClick={onToggleCollapse}
              className="content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[36px] hover:bg-[#40464a] transition-colors" 
              data-name="Project selector"
            >
              <div className="relative shrink-0 size-[16px]" data-name="SidebarRight">
                <div className="absolute inset-[6.25%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9994 13.9994">
                    <path clipRule="evenodd" d={svgPaths.p23c7000} fill="var(--fill-0, #E4E6E8)" fillRule="evenodd" id="Vector" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
          <div className="relative shrink-0 w-full" data-name="location">
            <div className="content-stretch flex flex-col gap-[4px] items-start px-[2px] relative w-full">
              <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Project selector">
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex items-center justify-between px-[10px] relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative">
                      <div className="overflow-clip relative shrink-0 size-[16px]">
                        <div className="absolute inset-[6.25%_12.5%]">
                          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 14">
                            <path clipRule="evenodd" d={svgPaths.p1d7f340} fill="var(--fill-0, #E4E6E8)" fillRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic overflow-hidden relative text-[#e4e6e8] text-[14px] text-ellipsis whitespace-nowrap">Valhall</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start px-[6px] relative w-full">
          <div className="bg-[#40464a] h-px shrink-0 w-full" />
        </div>
      </div>

      <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start px-[8px] relative size-full">
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const darkFill = isActive ? "white" : "#6F6F73";
              const lightFill = isActive ? "white" : "#C6C6C6";
              
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`h-[36px] relative rounded-[6px] shrink-0 w-full ${
                    isActive ? "bg-[#5e666d]" : "hover:bg-[#40464a]"
                  } transition-colors`}
                >
                  <div className="flex flex-row items-center size-full">
                    <div className="content-stretch flex items-center justify-between px-[8px] relative size-full">
                      <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative">
                        {item.id === "home" ? (
                          <div className="relative shrink-0 size-[16px]">
                            <div className="absolute inset-[12.99%_7.15%_4.2%_7.15%]">
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.7121 13.2495">
                                <path d={svgPathsNavIcons.p2909c200} fill={darkFill} />
                              </svg>
                            </div>
                            <div className="absolute inset-[4.17%_4.17%_35.88%_4.17%]">
                              <div className="absolute inset-[0_0_15.15%_0]">
                                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 8.14011">
                                  <path d={svgPathsNavIcons.p3ece6470} fill={lightFill} opacity="0.8" />
                                </svg>
                              </div>
                            </div>
                            <div className="absolute inset-[59.89%_35.72%_4.2%_35.72%]">
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.57071 5.74582">
                                <path d={svgPathsNavIcons.p3334af80} fill={lightFill} opacity="0.8" />
                              </svg>
                            </div>
                          </div>
                        ) : item.id === "projects" ? (
                          <div className="relative shrink-0 size-[16px]" aria-hidden>
                            <svg className="absolute size-full" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M2.5 6.25V5.25C2.5 4.56 3.06 4 3.75 4H6.2L7.45 2.5H12.25C12.94 2.5 13.5 3.06 13.5 3.75V6.25"
                                stroke={darkFill}
                                strokeWidth="1.2"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2.5 6.25H13.5V12.25C13.5 12.94 12.94 13.5 12.25 13.5H3.75C3.06 13.5 2.5 12.94 2.5 12.25V6.25Z"
                                fill={darkFill}
                                opacity="0.92"
                              />
                              <path d="M4.5 8.5H11.5" stroke={lightFill} strokeWidth="1" opacity="0.85" />
                            </svg>
                          </div>
                        ) : item.id === "search" ? (
                          <div className="overflow-clip relative shrink-0 size-[16px]">
                            <div className="absolute bottom-1/4 left-[12.5%] right-1/4 top-[12.5%]">
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
                                <path d={svgPathsNavIcons.p1a89e300} fill={darkFill} />
                              </svg>
                            </div>
                            <div className="absolute inset-[4.17%]">
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6667 14.6667">
                                <path clipRule="evenodd" d={svgPathsNavIcons.p778ce40} fill={lightFill} fillRule="evenodd" opacity="0.8" />
                              </svg>
                            </div>
                          </div>
                        ) : item.id === "canvas" ? (
                          <div className="overflow-clip relative shrink-0 size-[16px]">
                            <div className="absolute inset-[32.33%_11.85%_4.17%_10.52%]">
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4208 10.1609">
                                <path d={svgPathsNavIcons.p1ce4e600} fill={darkFill} />
                              </svg>
                            </div>
                            <div className="absolute inset-[4.17%_11.85%_32.33%_10.52%]">
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.4208 10.1609">
                                <path d={svgPathsNavIcons.p302c0200} fill={lightFill} opacity="0.8" />
                              </svg>
                            </div>
                          </div>
                        ) : item.id === "charts" ? (
                          <div className="content-stretch flex h-[16px] items-start pl-[4px] relative shrink-0 w-[20px]">
                            <div className="overflow-clip relative shrink-0 size-[16px]">
                              <div className="absolute inset-[4.4%_51.34%_41.67%_5.64%]">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.88191 8.63007">
                                  <path clipRule="evenodd" d={svgPathsNavIcons.p1e91b780} fill={lightFill} fillRule="evenodd" opacity="0.8" />
                                </svg>
                              </div>
                              <div className="absolute inset-[4.17%_25.4%_4.17%_22.09%]">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.40154 14.6667">
                                  <path clipRule="evenodd" d={svgPathsNavIcons.p4a7a000} fill={darkFill} fillRule="evenodd" />
                                </svg>
                              </div>
                              <div className="absolute inset-[33.33%_4.58%_4.17%_46.39%]">
                                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.84384 10">
                                  <path clipRule="evenodd" d={svgPathsNavIcons.p38893500} fill={lightFill} fillRule="evenodd" opacity="0.8" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        ) : item.id === "custom-apps" ? (
                          <div className="relative shrink-0 size-[16px]">
                            <div className="absolute inset-[17.24%_16.67%_16.1%_16.67%]">
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.6667 10.6667">
                                <path d={svgPathsNavIcons.p28e0a700} fill={darkFill} />
                              </svg>
                            </div>
                            <div className="absolute inset-[8.63%_6.25%_7.49%_7.76%]">
                              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.758 13.4213">
                                <g opacity="0.8">
                                  <path d={svgPathsNavIcons.p7158f80} fill={lightFill} />
                                  <path d={svgPathsNavIcons.p39c57e00} fill={lightFill} />
                                  <path d={svgPathsNavIcons.p3a4661f0} fill={lightFill} />
                                  <path d={svgPathsNavIcons.p3a55d600} fill={lightFill} />
                                </g>
                              </svg>
                            </div>
                          </div>
                        ) : item.id === "agent-library" ? (
                          <div className="relative shrink-0 size-[16px]">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                              <rect x="4" y="5" width="8" height="7" rx="1" fill={darkFill} />
                              <circle cx="6.5" cy="8" r="1" fill={lightFill} opacity="0.8" />
                              <circle cx="9.5" cy="8" r="1" fill={lightFill} opacity="0.8" />
                              <rect x="5.5" y="10" width="5" height="0.8" rx="0.4" fill={lightFill} opacity="0.8" />
                              <rect x="7.5" y="2" width="1" height="3" fill={lightFill} opacity="0.8" />
                              <circle cx="8" cy="1.5" r="1" fill={lightFill} opacity="0.8" />
                              <rect x="2" y="7" width="2" height="1" rx="0.5" fill={darkFill} />
                              <rect x="12" y="7" width="2" height="1" rx="0.5" fill={darkFill} />
                              <rect x="7" y="12" width="2" height="2" fill={lightFill} opacity="0.8" />
                            </svg>
                          </div>
                        ) : null}
                        <p className={`flex-[1_0_0] font-sans font-medium leading-[18px] min-h-px min-w-px not-italic relative text-[14px] text-left ${
                          isActive ? "text-white" : "text-[#e4e6e8]"
                        }`}>{item.label}</p>
                        {item.badge && (
                          <div className="bg-[rgba(255,255,255,0.15)] px-[6px] py-[2px] rounded-[4px] shrink-0">
                            <span className="font-sans text-[10px] leading-[12px] text-[#e4e6e8] uppercase">{item.badge}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Separator and Atlas AI Agent Button */}
          <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
            <div className="bg-[#40464a] h-px shrink-0 w-full" />
            <button 
              onClick={onOpenAtlas}
              className="h-[36px] relative shrink-0 w-full hover:opacity-80 transition-opacity"
            >
              <AtlasExpandButton isActive={isChatOpen} />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#212426] relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start px-[6px] relative w-full">
          <div className="h-[40px] relative rounded-[6px] shrink-0 w-full">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex items-center p-[2px] relative size-full">
                <div className="relative rounded-[6px] shrink-0 size-[36px]" data-name=".avatar_default">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[6px] size-full" src={imgAvatarDefault} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ChatPromptProps {
  onSendMessage: (message: string) => void;
  /** Dashboard suggestion chips: opens chat in side panel. Form submit still uses onSendMessage. */
  onSendSuggestion?: (message: string) => void;
  showSuggestions?: boolean;
  isSidePanel?: boolean;
  defaultAgent?: string;
  /** Shown as a badge next to the agent selector (agent chat / no suggestions). */
  currentPageLabel?: string;
}

function ChatPrompt({
  onSendMessage,
  onSendSuggestion,
  showSuggestions = true,
  isSidePanel = false,
  defaultAgent = "Auto",
  currentPageLabel,
}: ChatPromptProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(defaultAgent);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);

  // Update selected agent when defaultAgent prop changes
  useEffect(() => {
    setSelectedAgent(defaultAgent);
  }, [defaultAgent]);

  const suggestions = [...DASHBOARD_SUGGESTED_PATHS];

  const agents = ["Auto", "Atlas AI", "Technical Expert", "Maintenance Advisor"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  // Chat input style for agent panel (matches Figma)
  if (!showSuggestions) {
    return (
      <form onSubmit={handleSubmit} className={`relative ${isSidePanel ? 'w-full' : 'max-w-[594px] w-full'}`}>
        <div className={`bg-white content-stretch flex flex-col items-start min-h-[80px] py-[8px] relative rounded-[6px] shrink-0 w-full transition-all ${isFocused ? 'ring-2 ring-[#4c9aff] ring-offset-0' : ''}`}>
          <div aria-hidden="true" className={`absolute border ${isFocused ? 'border-[#4c9aff] border-2' : 'border-[rgba(83,88,127,0.16)]'} border-solid inset-0 pointer-events-none rounded-[6px] transition-colors z-10`} />
          <div className="flex-[1_0_0] min-h-px min-w-px relative w-full">
            <div className="flex flex-row items-start size-full">
              <div className="content-stretch flex flex-col justify-between px-[8px] relative w-full h-full">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Ask a question..."
                  rows={1}
                  className="w-full font-sans font-normal leading-[20px] not-italic text-[14px] text-[rgba(0,0,0,0.9)] tracking-[-0.084px] bg-transparent border-none outline-none placeholder:text-[rgba(0,0,0,0.55)] resize-none pt-[4px]"
                />
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full pt-[4px]">
                  <div className="flex min-w-0 flex-1 items-center gap-2 pr-2">
                    {/* Agent selector dropdown */}
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => setShowAgentDropdown(!showAgentDropdown)}
                        className="bg-[rgba(88,91,107,0.08)] content-stretch flex gap-[6px] h-[28px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 hover:bg-[rgba(88,91,107,0.12)] transition-colors"
                      >
                        <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[14px] text-[rgba(0,0,0,0.9)] text-center text-ellipsis tracking-[-0.084px] whitespace-nowrap">
                          <p className="leading-[20px] overflow-hidden">{selectedAgent}</p>
                        </div>
                        <div className="overflow-clip relative shrink-0 size-[16px]">
                          <div className="absolute inset-[38.75%_20%_26.25%_20%]">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.6 5.6">
                              <path clipRule="evenodd" d={svgPathsChatInput.p2e2f4200} fill="var(--fill-0, black)" fillOpacity="0.9" fillRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </button>

                      {/* Dropdown menu */}
                      {showAgentDropdown && (
                        <div className="absolute bottom-full left-0 mb-[4px] bg-white rounded-[6px] shadow-lg border border-[rgba(83,88,127,0.16)] py-[4px] min-w-[160px] z-20">
                          {agents.map((agent) => (
                            <button
                              key={agent}
                              type="button"
                              onClick={() => {
                                setSelectedAgent(agent);
                                setShowAgentDropdown(false);
                              }}
                              className={`w-full text-left px-[12px] py-[8px] font-sans font-normal text-[14px] leading-[20px] tracking-[-0.084px] hover:bg-[rgba(88,91,107,0.08)] transition-colors ${
                                selectedAgent === agent ? 'text-[rgba(0,0,0,0.9)] font-medium' : 'text-[rgba(0,0,0,0.7)]'
                              }`}
                            >
                              {agent}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {currentPageLabel ? (
                      <Badge
                        variant="nordic"
                        className="min-w-0 max-w-[10.5rem] shrink border-0 px-2 py-0.5 text-[11px] font-semibold leading-4"
                        title={currentPageLabel}
                        aria-label={`Current page: ${currentPageLabel}`}
                      >
                        <span className="block min-w-0 truncate">{currentPageLabel}</span>
                      </Badge>
                    ) : null}
                  </div>

                  {/* Send button */}
                  <button 
                    type="submit"
                    className="bg-[rgba(255,255,255,0)] content-stretch flex h-[28px] items-center justify-center px-[6px] relative rounded-[4px] shrink-0 hover:bg-[rgba(88,91,107,0.08)] transition-colors"
                  >
                    <div className="overflow-clip relative shrink-0 size-[16px]">
                      <div className="absolute inset-[6.25%]">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                          <path clipRule="evenodd" d={svgPathsChatInput.p21172c00} fill="var(--fill-0, #8C8C8C)" fillRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }

  // Original dashboard prompt style
  return (
    <form onSubmit={handleSubmit} className={`relative ${isSidePanel ? 'w-full' : 'w-[594px]'}`}>
      <div className={`bg-white content-stretch flex flex-col gap-[8px] items-center relative rounded-[12px] shrink-0 transition-all ${isFocused ? 'ring-2 ring-[#4c9aff] ring-offset-0' : ''}`}>
        <div aria-hidden="true" className={`absolute border ${isFocused ? 'border-[#4c9aff] border-2' : 'border-[#e4e6e8]'} border-solid inset-0 pointer-events-none rounded-[12px] transition-colors z-10`} />
        <div className="bg-white relative rounded-[12px] shrink-0 w-full">
          <div className="content-stretch flex flex-col gap-[52px] items-start p-[12px] relative w-full">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="How can I help?"
              className="w-full font-sans font-normal leading-[20px] not-italic text-[#111213] text-[16px] tracking-[-0.1px] bg-transparent border-none outline-none placeholder:text-[#5e666d]"
            />
            <div className="content-stretch flex gap-[172px] items-center justify-end relative shrink-0 w-full">
              <button type="submit" className="bg-[#f1f2f3] content-stretch flex gap-[8px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 h-[28px] hover:bg-[#e4e6e8] transition-colors">
                {showSuggestions && (
                  <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">Ask Agent</p>
                )}
                <div className="overflow-clip relative shrink-0 size-[16px]">
                  <div className="absolute inset-[6.25%]">
                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                      <path clipRule="evenodd" d={svgPaths.p21172c00} fill="var(--fill-0, #8B949A)" fillRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {showSuggestions && (
        <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0 mt-[8px]">
          {suggestions.map((suggestion, i) => (
            <button
              key={i}
              type="button"
              onClick={() => (onSendSuggestion ?? onSendMessage)(suggestion)}
              className="bg-white content-stretch flex gap-[8px] h-[28px] items-center justify-center px-[8px] relative rounded-[4px] shrink-0 hover:bg-[#f9fafa] transition-colors"
            >
              <div aria-hidden="true" className="absolute border border-[#e4e6e8] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <p className="font-sans font-medium leading-[18px] not-italic relative shrink-0 text-[#111213] text-[14px] whitespace-nowrap">{suggestion}</p>
            </button>
          ))}
        </div>
      )}
    </form>
  );
}

interface DashboardProps {
  /** When true, hide Pinned apps and Continue where you left off (agent panel open). */
  isChatOpen?: boolean;
  /** Charts pinned from chat; multiple entries are supported. */
  pinnedCharts?: PinnedDashboardChart[];
  onDismissPinnedChart?: (id: string) => void;
}

function Dashboard({ isChatOpen = false, pinnedCharts = [], onDismissPinnedChart }: DashboardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  /** Desktop (lg+): 4+4+4 when pinned/history visible; 6+6 when agent uses full width */
  const leftStack = isChatOpen ? "lg:col-[1/span_6]" : "lg:col-[1/span_4]";
  const statusLeft = isChatOpen ? "lg:col-[7/span_3]" : "lg:col-[5/span_2]";
  const statusRight = isChatOpen ? "lg:col-[10/span_3]" : "lg:col-[7/span_2]";
  const areaChart = isChatOpen ? "lg:col-[7/span_6]" : "lg:col-[5/span_4]";
  const heatmapHeight = isChatOpen
    ? "min-h-[200px] h-auto lg:h-full lg:min-h-[220px]"
    : "min-h-[200px] h-auto lg:h-[266px]";
  const areaChartHeight = isChatOpen
    ? "min-h-[280px] h-auto lg:h-full lg:min-h-[320px]"
    : "min-h-[280px] h-auto lg:h-[346px]";

  /** Incident chart (controls + Recharts) needs more row tracks than the compact production square. */
  const incidentChartPin = pinnedCharts.some((p) => p.incidentChartData);
  const leftChartGridRow = incidentChartPin ? "lg:row-[3/span_4]" : "lg:row-[3/span_2]";
  const heatmapGridRow = incidentChartPin ? "lg:row-[7/span_2]" : "lg:row-[5/span_3]";
  const heatmapLayoutHeight = incidentChartPin
    ? "min-h-[160px] h-auto lg:h-full lg:min-h-[150px] lg:max-h-full"
    : heatmapHeight;

  const dashboardGridClass =
    "grid w-full max-w-full grid-cols-1 auto-rows-min gap-4 transition-[height] duration-300 ease-out lg:grid-cols-12 lg:grid-rows-[repeat(8,minmax(0,1fr))] lg:gap-x-4 lg:gap-y-4 " +
    (isChatOpen
      ? "h-auto min-h-0 lg:h-[min(720px,calc(100vh-200px))] lg:min-h-[min(720px,calc(100vh-200px))]"
      : "h-auto min-h-0 lg:h-[640.833px]");

  return (
    <div className="bg-white relative shrink-0 w-full pb-10 sm:pb-[80px]">
      <div className="content-stretch flex flex-col gap-[4px] items-start pt-4 px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 2xl:px-[64px] relative w-full min-w-0 max-w-full">
        {!isChatOpen && (
          <div
            className="content-stretch flex items-center py-[4px] relative shrink-0 w-full"
            data-name="Dashboard utilities row"
          >
            <DashboardToolbarUtilities />
          </div>
        )}
        <div className="flex w-full max-w-full min-w-0 flex-col gap-4">
          <motion.div
            layout
            className={dashboardGridClass}
            variants={containerVariants}
            initial="visible"
            animate="visible"
          >
          <motion.div
            variants={itemVariants}
            layout
            className={`order-1 col-span-1 max-w-full min-w-0 shrink-0 rounded-[8px] bg-[#f9fafa] lg:order-none ${leftStack} lg:row-[1/span_2] lg:justify-self-stretch lg:self-stretch`}
          >
            <div className="overflow-hidden rounded-[inherit] size-full min-h-0 lg:overflow-clip">
              <div className="content-stretch flex flex-col items-start justify-between gap-3 p-4 sm:p-[16px] relative size-full min-h-0 min-w-0">
                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                    <div className="overflow-clip relative shrink-0 size-[16px]">
                      <div className="absolute inset-[6.25%]">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                          <path clipRule="evenodd" d={svgPaths.p8a27580} fill="var(--fill-0, #F43D5C)" fillRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
                      <p className="leading-[20px] overflow-hidden">Critical</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center justify-center pl-[24px] relative shrink-0">
                    <div className="flex flex-col font-sans font-normal justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
                      <p className="leading-[18px] overflow-hidden">P-401</p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[4px] items-start leading-[0] not-italic pt-[12px] relative shrink-0 text-[14px] w-full">
                  <div className="flex flex-col font-sans font-medium justify-center min-w-0 w-full max-w-full relative shrink-0 text-[#111213]">
                    <p className="leading-[18px] text-pretty">Vibration levels have exceeded normal operating range</p>
                  </div>
                  <div className="flex flex-col font-sans font-normal justify-center min-w-0 w-full max-w-full relative shrink-0 text-[#5e666d] text-[14px] tracking-[-0.04px]">
                    <p className="leading-[18px]">Detected: 5 min ago</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            layout
            className={`order-8 col-span-1 max-w-full min-w-0 shrink-0 rounded-[8px] bg-[#f9fafa] lg:order-none ${leftStack} ${leftChartGridRow} lg:justify-self-stretch lg:self-stretch ${
              incidentChartPin ? "flex min-h-0 flex-col lg:h-full" : ""
            }`}
          >
            <div
              className={
                incidentChartPin
                  ? "isolate flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-y-auto overflow-x-clip rounded-[inherit] [scrollbar-gutter:stable] lg:min-h-0"
                  : "isolate min-h-0 w-full min-w-0 overflow-hidden rounded-[inherit] size-full lg:overflow-clip"
              }
            >
              {pinnedCharts.length > 0 ? (
                <div
                  className={cn(
                    "flex w-full min-w-0 flex-col gap-4 p-3 sm:p-4",
                    pinnedCharts.some((p) => p.incidentChartData)
                      ? "min-h-0 flex-1 lg:min-h-0"
                      : "h-full min-h-0 lg:flex-1",
                  )}
                >
                  {pinnedCharts.map((pinnedChart) => (
                    <div
                      key={pinnedChart.id}
                      className="flex w-full min-w-0 flex-col gap-2 border-b border-[#e4e6e8] pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex min-w-0 shrink-0 items-start justify-between gap-2">
                        <p className="min-w-0 flex-1 font-sans text-[14px] font-medium leading-tight tracking-[-0.08px] text-[#111213] sm:text-[16px]">
                          {pinnedChart.title}
                        </p>
                        {onDismissPinnedChart ? (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            className="shrink-0 text-foreground"
                            onClick={() => onDismissPinnedChart(pinnedChart.id)}
                            aria-label={`Remove “${pinnedChart.title}” from dashboard`}
                          >
                            <IconX className="size-4" stroke={2} aria-hidden />
                          </Button>
                        ) : null}
                      </div>
                      <div
                        className={
                          pinnedChart.incidentChartData
                            ? "flex w-full min-w-0 min-h-[20rem] flex-1 flex-col items-stretch justify-start sm:min-h-[18rem] lg:min-h-0 lg:shrink-0"
                            : "flex min-h-[140px] w-full min-w-0 flex-1 flex-col items-stretch justify-start overflow-hidden lg:min-h-0"
                        }
                      >
                        {pinnedChart.incidentChartData ? (
                          <div className="w-full min-w-0 shrink-0">
                            <IncidentInlineChartWidget
                              variant="dashboard"
                              data={pinnedChart.incidentChartData}
                            />
                          </div>
                        ) : (
                          <div className="flex h-full min-h-0 w-full min-w-0 flex-1 items-center justify-center">
                            <div className="flex h-full max-h-full w-full min-h-0 min-w-0 items-center justify-center">
                              <div className="aspect-square h-full max-h-full w-auto max-w-full min-h-0 min-w-0">
                                <div className="h-full w-full min-h-0 min-w-0 overflow-hidden rounded-md border border-[#e4e6e8] bg-white">
                                  <ProductionDetailsLineChart
                                    className="min-h-0"
                                    compact
                                    xAxisTickInterval={8}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="content-stretch flex flex-col items-start justify-between gap-3 p-4 sm:p-[16px] relative size-full min-h-0 min-w-0">
                  <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                    <div className="bg-[#f1f2f3] content-stretch flex flex-col items-center justify-center min-h-[36px] min-w-[36px] px-[2px] relative rounded-[4px] shrink-0">
                      <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#40464a] text-[28px] text-center text-ellipsis tracking-[-0.1px] whitespace-nowrap">
                        <p className="leading-[32px] overflow-hidden">4.2</p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] items-end justify-between min-h-px min-w-px relative">
                      <div className="content-stretch flex flex-col font-sans font-medium items-start justify-center leading-[0] not-italic relative shrink-0 text-ellipsis whitespace-nowrap">
                        <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[#111213] text-[16px] tracking-[-0.08px]">
                          <p className="leading-[20px] overflow-hidden">Bar</p>
                        </div>
                        <div className="flex flex-col justify-center overflow-hidden relative shrink-0 text-[#5e666d] text-[14px]">
                          <p className="leading-[18px] overflow-hidden">V-192</p>
                        </div>
                      </div>
                      <div className="content-stretch flex items-center relative shrink-0">
                        <div className="flex flex-col font-sans font-medium justify-center leading-[0] not-italic overflow-hidden relative shrink-0 text-[#5e666d] text-[14px] text-ellipsis whitespace-nowrap">
                          <p className="leading-[18px] overflow-hidden">Since 2hrs ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#e4e6e8] h-px shrink-0 w-full" />
                  <LineChart />
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            layout
            className={`order-9 col-span-1 max-w-full min-w-0 shrink-0 rounded-[8px] bg-[#f9fafa] lg:order-none ${leftStack} ${heatmapLayoutHeight} ${heatmapGridRow} lg:justify-self-stretch`}
          >
            <div className="overflow-x-auto overflow-y-hidden rounded-[inherit] size-full min-h-0 min-w-0 lg:overflow-clip">
              <div className="content-stretch flex min-h-[200px] flex-col items-start justify-between gap-3 p-4 sm:p-[16px] relative size-full min-w-0 lg:min-h-0">
                <div className="content-stretch flex items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-h-px min-w-px relative">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
                        <p className="leading-[20px] overflow-hidden">Heatmap title</p>
                      </div>
                    </div>
                  </div>
                </div>
                <HeatmapChart />
              </div>
            </div>
          </motion.div>

          {/* Status cards - row 1 */}
          <motion.div
            variants={itemVariants}
            layout
            className={`order-2 col-span-1 max-w-full min-w-0 lg:order-none ${statusLeft} lg:row-[1/span_1]`}
          >
            <StatusCard status="critical" equipment="P-401" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            layout
            className={`order-3 col-span-1 max-w-full min-w-0 lg:order-none ${statusRight} lg:row-[1/span_1]`}
          >
            <StatusCard status="warning" equipment="P-401" />
          </motion.div>

          {/* Status cards - row 2 */}
          <motion.div
            variants={itemVariants}
            layout
            className={`order-4 col-span-1 max-w-full min-w-0 lg:order-none ${statusLeft} lg:row-[2/span_1]`}
          >
            <StatusCard status="ok" equipment="P-401" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            layout
            className={`order-5 col-span-1 max-w-full min-w-0 lg:order-none ${statusRight} lg:row-[2/span_1]`}
          >
            <StatusCard status="ok" equipment="P-401" />
          </motion.div>

          {/* Status cards - row 3 */}
          <motion.div
            variants={itemVariants}
            layout
            className={`order-6 col-span-1 max-w-full min-w-0 lg:order-none ${statusLeft} lg:row-[3/span_1]`}
          >
            <StatusCard status="ok" equipment="P-401" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            layout
            className={`order-7 col-span-1 max-w-full min-w-0 lg:order-none ${statusRight} lg:row-[3/span_1]`}
          >
            <StatusCard status="ok" equipment="P-401" />
          </motion.div>

          {!isChatOpen && (
            <>
              {/* Pinned apps */}
              <motion.div
                variants={itemVariants}
                className="order-11 col-span-1 max-w-full min-w-0 shrink-0 rounded-[8px] bg-[#f9fafa] lg:order-none lg:col-[9/span_4] lg:row-[1/span_2] lg:justify-self-stretch lg:self-stretch"
              >
                <div className="overflow-hidden rounded-[inherit] size-full min-h-0 lg:overflow-clip">
                  <div className="content-stretch flex flex-col gap-[12px] items-start p-4 sm:p-[16px] relative size-full min-w-0">
                    <PinnedApps />
                  </div>
                </div>
              </motion.div>

              {/* Continue where you left off */}
              <motion.div
                variants={itemVariants}
                className="order-12 col-span-1 max-w-full min-w-0 shrink-0 rounded-[8px] bg-[#f9fafa] lg:order-none lg:col-[9/span_4] lg:row-[3/span_6] lg:justify-self-stretch lg:self-stretch"
              >
                <div className="overflow-hidden rounded-[inherit] size-full min-h-0 lg:overflow-clip">
                  <div className="content-stretch flex flex-col gap-[12px] items-start p-4 sm:p-[16px] relative size-full min-w-0">
                    <ChatHistory />
                  </div>
                </div>
              </motion.div>
            </>
          )}

          <motion.div
            variants={itemVariants}
            layout
            className={`order-10 col-span-1 max-w-full min-w-0 shrink-0 rounded-[8px] bg-[#f9fafa] lg:order-none ${areaChart} ${areaChartHeight} lg:row-[4/span_4] lg:justify-self-stretch`}
          >
            <div className="overflow-hidden rounded-[inherit] size-full min-h-0 min-w-0 lg:overflow-clip">
              <div className="content-stretch flex flex-col items-start justify-between gap-3 p-4 sm:p-[16px] relative size-full min-h-0 min-w-0">
                <div className="content-stretch flex items-start relative shrink-0 w-full">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start justify-center min-h-px min-w-px relative">
                    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
                      <div className="flex flex-[1_0_0] flex-col font-sans font-medium justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#111213] text-[16px] text-ellipsis tracking-[-0.08px] whitespace-nowrap">
                        <p className="leading-[20px] overflow-hidden">Chart title</p>
                      </div>
                    </div>
                    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
                      <div className="flex flex-[1_0_0] flex-col font-sans font-normal justify-center leading-[0] min-h-px min-w-px not-italic overflow-hidden relative text-[#5e666d] text-[14px] text-ellipsis tracking-[-0.04px] whitespace-nowrap">
                        <p className="leading-[18px] overflow-hidden">January - June 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
                <AreaChart />
                <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full min-w-0 max-w-full">
                  <div className="content-stretch flex min-w-0 max-w-full flex-wrap items-center gap-x-2 gap-y-1">
                    <div className="flex min-w-0 flex-1 flex-col font-sans font-medium justify-center leading-[0] not-italic text-[#111213] text-[14px] sm:flex-none">
                      <p className="leading-[18px] text-pretty">Trending up by 5.2% this month</p>
                    </div>
                    <div className="relative shrink-0 size-[16px]">
                      <div className="absolute bottom-[23.58%] left-[6.25%] right-[6.25%] top-1/4">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 8.2275">
                          <path clipRule="evenodd" d={svgPaths.p24446700} fill="var(--fill-0, #111213)" fillRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col font-sans font-normal justify-center min-w-0 w-full max-w-full leading-[0] not-italic text-[#5e666d] text-[14px] tracking-[-0.04px]">
                    <p className="leading-[18px] text-pretty">Total visitors for the last 6 months</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [messages, setMessages] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isSidePanel, setIsSidePanel] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isCanvasDetails, setIsCanvasDetails] = useState(false);
  const [canvasEmbeddedPdf, setCanvasEmbeddedPdf] = useState<{
    fileUrl: string;
    title: string;
  } | null>(null);
  const [canvasEmbeddedChart, setCanvasEmbeddedChart] = useState<{
    title: string;
  } | null>(null);
  const [dashboardChatCharts, setDashboardChatCharts] = useState<PinnedDashboardChart[]>([]);
  const [isChartDetails, setIsChartDetails] = useState(false);
  const [projects, setProjects] = useState<ProjectRecord[]>(() => [...SEED_PROJECTS]);
  const [isProjectDetails, setIsProjectDetails] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projectsCreateDialogOpen, setProjectsCreateDialogOpen] = useState(false);

  const selectedProject = useMemo(
    () => (selectedProjectId ? (projects.find((p) => p.id === selectedProjectId) ?? null) : null),
    [projects, selectedProjectId],
  );
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isWorkorderManager, setIsWorkorderManager] = useState(false);
  /** Bumps when user starts a new chat so the empty-state greeting remounts and re-animates */
  const [emptyStateKey, setEmptyStateKey] = useState(0);
  /** Full-screen: source pill → split view with details panel */
  const [selectedSource, setSelectedSource] = useState<SelectedSource | null>(null);
  const [sourcePanelWidth, setSourcePanelWidth] = useState(getInitialSourcePanelWidth);

  useEffect(() => {
    const onResize = () => setSourcePanelWidth((w) => clampSourcePanelWidth(w));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (isSidePanel) {
      setSelectedSource(null);
      setIsHistoryOpen(false);
    }
  }, [isSidePanel]);

  useEffect(() => {
    if (
      isProjectDetails &&
      selectedProjectId &&
      !projects.some((p) => p.id === selectedProjectId)
    ) {
      setIsProjectDetails(false);
      setSelectedProjectId(null);
    }
  }, [projects, isProjectDetails, selectedProjectId]);

  const handleSendMessage = (message: string, options?: { fullScreen?: boolean }) => {
    setMessages([...messages, message]);
    setCurrentMessage(message);
    setIsChatMode(true);
    // Dashboard welcome form → full screen; chat panel / suggestion chips → side panel
    setIsSidePanel(!options?.fullScreen);
  };

  /** Suggestion chip label, e.g. "Analyse and act" → full `ANALYSE_ACT_EXPANDED_TEXT` */
  const handleSendFromSuggestion = (message: string) => {
    handleSendMessage(expandDashboardSuggestion(message));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleToggleSidePanel = () => {
    setIsSidePanel(!isSidePanel);
  };

  const handleCloseChat = () => {
    setIsChatMode(false);
    setIsSidePanel(false);
    setCurrentMessage("");
    setIsHistoryOpen(false);
    setSelectedAgent(null);
    setSelectedSource(null);
  };

  const handleOpenAtlas = () => {
    setIsChatMode(true);
    setIsSidePanel(true);
  };

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsChatMode(true);
    setIsSidePanel(true);
    setCurrentMessage(""); // Clear any previous message
  };

  const handleHistoryClick = () => {
    // If in side panel, expand to full width first
    if (isSidePanel) {
      setIsSidePanel(false);
      // Wait for expansion animation before opening history
      setTimeout(() => {
        setIsHistoryOpen(true);
      }, 500);
    } else {
      setIsHistoryOpen(!isHistoryOpen);
    }
  };

  const handleHistoryClose = () => {
    setIsHistoryOpen(false);
  };

  /** When user navigates via the nav bar and chat is full screen, minimize chat to side panel */
  const handleTabChange = (newTab: string) => {
    if (isChatMode && !isSidePanel) {
      setIsSidePanel(true);
    }
    if (newTab !== "projects") {
      setIsProjectDetails(false);
      setSelectedProjectId(null);
      setProjectsCreateDialogOpen(false);
    }
    setActiveTab(newTab);
  };

  const handleCreateProject = useCallback((input: CreateProjectInput) => {
    const p = buildNewProject(input);
    setProjects((prev) => [...prev, p]);
    setSelectedProjectId(p.id);
    setIsProjectDetails(true);
    setProjectsCreateDialogOpen(false);
  }, []);

  const handleOpenProject = useCallback((id: string) => {
    setSelectedProjectId(id);
    setIsProjectDetails(true);
  }, []);

  const handleUpdateProject = useCallback((next: ProjectRecord) => {
    setProjects((prev) => prev.map((p) => (p.id === next.id ? next : p)));
  }, []);

  const handleDuplicateProject = useCallback((id: string) => {
    setProjects((prev) => {
      const src = prev.find((p) => p.id === id);
      if (!src) return prev;
      return [...prev, duplicateProject(src)];
    });
  }, []);

  const handleDeleteProject = useCallback((id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleAddPdfToCanvas = useCallback(
    ({ fileUrl, title }: { fileUrl: string; title: string }) => {
      setCanvasEmbeddedPdf({ fileUrl, title });
      if (isChatMode && !isSidePanel) {
        setIsSidePanel(true);
      }
      setActiveTab("canvas");
      setIsCanvasDetails(true);
    },
    [isChatMode, isSidePanel],
  );

  const handleAddChartToCanvas = useCallback(
    ({ title }: { title: string }) => {
      setCanvasEmbeddedChart({ title });
      if (isChatMode && !isSidePanel) {
        setIsSidePanel(true);
      }
      setActiveTab("canvas");
      setIsCanvasDetails(true);
    },
    [isChatMode, isSidePanel],
  );

  const handleAddChartToDashboard = useCallback((payload: AddChartToDashboardPayload) => {
    setDashboardChatCharts((prev) => [...prev, { ...payload, id: newPinnedDashboardId() }]);
    if (isChatMode && !isSidePanel) {
      setIsSidePanel(true);
    }
    setActiveTab("home");
  }, [isChatMode, isSidePanel]);

  /** New chat/conversation: reset thread; keeps current docked vs full-screen layout */
  const handleNewChat = () => {
    setIsChatMode(true);
    setCurrentMessage("");
    setSelectedAgent(null);
    setSelectedSource(null);
    setIsHistoryOpen(false);
    setEmptyStateKey((k) => k + 1);
  };

  const chatThreadTitle =
    currentMessage.length > 52 ? `${currentMessage.slice(0, 49)}…` : currentMessage || "Chat";

  return (
    <div className="bg-[#212426] content-stretch flex items-stretch relative h-screen w-full p-[8px]">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        onOpenAtlas={handleOpenAtlas}
        isChatOpen={isChatMode}
      />

      <div className="flex-[1_0_0] min-h-px min-w-px relative pl-[8px] flex">
        {/* Dashboard - visible when in side panel mode or not in chat mode */}
        <AnimatePresence mode="popLayout">
          {(isSidePanel || !isChatMode) && (
            <motion.div 
              key="dashboard"
              className="content-stretch flex flex-col items-start relative h-full"
              initial={false}
              animate={{ 
                width: isSidePanel ? 'calc(100% - 464px)' : '100%',
                opacity: 1
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <div className="bg-white content-stretch flex flex-col h-full items-start relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 w-full overflow-hidden">
                {/* Search Page */}
                {activeTab === "search" ? (
                  <>
                    {/* Search Top Bar - show always, animate when chat opens */}
                    {isChatMode ? (
                      <AnimatePresence>
                        <motion.div
                          initial={{ y: -100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -100, opacity: 0 }}
                          transition={{ delay: isSidePanel ? 0 : 0.8, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                          className="w-full"
                        >
                          <SearchTopBar />
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <SearchTopBar />
                    )}
                    <SearchPage showTopBar={false} />
                  </>
                ) : activeTab === "projects" ? (
                  <>
                    {isProjectDetails && selectedProject ? (
                      <>
                        <ProjectsDetailsTopBar
                          projectName={selectedProject.name}
                          onBack={() => setIsProjectDetails(false)}
                        />
                        <ProjectDetailsPage
                          project={selectedProject}
                          onUpdateProject={handleUpdateProject}
                          onOpenInCanvas={() => {
                            setActiveTab("canvas");
                            setIsCanvasDetails(true);
                          }}
                          onOpenInCharts={() => {
                            setActiveTab("charts");
                            setIsChartDetails(true);
                          }}
                        />
                      </>
                    ) : (
                      <>
                        {isChatMode ? (
                          <AnimatePresence>
                            <motion.div
                              initial={{ y: -100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -100, opacity: 0 }}
                              transition={{
                                delay: isSidePanel ? 0 : 0.8,
                                duration: 0.6,
                                ease: [0.43, 0.13, 0.23, 0.96],
                              }}
                              className="w-full"
                            >
                              <ProjectsTopBar onCreateClick={() => setProjectsCreateDialogOpen(true)} />
                            </motion.div>
                          </AnimatePresence>
                        ) : (
                          <ProjectsTopBar onCreateClick={() => setProjectsCreateDialogOpen(true)} />
                        )}
                        <ProjectsPage
                          showTopBar={false}
                          projects={projects}
                          createDialogOpen={projectsCreateDialogOpen}
                          onCreateDialogOpenChange={setProjectsCreateDialogOpen}
                          onProjectClick={handleOpenProject}
                          onCreateProject={handleCreateProject}
                          onDuplicateProject={handleDuplicateProject}
                          onDeleteProject={handleDeleteProject}
                        />
                      </>
                    )}
                  </>
                ) : activeTab === "canvas" ? (
                  <>
                    {isCanvasDetails ? (
                      <>
                        {/* Canvas Details Top Bar - show always, no animation needed */}
                        <CanvasDetailsTopBar onBack={() => setIsCanvasDetails(false)} />
                        <CanvasDetailsPage
                          showTopBar={false}
                          onBack={() => setIsCanvasDetails(false)}
                          embeddedPdf={canvasEmbeddedPdf}
                          onClearEmbeddedPdf={() => setCanvasEmbeddedPdf(null)}
                          embeddedChart={canvasEmbeddedChart}
                          onClearEmbeddedChart={() => setCanvasEmbeddedChart(null)}
                        />
                      </>
                    ) : (
                      <>
                        {/* Canvas Top Bar - show always, animate when chat opens */}
                        {isChatMode ? (
                          <AnimatePresence>
                            <motion.div
                              initial={{ y: -100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -100, opacity: 0 }}
                              transition={{ delay: isSidePanel ? 0 : 0.8, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                              className="w-full"
                            >
                              <CanvasTopBar />
                            </motion.div>
                          </AnimatePresence>
                        ) : (
                          <CanvasTopBar />
                        )}
                        <CanvasPage showTopBar={false} onCanvasClick={() => setIsCanvasDetails(true)} />
                      </>
                    )}
                  </>
                ) : activeTab === "charts" ? (
                  <>
                    {isChartDetails ? (
                      <>
                        {/* Chart Details Top Bar - show always, no animation needed */}
                        <ChartsDetailsTopBar onBack={() => setIsChartDetails(false)} />
                        <ChartsDetailsPage showTopBar={false} onBack={() => setIsChartDetails(false)} />
                      </>
                    ) : (
                      <>
                        {/* Charts Top Bar - show always, animate when chat opens */}
                        {isChatMode ? (
                          <AnimatePresence>
                            <motion.div
                              initial={{ y: -100, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -100, opacity: 0 }}
                              transition={{ delay: isSidePanel ? 0 : 0.8, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                              className="w-full"
                            >
                              <ChartsTopBar />
                            </motion.div>
                          </AnimatePresence>
                        ) : (
                          <ChartsTopBar />
                        )}
                        <ChartsPage showTopBar={false} onChartClick={() => setIsChartDetails(true)} />
                      </>
                    )}
                  </>
                ) : activeTab === "custom-apps" ? (
                  <>
                    {isWorkorderManager ? (
                      <>
                        {/* Workorder Manager Details */}
                        <WorkorderManagerTopBar onBack={() => setIsWorkorderManager(false)} />
                        <WorkorderManagerPage showTopBar={false} onBack={() => setIsWorkorderManager(false)} />
                      </>
                    ) : (
                      <>
                        {/* Custom Apps Page */}
                        <CustomAppsPage onWorkorderClick={() => setIsWorkorderManager(true)} />
                      </>
                    )}
                  </>
                ) : activeTab === "agent-library" ? (
                  <>
                    {/* Agent Library Page */}
                    <AgentLibraryPage onAgentClick={handleAgentClick} />
                  </>
                ) : (
                  <>
                    {/* Dashboard Top Bar - only show when chat is open */}
                    <AnimatePresence>
                      {isChatMode && (
                        <motion.div
                          initial={{ y: -100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -100, opacity: 0 }}
                          transition={{ delay: isSidePanel ? 0 : 0.8, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                          className="w-full"
                        >
                          <DashboardTopBar />
                        </motion.div>
                      )}
                    </AnimatePresence>

                <div className="content-stretch flex flex-[1_0_0] flex-col items-center justify-between min-h-px min-w-px overflow-y-auto relative w-full">
                  {/* Chat prompt section at top - only show when not in chat mode */}
                  <AnimatePresence>
                    {!isChatMode && (
                      <motion.div 
                        key="banner"
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-full flex flex-col items-center"
                      >
                        <div className="content-stretch flex flex-col gap-[24px] items-center justify-center py-[60px] relative shrink-0 w-full">
                          <div className="absolute h-[913.311px] left-[604.2px] top-[-302.09px] w-[962.293px]">
                            <div className="absolute inset-[-15.84%_-20.93%_-10.88%_-21.11%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1366.83 1157.3">
                                <g id="Nordic gradient">
                                  <g filter="url(#filter0_fg_3_3468)" id="Vector" opacity="0.4">
                                    <path clipRule="evenodd" d={svgPaths.p1ce0d700} fill="url(#paint0_linear_3_3468)" fillOpacity="0.2" fillRule="evenodd" />
                                  </g>
                                </g>
                                <defs>
                                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1157.3" id="filter0_fg_3_3468" width="1366.83" x="7.62939e-06" y="0">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                    <feGaussianBlur result="effect1_foregroundBlur_3_3468" stdDeviation="150" />
                                    <feTurbulence baseFrequency="0.25 0.25" numOctaves="3" seed="2689" type="fractalNoise" />
                                    <feDisplacementMap height="100%" in="effect1_foregroundBlur_3_3468" result="displacedImage" scale="48" width="100%" xChannelSelector="R" yChannelSelector="G" />
                                    <feMerge result="effect2_texture_3_3468">
                                      <feMergeNode in="displacedImage" />
                                    </feMerge>
                                  </filter>
                                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_3468" x1="434.052" x2="1045.05" y1="424.088" y2="1256.98">
                                    <stop stopColor="#1A967A" />
                                    <stop offset="1" stopColor="#7FE9D2" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>
                          </div>
                          <div className="absolute h-[1021.825px] left-[-421.63px] top-[-167.91px] w-[1076.626px]">
                            <div className="absolute inset-[-12.35%_-17.62%_-7.39%_-17.8%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1457.94 1223.52">
                                <g id="Fjord gradient">
                                  <g filter="url(#filter0_fg_3_3471)" id="Vector" opacity="0.4">
                                    <path clipRule="evenodd" d={svgPaths.p5184780} fill="url(#paint0_linear_3_3471)" fillOpacity="0.2" fillRule="evenodd" />
                                  </g>
                                </g>
                                <defs>
                                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1223.52" id="filter0_fg_3_3471" width="1457.94" x="-7.62939e-06" y="0">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                                    <feGaussianBlur result="effect1_foregroundBlur_3_3471" stdDeviation="150" />
                                    <feTurbulence baseFrequency="0.25 0.25" numOctaves="3" seed="2689" type="fractalNoise" />
                                    <feDisplacementMap height="100%" in="effect1_foregroundBlur_3_3471" result="displacedImage" scale="48" width="100%" xChannelSelector="R" yChannelSelector="G" />
                                    <feMerge result="effect2_texture_3_3471">
                                      <feMergeNode in="displacedImage" />
                                    </feMerge>
                                  </filter>
                                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_3_3471" x1="449.98" x2="706.906" y1="438.831" y2="756.746">
                                    <stop stopColor="#DFE5FC" />
                                    <stop offset="1" stopColor="#728DF1" />
                                  </linearGradient>
                                </defs>
                              </svg>
                            </div>
                          </div>
                          
                          <div className="flex flex-col font-['Space_Grotesk:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#111213] text-[28px] whitespace-nowrap">
                            <p className="leading-[32px]">Welcome, Doug</p>
                          </div>
                          
                          <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0">
                            <ChatPrompt
                              onSendMessage={(msg) => handleSendMessage(msg, { fullScreen: true })}
                              onSendSuggestion={handleSendFromSuggestion}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Dashboard content */}
                  <motion.div
                    className="w-full flex-1"
                    animate={{ 
                      opacity: (isChatMode && !isSidePanel) ? 0 : 1,
                      marginTop: isChatMode ? 0 : 0
                    }}
                    transition={{ 
                      opacity: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                      marginTop: { delay: isChatMode ? 0.6 : 0, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
                    }}
                    style={{ display: (isChatMode && !isSidePanel) ? 'none' : 'block' }}
                  >
                    <Dashboard
                      isChatOpen={isChatMode}
                      pinnedCharts={dashboardChatCharts}
                      onDismissPinnedChart={(id) => {
                        setDashboardChatCharts((prev) => prev.filter((c) => c.id !== id));
                      }}
                    />
                  </motion.div>
                </div>

                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Panel - full width or side panel */}
        {isChatMode && (
          <motion.div
            key="chat-panel"
            animate={{ 
              width: isSidePanel ? 460 : '100%',
            }}
            transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="content-stretch flex flex-row items-start relative h-full shrink-0 ml-auto"
          >
            {/* Chat History Sidebar - only visible in full screen mode */}
            <AnimatePresence>
              {!isSidePanel && isHistoryOpen && (
                <ChatHistorySidebar isOpen={isHistoryOpen} onClose={handleHistoryClose} />
              )}
            </AnimatePresence>

            <div className="bg-white content-stretch flex flex-col h-full items-start relative rounded-tl-[8px] rounded-tr-[8px] shrink-0 flex-1 overflow-hidden">
              {/* Top Bar */}
              <AnimatePresence>
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: isSidePanel ? 0 : 0.8, duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="w-full"
                >
                  <ChatTopBar 
                    onToggleExpand={handleToggleSidePanel} 
                    isExpanded={!isSidePanel} 
                    onClose={handleCloseChat} 
                    isSidePanel={isSidePanel} 
                    onHistoryClick={handleHistoryClick}
                    isHistoryOpen={isHistoryOpen}
                    onNewChat={handleNewChat}
                    basePageTitle={getPageTabLabel(activeTab)}
                    chatTitle={currentMessage ? chatThreadTitle : "Chat"}
                    onBreadcrumbBaseClick={() => setIsSidePanel(true)}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="flex flex-[1_0_0] flex-row min-h-0 min-w-0 overflow-hidden w-full">
                <div className="flex flex-col flex-1 min-w-0 min-h-0 items-stretch">
                {/* Chat response or initial message — key so new conversation re-runs entrance animation */}
                <motion.div
                  key={`${currentMessage || ""}-${selectedAgent?.id ?? "initial"}-${emptyStateKey}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className="flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden overscroll-y-contain"
                >
                  {currentMessage ? (
                    <ChatResponse
                      userMessage={currentMessage}
                      isSidePanel={isSidePanel}
                      onSourceClick={(source) => {
                        setIsSidePanel(false);
                        setSelectedSource(source);
                      }}
                      onAddPdfToCanvas={handleAddPdfToCanvas}
                      onAddChartToCanvas={handleAddChartToCanvas}
                      onAddChartToDashboard={handleAddChartToDashboard}
                    />
                  ) : selectedAgent ? (
                    <AgentMessage 
                      key={selectedAgent.id}
                      isSidePanel={isSidePanel} 
                      agentName={selectedAgent.name}
                      agentDescription={selectedAgent.description}
                    />
                  ) : (
                    <AgentInitialMessage 
                      key={emptyStateKey}
                      isSidePanel={isSidePanel} 
                      variant="newConversation"
                      userName="Ryan"
                      onSuggestionSelect={handleSendFromSuggestion}
                    />
                  )}
                </motion.div>

                {/* Chat prompt at bottom in chat mode */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
                  className={`w-full flex shrink-0 items-center justify-center ${isSidePanel ? 'px-[16px]' : ''} py-[16px]`}
                >
                  <ChatPrompt 
                    onSendMessage={handleSendMessage} 
                    showSuggestions={false} 
                    isSidePanel={isSidePanel}
                    defaultAgent={selectedAgent ? selectedAgent.name : "Auto"}
                    currentPageLabel={getPageTabLabel(activeTab)}
                  />
                </motion.div>
                </div>

                <AnimatePresence mode="popLayout">
                  {!isSidePanel && selectedSource && (
                    <SourceDetailsPanel
                      key={selectedSource.label}
                      source={selectedSource}
                      width={sourcePanelWidth}
                      onWidthChange={setSourcePanelWidth}
                      onClose={() => setSelectedSource(null)}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <AgentChatFloatButton
        isChatOpen={isChatMode}
        onToggle={() => {
          if (isChatMode) {
            handleCloseChat();
          } else {
            handleOpenAtlas();
          }
        }}
      />
      <Toaster 
        position="bottom-left"
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: "bg-[#2d3134] flex gap-[8px] items-center p-[12px] rounded-[8px] shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.06),0px_4px_6px_-1px_rgba(0,0,0,0.1)]",
            title: "font-sans font-medium leading-[18px] text-[14px] text-white",
          },
        }}
      />
    </div>
  );
}