import axios from "axios";
import authService from "./auth";


// Default config options
const defaultOptions = {
    baseURL: "https://todo-nest-api.herokuapp.com",
    headers: {
        "x-api-key": "2doApp"
    }
};

// Update instance
const instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(
    config => {
        const token = authService.getUserSession();
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);
// Add a response interceptor
instance.interceptors.response.use(
    response => {
        // Do something with response data
        return response.data;
    },
    error => {
        // Do something with response error
        return Promise.reject(error.response);
    }
);
export default instance;

export const createAPIRequest = config => instance(config);
