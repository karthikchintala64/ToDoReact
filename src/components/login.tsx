import * as React from 'react';
import { browserHistory } from 'react-router';

import * as authHelper from '../helpers/authhelper';


class Login extends React.Component<any, any> {
    componentWillMount(){
        if (localStorage.getItem('access_token') == null || localStorage.getItem('access_token') == undefined || localStorage.getItem('access_token') == '') {

            if (this.props.location.hash.indexOf('access_token') > -1) {
                authHelper.SetAccessToken(this.props.location.hash.split('access_token=')[1].split('&')[0]);
            }

            else if (this.props.location.hash.indexOf('id_token') > -1)
                authHelper.GetAccessToken();

            else
                authHelper.Login();
        }

        browserHistory.push('/home');
    }

    render() {
        return (
            <div></div>
        );
    }
}

export default Login;