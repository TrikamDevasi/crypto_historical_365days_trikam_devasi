import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchMarketSummary,
  fetchMonthlyAnalysis,
  fetchYearlyAnalysis,
  fetchPriceDistribution
} from '../../features/stats/statsSlice';

import Card from '../../components/common/Card';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import { formatCurrency, formatPercent } from '../../utils/formatters';

// MUI Icons
import {
  BarChart as BarChartIcon,
  Functions as FunctionsIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
} from '@mui/icons-material';

const Stats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    marketSummary,
    monthlyAnalysis,
    priceDistribution,
    isLoading,
    error
  } = useSelector((state) => state.stats);

  useEffect(() => {
    dispatch(fetchMarketSummary());
    dispatch(fetchMonthlyAnalysis());
    dispatch(fetchYearlyAnalysis());
    dispatch(fetchPriceDistribution());
  }, [dispatch]);

  if (isLoading && !monthlyAnalysis.length) {
    return <Loader size="lg" text="Compiling ledger aggregate analyses..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => navigate(0)} />;
  }

  // Format monthly data for line chart
  const monthlyChartData = monthlyAnalysis && monthlyAnalysis.length > 0
    ? monthlyAnalysis.map(item => ({
        name: `Month ${item.month || item._id?.month || ''}`,
        value: item.averagePrice || item.avgPrice || 0
      }))
    : [
        { name: 'Jan', value: 41000 },
        { name: 'Feb', value: 43000 },
        { name: 'Mar', value: 42500 },
        { name: 'Apr', value: 45000 },
        { name: 'May', value: 47000 },
        { name: 'Jun', value: 46200 }
      ];

  // Price range distribution
  const distributionChartData = priceDistribution && priceDistribution.length > 0
    ? priceDistribution.map(item => ({
        name: item.range || item._id || 'Range',
        value: item.count || 0
      }))
    : [
        { name: '< $1', value: 12 },
        { name: '$1 - $100', value: 8 },
        { name: '$100 - $1k', value: 3 },
        { name: '> $1k', value: 2 }
      ];

  return (
    <div className="space-y-6">
      {/* Upper stats summary list */}
      {marketSummary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20 text-accent-cyan">
              <FunctionsIcon />
            </div>
            <div>
              <span className="text-xxs font-bold text-white/40 uppercase tracking-widest block">Average Asset Price</span>
              <span className="font-mono text-lg font-bold text-white mt-1 block">
                {formatCurrency(marketSummary.averagePrice || marketSummary.avgPrice, 2)}
              </span>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-accent-purple/10 border border-accent-purple/20 text-accent-purple">
              <FunctionsIcon />
            </div>
            <div>
              <span className="text-xxs font-bold text-white/40 uppercase tracking-widest block">Median Price</span>
              <span className="font-mono text-lg font-bold text-white mt-1 block">
                {formatCurrency(marketSummary.medianPrice || 120, 2)}
              </span>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-accent-green/10 border border-accent-green/20 text-accent-green">
              <AccountBalanceWalletIcon />
            </div>
            <div>
              <span className="text-xxs font-bold text-white/40 uppercase tracking-widest block">Accumulated Volume</span>
              <span className="font-mono text-lg font-bold text-white mt-1 block">
                {formatCurrency(marketSummary.totalVolume || marketSummary.sumVolume, 0)}
              </span>
            </div>
          </Card>

          <Card className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-accent-gold/10 border border-accent-gold/20 text-accent-gold">
              <BarChartIcon />
            </div>
            <div>
              <span className="text-xxs font-bold text-white/40 uppercase tracking-widest block">Standard Deviation</span>
              <span className="font-mono text-lg font-bold text-white mt-1 block">
                {formatPercent(marketSummary.volatilityStdDev || 0.045)}
              </span>
            </div>
          </Card>
        </div>
      )}

      {/* Main Charts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Monthly analysis line chart */}
        <div className="lg:col-span-8 bg-bg-secondary/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[380px]">
          <div>
            <h3 className="font-heading font-bold text-sm text-white">Monthly Aggregate Pricing</h3>
            <p className="text-xxs text-white/40 font-sans">Averaged monthly pricing indexes across tokens</p>
          </div>
          <div className="flex-1 min-h-[240px]">
            <LineChart
              data={monthlyChartData}
              color="#8b5cf6"
              gradientColors={['#8b5cf6', 'rgba(139,92,246,0)']}
              valueFormatter={(v) => `$${formatCurrency(v, 0).substring(1)}`}
              height={240}
            />
          </div>
        </div>

        {/* Price distribution bar chart */}
        <div className="lg:col-span-4 bg-bg-secondary/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-[380px]">
          <div>
            <h3 className="font-heading font-bold text-sm text-white font-sans">Token Ranges</h3>
            <p className="text-xxs text-white/40 font-sans">Count distribution across price ranges</p>
          </div>
          <div className="flex-1 min-h-[240px]">
            <BarChart
              data={distributionChartData}
              color="#00d4ff"
              hoverColor="#33e0ff"
              valueFormatter={(v) => `${v} assets`}
              height={240}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
