import * as immutable from 'immutable';

import { ITODO } from '../interfaces'
import { IAction } from '../Interfaces';
import InitialState from './initialState'
import { ADD_TO_DO, DELETE_TO_DO, EDIT_TO_DO, LOAD_ALL_TODOS, TOGGLE_TODO_STATUS, ENABLE_TODO_EDITING, DISABLE_TODO_EDITING } from '../actions/actiontypes';

export default (state = InitialState().todos, action) => {
    switch (action.type) {
        case LOAD_ALL_TODOS:
            action.data.value.map(item =>
                state = state.push({
                    id: item.id,
                    name: item.columnSet.Title,
                    status: item.columnSet.Status,
                    editing: false
                })
            )
            return state;
        case ADD_TO_DO:
            return state.push({
                id: action.data.id,
                name: action.data.name,
                status: false,
                editing: false
            })
        case EDIT_TO_DO:
            return state.filter((item) => {
                if (item.id == action.data.id) {
                    item.name = action.data.name;
                    item.editing = false;
                }
                return true;
            })
        case DELETE_TO_DO:
            return state.filter((item) => { return item.id != action.data.id }).toList();
        case TOGGLE_TODO_STATUS:
            return state.filter((item) => {
                if (item.id === action.data.id)
                    item.status = action.data.status
                return true;
            }).toList();
        case ENABLE_TODO_EDITING:
            return state.filter((item) => {
                if (item.id === action.data.id)
                    item.editing = true;
                return true;
            });
        case DISABLE_TODO_EDITING:
            return state.filter((item) => {
                if (item.id === action.data.id)
                    item.editing = false;
                return true;
            });
        default:
            return state;
    }
}