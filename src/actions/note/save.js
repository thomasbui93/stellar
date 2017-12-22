import {
  NOTE_SAVING_VIEW,
  NOTE_SAVING_VIEW_DONE,
  NOTE_SAVING_VIEW_FAILED
} from './constants'

import NoteRepository from '../../utils/noteRepository'
import RemoteFetch from '../../utils/adapter/remoteFetch'
const remoteFetch = new RemoteFetch()
const noteRepository = new NoteRepository(remoteFetch)

export const saveNote = (note) => {
  return dispatch => {
    dispatch(isSavingNote(true))
    return noteRepository
    .update(note)
    .then(view => {
      dispatch(saveNoteDone(view))
    })
    .catch(err => {
      dispatch(saveNoteFailed(err))
    })
    .then(() => {
      dispatch(isSavingNote(false))
    })
  }
}

export const isSavingNote = isLoading => {
  return {
    type: NOTE_SAVING_VIEW,
    isSaving: isLoading
  }
}

export const saveNoteDone = view => {
  return {
    type: NOTE_SAVING_VIEW_DONE,
    view: view
  }
}

export const saveNoteFailed = err => {
  return {
    type: NOTE_SAVING_VIEW_FAILED,
    view: err
  }
}
