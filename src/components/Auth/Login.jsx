import { useContext, useState } from 'react';
import { Link} from 'react-router-dom';
import { supabase } from '../../supabase';
import './Login.css';
import SessionContext from '../context/SessionContext';

function LoginForm({ setLogin }) {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);

    const session = useContext(SessionContext)

    if(session) {
        console.log(session)
        
    }

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
            setLogin(true);
            window.location = '/'
        }
    };

    return (
        <div className="login-wrapper">
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
        </div>
    );
}

export default LoginForm;
