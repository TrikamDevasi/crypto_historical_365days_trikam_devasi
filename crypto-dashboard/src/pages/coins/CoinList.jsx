import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCoins from '../../hooks/useCoins';
import usePagination from '../../hooks/usePagination';
import useDebounce from '../../hooks/useDebounce';
import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';

import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { showSuccess, showError } from '../../utils/toast';

// MUI Icons
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from '@mui/icons-material';

const CoinList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { coins, pagination, isLoading, error, fetchCoins, deleteCoin } = useCoins();
  const { page, limit, goToPage, changeLimit } = usePagination(1, 10);
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 400);
  const [sortField, setSortField] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    fetchCoins({
      page,
      limit,
      search: debouncedSearch,
      sortBy: sortField,
      sortOrder: sortOrder,
    });
  }, [page, limit, debouncedSearch, sortField, sortOrder, fetchCoins]);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // prevent clicking row
    if (window.confirm('Are you sure you want to delete this token ledger entry?')) {
      try {
        await deleteCoin(id).unwrap();
        showSuccess('Token deleted successfully');
      } catch (err) {
        showError(err || 'Failed to delete token');
      }
    }
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/coins/edit/${id}`);
  };

  const handleView = (id, e) => {
    e.stopPropagation();
    navigate(`/coins/${id}`);
  };

  const isAdmin = user?.role === ROLES.ADMIN;

  const tableColumns = [
    {
      header: 'Rank',
      key: 'rank',
      render: (val) => <span className="font-mono font-bold text-xs text-accent">#{val || '--'}</span>,
    },
    {
      header: 'Token Name',
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
      header: 'Current Price',
      key: 'price',
      render: (val) => <span className="font-mono text-xs text-white">{formatCurrency(val, 2)}</span>,
    },
    {
      header: 'Market Cap',
      key: 'market_cap',
      render: (val) => <span className="font-mono text-xs text-white/60">{formatCurrency(val, 0)}</span>,
    },
    {
      header: '24h Vol',
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
      header: 'Actions',
      key: '_id',
      render: (val, row) => (
        <div className="flex gap-1">
          <button
            onClick={(e) => handleView(row._id, e)}
            className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-primary/10 hover:border-primary/20 hover:text-primary transition-all text-white/40"
            title="View Details"
          >
            <VisibilityIcon sx={{ fontSize: 14 }} />
          </button>
          
          {isAdmin && (
            <>
              <button
                onClick={(e) => handleEdit(row._id, e)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-accent-gold/10 hover:border-accent-gold/20 hover:text-accent-gold transition-all text-white/40"
                title="Edit Entry"
              >
                <EditIcon sx={{ fontSize: 14 }} />
              </button>
              <button
                onClick={(e) => handleDelete(row._id, e)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-accent-red/10 hover:border-accent-red/20 hover:text-accent-red transition-all text-white/40"
                title="Delete Entry"
              >
                <DeleteIcon sx={{ fontSize: 14 }} />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-lg text-white">Cryptocurrency Asset Ledger</h2>
          <p className="text-xxs text-white/40">Search, filter, and audit network tokens</p>
        </div>
        <div className="flex gap-2">
          {isAdmin && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/coins/new')}
            >
              <AddIcon sx={{ fontSize: 14, mr: 0.5 }} />
              Register New Token
            </Button>
          )}
        </div>
      </div>

      {/* Filter Options */}
      <div className="bg-bg-secondary/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-80">
          <Input
            icon={SearchIcon}
            placeholder="Search by token name or symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full animate-none border-b focus:border-b"
          />
        </div>

        <div className="flex items-center gap-3.5 w-full md:w-auto justify-end">
          <span className="text-xxs text-white/40 uppercase tracking-wider font-bold">Sort:</span>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 outline-none text-xs text-white transition-all font-sans"
          >
            <option value="rank" className="bg-bg-secondary">Rank</option>
            <option value="price" className="bg-bg-secondary">Price</option>
            <option value="volume_24h" className="bg-bg-secondary">Trading Volume</option>
            <option value="return_24h" className="bg-bg-secondary">24h Return</option>
            <option value="name" className="bg-bg-secondary">Alphabetical</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 outline-none text-xs text-white transition-all font-sans"
          >
            <option value="asc" className="bg-bg-secondary">Ascending</option>
            <option value="desc" className="bg-bg-secondary">Descending</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-bg-secondary/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
        {isLoading ? (
          <Loader text="Querying network nodes..." />
        ) : error ? (
          <ErrorState message={error} onRetry={() => navigate(0)} />
        ) : (
          <div className="space-y-4">
            <Table
              columns={tableColumns}
              data={coins}
              onRowClick={(row) => navigate(`/coins/${row._id}`)}
              emptyMessage="No cryptocurrency tokens matched your search query."
            />
            
            <Pagination
              page={page}
              totalPages={pagination.totalPages}
              onPageChange={goToPage}
              limit={limit}
              onLimitChange={changeLimit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinList;
