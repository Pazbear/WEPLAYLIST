import {
    MY_PLAYLIST,
    GET_PLAYLIST_BY_ID,
    GET_PLAYLIST_BY_USER,
    SEARCH_PLAYLIST,
    SAVE_PLAYLIST
} from '../_actions/types';



export default function (state = {}, action) {
    switch (action.type) {
        case MY_PLAYLIST:
            return { ...state, my_playlist: action.payload }
        case GET_PLAYLIST_BY_ID:
            return { ...state, get_playlist_by_id: action.payload }
        case GET_PLAYLIST_BY_USER:
            return { ...state, get_playlist_by_user: action.payload }
        case SEARCH_PLAYLIST:
            return { ...state, searched_playlist: action.payload }
        case SAVE_PLAYLIST:
            return { ...state, save_playlist: action.payload }
        default:
            return state
    }
}