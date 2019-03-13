import axios from 'axios';
let http = axios.create({
    baseURL: 'http://127.0.0.1:8085/',
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
});

export default http;