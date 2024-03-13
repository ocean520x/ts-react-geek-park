import { getTokenInfo } from '@/utils/storage'
export type Auth = {
    token: string
    refresh_token: string
}
export type User = {
    id: string
    name: string
    photo: string
    art_count: number
    follow_count: number
    fans_count: number
    like_count: number
}
export type Profile = {
    name: string
} & UserProfile
export type UserProfile = {
    id: string
    photo: string
    name: string
    mobile: string
    gender: number
    birthday: string
    intro: string | null
}
const initState = {
    profile: {} as Profile,
    user: {} as User,
    auth: getTokenInfo()
}

//定义action类型
export type UserAction = { type: 'user/saveAuth', payload: Auth } | { type: 'user/saveUserInfo', payload: User } | { type: 'user/saveUserProfile', payload: UserProfile } | { type: 'user/removeAuth' }
export function userReducer(state = initState, action: UserAction) {
    switch (action.type) {
        case 'user/saveAuth':
            return { ...state, auth: action.payload }
        case 'user/saveUserInfo':
            return { ...state, user: action.payload }
        case 'user/saveUserProfile':
            return { ...state, profile: action.payload }
        case 'user/removeAuth':
            return { ...state, auth: { token: '', refresh_token: '' } }
        default:
            return state
    }
}