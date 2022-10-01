import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

import api from '../services/api';

import './Login.css'

export default function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = () => {
        api
            .post('/api/register', {
                email: email,
                password: password
            })
            .then((response) => {
                if(response.status === 201) {
                    localStorage.setItem('uAuth', response.data.token);
                    localStorage.setItem('uEmail', email);
                    localStorage.setItem('uAuth', password);

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
                    <Input type='text' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Seu email' icon='carbon:email'/>
                    <Input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Sua senha' icon='carbon:password'/>
                    <Button text='Entrar na conta' onClick={registerUser}/>
                </div>
            </div>
        </>
    )
}