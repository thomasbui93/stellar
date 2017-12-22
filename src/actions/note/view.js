import {
  NOTE_REQUESTING_VIEW,
  NOTE_REQUESTING_VIEW_DONE,
  NOTE_REQUESTING_VIEW_FAILED
} from './constants'

import NoteRepository from '../../utils/noteRepository'
import RemoteFetch from '../../utils/adapter/remoteFetch'
const remoteFetch = new RemoteFetch()
const noteRepository = new NoteRepository(remoteFetch)

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
    view: err
  }
}
