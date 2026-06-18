import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchCoins, fetchCoinById, createCoin, updateCoin, deleteCoin,
  fetchTopGainers, fetchTopLosers, fetchTrending, fetchCoinHistory,
  fetchMarketStatus, searchCoins, clearCurrentCoin, clearError, clearSearchResults,
} from '../features/coins/coinSlice';

const useCoins = () => {
  const dispatch = useDispatch();
  const coins = useSelector((state) => state.coins);

  return {
    ...coins,
    fetchCoins: useCallback((params) => dispatch(fetchCoins(params)), [dispatch]),
    fetchCoinById: useCallback((id) => dispatch(fetchCoinById(id)), [dispatch]),
    createCoin: useCallback((data) => dispatch(createCoin(data)), [dispatch]),
    updateCoin: useCallback((id, data) => dispatch(updateCoin({ id, data })), [dispatch]),
    deleteCoin: useCallback((id) => dispatch(deleteCoin(id)), [dispatch]),
    fetchTopGainers: useCallback((params) => dispatch(fetchTopGainers(params)), [dispatch]),
    fetchTopLosers: useCallback((params) => dispatch(fetchTopLosers(params)), [dispatch]),
    fetchTrending: useCallback((params) => dispatch(fetchTrending(params)), [dispatch]),
    fetchCoinHistory: useCallback((coinId, params) => dispatch(fetchCoinHistory({ coinId, params })), [dispatch]),
    fetchMarketStatus: useCallback(() => dispatch(fetchMarketStatus()), [dispatch]),
    searchCoins: useCallback((q, params) => dispatch(searchCoins({ q, params })), [dispatch]),
    clearCurrentCoin: useCallback(() => dispatch(clearCurrentCoin()), [dispatch]),
    clearError: useCallback(() => dispatch(clearError()), [dispatch]),
    clearSearchResults: useCallback(() => dispatch(clearSearchResults()), [dispatch]),
  };
};

export default useCoins;
