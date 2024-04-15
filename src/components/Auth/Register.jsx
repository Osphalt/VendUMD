import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';
import './Register.css';

const Register = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = formState;

    if (!email.endsWith('@umich.edu')) {
      setError("Please use your @umich.edu email.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      alert('Registration successful! Please check your email to verify your account, then login.');
      navigate('/login');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
