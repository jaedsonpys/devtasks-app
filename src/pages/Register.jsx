import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

import api from '../services/api';

import './Register.css'

export default function Register() {
    useEffect(() => {
        document.title = 'Crie uma conta DevTasks';
    })

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const registerUser = () => {
        api
            .post('/api/register', {
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
                if(response.status === 409) {
                    setErrorMsg('O email já está sendo utilizado')
                }
            })
    }

    return (
        <>
            <Header/>
            <div className="register-container">
                <div className="title">
                    <h1>Crie uma nova conta</h1>
                </div>
                <div className="form">
                    <Input type='text' onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Seu email' icon='carbon:email'/>
                    <Input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Crie uma senha' icon='carbon:password'/>
                    <div className="alert-box">
                        <p className='alert-text'>{errorMsg}</p>
                    </div>
                    <Button text='Criar conta' onClick={registerUser}/>
                    <div className="auth-link-box">
                        <p className='link'>
                            Já tem uma conta? <Link to='/login'>Faça login.</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}