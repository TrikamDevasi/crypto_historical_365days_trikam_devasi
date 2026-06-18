import { motion } from 'framer-motion';
import ErrorIcon from '@mui/icons-material/Error';
import Button from './Button';

const ErrorState = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
        <ErrorIcon sx={{ fontSize: 64, color: '#ff3366' }} />
      </motion.div>
      <h3 className="mt-4 text-lg font-semibold text-accent-red font-display">Error</h3>
      <p className="mt-2 text-sm text-white/40 max-w-md">{message}</p>
      {onRetry && (
        <Button variant="danger" size="sm" onClick={onRetry} className="mt-6">
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;
