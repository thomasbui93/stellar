import { FAILED_AUTHENTICATION, AUTHENTICATED, DATA_IS_LOADING } from './constants'
import {post} from '../../utils/request'

export const requestAuthentication = (username, password) => {
  return function (dispatch) {
    dispatch(dataIsLoading(true))
    return post('authenticate', {username: username, password: password})
      .then(response => {
        dispatch(authenticateSuccessfully(response))
      })
      .catch(() => {
        dispatch(authenticateFailed())
      })
      .then(() => {
        dispatch(dataIsLoading(false))
      })
  }
}

export function authenticateSuccessfully (response) {
  return {type: AUTHENTICATED, token: response.token}
}

export function authenticateFailed () {
  return {type: FAILED_AUTHENTICATION}
}

export function dataIsLoading (bool) {
  return {
    type: DATA_IS_LOADING,
    isLoading: bool
  }
}
