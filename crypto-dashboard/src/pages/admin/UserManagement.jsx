import { useEffect, useState } from 'react';
import adminService from '../../services/adminService';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Loader from '../../components/common/Loader';
import ErrorState from '../../components/common/ErrorState';
import Pagination from '../../components/common/Pagination';
import usePagination from '../../hooks/usePagination';

// MUI Icons
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { page, limit, goToPage, changeLimit } = usePagination(1, 10);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await adminService.getAdminUsers({ page, limit });
      setUsers(res.data.data);
      if (res.data.meta) {
        setTotalPages(res.data.meta.totalPages);
      }
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load user records');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, limit]);

  const tableColumns = [
    {
      header: 'Operator',
      key: 'name',
      render: (val, row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-cyan to-accent-purple p-[1px]">
            <div className="w-full h-full rounded-full bg-bg-secondary flex items-center justify-center text-white text-xs font-bold font-sans">
              {val?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div>
            <div className="font-semibold text-white text-xs">{val}</div>
            <div className="text-xxs text-white/40">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Authorization Role',
      key: 'role',
      render: (val) => {
        const isAdmin = val === 'admin';
        return <Badge variant={isAdmin ? 'purple' : 'info'}>{val}</Badge>;
      },
    },
    {
      header: 'Verification Status',
      key: 'isEmailVerified',
      render: (val) => (
        <div className="flex items-center gap-1 text-xs">
          {val ? (
            <>
              <CheckCircleIcon className="text-accent-green" sx={{ fontSize: 16 }} />
              <span className="text-white/60">Verified</span>
            </>
          ) : (
            <>
              <CancelIcon className="text-accent-red" sx={{ fontSize: 16 }} />
              <span className="text-white/40">Unverified</span>
            </>
          )}
        </div>
      ),
    },
    {
      header: 'Registered Date',
      key: 'createdAt',
      render: (val) => <span className="font-mono text-xs text-white/60">{new Date(val).toLocaleDateString()}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-2">
        <GroupIcon className="text-accent-cyan w-6 h-6 shadow-neon-cyan/20" />
        <div>
          <h2 className="font-heading font-bold text-lg text-white">Operator Registry</h2>
          <p className="text-xxs text-white/40 font-sans">Audit and manage client terminals and security clearings</p>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-bg-secondary/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
        {loading ? (
          <Loader text="Auditing operator signatures..." />
        ) : error ? (
          <ErrorState message={error} onRetry={loadUsers} />
        ) : (
          <div className="space-y-4">
            <Table
              columns={tableColumns}
              data={users}
              emptyMessage="No registered operators found in database nodes."
            />

            <Pagination
              page={page}
              totalPages={totalPages}
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

export default UserManagement;
