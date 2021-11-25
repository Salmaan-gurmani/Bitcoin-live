import { BITCOINPRICE, BITCOINPRICEHISTORY } from '../constants';

const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case BITCOINPRICE.LOAD:
        case BITCOINPRICEHISTORY.LOAD:
            return true;
        case BITCOINPRICEHISTORY.LOAD_SUCCESS:
        case BITCOINPRICE.LOAD_SUCCESS:
            return false;
        case BITCOINPRICEHISTORY.LOAD_FAIL:
        case BITCOINPRICE.LOAD_FAIL:
            return false;
        default:
            return state;
    }
};

export default loadingReducer;
