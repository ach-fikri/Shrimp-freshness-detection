import axios from "axios";

const API_URL = "http://192.168.0.102:3000/api/predict/";
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

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
)

export const predict = (data, callback) => {
    axios.post(API_URL, data, {headers: {'Content-Type': 'multipart/form-data',}})
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
                callback(false, err);
            }
        )
}

export const savePredict = (data, callback) => {
    axios.post(API_URL + "save", data)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
                callback(false, err);
            }
        )
}

export const listPredict = (callback) => {
    axios.get(API_URL + "list")
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
                callback(false, err);
            }
        )
}

export const deletePredict = (data, callback) => {
    axios.delete(API_URL + "remove/" + data)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
                callback(false, err);
            }
        )
}

