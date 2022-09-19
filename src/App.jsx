import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
            <Routes>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </Router>
    )
};