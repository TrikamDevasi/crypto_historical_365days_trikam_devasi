import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layout/AuthLayout';
import DashboardLayout from '../layout/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Pages
import Login from '../../pages/auth/Login';
import Register from '../../pages/auth/Register';
import Dashboard from '../../pages/dashboard/Dashboard';
import CoinList from '../../pages/coins/CoinList';
import CoinDetail from '../../pages/coins/CoinDetail';
import CoinForm from '../../pages/coins/CoinForm';
import Insights from '../../pages/insights/Insights';
import Stats from '../../pages/stats/Stats';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import UserManagement from '../../pages/admin/UserManagement';
import Profile from '../../pages/profile/Profile';
import Settings from '../../pages/settings/Settings';
import NotFound from '../../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/coins" element={<CoinList />} />
          <Route path="/coins/new" element={<CoinForm />} />
          <Route path="/coins/edit/:id" element={<CoinForm />} />
          <Route path="/coins/:id" element={<CoinDetail />} />
          <Route path="/analytics" element={<Insights />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
          </Route>
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
