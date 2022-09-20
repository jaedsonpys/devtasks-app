import React from 'react';
import './Button.css'

export default function Button({ text, onClick }) {
    return (
        <button className='action-button' onClick={onClick}>{text}</button>
    )
}