import { LineChart as RechartsLineChart, Line, ResponsiveContainer } from 'recharts';

const data = [
  { value: 4.0 },
  { value: 4.3 },
  { value: 4.1 },
  { value: 4.5 },
  { value: 4.2 },
  { value: 4.4 },
  { value: 4.1 },
  { value: 4.3 },
  { value: 4.6 },
  { value: 4.2 },
  { value: 4.0 },
  { value: 4.4 },
  { value: 4.3 },
  { value: 4.1 },
  { value: 4.5 },
  { value: 4.2 },
  { value: 4.3 },
  { value: 4.0 },
  { value: 4.4 },
  { value: 4.2 },
];

export function LineChart() {
  return (
    <div className="h-[53.473px] relative shrink-0 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#2F55EA" 
            strokeWidth={1.5}
            dot={false}
            isAnimationActive={true}
            animationDuration={1000}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
