import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import insightsService from '../../services/insightsService';

export const fetchMarketTrend = createAsyncThunk('insights/marketTrend', async (_, { rejectWithValue }) => {
  try {
    const response = await insightsService.getMarketTrend();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch market trend');
  }
});

export const fetchPriceGrowth = createAsyncThunk('insights/priceGrowth', async (_, { rejectWithValue }) => {
  try {
    const response = await insightsService.getPriceGrowth();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch price growth');
  }
});

export const fetchVolumeSpikes = createAsyncThunk('insights/volumeSpikes', async (_, { rejectWithValue }) => {
  try {
    const response = await insightsService.getVolumeSpikes();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch volume spikes');
  }
});

export const fetchTopReturns = createAsyncThunk('insights/topReturns', async (_, { rejectWithValue }) => {
  try {
    const response = await insightsService.getTopReturns();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch top returns');
  }
});

export const fetchNegativeReturns = createAsyncThunk('insights/negativeReturns', async (_, { rejectWithValue }) => {
  try {
    const response = await insightsService.getNegativeReturns();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch negative returns');
  }
});

export const fetchHighVolatility = createAsyncThunk('insights/highVolatility', async (_, { rejectWithValue }) => {
  try {
    const response = await insightsService.getHighVolatility();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch high volatility');
  }
});

export const fetchHighestPrice = createAsyncThunk('insights/highestPrice', async (_, { rejectWithValue }) => {
  try {
    const response = await insightsService.getHighestPrice();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

export const fetchLowestPrice = createAsyncThunk('insights/lowestPrice', async (_, { rejectWithValue }) => {
  try {
    const response = await insightsService.getLowestPrice();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed');
  }
});

const initialState = {
  marketTrend: [],
  priceGrowth: [],
  volumeSpikes: [],
  topReturns: [],
  negativeReturns: [],
  highVolatility: [],
  highestPrice: null,
  lowestPrice: null,
  isLoading: false,
  error: null,
};

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketTrend.pending, (state) => { state.isLoading = true; })
      .addCase(fetchMarketTrend.fulfilled, (state, action) => { state.isLoading = false; state.marketTrend = action.payload || []; })
      .addCase(fetchMarketTrend.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      .addCase(fetchPriceGrowth.fulfilled, (state, action) => { state.priceGrowth = action.payload || []; })
      .addCase(fetchVolumeSpikes.fulfilled, (state, action) => { state.volumeSpikes = action.payload || []; })
      .addCase(fetchTopReturns.fulfilled, (state, action) => { state.topReturns = action.payload || []; })
      .addCase(fetchNegativeReturns.fulfilled, (state, action) => { state.negativeReturns = action.payload || []; })
      .addCase(fetchHighVolatility.fulfilled, (state, action) => { state.highVolatility = action.payload || []; })
      .addCase(fetchHighestPrice.fulfilled, (state, action) => { state.highestPrice = action.payload; })
      .addCase(fetchLowestPrice.fulfilled, (state, action) => { state.lowestPrice = action.payload; });
  },
});

export const { clearError } = insightsSlice.actions;
export default insightsSlice.reducer;
