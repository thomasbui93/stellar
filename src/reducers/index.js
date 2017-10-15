import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducers from './auth-reducers'
import tagReducers from './tag-reducers'
import tagViewReducers from './tag-review-reducer'

export default combineReducers({
  router: routerReducer,
  authReducers: authReducers,
  tagReducers: tagReducers,
  tagViewReducer: tagViewReducers
})
