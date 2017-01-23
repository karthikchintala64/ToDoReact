import { List } from 'immutable';

export interface ISTATE {
    todos?:List<ITODO>
}


export interface IAction {
    type: string,
    data?: {}
}

export interface ITODO {
    id: string,
    name: string,
    status?: boolean,
    editing?:boolean
}


