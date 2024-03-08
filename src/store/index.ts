import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import { thunk } from 'redux-thunk'
const store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(thunk)))

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
export default store