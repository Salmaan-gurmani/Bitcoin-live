import * as React from 'react';
import GraphComponent from './GraphComponent';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import * as redux from 'react-redux';
import { seriesData, optionsData } from './GraphComponent';
import { useState } from 'react';
configure({ adapter: new Adapter() });

const currency = 'USD';
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: jest.fn(),
}));

const bitCoinPriceHistoryData = {
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
};
describe('<Graph Component />', () => {
    let useEffect;
    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
        useEffect = jest.spyOn(React, 'useEffect');
        mockUseEffect(); // 2 times
        mockUseEffect(); //
        useState.mockImplementation(jest.requireActual('react').useState);
        //other preperations
    });
    it('should render Graph Component', () => {
        const wrapper = shallow(
            <GraphComponent
                priceHistory={bitCoinPriceHistoryData}
                currency={currency}
                seriesData={seriesData}
                optionsData={optionsData}
            />,
        );
        expect(wrapper).toMatchSnapshot();
    });
});
