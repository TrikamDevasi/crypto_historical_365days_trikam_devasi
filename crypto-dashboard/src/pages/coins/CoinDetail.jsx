import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useCoins from '../../hooks/useCoins';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import LineChart from '../../components/charts/LineChart';
import { formatCurrency, formatPercent, formatCompactNumber } from '../../utils/formatters';
import { showSuccess, showError } from '../../utils/toast';

// MUI Icons
import {
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentCoin, coinHistory, isDetailLoading, error, fetchCoinById, fetchCoinHistory, deleteCoin } = useCoins();

  useEffect(() => {
    fetchCoinById(id);
    fetchCoinHistory(id, { days: 30 }); // Fetch past 30 days history
  }, [id, fetchCoinById, fetchCoinHistory]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this token from the system database?')) {
      try {
        await deleteCoin(id).unwrap();
        showSuccess('Token deleted successfully');
        navigate('/coins');
      } catch (err) {
        showError(err || 'Failed to delete token');
      }
    }
  };

  if (isDetailLoading && !currentCoin) {
    return <Loader size="lg" text="Reconstructing cryptographic trace..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => navigate(0)} />;
  }

  if (!currentCoin) {
    return <ErrorState message="Cryptocurrency not found." onRetry={() => navigate('/coins')} />;
  }

  const isUp = currentCoin.return_24h >= 0;
  const isAdmin = user?.role === ROLES.ADMIN;

  // Map history data for recharts
  const chartData = coinHistory && coinHistory.length > 0
    ? coinHistory.map(h => ({
        name: new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: h.price
      }))
    : [
        { name: 'Day 1', value: currentCoin.price * 0.9 },
        { name: 'Day 2', value: currentCoin.price * 0.95 },
        { name: 'Day 3', value: currentCoin.price * 0.92 },
        { name: 'Day 4', value: currentCoin.price * 1.02 },
        { name: 'Day 5', value: currentCoin.price * 1.05 },
        { name: 'Day 6', value: currentCoin.price * 0.98 },
        { name: 'Day 7', value: currentCoin.price }
      ];

  return (
    <div className="space-y-6">
      {/* Back button and Admin Options */}
      <div className="flex items-center justify-between">
        <Link
          to="/coins"
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors font-sans"
        >
          <ArrowBackIcon sx={{ fontSize: 14 }} />
          <span>Back to Assets</span>
        </Link>

        {isAdmin && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/coins/edit/${currentCoin._id}`)}
            >
              <EditIcon sx={{ fontSize: 14, mr: 0.5 }} />
              Modify Details
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-accent-red/20 text-accent-red hover:bg-accent-red/10"
              onClick={handleDelete}
            >
              <DeleteIcon sx={{ fontSize: 14, mr: 0.5 }} />
              Remove Token
            </Button>
          </div>
        )}
      </div>

      {/* Header Info Panel */}
      <div className="bg-bg-secondary/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-lg font-mono text-primary shadow-neon-primary/5 shadow-md">
            {currentCoin.symbol?.toUpperCase().substring(0, 3)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-xl text-white tracking-tight">{currentCoin.name}</h2>
              <Badge variant="info">Rank #{currentCoin.rank || '--'}</Badge>
            </div>
            <p className="text-xxs text-white/40 uppercase tracking-widest font-mono mt-0.5">{currentCoin.symbol}</p>
          </div>
        </div>

        <div className="flex flex-col md:items-end">
          <div className="text-3xl font-mono font-bold text-white tracking-tight drop-shadow-neon-primary">
            {formatCurrency(currentCoin.price, 2)}
          </div>
          <div className={`flex items-center gap-1 font-mono text-xs mt-1 ${isUp ? 'text-accent-green' : 'text-accent-red'}`}>
            {isUp ? <ArrowUpwardIcon sx={{ fontSize: 12 }} /> : <ArrowDownwardIcon sx={{ fontSize: 12 }} />}
            <span className="font-semibold">{formatPercent(currentCoin.return_24h)} (24h)</span>
          </div>
        </div>
      </div>

      {/* Main Charts & Metadata Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Price History Line Graph */}
        <div className="lg:col-span-8 bg-bg-secondary/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[400px]">
          <div>
            <h3 className="font-heading font-bold text-sm text-white">Market Intelligence</h3>
            <p className="text-xxs text-white/40 font-sans">Token value history over interval</p>
          </div>
          <div className="flex-1 min-h-[280px]">
            <LineChart
              data={chartData}
              color={isUp ? '#00ff88' : '#ff3366'}
              gradientColors={isUp ? ['#00ff88', 'rgba(0,255,136,0)'] : ['#ff3366', 'rgba(255,51,102,0)']}
              valueFormatter={(v) => `$${formatCompactNumber(v)}`}
              height={280}
            />
          </div>
        </div>

        {/* Details & Specs Cards */}
        <div className="lg:col-span-4 space-y-5">
          <Card className="p-6 space-y-4">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white/40">Market Statistics</h3>
            
            <div className="divide-y divide-white/5 space-y-3.5">
              <div className="flex justify-between items-center text-xs pt-3.5 first:pt-0">
                <span className="text-white/40 font-sans">Market Capitalization</span>
                <span className="font-mono text-white font-medium">{formatCurrency(currentCoin.market_cap, 0)}</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-3.5">
                <span className="text-white/40 font-sans">24 Hour Trading Volume</span>
                <span className="font-mono text-white font-medium">{formatCurrency(currentCoin.volume_24h, 0)}</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-3.5">
                <span className="text-white/40 font-sans">24h Price Variance</span>
                <span className="font-mono text-white font-medium">{formatPercent(currentCoin.volatility_24h * 100)}</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-3.5">
                <span className="text-white/40 font-sans">Current Audit Rank</span>
                <span className="font-mono text-primary font-bold">#{currentCoin.rank || 'N/A'}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-white/40 mb-3">Asset Classification</h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              {currentCoin.description || `The ${currentCoin.name} token is a tracked cryptocurrency ledger entry integrated with our MongoDB data nodes. Use the admin terminal console to edit pricing records or volatility configurations.`}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CoinDetail;
