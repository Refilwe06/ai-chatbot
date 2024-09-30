import { useState } from 'react';
import axios from 'axios';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading] = useState(true);
    const backendUrl = process.env.REACT_APP_API_URL;


    const login = async (email, user_password) => {
        try {
            const response = await axios.post(`${backendUrl}/auth/login`, {
                email,
                user_password,
            });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                delete response.data.token;
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
                return response.data;
            }
            throw new Error('Error logging in. Please try again.');
        } catch (error) {
            setError(error);
            console.error('Login error:', error);
            throw error;
        }
    };


    const signup = async (body) => {
        try {
            const response = await axios.post(`${backendUrl}/auth/register`, { ...body });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                delete response.data.token;
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
                return response.data;
            }
            throw new Error('Signup failed. Please try again.');
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    };

    return {
        user,
        loading,
        error,
        login,
        signup,
    };
}
