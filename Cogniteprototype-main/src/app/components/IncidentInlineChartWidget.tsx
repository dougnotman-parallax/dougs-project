import { useCallback, useId, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconCloudUpload,
  IconDownload,
  IconDotsVertical,
  IconLayoutBoard,
  IconLayoutDashboard,
  IconPlus,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/aura/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/aura/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/aura/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/aura/popover";
import { ToggleGroup, ToggleGroupItem } from "@/app/components/ui/toggle-group";
import { CANVAS_OPTIONS } from "../constants/canvases";
import { downloadElementSvgAsPng, filenameSafeTitle } from "../lib/chartImageExport";
import type {
  AddChartToDashboardPayload,
  IncidentInlineChartData,
} from "../constants/chatResponseScenarios";
import { cn } from "@/lib/utils";

const tickStyle = { fill: "rgba(0,0,0,0.75)", fontSize: 11 };
const gridStroke = "rgba(0,0,0,0.1)";
const COLOR_OBSERVED = "#14735E";
const COLOR_REFERENCE = "#64748b";
const PIE_COLORS = ["#14735E", "#2b588a", "#b45309", "#7c3aed", "#94a3b8"];

type ChartView = "line" | "bar" | "pie";
type TimeRangePreset = "thisWeek" | "thisMonth" | "lastQuarter" | "ytd";

const TIME_RANGE_PRESETS: { value: TimeRangePreset; label: string }[] = [
  { value: "thisWeek", label: "This week" },
  { value: "thisMonth", label: "This month" },
  { value: "lastQuarter", label: "Last quarter" },
  { value: "ytd", label: "YTD" },
];

/** Compact labels for the Home dashboard (narrow control strip). */
const TIME_RANGE_DASHBOARD_LABEL: Record<TimeRangePreset, string> = {
  thisWeek: "1W",
  thisMonth: "1M",
  lastQuarter: "1Q",
  ytd: "YTD",
};

function sliceTimeSeriesByRange(
  full: { timeLabel: string; observed: number; reference: number }[],
  range: TimeRangePreset,
) {
  if (full.length === 0) return full;
  switch (range) {
    case "thisWeek":
      return full.slice(-3);
    case "thisMonth":
      return full.slice(-8);
    case "lastQuarter":
      return full.slice(-12);
    case "ytd":
    default:
      return full;
  }
}

function chartViewIcon(view: ChartView) {
  const cls = "size-4";
  if (view === "bar") return <IconChartBar className={cls} aria-hidden />;
  if (view === "pie") return <IconChartPie className={cls} aria-hidden />;
  return <IconChartLine className={cls} aria-hidden />;
}

function ChartTypeSelector({
  view,
  onViewChange,
  open,
  onOpenChange,
}: {
  view: ChartView;
  onViewChange: (next: ChartView) => void;
  open: boolean;
  onOpenChange: (next: boolean) => void;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon-sm" }),
          "shrink-0",
        )}
        aria-label="Chart type"
        title="Chart type"
      >
        {chartViewIcon(view)}
      </PopoverTrigger>
      <PopoverContent align="end" className="w-44 p-1" side="bottom" sideOffset={4}>
        <p className="px-2 pb-1.5 pt-0.5 text-xs font-medium text-muted-foreground">Visualization</p>
        {(
          [
            ["line", "Line", IconChartLine] as const,
            ["bar", "Bar", IconChartBar] as const,
            ["pie", "Pie", IconChartPie] as const,
          ] as const
        ).map(([key, label, Icon]) => (
          <Button
            key={key}
            type="button"
            variant={view === key ? "secondary" : "ghost"}
            size="sm"
            className="h-8 w-full justify-start gap-2 px-2"
            onClick={() => {
              onViewChange(key);
              onOpenChange(false);
            }}
          >
            <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            {label}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}

type SaveToDestination = "project" | "googleDrive" | "microsoftCopilot";

const SAVE_TO_LABEL: Record<SaveToDestination, string> = {
  project: "Project",
  googleDrive: "Google Drive",
  microsoftCopilot: "Microsoft Copilot",
};

export function IncidentInlineChartWidget({
  data,
  onAddChartToCanvas,
  onAddChartToDashboard,
  variant = "default",
}: {
  data: IncidentInlineChartData;
  onAddChartToCanvas?: (payload: { title: string }) => void;
  onAddChartToDashboard?: (payload: AddChartToDashboardPayload) => void;
  /** `dashboard`: embed on Home; hides add-to, export menus, and duplicate title. */
  variant?: "default" | "dashboard";
}) {
  const isDashboard = variant === "dashboard";
  const [view, setView] = useState<ChartView>("line");
  const [timeRange, setTimeRange] = useState<TimeRangePreset>("ytd");
  const [chartMenuOpen, setChartMenuOpen] = useState(false);
  const chartAreaRef = useRef<HTMLDivElement>(null);
  const regionId = useId();
  const labelId = `${regionId}-label`;

  const handleDownloadAsImage = useCallback(() => {
    const el = chartAreaRef.current;
    if (!el?.querySelector("svg")) {
      toast.error("Chart is not ready to export");
      return;
    }
    const base = filenameSafeTitle(data.title);
    downloadElementSvgAsPng(
      el,
      `${base}-${view}-${timeRange}.png`,
    );
    toast.success("Download started");
  }, [data.title, timeRange, view]);

  const handleSaveTo = useCallback((dest: SaveToDestination) => {
    toast.message(`Save to ${SAVE_TO_LABEL[dest]}`, {
      description: "Connect your account in a full integration to enable saving.",
    });
  }, []);

  const visibleSeries = useMemo(
    () => sliceTimeSeriesByRange(data.timeSeries, timeRange),
    [data.timeSeries, timeRange],
  );

  const xTickInterval = useMemo(() => {
    const n = visibleSeries.length;
    if (n <= 6) return 0;
    if (n <= 10) return 1;
    return Math.max(0, Math.floor(n / 6) - 1);
  }, [visibleSeries.length]);

  return (
    <Card
      className={cn(
        "w-full min-w-0 border border-border shadow-sm",
        isDashboard && "shrink-0 border-0 bg-transparent shadow-none",
      )}
      data-name="Incident inline chart"
    >
      <CardHeader
        className={cn(
          "space-y-0 border-b border-border pb-3",
          isDashboard && "border-0 pb-0",
        )}
      >
        <div
          className={cn(
            "w-full",
            view === "pie" && "hidden",
            isDashboard ? "mb-2" : "mb-3",
          )}
        >
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(v) => {
              if (v) setTimeRange(v as TimeRangePreset);
            }}
            variant="outline"
            size="sm"
            className="w-full min-w-0 flex-wrap justify-stretch sm:flex-nowrap"
            aria-label="Time range"
          >
            {TIME_RANGE_PRESETS.map((p) => (
              <ToggleGroupItem
                key={p.value}
                value={p.value}
                title={p.label}
                className={cn(
                  "min-h-7 flex-1 font-medium",
                  isDashboard
                    ? "min-w-0 max-w-full basis-0 px-0.5 text-[10px] sm:px-1 sm:text-xs"
                    : "basis-[calc(50%-2px)] px-1.5 text-[10px] sm:basis-0 sm:text-xs",
                )}
                aria-label={p.label}
              >
                <span className={isDashboard ? "block truncate text-center" : "block"}>
                  {isDashboard ? TIME_RANGE_DASHBOARD_LABEL[p.value] : p.label}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        {isDashboard ? (
          <div className="mb-2 flex w-full min-w-0 items-center justify-end">
            <ChartTypeSelector
              view={view}
              onViewChange={setView}
              open={chartMenuOpen}
              onOpenChange={setChartMenuOpen}
            />
          </div>
        ) : null}
        {!isDashboard ? (
        <div className="flex min-w-0 items-start justify-between gap-2">
          <div className="min-w-0 space-y-1 pr-1">
            <CardTitle id={labelId} className="text-base text-[#111213]">
              {data.title}
            </CardTitle>
            <CardDescription className="text-xs leading-snug text-muted-foreground">
              {data.description}
            </CardDescription>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <ChartTypeSelector
              view={view}
              onViewChange={setView}
              open={chartMenuOpen}
              onOpenChange={setChartMenuOpen}
            />

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "icon-sm" }),
                  "shrink-0",
                )}
                aria-label="More chart actions"
                title="More"
              >
                <IconDotsVertical className="size-4" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" side="bottom" sideOffset={4}>
                <DropdownMenuItem
                  onClick={() => {
                    handleDownloadAsImage();
                  }}
                >
                  <IconDownload className="size-4 shrink-0 text-muted-foreground" stroke={1.75} aria-hidden />
                  Download as image
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <IconCloudUpload className="size-4 shrink-0 text-muted-foreground" stroke={1.75} aria-hidden />
                    Save to…
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => {
                        handleSaveTo("project");
                      }}
                    >
                      Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleSaveTo("googleDrive");
                      }}
                    >
                      Google Drive
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        handleSaveTo("microsoftCopilot");
                      }}
                    >
                      Microsoft Copilot
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
                {onAddChartToDashboard || onAddChartToCanvas ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <IconPlus className="size-4 shrink-0 text-muted-foreground" stroke={1.75} aria-hidden />
                        Add to…
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {onAddChartToDashboard ? (
                          <DropdownMenuItem
                            onClick={() => {
                              onAddChartToDashboard({
                                title: data.title,
                                incidentChartData: data,
                              });
                              toast.success("Chart added to dashboard", {
                                description: "Open Home to view the dashboard widget.",
                              });
                            }}
                          >
                            <IconLayoutDashboard
                              className="size-4 shrink-0 text-muted-foreground"
                              stroke={1.75}
                              aria-hidden
                            />
                            Dashboard
                          </DropdownMenuItem>
                        ) : null}
                        {onAddChartToCanvas
                          ? CANVAS_OPTIONS.map((c) => (
                              <DropdownMenuItem
                                key={c.id}
                                onClick={() => {
                                  onAddChartToCanvas({ title: data.title });
                                  toast.success("Chart added to canvas", {
                                    description: `Open “${c.name}” from Canvas in the sidebar.`,
                                  });
                                }}
                              >
                                <IconLayoutBoard
                                  className="size-4 shrink-0 text-muted-foreground"
                                  stroke={1.75}
                                  aria-hidden
                                />
                                {c.name}
                              </DropdownMenuItem>
                            ))
                          : null}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        ) : null}
      </CardHeader>
      <CardContent className={cn("pt-3", isDashboard && "pt-2")}>
        {isDashboard ? (
          <span id={labelId} className="sr-only">
            {data.title}
          </span>
        ) : null}
        <div
          ref={chartAreaRef}
          className="h-[240px] w-full min-w-0 shrink-0"
          role="img"
          aria-labelledby={labelId}
        >
          {view === "pie" ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
                <Tooltip
                  formatter={(v: number) => [`${v}%`, "Share"]}
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                />
                <Pie
                  data={data.pieSlices}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={88}
                  paddingAngle={1}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.pieSlices.map((slice, i) => (
                    <Cell
                      key={slice.name}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                      stroke="var(--background)"
                      strokeWidth={1}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          ) : null}

          {view === "line" ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={visibleSeries}
                margin={{ top: 8, right: 12, left: 0, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="timeLabel"
                  tick={tickStyle}
                  tickLine={{ stroke: "rgba(0,0,0,0.2)" }}
                  axisLine={{ stroke: "rgba(0,0,0,0.2)" }}
                  interval={xTickInterval}
                  height={32}
                />
                <YAxis
                  width={40}
                  tick={tickStyle}
                  tickLine={{ stroke: "rgba(0,0,0,0.2)" }}
                  axisLine={{ stroke: "rgba(0,0,0,0.2)" }}
                  tickFormatter={(v) => (typeof v === "number" ? v.toFixed(1) : String(v))}
                  label={{
                    value: "mm/s",
                    position: "insideTopRight",
                    offset: 4,
                    style: { fontSize: 10, fill: "rgba(0,0,0,0.55)" },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                  formatter={(v: number) => [v.toFixed(2), ""]}
                />
                <Legend
                  wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                  formatter={(value) => (
                    <span className="text-[#111213]">{value}</span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="observed"
                  name="Observed (DE)"
                  stroke={COLOR_OBSERVED}
                  strokeWidth={2}
                  dot={{ r: 3, fill: COLOR_OBSERVED }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="reference"
                  name="Reference band"
                  stroke={COLOR_REFERENCE}
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : null}

          {view === "bar" ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={visibleSeries}
                margin={{ top: 8, right: 12, left: 0, bottom: 4 }}
                barCategoryGap="12%"
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
                <XAxis
                  dataKey="timeLabel"
                  tick={tickStyle}
                  tickLine={{ stroke: "rgba(0,0,0,0.2)" }}
                  axisLine={{ stroke: "rgba(0,0,0,0.2)" }}
                  interval={xTickInterval}
                  height={32}
                />
                <YAxis
                  width={40}
                  tick={tickStyle}
                  tickLine={{ stroke: "rgba(0,0,0,0.2)" }}
                  axisLine={{ stroke: "rgba(0,0,0,0.2)" }}
                  tickFormatter={(v) => (typeof v === "number" ? v.toFixed(1) : String(v))}
                  label={{
                    value: "mm/s",
                    position: "insideTopRight",
                    offset: 4,
                    style: { fontSize: 10, fill: "rgba(0,0,0,0.55)" },
                  }}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 6,
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                <Bar
                  dataKey="observed"
                  name="Observed (DE)"
                  fill={COLOR_OBSERVED}
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="reference"
                  name="Reference"
                  fill={COLOR_REFERENCE}
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </div>
        {!isDashboard ? (
          <p className="mt-2 text-center text-[10px] text-muted-foreground" aria-hidden>
            Illustrative series for demo — not live plant data
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
