import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'http://localhost:5000',
})

axiosApi.interceptors.request.use(
    config => {
        const token = localStorage.getItem('tokenGastos');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export { axiosApi };