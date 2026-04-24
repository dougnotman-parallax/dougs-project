import { Fragment } from "react";

const heatmapData = [
  { equipment: 'Pump P-401', vibration: 0.2, temp: 0.5, pressure: 0.8, efficiency: 0.2, flowRate: 0.2 },
  { equipment: 'Pump P-402', vibration: 0.65, temp: 0.8, pressure: 1.0, efficiency: 0.5, flowRate: 0.8 },
  { equipment: 'Compressor C-101', vibration: 0.65, temp: 0.5, pressure: 1.0, efficiency: 0.2, flowRate: 1.0 },
  { equipment: 'Heat Exchanger E-301', vibration: 0.5, temp: 0.2, pressure: 0.8, efficiency: 0.2, flowRate: 0.8 },
  { equipment: 'Reactor R-501', vibration: 0.8, temp: 0.2, pressure: 0.8, efficiency: 0.8, flowRate: 0.2 },
];

const metrics = ['Vibration', 'Temp', 'Pressure', 'Efficiency', 'Flow rate'];
const metricKeys = ['vibration', 'temp', 'pressure', 'efficiency', 'flowRate'] as const;

function getOpacity(value: number): string {
  if (value >= 1.0) return '';
  if (value >= 0.8) return 'rgba(47,85,234,0.8)';
  if (value >= 0.65) return 'rgba(47,85,234,0.65)';
  if (value >= 0.5) return 'rgba(47,85,234,0.5)';
  return 'rgba(47,85,234,0.2)';
}

export function HeatmapChart() {
  return (
    <div className="w-full min-w-0 overflow-x-auto [-webkit-overflow-scrolling:touch]">
      <div
        className="grid w-full min-w-[min(100%,260px)] max-w-full gap-x-1.5 gap-y-1.5 sm:gap-x-2 sm:gap-y-2"
        style={{
          gridTemplateColumns: 'minmax(5.25rem, 1fr) repeat(5, minmax(0, 1fr))',
          gridTemplateRows: `auto repeat(${heatmapData.length}, minmax(36px, 1fr))`,
        }}
      >
        <div className="min-w-0" aria-hidden />
        {metrics.map((metric) => (
          <div
            key={metric}
            className="flex min-h-[2.25rem] items-end justify-center px-0.5 pb-0.5 text-center font-sans font-medium text-[#5e666d] text-[9px] leading-tight tracking-tight sm:text-[10px] sm:leading-[12px] sm:tracking-[-0.08px]"
          >
            <span className="line-clamp-2 break-words hyphens-auto">{metric}</span>
          </div>
        ))}
        {heatmapData.map((equipment) => (
          <Fragment key={equipment.equipment}>
            <div className="flex min-w-0 items-center justify-end py-0.5 pr-1 text-right font-sans font-medium text-[#5e666d] text-[9px] leading-snug tracking-tight sm:text-[10px] sm:leading-[12px] sm:tracking-[-0.08px]">
              <span className="break-words">{equipment.equipment}</span>
            </div>
            {metricKeys.map((metricKey, colIndex) => {
              const value = equipment[metricKey] as number;
              const bgColor = value === 1.0 ? '#2f55ea' : getOpacity(value);
              return (
                <div
                  key={metricKey}
                  className="min-h-[36px] min-w-0 rounded-[2px] transition-transform hover:scale-[1.02]"
                  style={{ backgroundColor: bgColor }}
                  title={`${equipment.equipment} - ${metrics[colIndex]}: ${value}`}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
