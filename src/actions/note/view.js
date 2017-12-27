import {
  NOTE_REQUESTING_VIEW,
  NOTE_REQUESTING_VIEW_DONE,
  NOTE_REQUESTING_VIEW_FAILED
} from './constants'

import noteRepository from '../../utils/noteRepository'

export const requestNoteView = (id) => {
  return dispatch => {
    dispatch(isLoadingNoteView(true))
    return noteRepository
    .retrieveById(id)
    .then(view => {
      dispatch(requestNoteViewDone(view))
    })
    .catch(err => {
      dispatch(requestNoteViewFailed(err))
    })
    .then(() => {
      dispatch(isLoadingNoteView(false))
    })
  }
}

export const isLoadingNoteView = isLoading => {
  return {
    type: NOTE_REQUESTING_VIEW,
    isLoading: isLoading
  }
}

export const requestNoteViewDone = view => {
  return {
    type: NOTE_REQUESTING_VIEW_DONE,
    view: view
  }
}

export const requestNoteViewFailed = err => {
  return {
    type: NOTE_REQUESTING_VIEW_FAILED,
    error: err
  }
}
