import React from 'react';
import { Icon } from '@iconify/react';

export default class Todo extends React.Component {
    componentDidMount() {
        document.title = 'Sua lista de tarefas';
    }

    render() {
        return (
            <div className="todo-container">
                <div className="todo-tile">
                    <h1>Suas tarefas</h1>
                </div>
                <form className='add-task-form'>
                    <div className="add-task-input-box">
                        <input type="text" placeholder='Adicionar nova tarefa'/>
                        <Icon className='add-icon' icon='carbon:add'/>
                    </div>
                </form>
            </div>
        )
    }
}