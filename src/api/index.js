const BASEURL = `https://api.coindesk.com/v1/bpi/`;
const HISTORICAL_PATH = 'historical/close.json?currency=';
const PRICE_PATH = 'currentprice/';

const fetchCurrentPrice = async currency => {
    const response = await fetch(`${BASEURL + PRICE_PATH + currency}`, {
        method: 'GET',
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return data;
};

const fetchPriceHistory = async currency => {
    const response = await fetch(`${BASEURL + HISTORICAL_PATH + currency}`, {
        method: 'GET',
    });
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }

    return data;
};

export { fetchCurrentPrice, fetchPriceHistory };
