import { hashHistory } from 'react-router';

import { CLIENT_ID, GRAPH_RESOURCE, TENANT_ID } from '../constants';

export const Login = () => {
    window.location.href = "https://login.microsoftonline.com/" + TENANT_ID +
        "/oauth2/authorize?response_type=id_token&client_id=" + CLIENT_ID +
        "&redirect_uri=" + encodeURIComponent(window.location.origin) +
        "&state=SomeState&nonce=SomeNonce";
}

export const GetAccessToken = () => {
    window.location.href = "https://login.microsoftonline.com/" + TENANT_ID +
        "/oauth2/authorize?response_type=tokeny&client_id=" + CLIENT_ID +
        "&resource=" + GRAPH_RESOURCE +
        "&redirect_uri=" + encodeURIComponent(window.location.origin) +
        "&prompt=none&state=SomeState&nonce=SomeNonce";
}

export const SetAccessToken = (token:string) => {
    localStorage.setItem('access_token', token);
                hashHistory.push('home');
}

export const isAuthenticated = () => {
    return localStorage.getItem('access_token')!=null &&
           localStorage.getItem('access_token')!=undefined &&
           localStorage.getItem('access_token')!='';
}