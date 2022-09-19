import React from 'react';
import { Link, Navigate } from 'react-router-dom';

import './Header.css'

export default function Header() {
    return (
        <header className="header-container">
            <nav>
                <Link className='logo-link' to='/'>
                    <h1>devtasks</h1>
                </Link>
                <div className="auth-container">
                    <Link className='login-link' to='/login'>
                        <h2>login</h2>
                    </Link>
                    <Link className='register-link' to='/register'>
                        <h2>registre-se</h2>
                    </Link>
                </div>
            </nav>
        </header>
    )
}