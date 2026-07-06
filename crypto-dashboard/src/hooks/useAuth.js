import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { login, register, logout, fetchProfile, updateProfile, changePassword, clearError } from '../features/auth/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogin = useCallback((credentials) => dispatch(login(credentials)).unwrap(), [dispatch]);
  const handleRegister = useCallback((userData) => dispatch(register(userData)).unwrap(), [dispatch]);
  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);
  const handleFetchProfile = useCallback(() => dispatch(fetchProfile()).unwrap(), [dispatch]);
  const handleUpdateProfile = useCallback((data) => dispatch(updateProfile(data)).unwrap(), [dispatch]);
  const handleChangePassword = useCallback((data) => dispatch(changePassword(data)).unwrap(), [dispatch]);
  const handleClearError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    ...auth,
    login: handleLogin,
    handleLogin,
    register: handleRegister,
    handleRegister,
    logout: handleLogout,
    handleLogout,
    fetchProfile: handleFetchProfile,
    handleFetchProfile,
    updateProfile: handleUpdateProfile,
    handleUpdateProfile,
    changePassword: handleChangePassword,
    handleChangePassword,
    clearError: handleClearError,
    handleClearError,
  };
};

export default useAuth;
