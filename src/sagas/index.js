import { all } from 'redux-saga/effects';

import currentPriceSaga from './bitcoinPriceSaga';
import priceHistorySaga from './priceHistorySaga';

export default function* rootSaga() {
    yield all([currentPriceSaga(), priceHistorySaga()]);
}
