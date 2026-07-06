import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';

// MUI Icons
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const { user, handleLogout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.startsWith('/coins/edit') || path.startsWith('/coins/new')) return 'Manage Coin';
    if (path.startsWith('/coins/')) return 'Coin Intelligence';
    if (path === '/coins') return 'Coin Markets';
    if (path === '/analytics') return 'Market Analytics';
    if (path === '/stats') return 'Market Statistics';
    if (path === '/profile') return 'User Profile';
    if (path === '/settings') return 'Settings';
    if (path.startsWith('/admin')) return 'Admin Center';
    return 'Dashboard';
  };

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/login');
  };

  return (
    <header className="h-16 glass-panel border-x-0 border-t-0 rounded-none px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm shadow-black/20">
      {/* Title / Breadcrumbs */}
      <div>
        <h1 className="font-heading font-bold text-lg text-white tracking-tight">{getPageTitle()}</h1>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative hidden md:block w-64">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white/40">
            <SearchIcon className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search assets..."
            className="w-full pl-9 pr-4 py-1.5 rounded-full bg-white/5 border border-white/5 focus:border-primary/40 focus:bg-white/10 outline-none text-xs text-white placeholder-white/30 transition-all font-sans"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          title="Toggle Theme"
        >
          {isDark ? <LightModeIcon className="w-4 h-4 text-accent-gold" /> : <DarkModeIcon className="w-4 h-4 text-accent" />}
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors relative"
          title="Notifications"
        >
          <NotificationsIcon className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-red animate-pulse" />
        </button>

        {/* Profile Dropdown */}
        {user && (
          <div className="flex items-center gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-md bg-[#111111] border border-[#333333] hover:bg-[#222222] transition-colors text-[#EDEDED] text-xs font-sans font-medium"
              >
                <div className="w-6 h-6 rounded bg-[#0A0A0A] flex items-center justify-center text-white font-bold text-[10px]">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline-block max-w-[100px] truncate">{user?.name}</span>
                <KeyboardArrowDownIcon className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-bg-secondary/95 backdrop-blur-xl border border-white/10 p-1.5 shadow-neon-primary/10 shadow-lg text-xs space-y-1 z-50">
                  <Link
                    to="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <PersonIcon className="w-4 h-4 text-primary" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4 text-primary" />
                    <span>Settings</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Explicit Logout Button */}
            <button
              onClick={handleLogoutClick}
              className="flex items-center gap-1.5 ml-2 px-3 py-1.5 rounded-md bg-transparent border border-transparent hover:bg-[#EF4444]/10 text-[#888888] hover:text-[#EF4444] transition-all text-xs font-medium font-sans"
              title="Logout"
            >
              <LogoutIcon className="w-4 h-4" />
              <span className="hidden sm:inline-block">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
