import { combineReducers } from 'redux';
import user from './user_reducer';
import playlist from './playlist_reducer'
import music from './music_reducer'
import subscription from './subscription_reducer'

const rootReducer = combineReducers({
    user,
    playlist,
    music,
    subscription,
});

export default rootReducer;