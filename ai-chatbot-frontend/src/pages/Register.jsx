import React, { useContext, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/auth.css';
import Text from '../components/Text';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Register = () => {
  const { signup } = useAuth();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [user_password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);


    if (!first_name || !last_name || !email || !user_password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const user = await signup({ first_name, last_name, email, user_password });
      setUser(user);
      navigate('/chat-history');
    } catch ({ response }) {
      setError(response.data.err || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        {error && <p className="register-error">{error}</p>}

        <div className="register-input-container">
          <Text text={'First Name'} />
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            className="register-input"
            placeholder="Enter your first name"
          />
        </div>

        <div className="register-input-container">
          <Text text={'Last Name'} />
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            className="register-input"
            placeholder="Enter your last name"
          />
        </div>

        <div className="register-input-container">
          <Text text={'Email'} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="register-input"
            placeholder="Enter your email"
          />
        </div>

        <div className="register-input-container">
          <Text text={'Password'} />
          <input
            type="password"
            value={user_password}
            onChange={(e) => setPassword(e.target.value)}
            className="register-input"
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Signing up...' : 'Register'}
        </button>
        <small style={{ marginTop: '10px' }}>Already a user? Login <Link to={'/login'} > <b>here</b> </Link> </small>

      </form>
    </div>
  );
};

export default Register;
