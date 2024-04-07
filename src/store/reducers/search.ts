import { getLocalHistories } from "@/utils/storage";

export type SearchResultType = {
  art_id: string;
  title: string;
  aut_id: string;
  aut_name: string;
  comm_count: number;
  pubdate: string;
  cover: {
    type: number;
    images: string[];
  };
  like_coun: number;
  collect_count: number;
}
const initState = {
  suggestions: [] as string[],
  histories: getLocalHistories(),
  results: [] as SearchResultType[]
}


export type SearchAction = { type: 'search/saveSuggestion'; payload: string[] } | { type: 'search/clearSuggestion', payload: null } | { type: 'search/saveHistories'; payload: string } | { type: 'search/clearHistories', payload: null } | { type: 'search/saveResults'; payload: SearchResultType[] } | { type: 'search/clearResults'; payload: null }

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
    case 'search/saveResults':
      return { ...state, results: [...state.results, ...payload] }
    case 'search/clearResults':
      return { ...state, results: [] }
    default:
      return state
  }
}