import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ParticleBackground from '../3d/ParticleBackground';

const DashboardLayout = () => {
  const { sidebarCollapsed } = useSelector((state) => state.ui);

  return (
    <div className="min-h-screen bg-bg-primary text-white relative overflow-hidden font-sans">
      {/* 3D Particle Backdrop */}
      <ParticleBackground />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'pl-20' : 'pl-64'
        }`}
      >
        <Navbar />

        {/* Content container */}
        <main className="flex-1 p-6 overflow-y-auto max-w-[1600px] mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
