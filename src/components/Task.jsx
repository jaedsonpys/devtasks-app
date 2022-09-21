import React from 'react';
import { Icon } from '@iconify/react';

import './Task.css'

export default function Task({ title, status, onClick }) {
    return (
        <div className="task-container">
            <div className="task-title-box">
                <h2>{title}</h2>
            </div>
            <div className='task-action-box'>
                <div className="task-action">
                    <button onClick={onClick}>
                        {status === 'incomplete' ? <Icon icon='eva:checkmark-outline'/> : <Icon icon="iconoir:cancel"/>}
                    </button>
                </div>
            </div>
        </div>
    );
}