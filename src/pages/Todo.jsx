import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import Task from '../components/Task';
import api from '../services/api';
import LoadingAnimation from '../components/Loading';

import './Todo.css';

export default function Todo(){
    const navigate = useNavigate();

    const [tasks, setTasks] = useState({});
    const [taskTag, setTaskTag] = useState('');
    const [taskName, setTaskName] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);

    useEffect(() => {
        document.title = 'Veja sua lista de tarefas';
        getTasks();
    }, []);

    const refreshToken = (callback) => {
        localStorage.removeItem('uAuth');

        api
            .get('/api/refreshToken')
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
                setTasks(response.data);
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
        if(!taskName) {
            alert('Por favor insira o nome da tarefa');
            return;
        }

        setLoadingStatus(true);
        const token = localStorage.getItem('uAuth');

        const task = {
            'name': taskName,
            'tag': taskTag || 'global'
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
                <div className="add-task-tag-box">
                    <input type="text" onChange={(e) => setTaskTag(e.target.value)}
                        value={taskTag} placeholder='Tag'
                    />
                </div>
                <div className="add-task-input-box">
                    <input type="text" onChange={(e) => setTaskName(e.target.value)}
                        value={taskName} placeholder='Nome da tarefa'
                    />
                    <button className="add-icon-button" type="submit" onClick={addTask}>
                        <Icon className='add-icon' icon='carbon:add'/>
                    </button>
                </div>
            </form>
            <div className="tasks-container">
                {Object.keys(tasks).map((tag, index) => (
                    <ul className="tasks-tag" >
                        {(tag !== 'global' && tag) && (
                            <h3>{tag}</h3>
                        )}
                        {tasks[tag].map((task, index) => (
                            <li key={task.id}>
                                <Task
                                    title={task.name} id={task.id}
                                    onClick={task.status === 'incomplete' ? updateTaskStatus : deleteTask}
                                    status={task.status}
                                />
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
            <div className="footer-logo">
                <a href="/">
                    <h1>devtasks</h1>
                </a>
                <h2>Feito por <a href="https://github.com/jaedsonpys">@jaedsonpys</a></h2>
            </div>
        </div>
    )
}