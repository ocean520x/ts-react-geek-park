import { getTokenInfo } from '@/utils/storage'
export type Auth = {
    token: string
    refresh_token: string
}
const initState = {
    profile: { username: '游客' },
    auth: getTokenInfo()
}

//定义action类型
export type UserAction = { type: 'user/saveAuth', payload: Auth }
export function userReducer(state = initState, action: UserAction) {
    switch (action.type) {
        case 'user/saveAuth':
            return { ...state, auth: action.payload }
        default:
            return state
    }
}