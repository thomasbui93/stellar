import { LOAD_TAGS_DONE, LOADING_TAGS, LOAD_TAGS_FAILED, REMOVING_TAG, REMOVE_DONE, REMOVE_FAILED } from './../actions/tags/constants'

const initialState = {isLoading: false, error: false, tags: []}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_TAGS_DONE:
      return {...state, tags: action.tags, error: false };
    case LOADING_TAGS:
      return {...state, isLoading: action.isLoading}
    case LOAD_TAGS_FAILED:
      return {...state, isLoading: false, error: 'Failed fetching tags' }
    case REMOVING_TAG:
      return {...state, isRemoving: true, removedItem: action.key, removeError: false}
    case REMOVE_DONE:
      return {...state, isRemoving: false, removedItem: action.key, removeError: false}
    case REMOVE_FAILED:
      return {...state, isRemoving: false,removedItem: action.key, removeError: true}
    default:
      return state
  }
}
