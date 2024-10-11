import axios from 'axios';
import { urls } from '../config';

const baseURL =
    process.env.REACT_APP_ENVIROMENT === 'local'
        ? urls.api.local
        : urls.api.prod;

const api = axios.create({
    baseURL,
});

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log('response ', error.response);
        if (
            error.response.status === 403 &&
            error.response?.data?.message === 'Access Denied'
        ) {
            localStorage.removeItem('@CORELAB:token');
            setTimeout(() => window.location.reload(), 500);
            return {
                data: { data: [], token: null },
            };
        }
        return Promise.reject(error);
    },
);

export default api;
