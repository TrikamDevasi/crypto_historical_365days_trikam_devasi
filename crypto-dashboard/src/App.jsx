import { useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store/store';
import AppRoutes from './components/routes/AppRoutes';
import { fetchProfile } from './features/auth/authSlice';
import useAuth from './hooks/useAuth';
import Loader from './components/common/Loader';

// Material UI custom dark design system
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00F0FF', // Dark mode primary cyan
    },
    secondary: {
      main: '#8A2BE2', // Accent indigo
    },
    background: {
      default: '#0B0E14',
      paper: '#151A23',
    },
    text: {
      primary: '#f0f0fa',
      secondary: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Outfit', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h4: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h5: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
    h6: { fontFamily: "'Outfit', sans-serif", fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#151A23',
          border: '1px solid rgba(0, 240, 255, 0.06)',
          borderRadius: '16px',
        },
      },
    },
  },
});

// App wrapper that invokes fetchProfile on mount
const AppContent = () => {
  const dispatch = useDispatch();
  const { isInitialized } = useAuth();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Wait for session check to complete before mounting routes to avoid flashing screens
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <Loader size="lg" text="Establishing secure ledger tunnel..." />
      </div>
    );
  }

  return <AppRoutes />;
};

const App = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your_google_client_id'}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <BrowserRouter>
            <AppContent />
            <ToastContainer theme="dark" position="bottom-right" />
          </BrowserRouter>
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default App;
