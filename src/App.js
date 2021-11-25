import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/DashboardContainer';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './createTheme';
import configureStore from './store';
import { ThemeProvider } from '@material-ui/core';

const store = configureStore();

class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <Provider store={store}>
                    <Router>
                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                        </Switch>
                    </Router>
                </Provider>
            </ThemeProvider>
        );
    }
}

export default App;
