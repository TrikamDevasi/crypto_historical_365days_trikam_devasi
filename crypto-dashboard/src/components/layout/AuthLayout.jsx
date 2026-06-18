import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import FloatingCoin from '../3d/FloatingCoin';
import ParticleBackground from '../3d/ParticleBackground';

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-primary text-white flex relative overflow-hidden font-sans">
      <ParticleBackground />

      <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-screen">
        {/* Left Side: Stunning 3D Brand Column (Hidden on mobile) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-12 bg-bg-secondary/40 border-r border-white/5 relative overflow-hidden">
          {/* Subtle neon gradient orb */}
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-accent-purple/10 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-accent-cyan/10 blur-[100px] pointer-events-none" />

          {/* Logo */}
          <div className="flex items-center gap-2.5 z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-cyan to-accent-purple flex items-center justify-center shadow-neon-cyan/20 shadow-md">
              <span className="font-sans font-bold text-white text-lg">C</span>
            </div>
            <span className="font-heading font-bold text-md tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              CryptoAnalytics
            </span>
          </div>

          {/* 3D Spinning Coin Anchor */}
          <div className="flex-1 flex flex-col items-center justify-center z-10">
            <FloatingCoin size={260} color="#00d4ff" className="drop-shadow-neon-cyan" />
            <div className="text-center mt-6 max-w-sm">
              <h2 className="font-heading font-bold text-xl text-white tracking-tight mb-2">
                Quantum Market Intelligence
              </h2>
              <p className="font-sans text-xs text-white/50 leading-relaxed">
                Unlock institutional-grade analytics, track price variances, and monitor network spikes with our advanced engine.
              </p>
            </div>
          </div>

          {/* Footer info */}
          <div className="text-xxs text-white/30 z-10">
            &copy; 2026 CryptoAnalytics. All rights reserved. Powered by WebGL.
          </div>
        </div>

        {/* Right Side: Form Content Column */}
        <div className="col-span-1 lg:col-span-7 flex items-center justify-center p-6 sm:p-12 relative">
          <div className="absolute top-40 right-20 w-80 h-80 rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-40 left-20 w-80 h-80 rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none" />
          
          <div className="w-full max-w-md z-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
