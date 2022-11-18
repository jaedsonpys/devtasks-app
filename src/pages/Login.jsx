import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

import api from '../services/api';

import './Login.css'

export default function Login() {
    const navigate = useNavigate();

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const loginUser = () => {
        api
            .post('/api/login', {
                email: userEmail,
                password: userPassword
            })
            .then((response) => {
                if(response.status === 201) {
                    localStorage.setItem('uAuth', response.data.token);
                    navigate('/todo');
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <>
            <Header/>
            <div className="login-container">
                <div className="title">
                    <h1>Faça login na sua conta</h1>
                </div>
                <div className="form">
                    <Input type='text' onChange={(e) => setUserEmail(e.target.value)} value={userEmail} placeholder='Seu email' icon='carbon:email'/>
                    <Input type='password' onChange={(e) => setUserPassword(e.target.value)} value={userPassword} placeholder='Sua senha' icon='carbon:password'/>
                    <Button text='Entrar na conta' onClick={loginUser}/>
                    <div className="auth-link-box">
                        <p className='link'>
                            Não tem uma conta? <Link to='/register'>Crie uma.</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}