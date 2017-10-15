import {LOADING_TAG, LOAD_TAG_DONE, LOAD_TAG_FAILED} from './constants'
import {get, post} from '../../utils/request'

export const requestTag = (key) => {
  return dispatch => {
    dispatch(loadingTag(true))
    return get(`tags/${key}`)
      .then(response => {
        dispatch(doneLoadingTag(response))
      })
      .catch(() => {
        dispatch(failedLoadingTag())
      })
      .then(() => {
        dispatch(loadingTag(false))
      })
  }
}

export const loadingTag = (isLoading) => {
  return {
    type: LOADING_TAG,
    isLoading: isLoading
  }
}

export const doneLoadingTag = response => {
  return {
    type: LOAD_TAG_DONE,
    tag: response.tag
  }
}

export const failedLoadingTag = error => {
  return {
    type: LOAD_TAG_FAILED,
    error: error
  }
}

export const updateTag = (key, dataUpdate) => {
  return dispatch => {
    return post(`tags/${key}`, dataUpdate)
      .then(response => {
        dispatch(doneLoadingTag(response))
      })
      .catch(() => {
        dispatch(failedLoadingTag())
      })
      .then(() => {
        dispatch(loadingTag(false))
      })
  }
}
