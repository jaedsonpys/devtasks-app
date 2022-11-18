import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Todo from './pages/Todo'

export default function App() {
    const checkLogin = () => {
        const token = localStorage.getItem('uAuth');
        if(token) {
            return true;
        } else {
            return false;
        }
    }

    const PrivateRoute = (props) => {
        let logged = checkLogin();

        if(logged) {
            return props.children;
        } else {
            return <Navigate to='/login'/>
        }
    }

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
            <Routes>
                <Route exact path='/todo' element={
                    <PrivateRoute>
                        <Todo></Todo>
                    </PrivateRoute>
                }/>
            </Routes>
        </Router>
    )
};