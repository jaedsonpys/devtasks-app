import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import Task from '../components/Task';
import api from '../services/api';

import './Todo.css';

export default function Todo(){
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        const token = localStorage.getItem('uAuth');

        api
            .get('/api/tasks', {headers: {'Authorization': `Bearer ${token}`}})
            .then((response) => {
                setTasks(response.data);
            })
            .catch(({response}) => {
                if(response.status === 401) {
                    navigate('/login')
                }
            })
    }

    const addTask = () => {
        const task = {
            'task_name': taskName,
        }

        api
            .post('/api/tasks', task, {headers: {'Authorization': `Bearer ${token}`}})
            .then((response) => {
                if(response.status === 201) {
                    getTasks();
                }
            })
            .catch(({response}) => {
                if(response.status === 401) {
                    navigate('/login')
                }
            })
    }

    return (
        <div className="todo-container">
            <div className="todo-title">
                <h1>Suas tarefas</h1>
            </div>
            <form className='add-task-form'>
                <div className="add-task-input-box">
                    <input type="text" onChange={(e) => setTaskName(e.target.value)}
                        value={taskName} placeholder='Adicionar nova tarefa'
                    />
                    <div className="icon-box">
                        <Icon className='add-icon' icon='carbon:add'/>
                    </div>
                </div>
            </form>
            <div className="tasks-container">
                {tasks.map((data) => <Task title={data.name} status={data.status}/>)}
            </div>
            <div className="footer-logo">
                <a href="/">
                    <h1>devtasks</h1>
                </a>
            </div>
        </div>
    )
}