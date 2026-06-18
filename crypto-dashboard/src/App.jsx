import { useEffect } from 'react';
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
      main: '#00d4ff', // cyan
    },
    secondary: {
      main: '#8b5cf6', // purple
    },
    background: {
      default: '#0a0a0f',
      paper: '#0d0d14',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: "'Inter', 'sans-serif'",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '12px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0d0d14',
          border: '1px solid rgba(255, 255, 255, 0.05)',
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
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <AppContent />
          <ToastContainer theme="dark" position="bottom-right" />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
