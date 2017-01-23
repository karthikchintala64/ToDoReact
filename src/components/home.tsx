import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import ToDoItem from './todo'
import { store } from '../store'
import { ITODO, ISTATE } from '../interfaces';
import * as ToDoActions from '../actions/todoActionCreator'

export interface IHomeProps extends React.Props<any> {
    todos: List<ITODO>,
    onToDoDelete(id),
    onStatusChange(todo:ITODO),
    onEnableEditing(todo:ITODO),
    onDisableEditing(todo:ITODO,newText:string)
}

class Home extends React.Component<IHomeProps, any> {
    
    componentWillMount() {
        store.dispatch(ToDoActions.LOADTODOs());
    }

    onAddCounter(text) {
        store.dispatch(ToDoActions.AddTODO(text))
    }

    handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.keyCode != 13)
            return ;
        event.preventDefault();        
        this.onAddCounter(event.currentTarget.value);
        event.currentTarget.value='';
    }

    cntrls: {
        input?: HTMLInputElement
    } = {}

    render() {
        const { todos } = this.props;
        return (
            <div>
                <h1>todos</h1>
                <header className="header">
                    <input className="new-todo" type="text" placeholder="Add New Todo" ref={(input) => this.cntrls.input = input} onKeyDown={(e) => this.handleEnter(e)} />
                </header>
                <ul className="todo-list">
                    {todos.map((todo, index) =>
                        <ToDoItem key={index} 
                                  onEnableEditing={(todo:ITODO) => this.props.onEnableEditing(todo)}
                                  onDisableEditing={(todo:ITODO, updatedText:string) => this.props.onDisableEditing(todo, updatedText)}
                                  onToDoDelete={(id:string) => this.props.onToDoDelete(todo.id)} todo={todo} 
                                  onStatusChange={(todo:ITODO)=> this.props.onStatusChange(todo)}>
                            {todo.name}
                        </ToDoItem>
                    )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state: ISTATE, ownProps: IHomeProps) => {
    return ({
        todos: state.todos
    });
}

const mapDispatchToProps = (dispatch) =>{
    return ({
        onToDoDelete : (todoId) =>{
            dispatch(ToDoActions.DeleteTODO(todoId));
        },
        onStatusChange: (todo:ITODO) => {
            dispatch(ToDoActions.ToggleToDoStatus(todo))
        },
        onEnableEditing: (todo:ITODO) => {
            dispatch(ToDoActions.EnableTODOEditing(todo.id))
        },
        onDisableEditing: (todo:ITODO, newText:string) => {
            dispatch(ToDoActions.EditTODO(todo.id,newText))
        }
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);