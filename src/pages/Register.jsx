import React from 'react';

import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

import './Register.css'

export default class Register extends React.Component {
    componentDidMount() {
        document.title = 'Crie sua conta na DevTasks';
    }

    render() {
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
                        <Button text='Criar conta' onClick={() => console.log('register')}/>
                    </div>
                </div>
            </>
        )
    }
}