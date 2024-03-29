
export type Channel = {
  id: number
  name: string
}

const initState = {
  userList: [] as Channel[],
  allList: [] as Channel[],
  currentId: 0
}

export type ChannelAction = { type: 'channel/saveUserList'; payload: Channel[] } | { type: 'channel/setChannelId'; payload: number } | { type: 'channel/saveAllList'; payload: Channel[] } | { type: 'channel/updateUserChannels'; payload: Channel } | { type: 'channel/delUserChannel'; payload: number }

export default function channelReducer(state = initState, action: ChannelAction) {
  switch (action.type) {
    case 'channel/saveUserList':
      return { ...state, userList: action.payload }
    case 'channel/setChannelId':
      return { ...state, currentId: action.payload }
    case 'channel/saveAllList':
      return { ...state, allList: action.payload }
    case 'channel/updateUserChannels':
      return { ...state, userList: [...state.userList, action.payload] }
    case 'channel/delUserChannel':
      return { ...state, userList: state.userList.filter(v => v.id !== action.payload) }
    default:
      return state
  }
}