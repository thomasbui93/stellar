import {
  CATEGORY_CREATING,
  CATEGORY_CREATING_DONE,
  CATEGORY_CREATING_FAILED
} from './../../actions/category/constants'

import { List } from 'immutable'

const initialState = {
  category: null,
  isLoading: false,
  errors: List([])
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_CREATING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case CATEGORY_CREATING_DONE:
      return {
        ...state,
        category: action.category
      }
    case CATEGORY_CREATING_FAILED:
      return {
        ...state,
        errors: state.errors.insert(action.error)
      }
    default:
      return state
  }
}
