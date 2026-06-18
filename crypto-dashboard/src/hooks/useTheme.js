import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { toggleTheme, setTheme } from '../features/ui/uiSlice';

const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const handleToggle = useCallback(() => dispatch(toggleTheme()), [dispatch]);
  const handleSet = useCallback((t) => dispatch(setTheme(t)), [dispatch]);

  return { theme, isDark: theme === 'dark', toggleTheme: handleToggle, setTheme: handleSet };
};

export default useTheme;
