import { useMemo } from "react";
import { Label } from "@/components/ui/aura/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "@/components/ui/aura/separator";
import { Switch } from "@/components/ui/aura/switch";
import { cn } from "@/lib/utils";
import {
  PRODUCTION_CHART_DATA,
  downsampleProductionChartData,
  type ProductionChartRow,
  type ProductionDetailsLineChartProps,
} from "./charts/ProductionDetailsLineChart";

export type ChartPreviewTimeWindow = "100" | "50" | "25";
export type ChartPreviewPlotStride = 1 | 2 | 5;
export type ChartPreviewLineWeight = 1 | 2 | 3;

export type ChartPreviewControlState = {
  timeWindow: ChartPreviewTimeWindow;
  plotStride: ChartPreviewPlotStride;
  lineWeight: ChartPreviewLineWeight;
  showMarkers: boolean;
  showProduction: boolean;
  showForecast: boolean;
};

export const defaultChartPreviewControlState: ChartPreviewControlState = {
  timeWindow: "100",
  plotStride: 1,
  lineWeight: 2,
  showMarkers: true,
  showProduction: true,
  showForecast: true,
};

export function useDerivedChartPreviewProps(state: ChartPreviewControlState): ProductionDetailsLineChartProps {
  return useMemo(() => {
    const frac = state.timeWindow === "100" ? 1 : state.timeWindow === "50" ? 0.5 : 0.25;
    const n = Math.max(2, Math.floor(PRODUCTION_CHART_DATA.length * frac));
    const tail = PRODUCTION_CHART_DATA.slice(-n) as ProductionChartRow[];
    const data = downsampleProductionChartData(tail, state.plotStride);
    const len = data.length;
    const xAxisTickInterval =
      len <= 10 ? 0 : len <= 24 ? 1 : len <= 40 ? 2 : len <= 60 ? 4 : 9;

    return {
      data,
      showProduction: state.showProduction,
      showForecast: state.showForecast,
      showMarkers: state.showMarkers,
      strokeWidth: state.lineWeight,
      xAxisTickInterval,
    };
  }, [state]);
}

type ChartPreviewControlsProps = {
  state: ChartPreviewControlState;
  onChange: (patch: Partial<ChartPreviewControlState>) => void;
  className?: string;
  /** When true, uses a more compact layout for the inline card */
  compact?: boolean;
};

export function ChartPreviewControls({ state, onChange, className, compact }: ChartPreviewControlsProps) {
  const setSeries = (key: "showProduction" | "showForecast", next: boolean) => {
    if (!next) {
      const other = key === "showProduction" ? state.showForecast : state.showProduction;
      if (!other) return;
    }
    onChange({ [key]: next });
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border bg-muted/25 px-3 py-2.5",
        !compact && "sm:flex-row sm:flex-wrap sm:items-center",
        className,
      )}
      role="toolbar"
      aria-label="Chart preview options"
    >
      <div className={cn("flex flex-wrap items-center gap-2", compact ? "gap-x-2 gap-y-2" : "gap-3")}>
        <div className="flex min-w-[140px] flex-col gap-1">
          <Label htmlFor="chart-preview-window" className="text-xs">
            Time window
          </Label>
          <Select
            value={state.timeWindow}
            onValueChange={(v) => onChange({ timeWindow: v as ChartPreviewTimeWindow })}
          >
            <SelectTrigger id="chart-preview-window" size="sm" className="w-full min-w-[140px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="100">Full range</SelectItem>
              <SelectItem value="50">Last half</SelectItem>
              <SelectItem value="25">Last quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="hidden h-8 w-px shrink-0 sm:block" />

        <div className="flex min-w-[140px] flex-col gap-1">
          <Label htmlFor="chart-preview-stride" className="text-xs">
            Plot density
          </Label>
          <Select
            value={String(state.plotStride)}
            onValueChange={(v) => onChange({ plotStride: Number(v) as ChartPreviewPlotStride })}
          >
            <SelectTrigger id="chart-preview-stride" size="sm" className="w-full min-w-[140px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Every point</SelectItem>
              <SelectItem value="2">Every 2nd point</SelectItem>
              <SelectItem value="5">Every 5th point</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="hidden h-8 w-px shrink-0 sm:block" />

        <div className="flex min-w-[120px] flex-col gap-1">
          <Label htmlFor="chart-preview-weight" className="text-xs">
            Line weight
          </Label>
          <Select
            value={String(state.lineWeight)}
            onValueChange={(v) => onChange({ lineWeight: Number(v) as ChartPreviewLineWeight })}
          >
            <SelectTrigger id="chart-preview-weight" size="sm" className="w-full min-w-[120px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Thin</SelectItem>
              <SelectItem value="2">Medium</SelectItem>
              <SelectItem value="3">Thick</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator className={compact ? "my-0" : "sm:hidden"} />

      <div
        className={cn(
          "flex flex-wrap items-center gap-x-4 gap-y-2",
          !compact && "sm:ml-auto sm:flex-nowrap",
        )}
      >
        <div className="flex items-center gap-2">
          <Switch
            id="chart-preview-markers"
            checked={state.showMarkers}
            onCheckedChange={(c) => onChange({ showMarkers: Boolean(c) })}
          />
          <Label htmlFor="chart-preview-markers" className="cursor-pointer pb-0 text-xs font-normal">
            Point markers
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="chart-preview-prod"
            checked={state.showProduction}
            onCheckedChange={(c) => setSeries("showProduction", Boolean(c))}
          />
          <Label htmlFor="chart-preview-prod" className="cursor-pointer pb-0 text-xs font-normal">
            Production
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="chart-preview-fc"
            checked={state.showForecast}
            onCheckedChange={(c) => setSeries("showForecast", Boolean(c))}
          />
          <Label htmlFor="chart-preview-fc" className="cursor-pointer pb-0 text-xs font-normal">
            Forecast
          </Label>
        </div>
      </div>
    </div>
  );
}
