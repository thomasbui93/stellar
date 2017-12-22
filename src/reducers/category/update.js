import {
  CATEGORY_UPDATING,
  CATEGORY_UPDATING_DONE,
  CATEGORY_UPDATING_FAILED
} from './../../actions/category/constants'

import { List, Set } from 'immutable'

const initialState = {
  updatingList: Set([]),
  updatedCategory: null,
  errors: List([])
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_UPDATING:
      return {
        ...state,
        updatingList: action.isLoading ? state.updatingList.add(action.updatingKey) : state.updatingList.remove(action.updatingKey)
      }
    case CATEGORY_UPDATING_DONE:
      return {
        ...state,
        updatedCategory: action.updatedCategory
      }
    case CATEGORY_UPDATING_FAILED:
      return {
        ...state,
        errors: state.errors.insert(action.error)
      }
    default:
      return state
  }
}
