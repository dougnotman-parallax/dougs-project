import { useState } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
} from "lucide-react";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu";
import type { CreateProjectInput, Project } from "../constants/projects";
import { CreateProjectDialog } from "./CreateProjectDialog";

interface ProjectsPageProps {
  showTopBar?: boolean;
  projects: Project[];
  onProjectClick: (id: string) => void;
  onCreateProject: (input: CreateProjectInput) => void;
  onDuplicateProject: (id: string) => void;
  onDeleteProject: (id: string) => void;
  /** When set, Create project dialog is controlled by the parent (e.g. App + ProjectsTopBar). */
  createDialogOpen?: boolean;
  onCreateDialogOpenChange?: (open: boolean) => void;
}

function ProjectsTopBar({ onCreateClick }: { onCreateClick?: () => void }) {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Contents">
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full min-h-[36px]" data-name="Top section">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-h-px min-w-px relative" data-name="Heading">
            <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Projects title">
              <p
                className="flex-[1_0_0] font-sans font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[16px] text-[rgba(0,0,0,0.9)] tracking-[-0.176px]"
                style={{ fontFeatureSettings: "'cv05'" }}
              >
                Projects
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCreateClick}
            disabled={!onCreateClick}
            className="flex items-center gap-[8px] px-[16px] py-[8px] bg-[#111213] hover:bg-[#2a2d2e] text-white rounded-[8px] transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="w-[16px] h-[16px]" />
            <span className="font-sans font-medium text-[14px] leading-[18px] tracking-[-0.04px]">
              Create project
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export { ProjectsTopBar };

export function ProjectsPage({
  showTopBar = true,
  projects,
  onProjectClick,
  onCreateProject,
  onDuplicateProject,
  onDeleteProject,
  createDialogOpen: createDialogOpenControlled,
  onCreateDialogOpenChange,
}: ProjectsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [createOpenInternal, setCreateOpenInternal] = useState(false);
  const createOpen = createDialogOpenControlled ?? createOpenInternal;
  const setCreateOpen = onCreateDialogOpenChange ?? setCreateOpenInternal;

  const filtered = projects.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.labels.some((l) => l.toLowerCase().includes(q))
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const pageSlice = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white flex flex-col h-full w-full">
      {showTopBar && <ProjectsTopBar onCreateClick={() => setCreateOpen(true)} />}

      <CreateProjectDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={(input) => {
          onCreateProject(input);
        }}
      />

      <div className="px-[20px] py-[24px]">
        <div className="flex items-start justify-between mb-[16px]">
          <div className="flex items-start gap-[12px]">
            <div className="w-[40px] h-[40px] bg-[#f1f2f3] rounded-[8px] flex items-center justify-center">
              <svg className="w-[20px] h-[20px] text-[#5e666d]" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M4 5.5h5l1.25 2H16a1.25 1.25 0 0 1 1.25 1.25v7A1.25 1.25 0 0 1 16 17H4a1.25 1.25 0 0 1-1.25-1.25v-9A1.25 1.25 0 0 1 4 5.5Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
                <path d="M3.5 8.5h13" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h1 className="font-sans font-semibold text-[20px] leading-[24px] text-[#111213] tracking-[-0.22px]">
                Projects
              </h1>
              <p className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
                Organize context, assets, and deliverables for each outcome
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[16px] top-1/2 -translate-y-1/2">
            <Search className="w-[16px] h-[16px] text-[#5e666d]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Browse projects"
            className="w-full h-[40px] pl-[44px] pr-[16px] rounded-[8px] border border-[#e4e6e8] bg-white font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] placeholder:text-[#9ca3a9] focus:outline-none focus:border-[#1a967a] focus:ring-1 focus:ring-[#1a967a]"
          />
        </div>
      </div>

      <div className="px-[20px] py-[8px] flex items-center justify-between border-b border-transparent">
        <span className="font-sans text-[13px] text-[#5e666d]">
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </span>
      </div>

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
                Updated
              </th>
              <th className="px-[20px] py-[12px] text-left font-sans font-medium text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px] w-[120px]">
                Owner
              </th>
              <th className="px-[20px] py-[12px] w-[72px]" aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {pageSlice.map((project, index) => (
              <motion.tr
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04, duration: 0.25 }}
                onClick={() => onProjectClick(project.id)}
                className="border-b border-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.02)] transition-colors cursor-pointer"
              >
                <td className="px-[20px] py-[12px]">
                  <div className="flex items-center gap-[12px]">
                    <svg className="w-[16px] h-[16px] text-[#5e666d] shrink-0" viewBox="0 0 16 16" fill="none" aria-hidden>
                      <path
                        d="M3 4.5h4l1 1.5h5V12a0.5 0.5 0 0 1-.5.5H3.5A0.5 0.5 0 0 1 3 12V5a0.5 0.5 0 0 1 .5-.5Z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                    <span className="font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px]">
                      {project.name}
                    </span>
                  </div>
                </td>
                <td className="px-[20px] py-[12px]">
                  {project.labels.length > 0 ? (
                    <div className="flex flex-wrap gap-[6px]">
                      {project.labels.map((label) => (
                        <span
                          key={label}
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
                      {project.updatedAt}
                    </span>
                    <span className="font-sans font-normal text-[13px] leading-[16px] text-[#5e666d] tracking-[-0.039px]">
                      by {project.updatedBy}
                    </span>
                  </div>
                </td>
                <td className="px-[20px] py-[12px]">
                  <div className="flex items-center gap-[8px]">
                    <div className="w-[24px] h-[24px] rounded-full bg-[#e8d4ff] flex items-center justify-center">
                      <span className="font-sans font-medium text-[12px] leading-[14px] text-[#111213]">
                        {project.ownerInitials}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-[20px] py-[12px]">
                  <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        type="button"
                        className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors text-[#5e666d] outline-none focus-visible:ring-2 focus-visible:ring-[#1a967a]"
                        aria-label={`Actions for ${project.name}`}
                      >
                        <MoreVertical className="w-[16px] h-[16px]" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="min-w-[160px]">
                        <DropdownMenuItem
                          onClick={() => {
                            onProjectClick(project.id);
                          }}
                        >
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDuplicateProject(project.id)}>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => onDeleteProject(project.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {pageSlice.length === 0 ? (
          <p className="py-12 text-center font-sans text-[14px] text-[#5e666d]">No projects match your search.</p>
        ) : null}
      </div>

      <div className="px-[20px] py-[16px] border-t border-[rgba(0,0,0,0.1)] flex items-center justify-end gap-[12px]">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
          className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronsLeft className="w-[16px] h-[16px] text-[#5e666d]" />
        </button>
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-[16px] h-[16px] text-[#5e666d]" />
        </button>
        <span className="font-sans font-normal text-[14px] leading-[18px] text-[#5e666d] tracking-[-0.04px]">
          {currentPage} / {totalPages}
        </span>
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-[16px] h-[16px] text-[#5e666d]" />
        </button>
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className="p-[6px] rounded-[6px] hover:bg-[rgba(0,0,0,0.04)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronsRight className="w-[16px] h-[16px] text-[#5e666d]" />
        </button>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="ml-[12px] px-[12px] py-[6px] border border-[#e4e6e8] rounded-[6px] font-sans font-normal text-[14px] leading-[18px] text-[#111213] tracking-[-0.04px] focus:outline-none focus:border-[#1a967a] focus:ring-1 focus:ring-[#1a967a]"
        >
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}
