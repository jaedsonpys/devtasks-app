import React from 'react';
import { Icon } from '@iconify/react';

import Task from '../components/Task';

import './Todo.css'

export default function Todo(){
    return (
        <div className="todo-container">
            <div className="todo-title">
                <h1>Suas tarefas</h1>
            </div>
            <form className='add-task-form'>
                <div className="add-task-input-box">
                    <input type="text" placeholder='Adicionar nova tarefa'/>
                    <div className="icon-box">
                        <Icon className='add-icon' icon='carbon:add'/>
                    </div>
                </div>
            </form>
            <div className="tasks-container">

            </div>
            <div className="footer-logo">
                <a href="/">
                    <h1>devtasks</h1>
                </a>
            </div>
        </div>
    )
}