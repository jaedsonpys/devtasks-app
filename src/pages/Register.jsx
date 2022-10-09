import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';

import api from '../services/api';

import './Register.css'

export default function Register() {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const navigate = useNavigate();

    const registerUser = () => {
        api
            .post('/api/register', {
                email: userEmail,
                password: userPassword
            })
            .then((response) => {
                if(response.status === 201) {
                    localStorage.setItem('uAuth', response.data.token);
                    navigate('/todo');
                }
            })
    }

    const onChangeEmailInput = (e) => {
        setUserEmail(e.target.value);
    }

    const onChangePasswordInput = (e) => {
        setUserPassword(e.target.value);
    }

    return (
        <>
            <Header/>
            <div className="register-container">
                <div className="title">
                    <h1>Crie uma nova conta</h1>
                </div>
                <div className="form">
                    <Input type='text' onChange={onChangeEmailInput} placeholder='Seu email' icon='carbon:email'/>
                    <Input type='password' onChange={onChangePasswordInput} placeholder='Crie uma senha' icon='carbon:password'/>
                    <Button text='Criar conta' onClick={registerUser}/>
                </div>
            </div>
        </>
    )
}