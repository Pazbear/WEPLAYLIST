import axios from 'axios';
import {
    ADD_MUSIC,
    GET_MUSICS_BY_PLAYLIST_ID,
    CHANGE_MUSIC_ORDER
} from './types';


const ApiUrl = "http://localhost:8000/api/musics"
const AxiosConfig = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } }

export function getMusicsByPlaylistId(playlist_id) {
    const request = axios.get(`${ApiUrl}/get/?playlist_id=${playlist_id}`, AxiosConfig)
        .then(response => response.data)
        .catch(error => error.response.data);
    return {
        type: GET_MUSICS_BY_PLAYLIST_ID,
        payload: request
    }
}

export function addMusic(dataToSubmit) {
    const request = axios.post(`${ApiUrl}/add`, dataToSubmit, AxiosConfig)
        .then(response => response.status)
        .catch(error => error.response.data);
    return {
        type: ADD_MUSIC,
        payload: request
    }
}

export function changeMusicOrder(music_id1, music_id2) {
    const request = axios.post(`${ApiUrl}/change-order`,
        { music_id1: music_id1, music_id2: music_id2 }, AxiosConfig)
        .then(response => response.status)
        .catch(error => error.response.data);
    return {
        type: CHANGE_MUSIC_ORDER,
        payload: request
    }
}