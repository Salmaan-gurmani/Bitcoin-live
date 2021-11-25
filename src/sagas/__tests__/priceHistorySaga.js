import { runSaga } from 'redux-saga';

import { getCurrency, handlePriceHistoryLoad } from '../priceHistorySaga';
import * as api from '../../api'; // we'll mock the fetchHistoryPrice api
import { BITCOINPRICEHISTORY } from '../../constants';
import { setPriceHistory, setHistoryError } from '../../actions';

test('selector should return the desired currency', () => {
    const options = { currency: 'USD' };
    const state = { options };
    const res = getCurrency(state);
    expect(res).toBe('USD');
});

test('should load and handle History Price in case of success', async () => {
    // we push all dispatched actions to make assertions easier
    // and our tests less brittle
    const dispatchedActions = [];

    // we don't want to perform an actual api call in our tests
    // so we will mock the fetchHistoryPrice api with jest
    // this will mutate the dependency which we may reset if other tests
    // are dependent on it
    const mockedPrice = {
        bitcoinPriceHistory: [
            {
                bpi: {
                    '2021-10-23': 61307.6667,
                    '2021-10-24': 60849.5667,
                    '2021-10-25': 63084.5717,
                    '2021-10-26': 60307.6533,
                    '2021-10-27': 58457.8717,
                    '2021-10-28': 60591.9433,
                    '2021-10-29': 62253.32,
                    '2021-10-30': 61888.405,
                    '2021-10-31': 61338.5317,
                    '2021-11-01': 60955.7683,
                    '2021-11-02': 63246.855,
                    '2021-11-03': 62926.8233,
                    '2021-11-04': 61444.2283,
                    '2021-11-05': 61016.2883,
                    '2021-11-06': 61514.3833,
                    '2021-11-07': 63287.79,
                    '2021-11-08': 67544.8733,
                    '2021-11-09': 66941.8717,
                    '2021-11-10': 64924.3533,
                    '2021-11-11': 64818.75,
                    '2021-11-12': 64142.9817,
                    '2021-11-13': 64410.975,
                    '2021-11-14': 65495.3183,
                    '2021-11-15': 63599.7467,
                    '2021-11-16': 60112.9583,
                    '2021-11-17': 60364.085,
                    '2021-11-18': 56925.4283,
                    '2021-11-19': 58121.7817,
                    '2021-11-20': 59763.9583,
                    '2021-11-21': 58689.5383,
                    '2021-11-22': 56290.1683,
                },
                disclaimer:
                    'This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.',
                time: {
                    updated: 'Nov 23, 2021 00:03:00 UTC',
                    updatedISO: '2021-11-23T00:03:00+00:00',
                },
            },
        ],
        type: BITCOINPRICEHISTORY.LOAD_SUCCESS,
    };
    api.fetchPriceHistory = jest.fn(() => Promise.resolve(mockedPrice));

    const fakeStore = {
        getState: () => ({ options: { currency: 'USD' } }),
        dispatch: action => dispatchedActions.push(action),
    };

    // wait for saga to complete
    await runSaga(fakeStore, handlePriceHistoryLoad).result;
    expect(api.fetchPriceHistory.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setPriceHistory(mockedPrice));
});

test('should handle History Price load errors in case of failure', async () => {
    const dispatchedActions = [];

    // we simulate an error by rejecting the promise
    // then we assert if our saga dispatched the action(s) correctly
    const error = 'API server is down';
    api.fetchPriceHistory = jest.fn(() => Promise.reject(error));

    const fakeStore = {
        getState: () => ({ options: { currency: 'USD' } }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handlePriceHistoryLoad).done;

    expect(api.fetchPriceHistory.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setHistoryError(error));
});
