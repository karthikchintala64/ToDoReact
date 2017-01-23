import * as Request from 'superagent';

import * as authHelper from '../helpers/authhelper'
import { IAction, ITODO } from '../Interfaces';
import { ADD_TO_DO, DELETE_TO_DO, EDIT_TO_DO, LOAD_ALL_TODOS, TOGGLE_TODO_STATUS, ENABLE_TODO_EDITING } from './actiontypes';
import { GET_TODO_ITEMS_URL } from '../constants';


export const EditTODO = (id: string, updateText: string) => {
    return dispatch => {
        new Promise((resolve, reject) => {
            Request
                .patch(GET_TODO_ITEMS_URL + '/' + id + '/columnSet')
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .send({
                    "Title":updateText
                })
                .end((err,response)=>{
                    if(err) reject(err);
                    else{
                        dispatch({
                            type:EDIT_TO_DO,
                            data:{
                                id:id,
                                name:JSON.parse(response.text).Title
                            }
                        })
                    }
                })
        })
    }
}

export const EnableTODOEditing = (id) => {
    return ({
        type: ENABLE_TODO_EDITING,
        data: {
            id: id
        }
    });
}

export const ToggleToDoStatus = (todo: ITODO) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Request
                .patch(GET_TODO_ITEMS_URL + '/' + todo.id + '/columnSet')
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .send({
                    "Status": !todo.status
                })
                .end((err, response) => {
                    if (err) reject(err)
                    else
                        dispatch({
                            type: TOGGLE_TODO_STATUS,
                            data: {
                                id: todo.id,
                                status: JSON.parse(response.text).Status
                            }
                        })
                })
        })
    };
}

export const LOADTODOs = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Request
                .get(GET_TODO_ITEMS_URL + "?expand=columnset")
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .end((err, response) => {
                    if (err) {
                        authHelper.Logout();
                        authHelper.Login();
                        reject(err);
                    }
                    else
                        dispatch({
                            type: LOAD_ALL_TODOS,
                            data: JSON.parse(response.text)
                        })
                })
        })
    }
}

export const AddTODO = (newToDo: string) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            Request
                .post(GET_TODO_ITEMS_URL)
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .send({})
                .end((err, response) => {
                    if (err) {
                        authHelper.Logout();
                        authHelper.Login();
                        reject(err);
                    }
                    else {
                        const res = JSON.parse(response.text)
                        Request
                            .patch(GET_TODO_ITEMS_URL + '/' + res.id + '/columnSet')
                            .set('Content-Type', 'application/json')
                            .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                            .send({
                                "Title": newToDo
                            })
                            .end((err, response) => {
                                if (err) {
                                    authHelper.Logout();
                                    authHelper.Login();
                                    reject(err);
                                }
                                else
                                    dispatch({
                                        type: ADD_TO_DO,
                                        data: {
                                            name: JSON.parse(response.text).Title,
                                            id: res.id
                                        }
                                    })
                            })
                    }
                })
        })
    };
}

export const DeleteTODO = (id: string) => {
    return dispatch => {
        new Promise((resolve, reject) => {
            Request
                .delete(GET_TODO_ITEMS_URL + '/' + id)
                .set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
                .end((err, response) => {
                    if (err) reject(err)
                    else
                        dispatch({
                            type: DELETE_TO_DO,
                            data: {
                                id: id
                            }
                        })
                })
        })
    }
}
