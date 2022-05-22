import {
    ADD_MUSIC,
    GET_MUSICS_BY_PLAYLIST_ID
} from '../_actions/types';



export default function (state = {}, action) {
    switch (action.type) {
        case GET_MUSICS_BY_PLAYLIST_ID:
            return { ...state, get_musics_by_playlist_id: action.payload }
        case ADD_MUSIC:
            return { ...state, add_muic: action.payload }
        default:
            return state
    }
}