import React, { useEffect, useState } from 'react';

import {
    AppBar,
    Box,
    Toolbar,
    Button,
    Typography,
    Paper,
    Grid,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import * as R from 'ramda';
import { loadCurrentPrice, loadPriceHistory } from '../../actions';
import { useStyles } from './Dashboard.styles';
import GraphComponent from '../GraphComponent/GraphComponent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useInterval } from './helper';

const HomePage = () => {
    const bitCoinPrice = useSelector(state => state.bitcoinPrice);
    const [currency, setCurrency] = useState('USD');
    const error = useSelector(state => state.error);
    const bitCoinPriceHistory = useSelector(state => state.bitcoinPriceHistory);
    const classes = useStyles();
    const dispatch = useDispatch();
    const hasCurrentPrice = R.hasPath(
        ['response', 'bpi', currency, 'rate'],
        bitCoinPrice,
    );
    const hasPriceHistory = R.hasPath(['response', 'bpi'], bitCoinPriceHistory);

    useEffect(() => {
        dispatch(loadCurrentPrice({ currency: currency }));
        dispatch(loadPriceHistory({ currency: currency }));
    }, [currency]);

    const handleChange = event => {
        setCurrency(event.target.value);
    };

    useInterval(() => {
        dispatch(loadCurrentPrice({ currency: currency }));
    }, 1000);

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" className={classes.bar}>
                    <Toolbar>
                        <img
                            src="https://logos-download.com/wp-content/uploads/2016/09/Adecco_logo.png"
                            alt="logo"
                            className={classes.icon}
                        />
                        <Button className={classes.loginButton} color="inherit">
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className={classes.root}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">
                        Currency
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={currency}
                        onChange={handleChange}
                        label="Currency"
                    >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'EUR'}>EUR</MenuItem>
                        <MenuItem value={'CNY'}>CNY</MenuItem>
                        <MenuItem value={'JPY'}>JPY</MenuItem>
                        <MenuItem value={'PLN'}>PLN</MenuItem>
                    </Select>
                </FormControl>
                <div className={classes.secondaryContainer}>
                    {hasCurrentPrice && (
                        <Typography variant="h4" color="primary">
                            Current Price in {currency}:{' '}
                        </Typography>
                    )}
                    {hasCurrentPrice && (
                        <Typography variant="h4" color="primary">
                            {bitCoinPrice.response.bpi[currency].rate}
                        </Typography>
                    )}
                </div>

                {hasPriceHistory && (
                    <Grid container>
                        <Grid item xs={12}>
                            <Paper>
                                <GraphComponent
                                    priceHistory={
                                        bitCoinPriceHistory.response.bpi
                                    }
                                    currency={currency}
                                />
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </div>

            {error && (
                <div className={classes.error}>{JSON.stringify(error)}</div>
            )}
        </div>
    );
};

export default HomePage;
