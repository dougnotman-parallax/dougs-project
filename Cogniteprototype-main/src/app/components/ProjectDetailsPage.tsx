import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/aura/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CANVAS_OPTIONS } from "../constants/canvases";
import type {
  LinkedCanvas,
  LinkedChart,
  Project,
  ProjectContextItem,
  ProjectContextKind,
} from "../constants/projects";
import { ProductionDetailsLineChart } from "./charts/ProductionDetailsLineChart";

function ProjectsDetailsTopBar({ projectName, onBack }: { projectName: string; onBack?: () => void }) {
  return (
    <div
      className="bg-white relative shrink-0 w-full"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.textContent === "Projects" && onBack) {
          onBack();
        }
      }}
    >
      <div aria-hidden="true" className="absolute border-[rgba(0,0,0,0.1)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex isolate items-center justify-between px-[20px] py-[12px] relative size-full">
          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 z-[4]">
            <div className="content-stretch flex gap-[6px] items-center justify-center py-[2px] relative shrink-0">
              <div className="bg-[#f3f3f3] content-stretch flex items-center justify-center p-[6px] relative rounded-[1000px] shrink-0">
                <svg className="size-[16px] text-[#5e666d]" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M3 4.5h4l1 1.5h5V12a0.5 0.5 0 0 1-.5.5H3.5A0.5 0.5 0 0 1 3 12V5a0.5 0.5 0 0 1 .5-.5Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </div>
              <div className="font-sans font-normal text-[14px] text-[rgba(0,0,0,0.7)] tracking-[-0.084px] cursor-pointer hover:text-[rgba(0,0,0,0.9)] transition-colors">
                <p className="leading-[20px]">Projects</p>
              </div>
            </div>
            <ChevronRight className="size-[14px] text-[#9ca3a9]" aria-hidden />
            <span className="font-sans font-medium text-[14px] text-[#111213] truncate max-w-[min(40vw,320px)]">
              {projectName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProjectsDetailsTopBar };

type ProjectDetailsPageProps = {
  project: Project;
  onUpdateProject: (next: Project) => void;
  onOpenInCanvas: () => void;
  onOpenInCharts: () => void;
};

function contextKindLabel(kind: ProjectContextKind): string {
  switch (kind) {
    case "file":
      return "File / document";
    case "asset":
      return "Asset";
    case "timeSeries":
      return "Time series";
    case "event":
      return "Event";
    default:
      return "Item";
  }
}

export function ProjectDetailsPage({
  project,
  onUpdateProject,
  onOpenInCanvas,
  onOpenInCharts,
}: ProjectDetailsPageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabValues = useMemo(() => {
    const base = ["overview", "repository"];
    const canvasTabs = project.linkedCanvases.map((c) => `canvas:${c.id}`);
    const chartTabs = project.linkedCharts.map((c) => `chart:${c.id}`);
    return new Set([...base, ...canvasTabs, ...chartTabs]);
  }, [project.linkedCanvases, project.linkedCharts]);

  useEffect(() => {
    if (!tabValues.has(activeTab)) {
      setActiveTab("overview");
    }
  }, [activeTab, tabValues]);

  const patch = useCallback(
    (fn: (p: Project) => Project) => {
      onUpdateProject(fn(project));
    },
    [onUpdateProject, project],
  );

  const addCanvas = (opt: (typeof CANVAS_OPTIONS)[number]) => {
    const link: LinkedCanvas = {
      id: `lc_${Date.now()}`,
      name: opt.name,
      canvasOptionId: opt.id,
    };
    patch((p) => ({
      ...p,
      updatedAt: "Just now",
      updatedBy: "me",
      linkedCanvases: [...p.linkedCanvases, link],
    }));
    setActiveTab(`canvas:${link.id}`);
  };

  const addChartStub = () => {
    const link: LinkedChart = {
      id: `lch_${Date.now()}`,
      name: `Chart ${project.linkedCharts.length + 1}`,
    };
    patch((p) => ({
      ...p,
      updatedAt: "Just now",
      updatedBy: "me",
      linkedCharts: [...p.linkedCharts, link],
    }));
    setActiveTab(`chart:${link.id}`);
  };

  const addContext = (kind: ProjectContextKind) => {
    const item: ProjectContextItem = {
      id: `ctx_${Date.now()}`,
      kind,
      title:
        kind === "file"
          ? "Untitled document.pdf"
          : kind === "asset"
            ? "New asset"
            : kind === "timeSeries"
              ? "New time series"
              : "New event",
      meta: "Prototype",
    };
    patch((p) => ({
      ...p,
      updatedAt: "Just now",
      updatedBy: "me",
      contextItems: [...p.contextItems, item],
    }));
    setActiveTab("repository");
  };

  const removeContext = (id: string) => {
    patch((p) => ({
      ...p,
      contextItems: p.contextItems.filter((c) => c.id !== id),
    }));
  };

  const removeCanvas = (id: string) => {
    patch((p) => ({
      ...p,
      linkedCanvases: p.linkedCanvases.filter((c) => c.id !== id),
    }));
    setActiveTab("overview");
  };

  const removeChart = (id: string) => {
    patch((p) => ({
      ...p,
      linkedCharts: p.linkedCharts.filter((c) => c.id !== id),
    }));
    setActiveTab("overview");
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white">
      <div className="shrink-0 border-b border-[rgba(0,0,0,0.08)] px-[20px] py-[20px]">
        <div className="flex flex-col gap-[12px]">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="font-sans text-[22px] font-semibold leading-tight tracking-[-0.22px] text-[#111213]">
                {project.name}
              </h1>
              <p className="mt-1 font-sans text-[13px] text-[#5e666d]">
                Owner {project.owner} · Updated {project.updatedAt}
              </p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#111213] px-4 text-sm font-medium text-white hover:bg-[#2a2d2e] outline-none focus-visible:ring-2 focus-visible:ring-[#1a967a]"
              >
                <Plus className="size-4" />
                Add
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Canvas</DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="min-w-[180px]">
                    {CANVAS_OPTIONS.map((opt) => (
                      <DropdownMenuItem key={opt.id} onClick={() => addCanvas(opt)}>
                        {opt.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                <DropdownMenuItem onClick={addChartStub}>Chart</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addContext("file")}>File / document</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addContext("asset")}>Asset</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addContext("timeSeries")}>Time series</DropdownMenuItem>
                <DropdownMenuItem onClick={() => addContext("event")}>Event</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-wide text-[#5e666d]">
                Description
              </h2>
              <p className="mt-1 font-sans text-[14px] leading-relaxed text-[#111213]">{project.description}</p>
            </div>
            <div>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-wide text-[#5e666d]">
                Intended outcome
              </h2>
              <p className="mt-1 font-sans text-[14px] leading-relaxed text-[#111213]">{project.intendedOutcome}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-[20px] pb-4 pt-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex min-h-0 flex-1 flex-col gap-3">
          <div className="min-h-0 w-full max-w-full overflow-x-auto pb-1">
            <TabsList className="inline-flex h-auto min-h-9 w-max max-w-none flex-nowrap justify-start gap-1 bg-[#f1f2f3] p-1">
              <TabsTrigger value="overview" className="shrink-0 px-3 text-[13px]">
                Overview
              </TabsTrigger>
              <TabsTrigger value="repository" className="shrink-0 px-3 text-[13px]">
                Context
              </TabsTrigger>
              {project.linkedCanvases.map((c) => (
                <TabsTrigger key={c.id} value={`canvas:${c.id}`} className="shrink-0 px-3 text-[13px]">
                  Canvas: {c.name}
                </TabsTrigger>
              ))}
              {project.linkedCharts.map((c) => (
                <TabsTrigger key={c.id} value={`chart:${c.id}`} className="shrink-0 px-3 text-[13px]">
                  Chart: {c.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="overview" className="mt-0 min-h-0 flex-1 overflow-y-auto data-[state=inactive]:hidden">
            <div className="rounded-lg border border-[#e4e6e8] bg-[#fafbfb] p-5">
              <h3 className="font-sans text-sm font-semibold text-[#111213]">Research with Atlas</h3>
              <p className="mt-2 max-w-prose font-sans text-[14px] leading-relaxed text-[#5e666d]">
                Use the agent to discover sources, summarize findings, and suggest what to add to this project&apos;s
                context. In this prototype, open chat from the sidebar to explore data; linked items appear in the
                Context tab and as canvas or chart tabs when you add them.
              </p>
              <Button type="button" variant="outline" className="mt-4" disabled>
                Start research session (coming soon)
              </Button>
            </div>
            {project.labels.length > 0 ? (
              <div className="mt-4">
                <h3 className="font-sans text-xs font-semibold uppercase tracking-wide text-[#5e666d]">Labels</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.labels.map((l) => (
                    <span
                      key={l}
                      className="rounded-md bg-[#f1f2f3] px-2 py-1 font-sans text-[13px] text-[#5e666d]"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </TabsContent>

          <TabsContent
            value="repository"
            className="mt-0 min-h-0 flex-1 overflow-y-auto data-[state=inactive]:hidden"
          >
            {project.contextItems.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#e4e6e8] bg-white px-6 py-12 text-center">
                <p className="font-sans text-[14px] text-[#5e666d]">No context yet.</p>
                <p className="mt-1 font-sans text-[13px] text-[#9ca3a9]">
                  Use Add to link files, assets, time series, and events.
                </p>
              </div>
            ) : (
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-[rgba(0,0,0,0.1)] text-[13px] text-[#5e666d]">
                    <th className="py-2 pr-4 font-medium">Type</th>
                    <th className="py-2 pr-4 font-medium">Title</th>
                    <th className="py-2 pr-4 font-medium">Details</th>
                    <th className="py-2 w-[100px]" />
                  </tr>
                </thead>
                <tbody>
                  {project.contextItems.map((row) => (
                    <tr key={row.id} className="border-b border-[rgba(0,0,0,0.06)] text-[14px] text-[#111213]">
                      <td className="py-3 pr-4 text-[#5e666d]">{contextKindLabel(row.kind)}</td>
                      <td className="py-3 pr-4">{row.title}</td>
                      <td className="py-3 pr-4 text-[#5e666d]">{row.meta ?? "—"}</td>
                      <td className="py-3">
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeContext(row.id)}>
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </TabsContent>

          {project.linkedCanvases.map((c) => (
            <TabsContent
              key={c.id}
              value={`canvas:${c.id}`}
              className="mt-0 min-h-0 flex-1 overflow-y-auto data-[state=inactive]:hidden"
            >
              <div className="rounded-lg border border-[#e4e6e8] bg-[#fafbfb] p-5">
                <p className="font-sans text-[14px] text-[#111213]">
                  <span className="font-semibold">{c.name}</span> is linked to this project.
                </p>
                <p className="mt-2 font-sans text-[13px] text-[#5e666d]">
                  Open the full canvas workspace to edit layout and embedded views.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button type="button" onClick={onOpenInCanvas}>
                    Open in Canvas
                  </Button>
                  <Button type="button" variant="outline" onClick={() => removeCanvas(c.id)}>
                    Remove from project
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}

          {project.linkedCharts.map((c) => (
            <TabsContent
              key={c.id}
              value={`chart:${c.id}`}
              className="mt-0 min-h-0 flex-1 overflow-y-auto data-[state=inactive]:hidden"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-sans text-[14px] font-medium text-[#111213]">{c.name}</p>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={onOpenInCharts}>
                    Open in Charts
                  </Button>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeChart(c.id)}>
                    Remove
                  </Button>
                </div>
              </div>
              <div className="h-[280px] w-full min-w-0 rounded-lg border border-[#e4e6e8] bg-white">
                <ProductionDetailsLineChart />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
