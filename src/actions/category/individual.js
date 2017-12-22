import {
  CATEGORY_REMOVING,
  CATEGORY_REMOVING_DONE,
  CATEGORY_REMOVING_FAILED,
  CATEGORY_UPDATING,
  CATEGORY_UPDATING_DONE,
  CATEGORY_UPDATING_FAILED,
  CATEGORY_CREATING,
  CATEGORY_CREATING_DONE,
  CATEGORY_CREATING_FAILED
} from './constants'

import CategoryRepository from '../../utils/categoryRepository'
import RemoteFetch from '../../utils/adapter/remoteFetch'
const remoteFetch = new RemoteFetch()
const categoryRepository = new CategoryRepository(remoteFetch)

export const removeCategoryItem = key => {
  return dispatch => {
    dispatch(isRemovingCateoryItem(key, true))
    return categoryRepository
    .remove(key)
    .then(done => {
      dispatch(removeCateoryItemDone(key))
    })
    .catch(err => {
      dispatch(removeCateoryItemFailed(err))
    })
    .then(() => {
      dispatch(isRemovingCateoryItem(key, false))
    })
  }
}

export const isRemovingCateoryItem = (key, isLoading) => {
  return {
    type: CATEGORY_REMOVING,
    isLoading: isLoading,
    removingKey: key
  }
}

export const removeCateoryItemDone = key => {
  return {
    type: CATEGORY_REMOVING_DONE,
    removedKey: key
  }
}

export const removeCateoryItemFailed = err => {
  return {
    type: CATEGORY_REMOVING_FAILED,
    error: err
  }
}

export const updateCategoryItem = (data) => {
  return dispatch => {
    dispatch(isUpdatingCateoryItem(data.key, true))
    return categoryRepository
    .update(data)
    .then(done => {
      dispatch(updateCateoryItemDone(data))
    })
    .catch(err => {
      dispatch(updateCateoryItemFailed(err))
    })
    .then(() => {
      dispatch(isUpdatingCateoryItem(data.key, false))
    })
  }
}

export const isUpdatingCateoryItem = (key, isLoading) => {
  return {
    type: CATEGORY_UPDATING,
    isLoading: isLoading,
    updatingKey: key
  }
}

export const updateCateoryItemDone = category => {
  return {
    type: CATEGORY_UPDATING_DONE,
    updatedCategory: category
  }
}

export const updateCateoryItemFailed = err => {
  return {
    type: CATEGORY_UPDATING_FAILED,
    error: err
  }
}

export const createCategoryItem = (data) => {
  return dispatch => {
    dispatch(isCreateCateoryItem(true))
    return categoryRepository
    .insert(data)
    .then(category => {
      dispatch(createCateoryItemDone(category))
    })
    .catch(err => {
      dispatch(createCateoryItemFailed(err))
    })
    .then(() => {
      dispatch(isCreateCateoryItem(false))
    })
  }
}

export const isCreateCateoryItem = (isLoading) => {
  return {
    type: CATEGORY_CREATING,
    isLoading: isLoading
  }
}

export const createCateoryItemDone = category => {
  return {
    type: CATEGORY_CREATING_DONE,
    category: category
  }
}

export const createCateoryItemFailed = err => {
  return {
    type: CATEGORY_CREATING_FAILED,
    error: err
  }
}
