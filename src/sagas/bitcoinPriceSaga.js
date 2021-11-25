import { put, call, select, takeLatest } from 'redux-saga/effects';

import { setCurrentPrice, setError } from '../actions';
import { BITCOINPRICE } from '../constants';
import { fetchCurrentPrice } from '../api';

export const getCurrency = state => state.options.currency;

export function* handlePriceLoad() {
    try {
        const currency = yield select(getCurrency);

        const currentPrice = yield call(fetchCurrentPrice, currency);
        yield put(setCurrentPrice(currentPrice));
    } catch (error) {
        yield put(setError(error.toString()));
    }
}

export default function* watchPriceLoad() {
    yield takeLatest(BITCOINPRICE.LOAD, handlePriceLoad);
}
