// // src/components/Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../../api/axiosConfig';

// const Login = () => {
//     const [credentials, setCredentials] = useState({ login: '', password: '' });
//     const navigate = useNavigate();  // Hook to manage navigation

//     const handleChange = (e) => {
//         setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/v1/auth/login', credentials);
//             localStorage.setItem('token', response.data.token);  // Save token to localStorage
//             console.log('Token set in storage:', localStorage.getItem('token'));
//             navigate('/');  // Redirect to home page
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="login" placeholder="Login" onChange={handleChange} />
//             <input type="password" name="password" placeholder="Password" onChange={handleChange} />
//             <button type="submit">Login</button>
//         </form>
//     );
// }

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setAuthToken } from '../../utils/auth';
import axios from '../../api/axiosConfig';

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
        } catch (error) {
            console.error("Login failed:", error);
            setAuthToken(null); // Ensure token is cleared if login fails
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="login">Login</label>
                <input type="text" name="login" onChange={(e) => setLogin(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Sign In</button>
        </form>
    );
};

export default Login;
