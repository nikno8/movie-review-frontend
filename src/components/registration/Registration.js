import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for redirection
import axios from '../../api/axiosConfig';

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
            localStorage.setItem('token', response.data.token);  // Save token to localStorage
            console.log('Token set in storage:', localStorage.getItem('token'));
            navigate('/');  // Redirect to home page after registration
        } catch (error) {
            console.error('Registration failed:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
            <input type="text" name="login" placeholder="Login" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
}

export default Registration;
