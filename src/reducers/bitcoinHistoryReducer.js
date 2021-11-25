import { BITCOINPRICEHISTORY } from '../constants';

const bitcoinPriceHistoryReducer = (state = [], action) => {
    if (action.type === BITCOINPRICEHISTORY.LOAD_SUCCESS) {
        return { ...state, response: action.bitcoinPriceHistory };
    }
    return state;
};

export default bitcoinPriceHistoryReducer;
