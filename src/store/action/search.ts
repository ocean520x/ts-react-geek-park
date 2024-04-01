import { getSuggestionAPI } from "@/api/search"
import { AppDispatch } from ".."
import { SearchAction } from "../reducers/search"

export const getSuggestionAction = (keyword: string) => {
  return async (dispatch: AppDispatch) => {
    const res = await getSuggestionAPI(keyword)
    dispatch({ type: 'search/saveSuggestion', payload: res.data.options })
  }
}

export const clearSuggestionAction = (payload: null): SearchAction => {
  return { type: 'search/clearSuggestion', payload }
}

export const saveHistoriesAction = (payload: string): SearchAction => {
  return { type: 'search/saveHistories', payload }
}

export const clearHistoriesAction = (payload: null): SearchAction => {
  return { type: 'search/clearHistories', payload }
}