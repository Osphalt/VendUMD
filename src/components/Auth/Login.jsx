import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const LoginForm = () => {
    // Add any login logic or state handling here

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the login submission
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="email" id="loginEmail" placeholder="Enter email" required />
                </div>
                <div className="form-group">
                    <input type="password" id="loginPassword" placeholder="Enter password" required />
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/Register">Register here</Link>.</p>
                <p><Link to="/forgot-password">Forgot Password?</Link></p>
            </form>
        </div>
    );
};

export default LoginForm;
