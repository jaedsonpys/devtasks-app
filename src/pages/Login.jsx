import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

import api from '../services/api';

import './Login.css'

export default function Login() {
    useEffect(() => {
        document.title = 'Entre em sua conta';
    })

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const loginUser = () => {
        if(email.length === 0 || password.length === 0) {
            setErrorMsg('Preencha email e senha');
        } else {
            setErrorMsg('');
            api
                .post('/api/login', {
                    email: email,
                    password: password
                })
                .then((response) => {
                    if(response.status === 201) {
                        localStorage.setItem('uAuth', response.data.token);
                        navigate('/todo');
                    }
                })
                .catch(({response}) => {
                    if(response.status === 401) {
                        setErrorMsg('Email ou senha incorreto');
                    }
                });
        }
    }

    return (
        <>
            <Header/>
            <div className="login-container">
                <div className="title">
                    <h1>Faça login na sua conta</h1>
                </div>
                <form className="form" onSubmit={(e) => e.preventDefault()}>
                    <Input type='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Seu email' icon='carbon:email'/>
                    <Input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Sua senha' icon='carbon:password'/>
                    <div className="alert-box">
                        <p className='alert-text'>{errorMsg}</p>
                    </div>
                    <Button text='Entrar na conta' type='submit' onClick={loginUser}/>
                    <div className="auth-link-box">
                        <p className='link'>
                            Não tem uma conta? <Link to='/register'>Crie uma.</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}