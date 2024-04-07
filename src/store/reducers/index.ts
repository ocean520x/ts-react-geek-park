import { combineReducers } from 'redux'
import { userReducer } from './user'
import channelReducer from './channel'
import searchReducer from './search'
import articleReducer from './article'
const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer,
    search: searchReducer,
    article: articleReducer,
})

export default rootReducer