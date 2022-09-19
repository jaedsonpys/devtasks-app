import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Header() {
    return (
        <div className="header-container">
            <nav>
                <Link className='logo-link' to='/'>devtasks</Link>
                <div className="auth-container">
                    <Link className='login-link' to='/'>login</Link>
                    <Link className='register-link' to='/'>registre-se</Link>
                </div>
            </nav>
        </div>
    )
}