import { put, call, select, takeLatest } from 'redux-saga/effects';

import { setPriceHistory, setHistoryError } from '../actions';
import { BITCOINPRICEHISTORY } from '../constants';
import { fetchPriceHistory } from '../api';

export const getCurrency = state => state.options.currency;

export function* handlePriceHistoryLoad() {
    try {
        const currency = yield select(getCurrency);

        const priceHistory = yield call(fetchPriceHistory, currency);
        yield put(setPriceHistory(priceHistory));
    } catch (error) {
        yield put(setHistoryError(error.toString()));
    }
}

export default function* watchPriceHistoryLoad() {
    yield takeLatest(BITCOINPRICEHISTORY.LOAD, handlePriceHistoryLoad);
}
