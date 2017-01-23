import * as React from 'react';

import * as classNames from 'classnames'

import { ITODO } from '../interfaces';

interface ITODOProps extends React.Props<any> {
    todo: ITODO,
    onToDoDelete(id: string),
    onStatusChange(todo: ITODO),
    onEnableEditing(todo: ITODO),
    onDisableEditing(todo: ITODO, newtext:string)
}


class TODO extends React.Component<ITODOProps, any> {
    constructor(props: ITODOProps) {
        super(props);
    }

    cntrls: {
        editTodo?: HTMLInputElement
    } = {}

    componentWillUpdate(nextProps: ITODOProps) {
        return (
            nextProps.todo !== this.props.todo ||
            nextProps.todo.editing !== this.props.todo.editing
        );
    }

    componentDidUpdate(prevProps: ITODOProps) {
        if (prevProps.todo.editing && this.props.todo.editing) {
            var node = this.cntrls.editTodo;
            node.focus();
            node.setSelectionRange(node.value.length, node.value.length);
        }
    }

    render() {
        return (
            <li className={classNames({
                completed: this.props.todo.status,
                editing: this.props.todo.editing
            })}>
                <div className="view">
                    <input type="checkbox"
                        className="toggle"
                        onChange={() => this.props.onStatusChange(this.props.todo)}
                        checked={this.props.todo.status} />
                    <label onDoubleClick={() => this.props.onEnableEditing(this.props.todo)}>
                        {this.props.todo.name}
                    </label>
                    <button className="destroy"
                        onClick={() => this.props.onToDoDelete(this.props.todo.id)}>
                    </button>
                </div>
                <input
                    ref={(editTodo) => this.cntrls.editTodo = editTodo}
                    className="edit"
                    onBlur={() => this.props.onDisableEditing(this.props.todo, this.cntrls.editTodo.value)}
                    defaultValue={this.props.todo.name} />
            </li>
        );
    }
}

export default TODO;