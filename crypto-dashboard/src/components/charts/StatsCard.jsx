import { motion } from 'framer-motion';
import reactCountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon } from '@mui/icons-material';
import Card from '../common/Card';

const CountUp = reactCountUp.default || reactCountUp;

const colors = {
  cyan: { hex: '#00d4ff', bg: 'bg-primary/10', border: 'border-primary/20' },
  green: { hex: '#00ff88', bg: 'bg-accent-green/10', border: 'border-accent-green/20' },
  red: { hex: '#ff3366', bg: 'bg-accent-red/10', border: 'border-accent-red/20' },
  gold: { hex: '#ffd700', bg: 'bg-accent-gold/10', border: 'border-accent-gold/20' },
  purple: { hex: '#8b5cf6', bg: 'bg-accent/10', border: 'border-accent/20' },
};

const StatsCard = ({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  color = 'cyan',
  trend,
  trendValue,
  sparklineData,
  decimals = 0,
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const themeColor = colors[color] || colors.cyan;

  // Format sparkline data for recharts
  const chartData = sparklineData ? sparklineData.map((val, idx) => ({ id: idx, value: val })) : [];

  return (
    <div className="glass p-6 flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <span className="text-xs font-semibold text-text-muted uppercase tracking-wider font-sans">{title}</span>
          <h3 ref={ref} className="text-2xl font-bold font-mono text-text-main mt-1 tracking-tight">
            {prefix}
            {inView ? (
              <CountUp end={value || 0} duration={1.5} decimals={decimals} separator="," />
            ) : (
              '0'
            )}
            {suffix}
          </h3>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-1.5 text-xs ${trend === 'up' ? 'text-accent-green' : 'text-accent-red'}`}>
              {trend === 'up' ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />}
              <span className="font-mono font-medium">{trendValue}</span>
            </div>
          )}
        </div>

        {Icon && (
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`p-3 rounded-xl border ${themeColor.bg} ${themeColor.border} shadow-sm group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-shadow duration-300`}
          >
            <Icon sx={{ fontSize: 22, color: themeColor.hex }} />
          </motion.div>
        )}
      </div>

      {/* Mini Sparkline Chart */}
      {sparklineData && sparklineData.length > 0 && (
        <div className="h-12 w-full mt-4 -mb-2 -mx-5 px-5 self-end">
          <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`sparkline-grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={themeColor.hex} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={themeColor.hex} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="value"
                stroke={themeColor.hex}
                strokeWidth={1.5}
                fill={`url(#sparkline-grad-${title})`}
                dot={false}
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
