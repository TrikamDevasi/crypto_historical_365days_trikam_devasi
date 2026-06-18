import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import coinService from '../../services/coinService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import { showSuccess, showError } from '../../utils/toast';

// MUI Icons
import ShieldIcon from '@mui/icons-material/Shield';
import PeopleIcon from '@mui/icons-material/People';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LayersIcon from '@mui/icons-material/Layers';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AddBoxIcon from '@mui/icons-material/AddBox';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadStats = async () => {
    try {
      setLoading(true);
      const res = await adminService.getAdminStats();
      setStats(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch admin stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const handleBulkCreate = async () => {
    if (window.confirm('Commence bulk ledger insertion of mock test tokens?')) {
      try {
        setActionLoading(true);
        const mockRecords = [
          { name: 'Cardano Test', symbol: 'ADAT', rank: 11, price: 0.45, volume_24h: 1200000, return_24h: 2.1, volatility_24h: 0.015, description: 'Mock bulk ADA' },
          { name: 'Polkadot Test', symbol: 'DOTT', rank: 12, price: 6.2, volume_24h: 3400000, return_24h: -1.2, volatility_24h: 0.021, description: 'Mock bulk DOT' },
          { name: 'Polygon Test', symbol: 'MATT', rank: 13, price: 0.72, volume_24h: 5600000, return_24h: 4.8, volatility_24h: 0.032, description: 'Mock bulk MATIC' }
        ];
        await coinService.bulkCreate(mockRecords);
        showSuccess('Bulk record generation completed');
        loadStats();
      } catch (err) {
        showError(err.response?.data?.message || 'Bulk creation failed');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm('Wipe out all temporary tokens? WARNING: This is destructive.')) {
      try {
        setActionLoading(true);
        const coinsRes = await coinService.getAllCoins({ limit: 100 });
        const testCoinIds = coinsRes.data.data
          .filter(c => c.name.includes('Test'))
          .map(c => c._id);
        
        if (testCoinIds.length === 0) {
          showError('No temporary test tokens found to delete');
          return;
        }

        await coinService.bulkDelete(testCoinIds);
        showSuccess(`Successfully deleted ${testCoinIds.length} test tokens`);
        loadStats();
      } catch (err) {
        showError(err.response?.data?.message || 'Bulk deletion failed');
      } finally {
        setActionLoading(false);
      }
    }
  };

  if (loading) return <Loader size="lg" text="Booting admin console terminal..." />;
  if (error) return <ErrorState message={error} onRetry={loadStats} />;

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div className="flex items-center gap-2">
        <ShieldIcon className="text-accent-purple w-6 h-6 shadow-neon-purple/20" />
        <div>
          <h2 className="font-heading font-bold text-lg text-white">System Admin Console</h2>
          <p className="text-xxs text-white/40">Secure network operations and server parameters</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">
            <PeopleIcon />
          </div>
          <div>
            <span className="text-xxs font-bold text-white/40 uppercase tracking-widest block font-sans">Authorized Operators</span>
            <span className="font-mono text-lg font-bold text-white mt-1 block">{stats?.totalUsers}</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
            <LibraryBooksIcon />
          </div>
          <div>
            <span className="text-xxs font-bold text-white/40 uppercase tracking-widest block font-sans">Total Coin Entries</span>
            <span className="font-mono text-lg font-bold text-white mt-1 block">{stats?.totalCoinRecords}</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent-gold/10 border border-accent-gold/20 text-accent-gold">
            <LayersIcon />
          </div>
          <div>
            <span className="text-xxs font-bold text-white/40 uppercase tracking-widest block font-sans">Unique Asset Slices</span>
            <span className="font-mono text-lg font-bold text-white mt-1 block">{stats?.totalActiveCoins}</span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent-green/10 border border-accent-green/20 text-accent-green">
            <CloudDoneIcon />
          </div>
          <div>
            <span className="text-xxs font-bold text-white/40 uppercase tracking-widest block font-sans">Core Engine Status</span>
            <span className="font-mono text-lg font-bold text-accent-green mt-1 block">{stats?.systemStatus}</span>
          </div>
        </Card>
      </div>

      {/* Bulk Administration Tools */}
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="font-heading font-bold text-sm text-white">Database Bulk Orchestrator</h3>
          <p className="text-xxs text-white/40 mt-0.5">Perform multi-row ledger changes synchronously</p>
        </div>
        
        <div className="flex flex-wrap gap-4 pt-2">
          <Button
            variant="primary"
            onClick={handleBulkCreate}
            loading={actionLoading}
          >
            <AddBoxIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Generate Test Coins
          </Button>

          <Button
            variant="outline"
            className="border-accent-red/20 text-accent-red hover:bg-accent-red/10 animate-none hover:shadow-none"
            onClick={handleBulkDelete}
            loading={actionLoading}
          >
            <DeleteSweepIcon sx={{ fontSize: 16, mr: 0.5 }} />
            Clear Temporary Ledger
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;
