import { motion } from 'framer-motion';
import reactCountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Remove as RemoveIcon } from '@mui/icons-material';

const CountUp = reactCountUp.default || reactCountUp;

const StatsCard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  trend,
  trendValue,
  sparklineData,
  decimals = 0,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // Determine semantic styling based strictly on trend
  const isUp = trend === 'up';
  const isDown = trend === 'down';
  const themeColor = isUp ? '#10B981' : isDown ? '#EF4444' : '#888888';
  const trendClass = isUp ? 'text-[#10B981]' : isDown ? 'text-[#EF4444]' : 'text-[#888888]';

  // Format sparkline data for recharts
  const chartData = sparklineData ? sparklineData.map((val, idx) => ({ id: idx, value: val })) : [];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A0A0A] border border-[#333333] px-2 py-1 rounded shadow-md">
          <p className="text-[11px] font-mono text-white font-medium">
            {prefix}{payload[0].value}{suffix}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass p-6 flex flex-col justify-between h-full relative group">
      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="text-[11px] font-semibold text-[#888888] uppercase tracking-widest font-sans">{title}</span>
          <h3 ref={ref} className="text-3xl font-bold font-sans text-[#EDEDED] mt-1.5 tracking-tight">
            {prefix}
            {inView ? (
              <CountUp end={value || 0} duration={1.5} decimals={decimals} separator="," />
            ) : (
              '0'
            )}
            {suffix}
          </h3>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-[13px] ${trendClass}`}>
              {isUp ? <TrendingUpIcon sx={{ fontSize: 16 }} /> : isDown ? <TrendingDownIcon sx={{ fontSize: 16 }} /> : <RemoveIcon sx={{ fontSize: 16 }} />}
              <span className="font-sans font-medium">{trendValue}</span>
            </div>
          )}
        </div>

        {Icon && (
          <div className="p-2.5 rounded-lg border border-[#333333] bg-[#000000] text-[#888888] group-hover:text-white transition-colors duration-300">
            <Icon sx={{ fontSize: 20 }} />
          </div>
        )}
      </div>

      {/* Mini Sparkline Chart */}
      {sparklineData && sparklineData.length > 0 && (
        <div className="h-14 w-full mt-6 -mb-2 -mx-5 px-5 self-end">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`sparkline-grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={themeColor} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={themeColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#333333', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={themeColor}
                strokeWidth={2}
                fill={`url(#sparkline-grad-${title})`}
                dot={false}
                activeDot={{ r: 4, stroke: '#000', strokeWidth: 1.5, fill: themeColor }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
