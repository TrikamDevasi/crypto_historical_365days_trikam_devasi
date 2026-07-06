import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#00d4ff', '#8b5cf6', '#ffd700', '#00ff88', '#ff3366'];

const CustomTooltip = ({ active, payload, valueFormatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-bg-tertiary/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-neon-primary text-xs space-y-1">
        <p className="text-white/60 font-medium">{payload[0].name}</p>
        <p className="text-primary font-bold font-mono">
          {valueFormatter ? valueFormatter(payload[0].value) : payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const PieChart = ({
  data,
  dataKey = 'value',
  nameKey = 'name',
  valueFormatter,
  height = 300,
}) => {
  return (
    <div style={{ width: '100%', height }} className="flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
        <RechartsPieChart>
          <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} />} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data && data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(10, 10, 15, 0.8)" strokeWidth={2} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            formatter={(value) => <span className="text-xs text-white/70 font-sans">{value}</span>}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
