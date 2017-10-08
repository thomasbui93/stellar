import { FAILED_AUTHENTICATION, AUTHENTICATED, DATA_IS_LOADING } from './../actions/auth/constants'

const initialState = {isLoading: false, error: false}

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, { token: action.token, error: false })
    case DATA_IS_LOADING:
      return Object.assign({}, state, { isLoading: action.isLoading })
    case FAILED_AUTHENTICATION:
      return Object.assign({}, state, { isLoading: false, error: 'Authentication failed' })
    default:
      return state
  }
}
