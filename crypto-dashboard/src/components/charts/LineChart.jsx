import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label, valueFormatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0A0A0A] border border-[#333333] px-3 py-2 rounded shadow-md text-xs space-y-1">
        <p className="text-[#888888] font-medium">{label}</p>
        <p className="text-[#EDEDED] font-bold font-mono">
          {valueFormatter ? valueFormatter(payload[0].value) : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const LineChart = ({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  color = '#0070F3',
  gradientColors = ['#0070F3', 'rgba(0, 112, 243, 0)'],
  valueFormatter,
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColors[0]} stopOpacity={0.4} />
              <stop offset="95%" stopColor={gradientColors[1]} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            stroke="#888888"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="#888888"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dx={-5}
            tickFormatter={valueFormatter}
          />
          <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} cursor={{ stroke: '#333333', strokeWidth: 1, strokeDasharray: '3 3' }} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#gradient-${dataKey})`}
            activeDot={{ r: 4, stroke: '#000', strokeWidth: 1.5, fill: color }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
