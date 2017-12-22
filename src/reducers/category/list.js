import {
  CATEGORY_REQUEST_LIST_DONE,
  CATEGORY_REQUESTING_LIST,
  CATEGORY_REQUEST_LIST_FAILED
} from './../../actions/category/constants'

import { List } from 'immutable'

const initialState = {
  isLoading: false,
  categories: List([]),
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_REQUEST_LIST_DONE:
      return {
        ...state,
        categories: List(action.categories)
      }
    case CATEGORY_REQUEST_LIST_FAILED:
      return {
        ...state,
        error: action.error
      }
    case CATEGORY_REQUESTING_LIST:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}
