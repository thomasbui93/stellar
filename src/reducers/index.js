import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducers from './auth-reducers'
import tagReducers from './tag-reducers'

export default combineReducers({
  router: routerReducer,
  authReducers: authReducers,
  tagReducers: tagReducers
})
