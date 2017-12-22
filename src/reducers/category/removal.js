import {
  CATEGORY_REMOVING,
  CATEGORY_REMOVING_DONE,
  CATEGORY_REMOVING_FAILED
} from './../../actions/category/constants'

import { Set, List } from 'immutable'

const initialState = {
  removingList: Set([]),
  removedList: Set([]),
  errors: List([])
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_REMOVING:
      return {
        ...state,
        removingList: action.isLoading ? state.removingList.add(action.removingKey) : state.removingList.remove(action.removingKey)
      }
    case CATEGORY_REMOVING_DONE:
      return {
        ...state,
        removedList: state.removedList.add(action.removedKey)
      }
    case CATEGORY_REMOVING_FAILED:
      return {
        ...state,
        errors: state.errors.insert(action.error)
      }
    default:
      return state
  }
}
