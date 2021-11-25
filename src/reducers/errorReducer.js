import { BITCOINPRICE, BITCOINPRICEHISTORY } from '../constants';

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case BITCOINPRICEHISTORY.LOAD_FAIL:
        case BITCOINPRICE.LOAD_FAIL:
            return action.error;
        case BITCOINPRICEHISTORY.LOAD:
        case BITCOINPRICE.LOAD:
        case BITCOINPRICEHISTORY.LOAD_SUCCESS:
        case BITCOINPRICE.LOAD_SUCCESS:
            return null;
        default:
            return state;
    }
};

export default errorReducer;
