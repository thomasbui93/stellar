import {
  NOTE_SAVING_VIEW,
  NOTE_SAVING_VIEW_DONE,
  NOTE_SAVING_VIEW_FAILED,
  NOTE_REMOVING_DONE
} from './constants'

import noteRepository from '../../utils/noteRepository'

export const saveNote = (note) => {
  return dispatch => {
    dispatch(isSavingNote(true))
    return note.key
    ? noteRepository
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
    : noteRepository
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

export const requestRemoveNote = id => {
  return dispatch => {
    dispatch(isSavingNote(true))
    return noteRepository
    .remove(id)
    .then(() => {
      dispatch(removingDone())
    })
    .catch(err => {
      dispatch(saveNoteFailed(err))
    })
    .then(() => {
      dispatch(isSavingNote(false))
    })
  }
}

export const removingDone = () => {
  return {
    type: NOTE_REMOVING_DONE,
    isRemoved: true
  }
}
