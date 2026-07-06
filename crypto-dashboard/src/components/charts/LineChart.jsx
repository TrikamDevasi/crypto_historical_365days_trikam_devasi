import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, label, valueFormatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-tertiary/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-neon-primary text-xs space-y-1">
        <p className="text-white/60 font-medium">{label}</p>
        <p className="text-primary font-bold font-mono">
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
  color = '#00d4ff',
  gradientColors = ['#00d4ff', 'rgba(0, 212, 255, 0)'],
  valueFormatter,
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradientColors[0]} stopOpacity={0.4} />
              <stop offset="95%" stopColor={gradientColors[1]} stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-em)" vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            stroke="var(--color-text-muted)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="var(--color-text-muted)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dx={-5}
            tickFormatter={valueFormatter}
          />
          <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#gradient-${dataKey})`}
            activeDot={{ r: 6, stroke: '#0a0a0f', strokeWidth: 2, fill: color }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
