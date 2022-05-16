import axios from 'axios';
import {
    GET_MUSICS_BY_PLAYLIST_ID
} from './types';


const ApiUrl = "http://localhost:8000/api/musics"
const AxiosConfig = { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } }

export function get_musics_by_playlist_id(playlist_id) {
    const request = axios.get(`${ApiUrl}/get/?playlist_id=${playlist_id}`, AxiosConfig)
        .then(response => response.data)
        .catch(error => error.response.data);
    return {
        type: GET_MUSICS_BY_PLAYLIST_ID,
        payload: request
    }
}
