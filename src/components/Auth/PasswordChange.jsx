// PasswordChange.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase';

const PasswordChange = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.updateUser({
            password: password // New password from the user input
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage("Your password has been updated.");
            setTimeout(() => navigate('/login'), 3000); // Redirect to login after update
        }
    };

    return (
        <div className="login-wrapper">
            <div className="form-container">
                <h2>Update Your Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Update Password</button>
                    {message && <div>{message}</div>}
                </form>
            </div>
        </div>
    );
};

export default PasswordChange;
