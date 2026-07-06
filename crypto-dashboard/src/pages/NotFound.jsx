import { Link } from 'react-router-dom';
import { Error as ErrorIcon } from '@mui/icons-material';
import Button from '../components/common/Button';
import ParticleBackground from '../components/3d/ParticleBackground';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-bg-primary text-white flex flex-col items-center justify-center relative p-6 font-sans">
      <ParticleBackground />

      <div className="absolute top-40 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 w-96 h-96 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-6 z-10">
        <div className="flex justify-center">
          <div className="p-4 bg-accent-red/10 border border-accent-red/20 rounded-2xl text-accent-red animate-pulse">
            <ErrorIcon sx={{ fontSize: 48 }} />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="font-heading font-bold text-3xl tracking-tight">Ledger Trace Failure</h2>
          <p className="text-xs text-white/50 leading-relaxed font-sans">
            The database coordinate sequence `404` was not resolved. This terminal address does not contain registered assets.
          </p>
        </div>

        <div className="pt-2">
          <Link to="/dashboard">
            <Button variant="primary" className="w-full">
              Re-Establish Connection Gate
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
