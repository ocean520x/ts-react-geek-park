import { combineReducers } from 'redux'
import { userReducer } from './user'
import channelReducer from './channel'
import searchReducer from './search'
const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer,
    search: searchReducer,
})

export default rootReducer