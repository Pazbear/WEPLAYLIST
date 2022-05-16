import axios from 'axios';
import {
    LOGIN_USER,
    GET_USER,
    REGISTER_USER,
    AUTH_USER,
} from './types';

const ApiUrl = "http://localhost:8000/api/users"
const AxiosConfig = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } }
const AxiosLoginConfig = { headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } }
//login

//data : {email : ?, password: ?}
export function loginUser(dataToSubmit) {
    const formdataToSubmit = new FormData()
    formdataToSubmit.append('username', dataToSubmit.email)
    formdataToSubmit.append('password', dataToSubmit.password)
    const request = axios.post(`${ApiUrl}/login`, formdataToSubmit, AxiosLoginConfig)
        .then(response => response.data)
        .catch(error => error.response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function getUser(user_id) {
    const request = axios.get(`${ApiUrl}/${user_id}`, AxiosConfig)
        .then(response => response.data)
        .catch(error => error.response.data);
    return {
        type: GET_USER,
        payload: request
    }
}

export function authUser() {
    const request = axios.get(`${ApiUrl}/me`, AxiosConfig)
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
