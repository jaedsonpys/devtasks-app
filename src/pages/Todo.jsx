import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import Task from '../components/Task';
import api from '../services/api';
import LoadingAnimation from '../components/Loading';

import './Todo.css';

export default function Todo(){
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    useEffect(() => {
        document.title = 'Veja sua lista de tarefas';
        getTasks();
    }, []);

    const refreshToken = (callback) => {
        localStorage.removeItem('uAuth');

        api
            .get('/api/refreshToken', {withCredentials: true})
            .then((response) => {
                localStorage.setItem('uAuth', response.data.token);
                callback();
            })
            .catch(({response}) => {
                if(response.status === 401) {
                    navigate('/login')
                }
            });
    }

    const getTasks = () => {
        setLoadingStatus(true);
        const token = localStorage.getItem('uAuth');

        api
            .get('/api/tasks', {headers: {'Authorization': `Bearer ${token}`}})
            .then((response) => {
                let completeTasks = [];
                let incompleteTasks = [];

                response.data.forEach(value => {
                    if(value['status'] === 'complete') {
                        completeTasks.push(value);
                    } else {
                        incompleteTasks.push(value);
                    }
                });

                setTasks([...incompleteTasks, ...completeTasks]);
            })
            .catch(({response}) => {
                if(response.status === 401) {
                    refreshToken(() => {
                        getTasks();
                    });
                }
            })
            .finally(() => setLoadingStatus(false));
    }

    const addTask = () => {
        setLoadingStatus(true);
        const token = localStorage.getItem('uAuth');
        const task = {
            'name': taskName,
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
                    refreshToken(() => {
                        addTask();
                    });
                }
            })
            .finally(() => setLoadingStatus(false));

        setTaskName('');
    };

    const updateTaskStatus = (taskId) => {
        setLoadingStatus(true);
        const token = localStorage.getItem('uAuth');
        const task = {
            'id': taskId,
            'status': 'complete'
        }

        api
            .put('/api/tasks', task, {headers: {'Authorization': `Bearer ${token}`}})
            .then((response) => {
                if(response.status === 201) {
                    getTasks();
                }
            })
            .catch(({response}) => {
                if(response.status === 401) {
                    refreshToken(() => {
                        updateTaskStatus(taskId);
                    });
                }
            })
            .finally(() => setLoadingStatus(false));
    };

    const deleteTask = (taskId) => {
        setLoadingStatus(true);
        const token = localStorage.getItem('uAuth');
        const task = {
            'id': taskId
        }

        api
            .delete('/api/tasks', {headers: {'Authorization': `Bearer ${token}`}, data: task})
            .then((response) => {
                if(response.status === 200) {
                    getTasks();
                }
            })
            .catch(({response}) => {
                if(response.status === 401) {
                    refreshToken(() => {
                        deleteTask(taskId);
                    });
                }
            })
            .finally(() => setLoadingStatus(false));
    };

    return (
        <div className="todo-container">
            <div className="todo-title">
                <h1>Suas tarefas</h1>
                <div className="loading-container">
                    {loadingStatus && 
                        <LoadingAnimation/>
                    }
                </div>
            </div>
            <form className='add-task-form' onSubmit={(e) => e.preventDefault()}>
                <div className="add-task-input-box">
                    <input type="text" onChange={(e) => setTaskName(e.target.value)}
                        value={taskName} placeholder='Adicionar nova tarefa'
                    />
                    <button className="add-icon-button" type="submit" onClick={addTask}>
                        <Icon className='add-icon' icon='carbon:add'/>
                    </button>
                </div>
            </form>
            <ul className="tasks-container">
                {tasks.map((data) => {
                    return (
                        <li key={data.id}>
                            <Task
                                title={data.name} id={data.id}
                                onClick={data.status === 'incomplete' ? updateTaskStatus : deleteTask}
                                status={data.status}
                            />
                        </li>
                    )
                })}
            </ul>
            <div className="footer-logo">
                <a href="/">
                    <h1>devtasks</h1>
                </a>
                <h2>Feito por <a href="https://github.com/jaedsonpys">@jaedsonpys</a></h2>
            </div>
        </div>
    )
}