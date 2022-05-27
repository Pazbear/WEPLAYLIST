import axios from 'axios';
import {
    SUBSCRIPT,
    MY_SUBSCRIPTIONS
} from './types';

const ApiUrl = "http://localhost:8000/api/subscriptions"
const AxiosConfig = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } }

export function subscript(dataToSubmit) {
    const request = axios.post(`${ApiUrl}/add`, dataToSubmit, AxiosConfig)
        .then(response => response.status)
    return {
        type: SUBSCRIPT,
        payload: request
    }
}

export function getMySubscriptions() {
    const request = axios.get(`${ApiUrl}/get`, AxiosConfig)
        .then(response => response.data)
    return {
        type: MY_SUBSCRIPTIONS,
        payload: request
    }
}