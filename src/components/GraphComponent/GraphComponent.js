import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export const formatterCode = y => {
    if (typeof y !== 'undefined') {
        return y.toFixed(0);
    }
    return y;
};

export const seriesData = [
    {
        name: 'Price',
        type: 'area',
        data: [],
    },
];
export const optionsData = {
    chart: {
        height: 350,
        type: 'line',
    },
    stroke: {
        curve: 'smooth',
    },
    fill: {
        type: 'solid',
        opacity: [0.35, 1],
    },
    labels: [],
    markers: {
        size: 0,
    },
    yaxis: [
        {
            title: {
                text: 'Bitcoin Price',
            },
        },
    ],
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: y => formatterCode(y),
        },
    },
};
const ApexChart = ({ priceHistory, currency }) => {
    const [series, setSeries] = useState(seriesData);
    const [options, setOptions] = useState(optionsData);

    useEffect(() => {
        let keys = [];
        let values = [];
        for (var key in priceHistory) {
            keys.push(key);
            values.push(priceHistory[key]);
        }
        setOptions({
            ...options,
            labels: keys,
        });

        setSeries(
            series.map(item => (item ? { ...item, data: values } : item)),
        );
    }, [currency, priceHistory]);

    return (
        <div id="chart">
            <Chart options={options} series={series} type="line" height={350} />
        </div>
    );
};

export default ApexChart;
