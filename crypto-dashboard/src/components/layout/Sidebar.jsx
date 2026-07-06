import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../features/ui/uiSlice';
import useAuth from '../../hooks/useAuth';
import { NAV_ITEMS, ADMIN_NAV_ITEMS, ROLES } from '../../utils/constants';

// MUI Icons
import {
  Dashboard as DashboardIcon,
  MonetizationOn as MonetizationOnIcon,
  Timeline as TimelineIcon,
  BarChart as BarChartIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  MenuOpen as MenuOpenIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const iconMap = {
  Dashboard: DashboardIcon,
  MonetizationOn: MonetizationOnIcon,
  Timeline: TimelineIcon,
  BarChart: BarChartIcon,
  Person: PersonIcon,
  Settings: SettingsIcon,
  AdminPanelSettings: AdminPanelSettingsIcon,
  Group: GroupIcon,
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sidebarCollapsed } = useSelector((state) => state.ui);
  const { user, handleLogout } = useAuth();

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/login');
  };

  const renderIcon = (iconName, colorClass = '') => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={`w-5 h-5 ${colorClass}`} /> : null;
  };

  const isAdmin = user?.role === ROLES.ADMIN;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-30 transition-all duration-300 glass-panel border-y-0 border-l-0 rounded-none flex flex-col justify-between ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <button
        onClick={() => dispatch(toggleSidebar())}
        className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-bg-tertiary border border-border-em flex items-center justify-center text-text-muted hover:text-primary transition-colors z-50 cursor-pointer shadow-sm"
      >
        {sidebarCollapsed ? (
          <ChevronRightIcon sx={{ fontSize: 16 }} />
        ) : (
          <ChevronRightIcon sx={{ fontSize: 16, transform: 'rotate(180deg)' }} />
        )}
      </button>

      <div>
        {/* Header/Logo */}
        <div className={`h-16 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start px-4'} border-b border-white/5`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-neon-primary/30 shadow-md">
                <span className="font-sans font-bold text-white text-base">C</span>
              </div>
              <span className="font-heading font-semibold text-sm bg-gradient-to-r from-text-main to-text-muted bg-clip-text text-transparent">
                CryptoAnalytics
              </span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-neon-primary/30 shadow-md">
              <span className="font-sans font-bold text-white text-base">C</span>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 flex-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3 py-2.5 rounded-xl border transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-primary shadow-neon-primary/5'
                    : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Left neon border pill */}
                  {isActive && (
                    <span className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md bg-gradient-to-b from-primary to-accent shadow-neon-primary shadow-sm" />
                  )}
                      {renderIcon(item.icon, isActive ? 'text-primary' : 'text-white/50 group-hover:text-primary transition-colors')}
                  {!sidebarCollapsed && <span className="font-sans font-medium text-sm">{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}

          {/* Admin Navigation */}
          {isAdmin && (
            <div className="pt-4 mt-4 border-t border-white/5">
              {!sidebarCollapsed && (
                <div className="px-3 mb-2 text-xxs font-bold text-white/30 uppercase tracking-widest">
                  Admin System
                </div>
              )}
              {ADMIN_NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 px-3 py-2.5 rounded-xl border transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-primary shadow-neon-primary/5'
                        : 'bg-transparent border-transparent text-white/50 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md bg-gradient-to-b from-primary to-accent shadow-neon-primary shadow-sm" />
                      )}
                          {renderIcon(item.icon, isActive ? 'text-primary' : 'text-white/50 group-hover:text-primary transition-colors')}
                      {!sidebarCollapsed && <span className="font-sans font-medium text-sm">{item.label}</span>}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          )}
        </nav>
      </div>

      {/* User profile footer */}
      {user && (
        <div className="p-4 border-t border-white/5 bg-black/10 flex flex-col gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent p-[1px] ${sidebarCollapsed ? 'mx-auto' : ''}`}>
              <div className="w-full h-full rounded-full bg-bg-secondary flex items-center justify-center text-white text-xs font-bold font-sans">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-sans font-semibold text-xs text-white truncate">{user?.name}</span>
                <span className="font-sans text-xxs text-white/40 truncate capitalize">{user?.role}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogoutClick}
            className={`flex items-center justify-center gap-2 rounded-xl border transition-all text-accent-red border-accent-red/20 bg-accent-red/10 hover:bg-accent-red/20 hover:shadow-neon-red/20 w-full ${sidebarCollapsed ? 'p-2' : 'py-2.5 px-4'}`}
            title="Logout"
          >
            <LogoutIcon className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-sans font-bold text-sm">LOG OUT</span>}
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
