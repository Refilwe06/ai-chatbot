import React, { useContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.css'
import { UserContext } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Text from '../components/Text';
const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);


        if (!email || !password) {
            setError('Email and password are required');
            setLoading(false);
            return;
        }

        try {
            const user = await login(email, password);
            setUser(user);
            navigate('/chat-history');
        } catch ({ response }) {
            setError(response.data.err || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                {error && <Text text={error} className={'login-error'} />}

                <div className="login-input-container">
                    <Text text={'Email'} />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="login-input"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="login-input-container">
                    <Text text={'Password'} />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        placeholder="Enter your password"
                    />
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <small style={{ marginTop: '10px' }}>Not a user? Register <Link to={'/register'} > <b>here</b> </Link> </small>
            </form>
        </div>
    );
};

export default Login;
