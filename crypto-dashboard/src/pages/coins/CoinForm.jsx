import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import useCoins from '../../hooks/useCoins';
import { coinSchema } from '../../utils/validators';

import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import { showSuccess, showError } from '../../utils/toast';

// MUI Icons
import {
  ArrowBack as ArrowBackIcon,
  Token as TokenIcon,
  Code as CodeIcon,
  FormatListNumbered as FormatListNumberedIcon,
  AttachMoney as AttachMoneyIcon,
  Equalizer as EqualizerIcon,
  Description as DescriptionIcon,
} from '@mui/icons-material';

const CoinForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const { currentCoin, isDetailLoading, fetchCoinById, createCoin, updateCoin, clearCurrentCoin } = useCoins();
  const [initValues, setInitValues] = useState({
    name: '',
    symbol: '',
    rank: '',
    price: '',
    volume_24h: '',
    return_24h: '',
    volatility_24h: '',
    description: '',
  });

  useEffect(() => {
    if (isEditMode) {
      fetchCoinById(id);
    } else {
      clearCurrentCoin();
    }
    return () => {
      clearCurrentCoin();
    };
  }, [id, isEditMode, fetchCoinById, clearCurrentCoin]);

  useEffect(() => {
    if (isEditMode && currentCoin) {
      setInitValues({
        name: currentCoin.coin_name || '',
        symbol: currentCoin.symbol || '',
        rank: currentCoin.market_cap_rank || '',
        price: currentCoin.price || '',
        volume_24h: currentCoin.volume || '',
        return_24h: currentCoin.daily_return ? (currentCoin.daily_return * 100).toFixed(2) : '',
        volatility_24h: currentCoin.volatility_7d ? (currentCoin.volatility_7d * 100).toFixed(2) : '',
        description: currentCoin.description || '',
      });
    }
  }, [currentCoin, isEditMode]);

  const formik = useFormik({
    initialValues: initValues,
    enableReinitialize: true,
    // Custom validation schema matching form fields
    onSubmit: async (values) => {
      try {
        const payload = {
          coin_id: values.symbol.toLowerCase().trim(),
          coin_name: values.name.trim(),
          symbol: values.symbol.toUpperCase().trim(),
          price: values.price === '' ? null : Number(values.price),
          market_cap: values.volume_24h === '' ? null : Number(values.volume_24h) * 10,
          volume: values.volume_24h === '' ? null : Number(values.volume_24h),
          market_cap_rank: values.rank === '' ? null : Number(values.rank),
          daily_return: values.return_24h === '' ? null : Number(values.return_24h) / 100,
          volatility_7d: values.volatility_24h === '' ? null : Number(values.volatility_24h) / 100,
          date: currentCoin?.date || new Date().toISOString().split('T')[0],
          month: currentCoin?.month || new Date().toISOString().substring(0, 7),
          timestamp: currentCoin?.timestamp || new Date().toISOString(),
        };

        if (isEditMode) {
          await updateCoin(id, payload).unwrap();
          showSuccess('Token updated successfully');
        } else {
          await createCoin(payload).unwrap();
          showSuccess('Token registered successfully');
        }
        navigate('/coins');
      } catch (err) {
        showError(err || 'Failed to submit coin data');
      }
    },
  });

  if (isEditMode && isDetailLoading) {
    return <Loader size="lg" text="Syncing metadata database..." />;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Link
        to="/coins"
        className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors font-sans"
      >
        <ArrowBackIcon sx={{ fontSize: 14 }} />
        <span>Cancel and return</span>
      </Link>

      <Card className="p-8 border-t-[3px] border-accent-cyan shadow-neon-cyan/5">
        <div className="mb-6">
          <h2 className="font-heading font-bold text-xl text-white tracking-tight">
            {isEditMode ? 'Modify Token Registry' : 'Register New Asset'}
          </h2>
          <p className="text-xxs text-white/40 mt-1">
            {isEditMode
              ? 'Update the parameters and volatility margins for this network coin'
              : 'Add a new cryptographic asset tracking record to the database ledger'}
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Token Name"
              name="name"
              type="text"
              icon={TokenIcon}
              placeholder="e.g. Bitcoin"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && formik.errors.name}
            />

            <Input
              label="Token Symbol"
              name="symbol"
              type="text"
              icon={CodeIcon}
              placeholder="e.g. BTC"
              value={formik.values.symbol}
              onChange={formik.handleChange}
              error={formik.touched.symbol && formik.errors.symbol}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Market Audit Rank"
              name="rank"
              type="number"
              icon={FormatListNumberedIcon}
              placeholder="e.g. 1"
              value={formik.values.rank}
              onChange={formik.handleChange}
              error={formik.touched.rank && formik.errors.rank}
            />

            <Input
              label="Current Value (USD)"
              name="price"
              type="number"
              icon={AttachMoneyIcon}
              placeholder="e.g. 64200.5"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && formik.errors.price}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="24h Volume (USD)"
              name="volume_24h"
              type="number"
              icon={EqualizerIcon}
              placeholder="e.g. 248000000"
              value={formik.values.volume_24h}
              onChange={formik.handleChange}
              error={formik.touched.volume_24h && formik.errors.volume_24h}
            />

            <Input
              label="24h Return (%)"
              name="return_24h"
              type="number"
              icon={EqualizerIcon}
              placeholder="e.g. 3.4"
              value={formik.values.return_24h}
              onChange={formik.handleChange}
              error={formik.touched.return_24h && formik.errors.return_24h}
            />

            <Input
              label="24h Volatility (%)"
              name="volatility_24h"
              type="number"
              icon={EqualizerIcon}
              placeholder="e.g. 1.2"
              value={formik.values.volatility_24h}
              onChange={formik.handleChange}
              error={formik.touched.volatility_24h && formik.errors.volatility_24h}
            />
          </div>

          {/* Description Area */}
          <div className="space-y-1">
            <label className="text-xxs font-bold text-white/40 uppercase tracking-wider block font-sans">
              Asset Classification & Description
            </label>
            <div className="relative">
              <span className="absolute top-3 left-3 text-white/40">
                <DescriptionIcon className="w-4 h-4" />
              </span>
              <textarea
                name="description"
                rows={4}
                placeholder="Specify technological utility and consensus mechanisms..."
                value={formik.values.description}
                onChange={formik.handleChange}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/5 focus:border-accent-cyan/40 focus:bg-white/10 outline-none text-xs text-white placeholder-white/30 transition-all font-sans resize-y"
              />
            </div>
            {formik.touched.description && formik.errors.description && (
              <span className="text-xxs text-accent-red mt-1 block font-mono">{formik.errors.description}</span>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-4"
            loading={formik.isSubmitting}
          >
            {isEditMode ? 'Authorize Ledger Modification' : 'Commit New Ledger Entry'}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CoinForm;
