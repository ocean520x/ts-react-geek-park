import { getLocalHistories } from "@/utils/storage";

const initState = {
  suggestions: [] as string[],
  histories: getLocalHistories()
}


export type SearchAction = { type: 'search/saveSuggestion'; payload: string[] } | { type: 'search/clearSuggestion', payload: null } | { type: 'search/saveHistories'; payload: string } | { type: 'search/clearHistories', payload: null }

export default function searchReducer(state = initState, { type, payload }: SearchAction) {
  switch (type) {
    case 'search/saveSuggestion':
      return { ...state, suggestions: payload.filter((item) => item) }
    case 'search/clearSuggestion':
      return { ...state, suggestions: [] }
    case 'search/saveHistories':
      const newList = state.histories.filter((item) => item !== payload)
      return { ...state, histories: [payload, ...newList] }
    case 'search/clearHistories':
      return { ...state, histories: [] }
    default:
      return state
  }
}