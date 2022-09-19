import React from 'react';
import { Icon } from '@iconify/react';

import Header from '../components/Header';

export default function Home() {
    return (
        <>
            <Header/>
            <div className="home-container">
                <h1>Suas <span>tarefas</span> em um só lugar.</h1>
                <p>Adicione suas tarefas de forma 
                simples, rápida e organizada.</p>
                <div className="button-container">
                    <button>Comece agora <Icon icon="clarity:pencil-line" /></button>
                </div>
            </div>
        </>
    )
}