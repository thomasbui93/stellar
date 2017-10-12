import {LOAD_TAGS_DONE, LOADING_TAGS, LOAD_TAGS_FAILED, REMOVING_TAG, REMOVE_DONE, REMOVE_FAILED} from './constants'
import {get, del} from '../../utils/request'

export const requestTags = (sortingOption) => {
  return function (dispatch) {
    dispatch(dataIsLoading(true))
    return get('tags')
      .then(response => {
        dispatch(doneLoading(response))
      })
      .catch(() => {
        dispatch(loadFailed())
      })
      .then(() => {
        dispatch(dataIsLoading(false))
      })
  }
}

export const doneLoading = response => {
  return {type: LOAD_TAGS_DONE, tags: response.tags}
}

export const loadFailed = () => {
  return {type: LOAD_TAGS_FAILED}
}

export const dataIsLoading = bool => {
  return {
    type: LOADING_TAGS,
    isLoading: bool
  }
}

export const removeTag = tagKey => {
  return function (dispatch) {
    dispatch({type: REMOVING_TAG, key: tagKey})
    return del(`tags/${tagKey}`)
      .then(() => {
        dispatch({type: REMOVE_DONE, key: tagKey})
      })
      .catch(() => {
        dispatch({type: REMOVE_FAILED, key: tagKey})
      })
  }
}
