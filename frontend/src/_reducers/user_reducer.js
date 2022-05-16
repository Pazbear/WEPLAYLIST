import {
    LOGIN_USER,
    GET_USER,
    REGISTER_USER,
    AUTH_USER,
} from '../_actions/types';



export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, login: action.payload }
        case GET_USER:
            return { ...state, get_user: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case REGISTER_USER:
            return { ...state, register: action.payload }
        default:
            return state
    }
}