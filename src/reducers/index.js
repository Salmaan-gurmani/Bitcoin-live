import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import optionsReducer from './optionsReducer';
import bitcoinPriceReducer from './bitcoinPriceReducer';
import bitcoinPriceHistoryReducer from './bitcoinHistoryReducer';

const rootReducer = combineReducers({
    isLoading: loadingReducer,
    bitcoinPrice: bitcoinPriceReducer,
    bitcoinPriceHistory: bitcoinPriceHistoryReducer,
    error: errorReducer,
    options: optionsReducer,
});

export default rootReducer;
