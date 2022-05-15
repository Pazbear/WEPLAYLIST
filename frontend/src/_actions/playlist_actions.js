import axios from 'axios';
import {
    MY_PLAYLIST,
    SEARCH_PLAYLIST
} from './types';


const ApiUrl = "http://localhost:8000/api/playlists"
const AxiosConfig = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } }

export function my_playlist() {
    const request = axios.get(`${ApiUrl}/my-playlist`, AxiosConfig)
        .then(response => response.data)
        .catch(error => error.response.data);
    return {
        type: MY_PLAYLIST,
        payload: request
    }
}

export function search_playlist(input_str) {
    const request = axios.get(`${ApiUrl}/search/${input_str}`, AxiosConfig)
        .then(response => response.data)
        .catch(error => error.response.data);
    return {
        type: SEARCH_PLAYLIST,
        payload: request
    }
}