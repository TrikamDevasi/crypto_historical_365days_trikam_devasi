import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchPriceGrowth,
  fetchVolumeSpikes,
  fetchHighVolatility,
  fetchHighestPrice,
  fetchLowestPrice
} from '../../features/insights/insightsSlice';

import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import BarChart from '../../components/charts/BarChart';
import PieChart from '../../components/charts/PieChart';
import { formatCurrency, formatPercent } from '../../utils/formatters';

// MUI Icons
import {
  TrendingUp as TrendingUpIcon,
  Equalizer as EqualizerIcon,
  Bolt as BoltIcon,
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';

const Insights = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    priceGrowth,
    volumeSpikes,
    highVolatility,
    highestPrice,
    lowestPrice,
    isLoading,
    error
  } = useSelector((state) => state.insights);

  useEffect(() => {
    dispatch(fetchPriceGrowth());
    dispatch(fetchVolumeSpikes());
    dispatch(fetchHighVolatility());
    dispatch(fetchHighestPrice());
    dispatch(fetchLowestPrice());
  }, [dispatch]);

  if (isLoading && !priceGrowth.length && !volumeSpikes.length) {
    return <Loader size="lg" text="Auditing token performance metrics..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => navigate(0)} />;
  }

  // Format data for the price growth bar chart
  const growthChartData = priceGrowth && priceGrowth.length > 0
    ? priceGrowth.slice(0, 5).map(item => ({
        name: item.symbol?.toUpperCase() || item.name,
        value: item.return_24h * 100
      }))
    : [
        { name: 'BTC', value: 12 },
        { name: 'ETH', value: 18 },
        { name: 'SOL', value: 34 },
        { name: 'AVAX', value: 22 },
        { name: 'ADA', value: 8 }
      ];

  // Format data for the volatility distribution pie chart
  const volatilityPieData = highVolatility && highVolatility.length > 0
    ? highVolatility.slice(0, 5).map(item => ({
        name: item.symbol?.toUpperCase() || item.name,
        value: item.volatility_24h * 100
      }))
    : [
        { name: 'DOGE', value: 8.5 },
        { name: 'SHIB', value: 12.4 },
        { name: 'PEPE', value: 18.2 },
        { name: 'SOL', value: 4.8 },
        { name: 'XRP', value: 3.1 }
      ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Highest Price */}
        {highestPrice && (
          <Card className="p-6 border-l-[3px] border-primary flex items-center justify-between">
            <div>
              <span className="text-xxs font-bold text-white/40 uppercase tracking-widest block">Highest Priced Token</span>
              <h3 className="font-heading font-bold text-lg text-white mt-1">{highestPrice.name}</h3>
              <p className="font-mono text-xs text-white/60 mt-0.5">{highestPrice.symbol?.toUpperCase()}</p>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-xl text-primary">{formatCurrency(highestPrice.price, 2)}</span>
              <div className="text-xxs text-white/40 mt-1">Audit Registry Peak</div>
            </div>
          </Card>
        )}

        {/* Lowest Price */}
        {lowestPrice && (
          <Card className="p-6 border-l-[3px] border-accent flex items-center justify-between">
            <div>
              <span className="text-xxs font-bold text-white/40 uppercase tracking-widest block">Lowest Priced Token</span>
              <h3 className="font-heading font-bold text-lg text-white mt-1">{lowestPrice.name}</h3>
              <p className="font-mono text-xs text-white/60 mt-0.5">{lowestPrice.symbol?.toUpperCase()}</p>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-xl text-accent">{formatCurrency(lowestPrice.price, 4)}</span>
              <div className="text-xxs text-white/40 mt-1">Audit Registry Floor</div>
            </div>
          </Card>
        )}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bar Chart Panel */}
        <div className="lg:col-span-7 bg-bg-secondary/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[360px]">
          <div>
            <h3 className="font-heading font-bold text-sm text-white">Price Gain Performance</h3>
            <p className="text-xxs text-white/40">24-hour return percentage of top assets</p>
          </div>
          <div className="flex-1 min-h-[220px]">
            <BarChart
              data={growthChartData}
              color="#8b5cf6"
              hoverColor="#a78bfa"
              valueFormatter={(v) => `${v.toFixed(1)}%`}
              height={220}
            />
          </div>
        </div>

        {/* Pie Chart Panel */}
        <div className="lg:col-span-5 bg-bg-secondary/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[360px]">
          <div>
            <h3 className="font-heading font-bold text-sm text-white font-sans">Volatility Profile</h3>
            <p className="text-xxs text-white/40 font-sans">Percentage standard deviation in pricing</p>
          </div>
          <div className="flex-1 min-h-[220px]">
            <PieChart
              data={volatilityPieData}
              valueFormatter={(v) => `${v.toFixed(2)}%`}
              height={220}
            />
          </div>
        </div>
      </div>

      {/* Analytics Anomaly Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Top Growth */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-accent-green">
            <TrendingUpIcon />
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Top Returns</h4>
          </div>
          <div className="space-y-3">
            {priceGrowth && priceGrowth.length > 0 ? (
              priceGrowth.slice(0, 4).map((coin) => (
                <div key={coin.coin_id || coin._id} className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-white">{coin.name}</span>
                    <span className="text-xxs text-white/40 uppercase ml-1.5">{coin.symbol}</span>
                  </div>
                  <span className="font-mono text-accent-green font-bold">+{formatPercent(coin.return_24h)}</span>
                </div>
              ))
            ) : (
              <p className="text-xxs text-white/30">No assets with positive returns.</p>
            )}
          </div>
        </Card>

        {/* Column 2: Volume Spikes */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-primary">
            <BoltIcon />
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Volume Anomalies</h4>
          </div>
          <div className="space-y-3">
            {volumeSpikes && volumeSpikes.length > 0 ? (
              volumeSpikes.slice(0, 4).map((coin) => (
                <div key={coin.coin_id || coin._id} className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-white">{coin.name}</span>
                    <span className="text-xxs text-white/40 uppercase ml-1.5">{coin.symbol}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-white block">{formatCurrency(coin.volume_24h, 0)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xxs text-white/30">No active volume spikes detected.</p>
            )}
          </div>
        </Card>

        {/* Column 3: Volatility */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-accent-gold">
            <EqualizerIcon />
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">Risk Profiles</h4>
          </div>
          <div className="space-y-3">
            {highVolatility && highVolatility.length > 0 ? (
              highVolatility.slice(0, 4).map((coin) => (
                <div key={coin.coin_id || coin._id || coin.id} className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-semibold text-white">{coin.name}</span>
                    <span className="text-xxs text-white/40 uppercase ml-1.5">{coin.symbol}</span>
                  </div>
                  <span className="font-mono text-accent-gold font-bold">{formatPercent(coin.volatility_24h)}</span>
                </div>
              ))
            ) : (
              <p className="text-xxs text-white/30">All coins exhibit stable margins.</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Insights;
