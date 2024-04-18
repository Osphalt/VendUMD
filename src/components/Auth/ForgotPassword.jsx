import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase'; // Adjust the path as needed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/password-change`
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for the password reset link.");
      setTimeout(() => navigate('/login'), 5000);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <h2>Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Send Reset Link</button>
          {message && <div>{message}</div>}
        </form>
        <p>Remembered your password? <Link to="/login">Login here</Link>.</p>
      </div>
    </div>
  );
};

export default ForgotPassword;
