import * as React from 'react';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';

import { store } from '../store';
import routes from './routes';

class RootRouter extends React.Component<any, any>{
    render() {
        return (
            <Provider store={store}>
                {routes}
            </Provider>
        );
    }
}

export default RootRouter;

