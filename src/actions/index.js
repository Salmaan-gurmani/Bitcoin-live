import { BITCOINPRICE, BITCOINPRICEHISTORY } from '../constants';

const loadCurrentPrice = data => ({
    type: BITCOINPRICE.LOAD,
    payload: data,
});

const setCurrentPrice = bitcoinPrice => ({
    type: BITCOINPRICE.LOAD_SUCCESS,
    bitcoinPrice,
});

const setError = error => ({
    type: BITCOINPRICE.LOAD_FAIL,
    error,
});

const loadPriceHistory = data => ({
    type: BITCOINPRICEHISTORY.LOAD,
    payload: data,
});

const setPriceHistory = bitcoinPriceHistory => ({
    type: BITCOINPRICEHISTORY.LOAD_SUCCESS,
    bitcoinPriceHistory,
});

const setHistoryError = error => ({
    type: BITCOINPRICEHISTORY.LOAD_FAIL,
    error,
});

export {
    loadCurrentPrice,
    setCurrentPrice,
    setError,
    setHistoryError,
    setPriceHistory,
    loadPriceHistory,
};
