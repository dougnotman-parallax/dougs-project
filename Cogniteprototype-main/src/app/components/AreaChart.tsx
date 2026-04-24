import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Apr 1', unit1: 65, unit2: 35 },
  { name: 'Apr 7', unit1: 70, unit2: 42 },
  { name: 'Apr 14', unit1: 55, unit2: 48 },
  { name: 'Apr 21', unit1: 80, unit2: 65 },
  { name: 'Apr 30', unit1: 72, unit2: 58 },
];

export function AreaChart() {
  return (
    <div className="w-full h-[180px] min-h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUnit1Area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(47, 85, 234, 0.8)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="rgba(47, 85, 234, 0.5)" stopOpacity={0.5}/>
            </linearGradient>
            <linearGradient id="colorUnit2Area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgba(47, 85, 234, 0.65)" stopOpacity={0.65}/>
              <stop offset="95%" stopColor="rgba(47, 85, 234, 0.2)" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" stroke="rgba(228, 230, 232, 0.3)" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#5e666d', fontSize: 12, fontFamily: 'Inter' }}
          />
          <YAxis hide />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '6px',
              boxShadow: '0px 2px 4px 0px rgba(0,0,0,0.06), 0px 4px 6px 0px rgba(0,0,0,0.1)',
              padding: '8px'
            }}
            labelStyle={{ color: '#111213', fontSize: 14, fontWeight: 500, marginBottom: 4 }}
            itemStyle={{ color: '#111213', fontSize: 14 }}
          />
          <Area 
            key="unit1"
            type="monotone" 
            dataKey="unit1" 
            stroke="#2F55EA" 
            strokeWidth={1}
            fill="url(#colorUnit1Area)"
            fillOpacity={0.6}
          />
          <Area 
            key="unit2"
            type="monotone" 
            dataKey="unit2" 
            stroke="#2F55EA" 
            strokeWidth={1}
            fill="url(#colorUnit2Area)"
            fillOpacity={0.2}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}