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

    const RedirectIfLogged = (props) => {
        let logged = checkLogin();

        if(logged) {
            return <Navigate to='/todo'/>;
        } else {
            return props.children;
        }
    }

    return (
        <Router>
            <Routes>
            <Route exact path='/' element={
                <RedirectIfLogged>
                    <Home/>
                </RedirectIfLogged>
            }/>
            </Routes>
            <Routes>
                <Route exact path='/register' element={<Register/>}/>
            </Routes>
            <Routes>
                <Route exact path='/login' element={
                    <RedirectIfLogged>
                        <Login/>
                    </RedirectIfLogged>
                }/>
            </Routes>
            <Routes>
                <Route exact path='/todo' element={
                    <PrivateRoute>
                        <Todo/>
                    </PrivateRoute>
                }/>
            </Routes>
        </Router>
    )
};