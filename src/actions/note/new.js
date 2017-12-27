import {
  NOTE_NEW_LOAD_NOTEBOOK,
  NOTE_NEW_LOAD_NOTEBOOK_DONE,
  NOTE_NEW_LOAD_NOTEBOOK_FAILED
} from './constants'

import CategoryRepository from '../../utils/categoryRepository'
import RemoteFetch from '../../utils/adapter/remoteFetch'
const remoteFetch = new RemoteFetch()
const categoryRepository = new CategoryRepository(remoteFetch)

export const requestNotebook = (id) => {
  return dispatch => {
    dispatch(requestingNotebook(true))
    return categoryRepository
    .retrieveById(id)
    .then(note => {
      dispatch(requestCategoryDone(note))
    })
    .catch(err => {
      dispatch(requestingNotebookFailed(err))
    })
    .then(() => {
      dispatch(requestingNotebook(false))
    })
  }
}

export const requestingNotebook = isLoading => {
  return {
    type: NOTE_NEW_LOAD_NOTEBOOK,
    isLoading: isLoading
  }
}

export const requestCategoryDone = note => {
  return {
    type: NOTE_NEW_LOAD_NOTEBOOK_DONE,
    category: note.notebook
  }
}

export const requestingNotebookFailed = err => {
  return {
    type: NOTE_NEW_LOAD_NOTEBOOK_FAILED,
    error: err
  }
}
