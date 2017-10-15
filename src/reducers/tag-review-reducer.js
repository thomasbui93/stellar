import {
  LOAD_TAG_DONE,
  LOAD_TAG_FAILED,
  LOADING_TAG
} from './../actions/tags/constants'

const initialState = {isLoading: false, error: false, view: {}}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TAG_DONE:
      return {...state,
        error: false,
        view: action.tag
      }
    case LOAD_TAG_FAILED:
      return {
        ...state,
        error: action.error
      }
    case LOADING_TAG:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}
