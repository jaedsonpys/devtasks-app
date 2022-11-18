import React from 'react';
import { Icon } from '@iconify/react';

import './Task.css'

export default function Task({ title, status, id, onClick }) {
    return (
        <div className="task-container" style={status === 'complete' ? {opacity: '30%'} : {}}>
            <div className="task-title-box">
                <h2 style={status === 'complete' ? {textDecoration: 'line-through'} : {}}>{title}</h2>
            </div>
            <div className='task-action-box'>
                <div className="task-action">
                    <button onClick={() => onClick(id, 'complete')}>
                        {status === 'incomplete' ? <Icon icon='eva:checkmark-outline'/> : <Icon icon="iconoir:cancel"/>}
                    </button>
                </div>
            </div>
        </div>
    );
}