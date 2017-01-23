import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import todoReducer from './todoreducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    todos:todoReducer
});

export default rootReducer;