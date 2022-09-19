import React from 'react';

import Header from '../components/Header';
import Input from '../components/Input';

export default function Register() {
    return (
        <>
            <Header/>
            <div className="register-container">
                <h1>Crie uma nova conta.</h1>
                <Input type='text' placeholder='Seu email' icon='carbon:email'/>
            </div>
        </>
    )
}