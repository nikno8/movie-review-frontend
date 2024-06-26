import axios from 'axios';
import { getAuthToken } from '../utils/auth';

const axiosInstance = axios.create({
    baseURL: 'http://147.45.246.162:8080', 
});

axiosInstance.interceptors.request.use(config => {
    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;

