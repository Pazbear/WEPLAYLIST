import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from './types';

const ApiUrl = "/api"

export function loginUser(dataToSubmit) {
    const request = axios.post(`${ApiUrl}/login`, dataToSubmit)
        .then(response => response.data)
        .catch(error => error.response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function authUser() {
    const request = axios.get(`${ApiUrl}/get-session`)
        .then(response => response.data)
        .catch(error => error.response.data);
    return {
        type: AUTH_USER,
        payload: request
    }
}

export function registerUser(dataToSubmit) {
    const request = axios.post(`${ApiUrl}/register`, dataToSubmit)
        .then(response => response.data)
        .catch(error => error.response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}
