import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase'; // Ensure this path matches your project structure
import './Login.css';

const LoginForm = ({ setIsLoggedIn }) => { // Add this prop here
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = loginData;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setError(error.message);
        } else {
            setIsLoggedIn(true);
            navigate('/dashboard');
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/register">Register here</Link>.</p>
                <p><Link to="/forgot-password">Forgot Password?</Link></p>
            </form>
        </div>
    );
};

export default LoginForm;
