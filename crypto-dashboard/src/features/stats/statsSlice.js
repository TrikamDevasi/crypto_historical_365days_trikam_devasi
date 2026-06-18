import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import statsService from '../../services/statsService';

export const fetchMarketCap = createAsyncThunk('stats/marketCap', async (_, { rejectWithValue }) => {
  try {
    const response = await statsService.getMarketCap();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchCoinCount = createAsyncThunk('stats/coinCount', async (_, { rejectWithValue }) => {
  try {
    const response = await statsService.getCoinCount();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchMarketSummary = createAsyncThunk('stats/marketSummary', async (_, { rejectWithValue }) => {
  try {
    const response = await statsService.getMarketSummary();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchMonthlyAnalysis = createAsyncThunk('stats/monthlyAnalysis', async (_, { rejectWithValue }) => {
  try {
    const response = await statsService.getMonthlyAnalysis();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchYearlyAnalysis = createAsyncThunk('stats/yearlyAnalysis', async (_, { rejectWithValue }) => {
  try {
    const response = await statsService.getYearlyAnalysis();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchRankDistribution = createAsyncThunk('stats/rankDistribution', async (_, { rejectWithValue }) => {
  try {
    const response = await statsService.getRankDistribution();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchPriceDistribution = createAsyncThunk('stats/priceDistribution', async (_, { rejectWithValue }) => {
  try {
    const response = await statsService.getPriceDistribution();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchVolatilityDistribution = createAsyncThunk('stats/volatilityDistribution', async (_, { rejectWithValue }) => {
  try {
    const response = await statsService.getVolatilityDistribution();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

const initialState = {
  marketCap: null,
  coinCount: null,
  marketSummary: null,
  monthlyAnalysis: [],
  yearlyAnalysis: [],
  rankDistribution: [],
  priceDistribution: [],
  volatilityDistribution: [],
  isLoading: false,
  error: null,
};

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketCap.pending, (state) => { state.isLoading = true; })
      .addCase(fetchMarketCap.fulfilled, (state, action) => { state.isLoading = false; state.marketCap = action.payload; })
      .addCase(fetchMarketCap.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(fetchCoinCount.fulfilled, (state, action) => { state.coinCount = action.payload; })
      .addCase(fetchMarketSummary.fulfilled, (state, action) => { state.marketSummary = action.payload; })
      .addCase(fetchMonthlyAnalysis.fulfilled, (state, action) => { state.monthlyAnalysis = action.payload || []; })
      .addCase(fetchYearlyAnalysis.fulfilled, (state, action) => { state.yearlyAnalysis = action.payload || []; })
      .addCase(fetchRankDistribution.fulfilled, (state, action) => { state.rankDistribution = action.payload || []; })
      .addCase(fetchPriceDistribution.fulfilled, (state, action) => { state.priceDistribution = action.payload || []; })
      .addCase(fetchVolatilityDistribution.fulfilled, (state, action) => { state.volatilityDistribution = action.payload || []; });
  },
});

export const { clearError } = statsSlice.actions;
export default statsSlice.reducer;
