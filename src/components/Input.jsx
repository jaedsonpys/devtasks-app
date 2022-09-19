import React from 'react';
import { Icon } from '@iconify/react';

import './Input.css'

export default function Input({ type, placeholder, icon }) {
    return (
        <div className="input-box">
            <div className="icon-box">
                <Icon icon={icon} className='icon'/>
            </div>
            <input type={type} placeholder={placeholder}/>
        </div>
    )
}