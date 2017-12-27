import {
  CATEGORY_REQUESTING_VIEW,
  CATEGORY_REQUESTING_VIEW_DONE,
  CATEGORY_REQUESTING_VIEW_FAILED
} from './constants'

import categoryRepository from '../../utils/categoryRepository'

export const requestCategoryView = (id, params) => {
  return dispatch => {
    dispatch(isLoadingCategoryView(true))
    return categoryRepository
    .retrieveById(id, params)
    .then(view => {
      dispatch(requestCategoryViewDone(view))
    })
    .catch(err => {
      dispatch(requestCategoryViewFailed(err))
    })
    .then(() => {
      dispatch(isLoadingCategoryView(false))
    })
  }
}

export const isLoadingCategoryView = isLoading => {
  return {
    type: CATEGORY_REQUESTING_VIEW,
    isLoading: isLoading
  }
}

export const requestCategoryViewDone = view => {
  return {
    type: CATEGORY_REQUESTING_VIEW_DONE,
    view: view
  }
}

export const requestCategoryViewFailed = err => {
  return {
    type: CATEGORY_REQUESTING_VIEW_FAILED,
    view: err
  }
}
