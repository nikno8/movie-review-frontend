import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for redirection
import axios from '../../api/axiosConfig';
import './Registration.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        login: '',
        password: ''
    });
    const navigate = useNavigate();  // Hook to manage navigation

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/auth/register', formData);
            localStorage.setItem('auth_token', response.data.token);  // Save token to localStorage
            console.log('Token set in storage:', localStorage.getItem('token'));
            navigate('/');  // Redirect to home page after registration
            window.location.reload(); // Reload the page
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    return (
        <div className="registration-container">
            <form onSubmit={handleSubmit} className="registration-form">
                <h2>Account Registration</h2>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" placeholder="Enter your first name" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" placeholder="Enter your last name" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="login">Username</label>
                    <input type="text" name="login" placeholder="Choose a username" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Choose a password" onChange={handleChange} />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Registration;
