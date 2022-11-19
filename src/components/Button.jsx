import React from 'react';
import './Button.css'

export default function Button({ text, type, onClick }) {
    return (
        <button type={type} className='action-button' onClick={onClick}>{text}</button>
    )
}