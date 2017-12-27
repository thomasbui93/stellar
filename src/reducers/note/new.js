import {
  NOTE_NEW_LOAD_NOTEBOOK,
  NOTE_NEW_LOAD_NOTEBOOK_DONE,
  NOTE_NEW_LOAD_NOTEBOOK_FAILED
} from './../../actions/note/constants'

const initialState = {
  isLoading: false,
  notebook: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTE_NEW_LOAD_NOTEBOOK_DONE:
      return {
        ...state,
        notebook: action.category
      }
    case NOTE_NEW_LOAD_NOTEBOOK_FAILED:
      return {
        ...state,
        error: action.error
      }
    case NOTE_NEW_LOAD_NOTEBOOK:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}