import axios from 'axios';
import {
    MY_PLAYLIST,
    GET_PLAYLIST_BY_ID,
    GET_PLAYLIST_BY_USER,
    SEARCH_PLAYLIST,
    SAVE_PLAYLIST,
} from './types';


const ApiUrl = "http://localhost:8000/api/playlists"
const AxiosConfig = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } }

export function getMyPlaylist() {
    const request = axios.get(`${ApiUrl}/my-playlist`, AxiosConfig)
        .then(response => response.data)
        .catch(error => error.response.data);
    return {
        type: MY_PLAYLIST,
        payload: request
    }
}

export function getPlaylistById(playlist_id) {
    const request = axios.get(`${ApiUrl}/${playlist_id}`, AxiosConfig)
        .then(response => response.data)
        .catch(error => error.response.data);
    return {
        type: GET_PLAYLIST_BY_ID,
        payload: request
    }
}

export function searchPlaylist(input_str) {
    const request = axios.get(`${ApiUrl}/search/${input_str}`, AxiosConfig)
        .then(response => response.data)
        .catch(error => error.response.data);
    return {
        type: SEARCH_PLAYLIST,
        payload: request
    }
}

export function savePlaylist(dataToSubmit) {
    const request = axios.post(`${ApiUrl}/save`, dataToSubmit, AxiosConfig)
        .then(response => response.status)
        .catch(error => error.response.data);
    return {
        type: SAVE_PLAYLIST,
        payload: request
    }
}

export function getPlaylistByUser(to_user_id) {
    const request = axios.get(`${ApiUrl}/get/?user=${to_user_id}`, AxiosConfig)
        .then(response => response.data)
    return {
        type: GET_PLAYLIST_BY_USER,
        payload: request
    }
}