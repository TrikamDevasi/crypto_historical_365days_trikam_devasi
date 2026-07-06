import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const CustomTooltip = ({ active, payload, label, valueFormatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-tertiary/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-neon-primary text-xs space-y-1">
        <p className="text-white/60 font-medium">{label}</p>
        <p className="text-accent font-bold font-mono">
          {valueFormatter ? valueFormatter(payload[0].value) : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const BarChart = ({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  color = '#8b5cf6',
  hoverColor = '#a78bfa',
  valueFormatter,
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.03)" vertical={false} />
          <XAxis
            dataKey={xAxisKey}
            stroke="rgba(255, 255, 255, 0.3)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dy={10}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.3)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
            dx={-5}
            tickFormatter={valueFormatter}
          />
          <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.02)' }} content={<CustomTooltip valueFormatter={valueFormatter} />} />
          <Bar dataKey={dataKey} radius={[4, 4, 0, 0]}>
            {data && data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={color}
                style={{
                  filter: 'drop-shadow(0px 2px 8px rgba(139, 92, 246, 0.3))',
                  transition: 'fill 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.fill = hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.target.style.fill = color;
                }}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
