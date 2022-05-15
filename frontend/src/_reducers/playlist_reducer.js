import {
    MY_PLAYLIST,
    SEARCH_PLAYLIST
} from '../_actions/types';



export default function (state = {}, action) {
    switch (action.type) {
        case MY_PLAYLIST:
            return { ...state, my_playlist: action.payload }
        case SEARCH_PLAYLIST:
            return { ...state, searched_playlist: action.payload }
        default:
            return state
    }
}