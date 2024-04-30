
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080',  // Предполагаем, что ваш бэкенд на порту 8080
});
