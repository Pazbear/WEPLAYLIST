import {
    MY_PLAYLIST,
    GET_PLAYLIST_BY_ID,
    SEARCH_PLAYLIST
} from '../_actions/types';



export default function (state = {}, action) {
    switch (action.type) {
        case MY_PLAYLIST:
            return { ...state, my_playlist: action.payload }
        case GET_PLAYLIST_BY_ID:
            return { ...state, get_playlist_by_id: action.payload }
        case SEARCH_PLAYLIST:
            return { ...state, searched_playlist: action.payload }
        default:
            return state
    }
}