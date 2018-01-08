import {
  CATEGORY_SEARCHING_LIST,
  CATEGORY_SEARCHING_LIST_DONE,
  CATEGORY_SEARCHING_LIST_FAILED,
  SELECT_CATEGORY
} from './constants'

import categoryRepository from '../../utils/categoryRepository'

export const performSearch = query => {
  return dispatch => {
    dispatch(isSearchingList(true))
    return categoryRepository
    .search(query)
    .then(categories => {
      dispatch(isSearchingListDone(categories))
    })
    .catch(err => {
      dispatch(isSearchingListFailed(err))
    })
    .then(() => {
      dispatch(isSearchingList(false))
    })
  }
}

export const isSearchingList = isSearching => {
  return {
    type: CATEGORY_SEARCHING_LIST,
    isSearching: isSearching
  }
}

export const isSearchingListDone = categories => {
  return {
    type: CATEGORY_SEARCHING_LIST_DONE,
    categories: categories
  }
}

export const isSearchingListFailed = err => {
  return {
    type: CATEGORY_SEARCHING_LIST_FAILED,
    error: err
  }
}

export const selectCategory = category => {
  return {
    type: SELECT_CATEGORY,
    currentCategory: category,
    categories: null
  }
}
