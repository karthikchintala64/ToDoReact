declare var window: Window & { devToolsExtension: any };
import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';

import rootReducer from '../reducers'

const middleware= applyMiddleware(thunkMiddleWare);

export const store = createStore(
    rootReducer, 
    compose(middleware, window.devToolsExtension ? window.devToolsExtension() : f => f)
);

