import {
  USER_REQUEST_AUTHENTICATION,
  USER_REQUEST_AUTHENTICATION_DONE,
  USER_REQUEST_AUTHENTICATION_FAILED
} from './constants'

import RemoteFetch from '../../utils/adapter/remoteFetch'
const remoteFetch = new RemoteFetch()

export const requestAuthentication = (username, password) => {
  return dispatch => {
    dispatch(requestingAuthentication(true))
    return remoteFetch
    .authenticate(username, password)
    .then(data => {
      dispatch(requestAuthenticationDone(data.token))
    })
    .catch(err => {
      dispatch(requestAuthenticationFailed(err))
    })
    .then(() => {
      dispatch(requestingAuthentication(false))
    })
  }
}

export const requestingAuthentication = isLoading => {
  return {
    type: USER_REQUEST_AUTHENTICATION,
    isLoading: isLoading
  }
}

export const requestAuthenticationDone = token => {
  return {
    type: USER_REQUEST_AUTHENTICATION_DONE,
    token: token
  }
}

export const requestAuthenticationFailed = err => {
  return {
    type: USER_REQUEST_AUTHENTICATION_FAILED,
    error: err
  }
}
