import {
  CATEGORY_SEARCHING_LIST,
  CATEGORY_SEARCHING_LIST_DONE,
  CATEGORY_SEARCHING_LIST_FAILED,
  SELECT_CATEGORY
} from './../../actions/category/constants'

import { List } from 'immutable'

const initialState = {
  isSearching: false,
  categories: null,
  error: null,
  currentCategory: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_SEARCHING_LIST:
      return {
        ...state,
        isSearching: action.isSearching
      }
    case CATEGORY_SEARCHING_LIST_FAILED:
      return {
        ...state,
        error: action.error
      }
    case CATEGORY_SEARCHING_LIST_DONE:
      return {
        ...state,
        categories: List(action.categories)
      }
    case SELECT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
        categories: action.categories
      }
    default:
      return state
  }
}
