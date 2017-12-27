import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import categoryList from './category/list'
import categoryRemoval from './category/removal'
import categoryUpdate from './category/update'
import categoryCreate from './category/create'
import categoryView from './category/view'
import noteView from './note/view'
import noteSave from './note/save'
import noteNewView from './note/new'
import userAuth from './user/auth'

export default combineReducers({
  router: routerReducer,
  categoryList: categoryList,
  categoryRemoval: categoryRemoval,
  categoryUpdate: categoryUpdate,
  categoryCreate: categoryCreate,
  categoryView: categoryView,
  noteView: noteView,
  noteSave: noteSave,
  noteNewView: noteNewView,
  userAuth: userAuth
})
