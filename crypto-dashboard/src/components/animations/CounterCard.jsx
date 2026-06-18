import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import GlowCard from './GlowCard';

const iconColors = {
  cyan: '#00d4ff',
  green: '#00ff88',
  red: '#ff3366',
  gold: '#ffd700',
  purple: '#8b5cf6',
};

const CounterCard = ({ title, value, prefix = '', suffix = '', icon: Icon, color = 'cyan', trend, trendValue, decimals = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <GlowCard color={color}>
      <div ref={ref} className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-white/40 uppercase tracking-wider mb-2">{title}</p>
          <div className="text-2xl font-bold font-mono text-white">
            {prefix}
            {inView ? (
              <CountUp end={value || 0} duration={1.5} decimals={decimals} separator="," />
            ) : (
              '0'
            )}
            {suffix}
          </div>
          {trend !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs ${trend === 'up' ? 'text-accent-green' : 'text-accent-red'}`}>
              {trend === 'up' ? <TrendingUpIcon sx={{ fontSize: 14 }} /> : <TrendingDownIcon sx={{ fontSize: 14 }} />}
              <span className="font-mono">{trendValue}</span>
            </div>
          )}
        </div>
        {Icon && (
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-2 rounded-lg"
            style={{ backgroundColor: `${iconColors[color]}15` }}
          >
            <Icon sx={{ fontSize: 24, color: iconColors[color] }} />
          </motion.div>
        )}
      </div>
    </GlowCard>
  );
};

export default CounterCard;
