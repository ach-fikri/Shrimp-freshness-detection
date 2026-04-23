import axios from "axios";

const API_URL = "http://192.168.0.102:3000/api/profile/";

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export const getUser = (callback) => {
    return axios.get(API_URL)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
            callback(false, err);
        })
}

export const updateUser = (data, callback) => {
    return axios.put(API_URL + "update", data)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
            callback(false, err);
        })
}