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
    return note.key ? 
    noteRepository
    .update(note)
    .then(view => {
      dispatch(saveNoteDone(view))
    })
    .catch(err => {
      dispatch(saveNoteFailed(err))
    })
    .then(() => {
      dispatch(isSavingNote(false))
    }) :
    noteRepository
    .insert(note)
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

export const saveNoteDone = note => {
  return {
    type: NOTE_SAVING_VIEW_DONE,
    note: note
  }
}

export const saveNoteFailed = err => {
  return {
    type: NOTE_SAVING_VIEW_FAILED,
    error: err
  }
}
