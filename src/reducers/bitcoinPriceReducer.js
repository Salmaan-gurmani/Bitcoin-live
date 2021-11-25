import { BITCOINPRICE } from '../constants';

const bitcoinPriceReducer = (state = [], action) => {
    if (action.type === BITCOINPRICE.LOAD_SUCCESS) {
        return { ...state, response: action.bitcoinPrice };
    }
    return state;
};

export default bitcoinPriceReducer;
