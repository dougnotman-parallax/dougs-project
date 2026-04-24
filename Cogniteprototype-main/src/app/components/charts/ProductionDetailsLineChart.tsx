import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

function generateChartData() {
  const data: Array<Record<string, string | number>> = [];
  const startDate = new Date("2021-03-25T08:00:00");

  for (let i = 0; i < 100; i++) {
    const time = new Date(startDate.getTime() + i * 15 * 60000);
    const hours = time.getHours();
    const minutes = time.getMinutes();

    data.push({
      timestamp: time.toISOString(),
      timeLabel: `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`,
      dateLabel: time.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      production: 3000 + Math.random() * 1500 + Math.sin(i / 10) * 500,
      forecast: 3000 + Math.random() * 1200 + Math.cos(i / 8) * 400,
    });
  }

  return data;
}

/** Shared series for Charts details page and citation/canvas previews */
export const PRODUCTION_CHART_DATA = generateChartData();

export type ProductionChartRow = (typeof PRODUCTION_CHART_DATA)[number];

/** Keep every `step`th row (1 = no downsampling). */
export function downsampleProductionChartData<T extends ProductionChartRow>(data: T[], step: number): T[] {
  const s = Math.max(1, Math.floor(step));
  if (s <= 1) return data;
  return data.filter((_, i) => i % s === 0);
}

function ProductionChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string;
}) {
  if (active && payload?.length) {
    return (
      <div className="rounded-[4px] border border-[rgba(0,0,0,0.15)] bg-white/90 p-[12px] shadow-lg backdrop-blur-sm">
        <p
          className="mb-[8px] font-sans text-[12px] font-medium text-[rgba(0,0,0,0.9)]"
          style={{ fontFeatureSettings: "'ss04'" }}
        >
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="mb-[4px] flex items-center gap-[8px]">
            <div className="size-[8px] rounded-full" style={{ backgroundColor: entry.color }} />
            <span
              className="font-sans text-[12px] font-normal text-[rgba(0,0,0,0.7)]"
              style={{ fontFeatureSettings: "'ss04'" }}
            >
              {entry.name}:
            </span>
            <span
              className="font-sans text-[12px] font-medium text-[rgba(0,0,0,0.9)]"
              style={{ fontFeatureSettings: "'ss04'" }}
            >
              {typeof entry.value === "number" ? entry.value.toFixed(1) : ""} boe
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export type ProductionDetailsLineChartProps = {
  className?: string;
  /** Series rows; defaults to generated prototype data */
  data?: ProductionChartRow[];
  showProduction?: boolean;
  showForecast?: boolean;
  /** Draw vertex markers on lines */
  showMarkers?: boolean;
  /** Polyline stroke width */
  strokeWidth?: number;
  /** Passed to Recharts XAxis `interval` (0 = show more ticks) */
  xAxisTickInterval?: number;
  /** Tighter layout, no legend — for small dashboard tiles */
  compact?: boolean;
};

/**
 * Production + forecast line chart from Charts details page.
 * Parent must set a bounded height (e.g. `h-[260px]` or `h-full` inside a flex child with height).
 */
export function ProductionDetailsLineChart({
  className,
  data = PRODUCTION_CHART_DATA,
  showProduction = true,
  showForecast = true,
  showMarkers = true,
  strokeWidth = 2,
  xAxisTickInterval,
  compact = false,
}: ProductionDetailsLineChartProps) {
  const xInterval =
    xAxisTickInterval ??
    (data.length <= 12 ? 0 : data.length <= 36 ? 2 : data.length <= 60 ? 4 : 9);

  const margin = compact
    ? { top: 4, right: 6, left: 2, bottom: 2 }
    : {
        top: 10,
        right: 40,
        left: 40,
        bottom: 20,
      };
  const tickSize = compact ? 9 : 12;
  const tickAxisWidth = compact ? 28 : undefined;
  const useMarkers = showMarkers && !compact;
  const lineStroke = compact ? Math.max(1, strokeWidth - 0.5) : strokeWidth;

  return (
    <div className={cn("h-full w-full", !compact && "min-h-[200px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={margin}
        >
          <CartesianGrid strokeDasharray="2 4" stroke="rgba(0,0,0,0.15)" />
          <XAxis
            dataKey="timeLabel"
            tick={{
              fill: "rgba(0,0,0,0.9)",
              fontSize: tickSize,
              fontFamily: "Inter",
            }}
            tickLine={{ stroke: "rgba(0,0,0,0.2)" }}
            axisLine={{ stroke: "rgba(0,0,0,0.2)" }}
            interval={compact ? 18 : xInterval}
          />
          <YAxis
            yAxisId="left"
            width={tickAxisWidth}
            tick={{
              fill: "rgba(0,0,0,0.9)",
              fontSize: tickSize,
              fontFamily: "Inter",
            }}
            tickLine={{ stroke: "#2b588a" }}
            axisLine={{ stroke: "#2b588a" }}
            label={
              compact
                ? undefined
                : {
                    value: "boe",
                    angle: 0,
                    position: "top",
                    offset: 10,
                    style: {
                      fill: "rgba(0,0,0,0.9)",
                      fontSize: 12,
                      fontFamily: "Inter",
                      fontWeight: 500,
                    },
                  }
            }
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            width={tickAxisWidth}
            tick={{
              fill: "rgba(0,0,0,0.9)",
              fontSize: tickSize,
              fontFamily: "Inter",
            }}
            tickLine={{ stroke: "#2c6935" }}
            axisLine={{ stroke: "#2c6935" }}
            label={
              compact
                ? undefined
                : {
                    value: "boe",
                    angle: 0,
                    position: "top",
                    offset: 10,
                    style: {
                      fill: "rgba(0,0,0,0.9)",
                      fontSize: 12,
                      fontFamily: "Inter",
                      fontWeight: 500,
                    },
                  }
            }
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={(props) => <ProductionChartTooltip {...props} />} />
          {!compact ? (
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                fontFamily: "Inter",
                fontSize: "12px",
              }}
            />
          ) : null}
          {showProduction ? (
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="production"
              stroke="#2b588a"
              strokeWidth={lineStroke}
              name="Production"
              dot={useMarkers ? { fill: "#2b588a", r: 3 } : false}
              activeDot={{ r: 5, fill: "#2b588a", stroke: "rgba(43,88,138,0.6)", strokeWidth: 4 }}
            />
          ) : null}
          {showForecast ? (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="forecast"
              stroke="#2c6935"
              strokeWidth={lineStroke}
              name="Forecast"
              dot={useMarkers ? { fill: "#2c6935", r: 3 } : false}
              activeDot={{ r: 5, fill: "#2c6935", stroke: "rgba(44,105,53,0.6)", strokeWidth: 4 }}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
