import {
  CATEGORY_REQUEST_LIST_DONE,
  CATEGORY_REQUESTING_LIST,
  CATEGORY_REQUEST_LIST_FAILED
} from './constants'

import CategoryRepository from '../../utils/categoryRepository'
import RemoteFetch from '../../utils/adapter/remoteFetch'
const remoteFetch = new RemoteFetch()
const categoryRepository = new CategoryRepository(remoteFetch)

export const requestCategoryList = query => {
  return dispatch => {
    dispatch(isLoadingCategoryList(true))
    return categoryRepository
    .retrieveList(query)
    .then(categories => {
      dispatch(requestCategoryListDone(categories))
    })
    .catch(err => {
      dispatch(requestCategoryListFailed(err))
    })
    .then(() => {
      dispatch(isLoadingCategoryList(false))
    })
  }
}

export const isLoadingCategoryList = isLoading => {
  return {
    type: CATEGORY_REQUESTING_LIST,
    isLoading: isLoading
  }
}

export const requestCategoryListDone = categories => {
  return {
    type: CATEGORY_REQUEST_LIST_DONE,
    categories: categories
  }
}

export const requestCategoryListFailed = err => {
  return {
    type: CATEGORY_REQUEST_LIST_FAILED,
    error: err
  }
}
