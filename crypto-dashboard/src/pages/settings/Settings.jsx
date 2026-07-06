import useTheme from '../../hooks/useTheme';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { showSuccess } from '../../utils/toast';

// MUI Icons
import {
  Settings as SettingsIcon,
  NotificationsActive as NotificationsActiveIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';

const Settings = () => {
  const { isDark, toggleTheme } = useTheme();

  const handleSave = () => {
    showSuccess('Configuration settings synchronized to localStorage');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div className="flex items-center gap-2">
        <SettingsIcon className="text-primary w-6 h-6 shadow-neon-primary/20" />
        <div>
          <h2 className="font-heading font-bold text-lg text-white">System Settings</h2>
          <p className="text-xxs text-white/40 font-sans">Configure client terminal and connection specifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Terminal Visuals */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <SecurityIcon sx={{ fontSize: 18 }} />
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Terminal Specification</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-white block">Visual Dark Theme</span>
                <span className="text-xxs text-white/40 block mt-0.5">Toggle low-contrast dark/light mode canvas</span>
              </div>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xxs text-white font-mono hover:bg-white/10"
              >
                {isDark ? 'Dark Mode ACTIVE' : 'Light Mode ACTIVE'}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <div>
                <span className="font-semibold text-white block">Hardware Acceleration</span>
                <span className="text-xxs text-white/40 block mt-0.5">Use WebGL pipelines for globe particles</span>
              </div>
              <Badge variant="success">Enabled</Badge>
            </div>
          </div>
        </Card>

        {/* Card 2: Network Sync */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-accent">
            <SpeedIcon sx={{ fontSize: 18 }} />
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Network Sync</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-white block">Poll Frequency</span>
                <span className="text-xxs text-white/40 block mt-0.5">Frequency for API fetch updates</span>
              </div>
              <select className="px-2 py-1 rounded bg-white/5 border border-white/5 text-xxs text-white outline-none font-mono">
                <option value="15" className="bg-bg-secondary">15 seconds</option>
                <option value="60" className="bg-bg-secondary">60 seconds</option>
                <option value="300" className="bg-bg-secondary">5 minutes</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-xs pt-2">
              <div>
                <span className="font-semibold text-white block">Node Logging</span>
                <span className="text-xxs text-white/40 block mt-0.5 font-sans">Trace and pipe network calls to terminal console</span>
              </div>
              <input type="checkbox" defaultChecked className="accent-accent rounded bg-white/5 border-white/10" />
            </div>
          </div>
        </Card>

        {/* Card 3: Notifications Alert thresholds */}
        <Card className="p-6 space-y-4 md:col-span-2">
          <div className="flex items-center gap-2 text-accent-gold">
            <NotificationsActiveIcon sx={{ fontSize: 18 }} />
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Alarms & Notifications</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-white block">Return Spikes</span>
                <span className="text-xxs text-white/40 block mt-0.5">Trigger notification on &gt; 5% returns</span>
              </div>
              <input type="checkbox" defaultChecked className="accent-accent-gold rounded bg-white/5 border-white/10" />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-white block">Volatility Alarms</span>
                <span className="text-xxs text-white/40 block mt-0.5">Trigger alarm on &gt; 8% standard deviations</span>
              </div>
              <input type="checkbox" defaultChecked className="accent-accent-gold rounded bg-white/5 border-white/10" />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button variant="primary" onClick={handleSave}>
          Synchronize Configuration
        </Button>
      </div>
    </div>
  );
};

export default Settings;
