import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import coinService from '../../services/coinService';

// Thunks
export const fetchCoins = createAsyncThunk('coins/fetchAll', async (params, { rejectWithValue }) => {
  try {
    const response = await coinService.getAllCoins(params);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch coins');
  }
});

export const fetchCoinById = createAsyncThunk('coins/fetchById', async (id, { rejectWithValue }) => {
  try {
    const response = await coinService.getCoinById(id);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch coin');
  }
});

export const createCoin = createAsyncThunk('coins/create', async (data, { rejectWithValue }) => {
  try {
    const response = await coinService.createCoin(data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to create coin');
  }
});

export const updateCoin = createAsyncThunk('coins/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await coinService.updateCoin(id, data);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to update coin');
  }
});

export const deleteCoin = createAsyncThunk('coins/delete', async (id, { rejectWithValue }) => {
  try {
    await coinService.deleteCoin(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete coin');
  }
});

export const fetchTopGainers = createAsyncThunk('coins/topGainers', async (params, { rejectWithValue }) => {
  try {
    const response = await coinService.getTopGainers(params);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch top gainers');
  }
});

export const fetchTopLosers = createAsyncThunk('coins/topLosers', async (params, { rejectWithValue }) => {
  try {
    const response = await coinService.getTopLosers(params);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch top losers');
  }
});

export const fetchTrending = createAsyncThunk('coins/trending', async (params, { rejectWithValue }) => {
  try {
    const response = await coinService.getTrending(params);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch trending');
  }
});

export const fetchCoinHistory = createAsyncThunk('coins/history', async ({ coinId, params }, { rejectWithValue }) => {
  try {
    const response = await coinService.getCoinHistory(coinId, params);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch coin history');
  }
});

export const fetchMarketStatus = createAsyncThunk('coins/marketStatus', async (_, { rejectWithValue }) => {
  try {
    const response = await coinService.getMarketStatus();
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch market status');
  }
});

export const searchCoins = createAsyncThunk('coins/search', async ({ q, params }, { rejectWithValue }) => {
  try {
    const response = await coinService.searchCoins(q, params);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Search failed');
  }
});

const initialState = {
  coins: [],
  currentCoin: null,
  topGainers: [],
  topLosers: [],
  trending: [],
  coinHistory: [],
  marketStatus: null,
  searchResults: [],
  pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
  isLoading: false,
  isDetailLoading: false,
  error: null,
};

const coinSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    clearCurrentCoin: (state) => {
      state.currentCoin = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchCoins.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coins = action.payload.data;
        if (action.payload.meta) {
          state.pagination = {
            page: action.payload.meta.page,
            limit: action.payload.meta.limit,
            total: action.payload.meta.total,
            totalPages: action.payload.meta.totalPages,
          };
        }
      })
      .addCase(fetchCoins.rejected, (state, action) => { state.isLoading = false; state.error = action.payload; })
      // Fetch by ID
      .addCase(fetchCoinById.pending, (state) => { state.isDetailLoading = true; })
      .addCase(fetchCoinById.fulfilled, (state, action) => { state.isDetailLoading = false; state.currentCoin = action.payload; })
      .addCase(fetchCoinById.rejected, (state, action) => { state.isDetailLoading = false; state.error = action.payload; })
      // Create
      .addCase(createCoin.fulfilled, (state, action) => { state.coins.unshift(action.payload); })
      // Update
      .addCase(updateCoin.fulfilled, (state, action) => {
        const idx = state.coins.findIndex((c) => c._id === action.payload._id);
        if (idx !== -1) state.coins[idx] = action.payload;
        if (state.currentCoin?._id === action.payload._id) state.currentCoin = action.payload;
      })
      // Delete
      .addCase(deleteCoin.fulfilled, (state, action) => {
        state.coins = state.coins.filter((c) => c._id !== action.payload);
      })
      // Top Gainers
      .addCase(fetchTopGainers.fulfilled, (state, action) => { state.topGainers = action.payload.data || []; })
      // Top Losers
      .addCase(fetchTopLosers.fulfilled, (state, action) => { state.topLosers = action.payload.data || []; })
      // Trending
      .addCase(fetchTrending.fulfilled, (state, action) => { state.trending = action.payload.data || []; })
      // Coin History
      .addCase(fetchCoinHistory.fulfilled, (state, action) => { state.coinHistory = action.payload.data || []; })
      // Market Status
      .addCase(fetchMarketStatus.fulfilled, (state, action) => { state.marketStatus = action.payload; })
      // Search
      .addCase(searchCoins.fulfilled, (state, action) => { state.searchResults = action.payload.data || []; });
  },
});

export const { clearCurrentCoin, clearError, clearSearchResults } = coinSlice.actions;
export default coinSlice.reducer;
