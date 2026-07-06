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
        <div className={`h-16 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start px-4'} border-b border-[#333333]`}>
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#111111] border border-[#333333] flex items-center justify-center">
                <span className="font-sans font-bold text-white text-base">C</span>
              </div>
              <span className="font-sans font-semibold text-sm text-white">
                CryptoAnalytics
              </span>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 rounded-lg bg-[#111111] border border-[#333333] flex items-center justify-center">
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
                `flex items-center gap-3.5 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-[#111111] text-white'
                    : 'bg-transparent text-[#888888] hover:text-white hover:bg-[#111111]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Left indicator pill */}
                  {isActive && (
                    <span className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md bg-[#0070F3]" />
                  )}
                      {renderIcon(item.icon, isActive ? 'text-[#0070F3]' : 'text-[#888888] group-hover:text-white transition-colors')}
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
                    `flex items-center gap-3.5 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-[#111111] text-white'
                        : 'bg-transparent text-[#888888] hover:text-white hover:bg-[#111111]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md bg-[#0070F3]" />
                      )}
                          {renderIcon(item.icon, isActive ? 'text-[#0070F3]' : 'text-[#888888] group-hover:text-white transition-colors')}
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
        <div className="p-4 border-t border-[#333333] bg-[#0A0A0A] flex flex-col gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-9 h-9 rounded-full bg-[#111111] border border-[#333333] flex items-center justify-center text-white text-xs font-bold font-sans ${sidebarCollapsed ? 'mx-auto' : ''}`}>
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-sans font-semibold text-xs text-white truncate">{user?.name}</span>
                <span className="font-sans text-[11px] text-[#888888] truncate capitalize">{user?.role}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={handleLogoutClick}
            className={`flex items-center justify-center gap-2 rounded-lg transition-all text-[#888888] hover:text-[#EF4444] hover:bg-[#EF4444]/10 w-full ${sidebarCollapsed ? 'p-2' : 'py-2 px-4'}`}
            title="Logout"
          >
            <LogoutIcon className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-sans font-medium text-sm">Logout</span>}
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
