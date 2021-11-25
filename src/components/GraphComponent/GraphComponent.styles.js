import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    bar: {
        backgroundColor: 'black',
        height: 60,
    },
    icon: {
        width: 200,
    },
    listRoot: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    error: {
        background: 'lightsalmon',
        padding: 10,
        BorderRight: 4,
        border: '1px solid tomato',
    },
    loginButton: {
        position: 'absolute',
        right: 10,
    },
}));
