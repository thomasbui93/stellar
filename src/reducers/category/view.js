import {
  CATEGORY_REQUESTING_VIEW,
  CATEGORY_REQUESTING_VIEW_DONE,
  CATEGORY_REQUESTING_VIEW_FAILED
} from './../../actions/category/constants'

import { List } from 'immutable'

const initialState = {
  isLoading: false,
  notes: List([]),
  notebook: null,
  error: null,
  pages: 1
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_REQUESTING_VIEW_DONE:
      return {
        ...state,
        notes: List(action.view.notes),
        notebook: action.view.notebook,
        pages: action.view.pagination.pages
      }
    case CATEGORY_REQUESTING_VIEW_FAILED:
      return {
        ...state,
        error: action.error
      }
    case CATEGORY_REQUESTING_VIEW:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}
