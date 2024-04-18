import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import Logo from "./Logo/Logo.jsx";
import Searchbar from "./Searchbar/Searchbar.jsx";

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the loggedIn status from local storage
        localStorage.setItem('isLoggedIn', false);
        // Navigate to the login page
        navigate('/login');
    };

    return (
        <div id="header" className="bg-main w-fill h-header flex align-items-center">
            <Logo />
            <Searchbar />
            {/* Replace the profile text with a logout button */}
            <button onClick={handleLogout} style={{"paddingInline": "1em"}}>Logout</button>
        </div>
    );
}
