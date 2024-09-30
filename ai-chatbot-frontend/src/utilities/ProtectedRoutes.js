import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { user, setUser } = useContext(UserContext);
    const token = localStorage.getItem('token');

    if (!token || !user) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        return <Navigate to='/login' />
    }

    return <Outlet />
}

export default ProtectedRoutes;