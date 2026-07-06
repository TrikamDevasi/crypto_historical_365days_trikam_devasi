import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useCoins from '../../hooks/useCoins';
import { fetchMarketCap, fetchCoinCount, fetchMarketSummary, fetchDailyAnalysis } from '../../features/stats/statsSlice';
import StatsCard from '../../components/charts/StatsCard';
import LineChart from '../../components/charts/LineChart';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import CryptoGlobe from '../../components/3d/CryptoGlobe';
import { formatCurrency, formatPercent, formatCompactNumber } from '../../utils/formatters';

// MUI Icons
import {
  MonetizationOn as MonetizationOnIcon,
  Public as PublicIcon,
  ShowChart as ShowChartIcon,
  Layers as LayersIcon,
  Add as AddIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';
import Button from '../../components/common/Button';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coins, isLoading: coinsLoading, error: coinsError, fetchCoins, fetchTrending } = useCoins();
  const { marketCap, coinCount, dailyAnalysis, isLoading: statsLoading } = useSelector((state) => state.stats);
  const { isLoading: trendLoading } = useSelector((state) => state.insights);

  useEffect(() => {
    // Dispatch all dashboard analytics
    fetchCoins({ page: 1, limit: 5 }); // Fetch first 5 coins for preview
    fetchTrending({ limit: 5 }); // Trending coins
    dispatch(fetchMarketCap());
    dispatch(fetchCoinCount());
    dispatch(fetchMarketSummary());
    dispatch(fetchDailyAnalysis());
  }, [dispatch, fetchCoins, fetchTrending]);

  const handleRowClick = (row) => {
    navigate(`/coins/${row._id}`);
  };

  const loading = (coinsLoading || statsLoading || trendLoading) && !(coins?.length);
  const error = coinsError;

  if (loading) {
    return <Loader size="lg" text="Syncing real-time market streams..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => navigate(0)} />;
  }

  // Map market daily analysis data for charting
  const chartData = dailyAnalysis && dailyAnalysis.length > 0 
    ? [...dailyAnalysis].reverse().map(t => ({ name: new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value: t.avgPrice }))
    : [
        { name: 'Day 1', value: 42000 },
        { name: 'Day 2', value: 43500 },
        { name: 'Day 3', value: 42800 },
        { name: 'Day 4', value: 44900 },
        { name: 'Day 5', value: 46200 },
        { name: 'Day 6', value: 45800 },
        { name: 'Day 7', value: 48000 }
      ];

  // Helper for sparklines
  const mockSparkline = [30, 45, 35, 60, 49, 68, 70];
  const mockSparklineDown = [80, 75, 60, 65, 50, 45, 40];

  // Format table columns
  const tableColumns = [
    {
      header: 'Asset',
      key: 'name',
      render: (val, row) => (
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xs font-mono text-primary">
            {row.symbol?.toUpperCase().substring(0, 3)}
          </div>
          <div>
            <div className="font-semibold text-white text-xs">{val}</div>
            <div className="text-xxs text-white/40 uppercase">{row.symbol}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Price (USD)',
      key: 'price',
      render: (val) => <span className="font-mono text-xs">{formatCurrency(val, 2)}</span>,
    },
    {
      header: '24h Volume',
      key: 'volume_24h',
      render: (val) => <span className="font-mono text-xs text-white/60">{formatCurrency(val, 0)}</span>,
    },
    {
      header: '24h Return',
      key: 'return_24h',
      render: (val) => {
        const isUp = val >= 0;
        return (
          <div className={`flex items-center gap-1 font-mono text-xs ${isUp ? 'text-accent-green' : 'text-accent-red'}`}>
            {isUp ? <ArrowUpwardIcon sx={{ fontSize: 10 }} /> : <ArrowDownwardIcon sx={{ fontSize: 10 }} />}
            <span>{formatPercent(val)}</span>
          </div>
        );
      },
    },
    {
      header: 'Risk Profile',
      key: 'volatility_24h',
      render: (val) => {
        let risk = 'Low';
        let color = 'success';
        if (val > 0.05) { risk = 'High'; color = 'danger'; }
        else if (val > 0.02) { risk = 'Medium'; color = 'warning'; }
        return <Badge variant={color}>{risk}</Badge>;
      },
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Upper Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <StatsCard
          title="Total Market Cap"
          value={marketCap?.totalMarketCap || 1240000000}
          prefix="$"
          icon={PublicIcon}
          color="cyan"
          trend="up"
          trendValue="+4.2%"
          sparklineData={mockSparkline}
        />
        <StatsCard
          title="Average Asset Price"
          value={marketCap?.averagePrice || 4850.5}
          prefix="$"
          icon={MonetizationOnIcon}
          color="purple"
          trend="up"
          trendValue="+1.8%"
          decimals={2}
          sparklineData={mockSparkline}
        />
        <StatsCard
          title="Monitored Tokens"
          value={coinCount?.totalCoins || coins?.length || 18}
          icon={LayersIcon}
          color="gold"
          trend="up"
          trendValue="+2 new"
          sparklineData={mockSparkline}
        />
        <StatsCard
          title="Market Volatility"
          value={marketCap?.averageVolatility * 100 || 3.4}
          suffix="%"
          icon={ShowChartIcon}
          color="red"
          trend="down"
          trendValue="-0.4%"
          decimals={2}
          sparklineData={mockSparklineDown}
        />
      </div>

      {/* Main Row: 3D Globe Globe and Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        {/* Globe Column */}
        <div className="lg:col-span-4 glass-panel p-6 flex flex-col items-center justify-center relative overflow-hidden h-[360px] group">
          <div className="absolute top-4 left-4 z-10">
            <h3 className="font-heading font-bold text-sm text-white">Global Nodes</h3>
            <p className="text-xxs text-white/40">Market network operations</p>
          </div>
          <CryptoGlobe size={200} />
          <div className="text-center mt-3 z-10">
            <span className="text-xxs bg-primary/15 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-mono">
              Live Feed Connected
            </span>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-8 glass-panel p-6 h-[360px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-bold text-sm text-white font-sans">Market Aggregate Price</h3>
              <p className="text-xxs text-white/40 font-sans">7-day moving average index</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-lg border border-white/5">
              <button className="text-xxs px-2.5 py-1 rounded bg-primary/20 text-primary border border-primary/30 font-semibold font-sans">7D</button>
              <button className="text-xxs px-2.5 py-1 rounded text-white/50 hover:text-white font-medium font-sans">30D</button>
            </div>
          </div>
          <div className="flex-1 min-h-[220px]">
            <LineChart
              data={chartData}
              color="#00d4ff"
              gradientColors={['#00d4ff', 'rgba(0, 212, 255, 0)']}
              valueFormatter={(v) => `$${formatCompactNumber(v)}`}
              height={220}
            />
          </div>
        </div>
      </div>

      {/* Asset Table Preview */}
      <div className="glass-panel p-6 space-y-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-white">Monitored Assets</h3>
            <p className="text-xxs text-white/40">Real-time ledger entries</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/coins')}
            >
              View Full Market
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/coins/new')}
            >
              <AddIcon sx={{ fontSize: 14, mr: 0.5 }} />
              Register Token
            </Button>
          </div>
        </div>

        <Table
          columns={tableColumns}
          data={coins}
          onRowClick={handleRowClick}
          emptyMessage="No cryptographic tokens listed in the ledger."
        />
      </div>
    </div>
  );
};

export default Dashboard;
