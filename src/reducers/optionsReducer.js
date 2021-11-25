import { BITCOINPRICEHISTORY, BITCOINPRICE } from '../constants';

const optionsReducer = (state = 1, action) => {
    switch (action.type) {
        case BITCOINPRICE.LOAD:
        case BITCOINPRICEHISTORY.LOAD:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return {
                ...state,
                ...action.payload,
            };
    }
};

export default optionsReducer;
