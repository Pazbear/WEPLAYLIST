import {
    SUBSCRIPT,
    MY_SUBSCRIPTIONS
} from '../_actions/types';



export default function (state = {}, action) {
    switch (action.type) {
        case SUBSCRIPT:
            return { ...state, subscript: action.payload }
        case MY_SUBSCRIPTIONS:
            return { ...state, my_subscriptions: action.payload }
        default:
            return state
    }
}