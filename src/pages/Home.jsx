import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import './Home.css'

export default function Home() {
    return (
        <>
            <Header/>
            <div className="home-container">
                <h1>Suas <span>tarefas</span> em um só lugar.</h1>
                <div className="info">
                    <p>Adicione suas tarefas de forma 
                    simples, rápida e organizada.</p>
                    <div className="button-container">
                        <Link to='/register' className='button'>
                            Comece agora <Icon className='pencil-icon' icon="clarity:pencil-line" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
