import { useState } from 'react';
import axios from 'axios';

const useChatAPI = (user_id, token) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const backendUrl = process.env.REACT_APP_API_URL;
    const sendMessage = async (body) => {
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/chat/send-message`, { ...body, user_id }, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data) {
                return response.data;
            }
            throw new Error('Error sending message');
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const getMessages = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${backendUrl}/chat/get-messages/${user_id}`, { headers: { Authorization: `Bearer ${token}` } });
            if (Array.isArray(response.data)) {
                return response.data;
            }
            throw new Error(response?.err || 'Error getting messages');
        } catch (err) {
            return err;
        } finally {
            setLoading(false);
        }
    };

    const clearHistory = async () => {
        setLoading(true);
        try {
            const response = await axios.delete(`${backendUrl}/chat/clear-history/${user_id}`, { headers: { Authorization: `Bearer ${token}` } });
            if (Array.isArray(response.data)) {
                return response.data;
            }
            throw new Error('Error clearing messages');
        } catch (err) {
            setError(err);
            return err;
        } finally {
            setLoading(false);
        }
    };

    const reviewAnswer = async (session_id, review) => {
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}/chat/review-answer`, { session_id, review }, { headers: { Authorization: `Bearer ${token}` } });
            if (Array.isArray(response.data)) {
                return response.data;
            }
            throw new Error('Error sending answer review');
        } catch (err) {
            setError(err);
            return err;
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, getMessages, clearHistory, reviewAnswer, loading, error };
};

export default useChatAPI;
