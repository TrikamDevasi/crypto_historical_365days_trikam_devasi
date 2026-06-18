import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import coinReducer from '../features/coins/coinSlice';
import insightsReducer from '../features/insights/insightsSlice';
import statsReducer from '../features/stats/statsSlice';
import uiReducer from '../features/ui/uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    coins: coinReducer,
    insights: insightsReducer,
    stats: statsReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
