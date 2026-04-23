import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API_URL = "http://192.168.0.102:3000/api/";


export const register = (data, callback) => {
    axios.post(API_URL + "auth/register", data)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
                callback(false, err);
            }
        )
}

export const login = (data, callback) => {
    axios.post(`${API_URL}auth/login`, data)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
            callback(false, err);
        })
}

export const logout = (callback) => {
    axios.post(API_URL + "auth/logout")
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
                callback(false, err);
            }
        )
}

export const forgotPassword = (data, callback) => {
    axios.post(API_URL + "forget-password", data)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
                callback(false, err);
            }
        )
}

export const resetPassword = (data, callback) => {
    axios.post(API_URL + "reset-password", data)
        .then((res) => {
            callback(true, res);
        })
        .catch((err) => {
                callback(false, err);
            }
        )
}

export const getUser = () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    return user
}



