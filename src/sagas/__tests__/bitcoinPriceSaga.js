import { runSaga } from 'redux-saga';

import { getCurrency, handlePriceLoad } from '../bitcoinPriceSaga';
import * as api from '../../api'; // we'll mock the fetchCurrentPrice api
import { BITCOINPRICE } from '../../constants';
import { setCurrentPrice, setError } from '../../actions';

test('selector should return the desired currency', () => {
    const options = { currency: 'USD' };
    const state = { options };
    const res = getCurrency(state);
    expect(res).toBe('USD');
});

test('should load and handle Current Price in case of success', async () => {
    // we push all dispatched actions to make assertions easier
    // and our tests less brittle
    const dispatchedActions = [];

    // we don't want to perform an actual api call in our tests
    // so we will mock the fetchCurrentPrice api with jest
    // this will mutate the dependency which we may reset if other tests
    // are dependent on it
    const mockedPrice = {
        bitcoinPrice: [
            {
                time: {
                    updated: 'Nov 23, 2021 21:25:00 UTC',
                    updatedISO: '2021-11-23T21:25:00+00:00',
                    updateduk: 'Nov 23, 2021 at 21:25 GMT',
                },
                disclaimer:
                    'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
                bpi: {
                    USD: {
                        code: 'USD',
                        rate: '57,630.7851',
                        description: 'United States Dollar',
                        rate_float: 57630.7851,
                    },
                },
            },
        ],
        type: BITCOINPRICE.LOAD_SUCCESS,
    };
    api.fetchCurrentPrice = jest.fn(() => Promise.resolve(mockedPrice));

    const fakeStore = {
        getState: () => ({ options: { currency: 'USD' } }),
        dispatch: action => dispatchedActions.push(action),
    };

    // wait for saga to complete
    await runSaga(fakeStore, handlePriceLoad).result;
    expect(api.fetchCurrentPrice.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setCurrentPrice(mockedPrice));
});

test('should handle current Price load errors in case of failure', async () => {
    const dispatchedActions = [];

    // we simulate an error by rejecting the promise
    // then we assert if our saga dispatched the action(s) correctly
    const error = 'API server is down';
    api.fetchCurrentPrice = jest.fn(() => Promise.reject(error));

    const fakeStore = {
        getState: () => ({ options: { currency: 'USD' } }),
        dispatch: action => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, handlePriceLoad).done;

    expect(api.fetchCurrentPrice.mock.calls.length).toBe(1);
    expect(dispatchedActions).toContainEqual(setError(error));
});
