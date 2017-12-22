import {
  NOTE_SAVING_VIEW,
  NOTE_SAVING_VIEW_DONE,
  NOTE_SAVING_VIEW_FAILED
} from './../../actions/note/constants'

const initialState = {
  isSaving: false,
  note: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTE_SAVING_VIEW_DONE:
      return {
        ...state,
        note: action.note
      }
    case NOTE_SAVING_VIEW_FAILED:
      return {
        ...state,
        error: action.error
      }
    case NOTE_SAVING_VIEW:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}
