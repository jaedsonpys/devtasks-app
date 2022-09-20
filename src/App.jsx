import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
            </Routes>
            <Routes>
                <Route exact path='/register' element={<Register/>}/>
            </Routes>
            <Routes>
                <Route exact path='/login' element={<Login/>}/>
            </Routes>
        </Router>
    )
};