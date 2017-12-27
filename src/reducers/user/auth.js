import {
  USER_REQUEST_AUTHENTICATION,
  USER_REQUEST_AUTHENTICATION_DONE,
  USER_REQUEST_AUTHENTICATION_FAILED
} from './../../actions/user/constants'

const initialState = {
  isLoading: false,
  token: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_REQUEST_AUTHENTICATION_DONE:
      return {
        ...state,
        token: action.token
      }
    case USER_REQUEST_AUTHENTICATION_FAILED:
      return {
        ...state,
        error: action.error
      }
    case USER_REQUEST_AUTHENTICATION:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
}