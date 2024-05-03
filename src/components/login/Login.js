
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setAuthToken } from '../../utils/auth';
import axios from '../../api/axiosConfig';
import './Login.css'; // Ensure this path is correct


const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Hook for redirection

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/api/v1/auth/login", { login, password });
            setAuthToken(response.data.token); // Set the token in local storage
            console.log(response.data.token);
            navigate('/'); // Redirect to the homepage
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error("Login failed:", error);
            setAuthToken(null); // Ensure token is cleared if login fails
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={onSubmit} className="login-form">
                <h2>Account Login</h2>
                <div>
                    <label htmlFor="login">Username</label>
                    <input type="text" name="login" value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Enter your username" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
