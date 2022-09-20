import React from 'react';

import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

import './Login.css'

export default class Register extends React.Component {
    componentDidMount() {
        document.title = 'Entre em sua conta DevTasks.';
    };

    render() {
        return (
            <>
                <Header/>
                <div className="login-container">
                    <div className="title">
                        <h1>Faça login na sua conta</h1>
                    </div>
                    <div className="form">
                        <Input type='text' placeholder='Seu email' icon='carbon:email'/>
                        <Input type='password' placeholder='Sua senha' icon='carbon:password'/>
                        <Button text='Entrar na conta' onClick={() => console.log('register')}/>
                    </div>
                </div>
            </>
        )
    }
}