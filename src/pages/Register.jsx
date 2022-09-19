import React from 'react';

import Header from '../components/Header';
import Input from '../components/Input';

export default function Register() {
    return (
        <>
            <Header/>
            <div className="register-container">
                <div className="title">
                    <h1>Crie uma nova conta.</h1>
                </div>
                <div className="form">
                    <Input type='text' placeholder='Seu email' icon='carbon:email'/>
                    <Input type='password' placeholder='Crie uma senha' icon='carbon:password'/>
                </div>
            </div>
        </>
    )
}