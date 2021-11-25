import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 50,
    },
    secondaryContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    formControl: {
        minWidth: 120,
        margin: 20,
    },
    selectEmpty: {
        marginTop: 5,
    },
    bar: {
        backgroundColor: 'black',
        height: 60,
    },
    icon: { width: '80px', height: 'auto' },
    listRoot: {
        width: '100%',
        maxWidth: '36ch',
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
