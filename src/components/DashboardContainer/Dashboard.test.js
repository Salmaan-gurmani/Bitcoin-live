import * as React from 'react';
import Dashboard from './Dashboard';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import * as redux from 'react-redux';

configure({ adapter: new Adapter() });

const bitcoinPriceData = {
    response: {
        time: {
            updated: 'Nov 23, 2021 21:41:00 UTC',
            updatedISO: '2021-11-23T21:41:00+00:00',
            updateduk: 'Nov 23, 2021 at 21:41 GMT',
        },
        disclaimer:
            'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
        bpi: {
            USD: {
                code: 'USD',
                rate: '57,601.2737',
                description: 'United States Dollar',
                rate_float: 57601.2737,
            },
        },
    },
};

const bitCoinPriceHistoryData = {
    response: {
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
};
describe('<Dashboard />', () => {
    let useEffect;
    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };
    const useSelectorMock = jest.spyOn(redux, 'useSelector');
    const useDispatchMock = jest.spyOn(redux, 'useDispatch');

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
        useEffect = jest.spyOn(React, 'useEffect');
        mockUseEffect(); // 2 times
        mockUseEffect(); //
    });
    it('should render Dashboard', () => {
        useSelectorMock.mockImplementation(func =>
            func({
                bitcoinPrice: bitcoinPriceData,
                bitCoinPriceHistory: bitCoinPriceHistoryData,
            }),
        );
        const wrapper = shallow(<Dashboard />);
        expect(wrapper).toMatchSnapshot();
    });
    it('should render Dashboard with error', () => {
        useSelectorMock.mockImplementation(func =>
            func({
                bitcoinPrice: bitcoinPriceData,
                bitCoinPriceHistory: bitCoinPriceHistoryData,
                error: true,
            }),
        );

        const wrapper = shallow(<Dashboard />);
        expect(wrapper).toMatchSnapshot();
    });
});
