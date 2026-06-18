import { motion } from 'framer-motion';
import InboxIcon from '@mui/icons-material/Inbox';
import Button from './Button';

const EmptyState = ({ title = 'No data available', message = '', actionLabel, onAction, icon: CustomIcon }) => {
  const Icon = CustomIcon || InboxIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
        <Icon sx={{ fontSize: 64, color: 'rgba(255,255,255,0.1)' }} />
      </motion.div>
      <h3 className="mt-4 text-lg font-semibold text-white/30 font-display">{title}</h3>
      {message && <p className="mt-2 text-sm text-white/20 max-w-md">{message}</p>}
      {actionLabel && onAction && (
        <Button variant="ghost" size="sm" onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
