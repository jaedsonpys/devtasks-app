import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.193:5500'
});

export default api;