import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const AnimatedNumber = ({ value, prefix = '', suffix = '', decimals = 2 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const isPositive = value >= 0;

  return (
    <span
      ref={ref}
      className="font-mono"
      style={{ color: isPositive ? '#00ff88' : '#ff3366' }}
    >
      {prefix}
      {inView ? (
        <CountUp end={value || 0} duration={1.5} decimals={decimals} separator="," />
      ) : (
        '0'
      )}
      {suffix}
    </span>
  );
};

export default AnimatedNumber;
