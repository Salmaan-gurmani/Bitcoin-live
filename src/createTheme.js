import { createTheme } from '@material-ui/core';

const defaultTheme = createTheme();
const {
    breakpoints,
    typography: { pxToRem },
} = defaultTheme;

const theme = {
    ...defaultTheme,
    overrides: {
        MuiTypography: {
            h1: {
                fontSize: '5rem',
                [breakpoints.down('xs')]: {
                    fontSize: '3rem',
                },
            },
            h4: {
                fontSize: '3rem',
                [breakpoints.only('xs')]: {
                    fontSize: '1rem',
                },
                [breakpoints.only('sm')]: {
                    fontSize: '1.2rem',
                },
                [breakpoints.only('md')]: {
                    fontSize: '1.5rem',
                },
                [breakpoints.only('lg')]: {
                    fontSize: '2rem',
                },
            },
        },
    },
};

export default theme;
