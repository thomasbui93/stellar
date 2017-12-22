import {
  NOTE_REQUESTING_VIEW,
  NOTE_REQUESTING_VIEW_DONE,
  NOTE_REQUESTING_VIEW_FAILED
} from './../../actions/note/constants'

import { List } from 'immutable'

const initialState = {
  isLoading: false,
  tags: List([]),
  notebook: null,
  error: null,
  created_date: null,
  updated_date: null,
  content: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTE_REQUESTING_VIEW_DONE:
      return {
        ...state,
        tags: List(action.view.tags),
        notebook: action.view.notebook,
        title: action.view.title,
        content: action.view.content,
        created_date: action.view.created_date,
        updated_date: action.view.updated_date
      }
    case NOTE_REQUESTING_VIEW_FAILED:
      return {
        ...state,
        error: action.error
      }
    case NOTE_REQUESTING_VIEW:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}
