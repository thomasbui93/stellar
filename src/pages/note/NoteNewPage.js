import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import NoteEditor from './../../components/notes/NoteEditor'
import CategorySelector from './../../components/notes/CategorySelector'
import { saveNote } from './../../actions/note/save'
import { requestNotebook } from './../../actions/note/new'
import AuthenticatedRoute from './../../components/layout/AuthenticatedRoute'

export class NoteNewPage extends React.Component {
  constructor (props) {
    super(props)
    this.saveNoteAction = this.saveNoteAction.bind(this)
  }

  componentDidMount () {
    this.props.requestNotebook(this.props.match.params.categoryId)
  }

  componentWillUpdate (nextProps) {
    if (nextProps.note) {
      return this.props.history.push(`/notes/${nextProps.note.key}`)
    }
  }

  saveNoteAction (noteData) {
    return this.props.saveNoteAction({
      ...noteData,
      notebook: this.props.notebook.key,
      title: this.refs.title.value
    })
  }

  render () {
    return (
      <div className='page-wrapper'>
        <div className='page-header'>
          <h1> New Note </h1>
          <div className='category-editor'>
            { this.props.notebook ? <CategorySelector notebook={this.props.notebook} /> : '' }
          </div>
        </div>
        <div className='title-editor'>
          <input type='text' ref='title' placeholder='Enter your title here' />
        </div>
        <div className='content-editor'>
          <NoteEditor content='' saveNoteAction={this.saveNoteAction} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ noteNewView, noteSave }) => {
  return {
    notebook: noteNewView.notebook,
    note: noteSave.note
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveNoteAction: noteData => {
      dispatch(saveNote(noteData))
    },
    requestNotebook: notebookId => {
      dispatch(requestNotebook(notebookId))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute(NoteNewPage)))
