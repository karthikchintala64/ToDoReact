import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from  'react-router-redux';

import { store } from '../store';
import Login from '../components/login';
import Home from '../components/home';
import Layout from '../components/layout';
import * as authHelper from '../helpers/authhelper';

const history= syncHistoryWithStore(browserHistory, store);

const isAuthenticated = () => {
    if(!authHelper.isAuthenticated())
        browserHistory.push('/');
}

export default(
        <Router history={history}>
            <Route path="/" component={Login}></Route>
            <Route path="/home" component={Layout} onEnter={isAuthenticated}>
                <IndexRoute component={Home} onEnter={isAuthenticated}></IndexRoute>
            </Route>
        </Router>
)
