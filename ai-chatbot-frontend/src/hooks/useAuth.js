import { useState, useEffect } from 'react';
import axios from 'axios';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const backendUrl = process.env.REACT_APP_API_URL;


    const login = async (email, user_password) => {
        try {
            const response = await axios.post(`${backendUrl}/auth/login`, {
                email,
                user_password,
            });
            localStorage.setItem('token', response.data.token);
            delete response.data.token;
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            return response.data;
        } catch (error) {
            setError(error);
            console.error('Login error:', error);
            throw error;
        }
    };


    const signup = async (body) => {
        try {
            const response = await axios.post(`${backendUrl}/auth/register`, { ...body });
            localStorage.setItem('token', response.data.token);
            delete response.data.token;
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            return response.data;
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };


    const checkAuth = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUser(user);
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return {
        user,
        loading,
        error,
        login,
        signup,
        logout,
    };
}
