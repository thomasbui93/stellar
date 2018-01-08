import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { requestNoteView } from './../../actions/note/view'
import { saveNote, requestRemoveNote } from './../../actions/note/save'
import { performSearch, selectCategory } from './../../actions/category/search'
import Loader from './../../components/general/Loader'
import { Link } from 'react-router-dom'
import NoteEditor from './../../components/notes/NoteEditor'
import AuthenticatedRoute from './../../components/layout/AuthenticatedRoute'
import CategorySelector from './../../components/notes/CategorySelector'
import { List } from 'immutable'

export class NotePage extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    updatedAt: PropTypes.instanceOf(Date),
    tags: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.string
    })),
    notebook: PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.string
    })
  }

  componentDidMount () {
    this.props.requestView()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.isRemoved) {
      this.props.history.push(`/categories/${this.props.notebook.key}`)
    }
  }

  render () {
    return (
      <div className='page-wrapper'>
        {
          this.props.isLoading
          ? <Loader />
          : <div>
            <div className='page-header'>
              <div className='page-meta'>
                <h1 className='page-title'>{ this.props.title }</h1>
              </div>
              <div className='page-meta'>
                {
                    this.props.notebook
                    ? <CategorySelector
                      notebook={this.props.notebook}
                      isSearching={this.props.isCategorySearching}
                      notebooks={this.props.notebooks}
                      error={this.props.errorCategorySearching}
                      performSearch={this.props.searchCategory}
                      selectNewCategory={this.props.selectNewCategory}
                         /> : ''
                  }
                <button className='button is-h-danger' onClick={() => this.props.removeNote()}> Delete </button>
              </div>
              <div className='page-tags'>
                {
                    this.props.tags.map(tag => {
                      return <Link className='tag' key={tag.key} to={`/tags/${tag.key}`}>{tag.title}</Link>
                    })
                  }
              </div>
            </div>
            <div className='content-editor'>
              {
                  this.props.content
                  ? <NoteEditor
                    isSaving={this.props.isSaving}
                    content={this.props.content}
                    saveNoteAction={this.props.saveNote} /> : ''
                }
            </div>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = ({ noteView, noteSave, categorySearch }) => {
  return {
    title: noteView.title,
    content: noteView.content,
    createdAt: new Date(noteView.created_date),
    updatedAt: new Date(noteView.updated_date),
    notebook: categorySearch.currentCategory ? categorySearch.currentCategory : noteView.notebook,
    isLoading: noteView.isLoading,
    tags: noteView.tags.toJS(),
    isRemoved: noteSave.isRemoved,
    isSaving: noteSave.isSaving,
    error: noteView.error,
    notebooks: List.isList(categorySearch.categories) ? categorySearch.categories.toJS() : categorySearch.categories,
    isCategorySearching: categorySearch.isSearching,
    errorCategorySearching: categorySearch.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestView: () => {
      dispatch(requestNoteView(ownProps.match.params.noteId))
    },
    saveNote: (noteData) => {
      dispatch(saveNote({
        ...noteData,
        notebook: ownProps.notebook.key,
        key: ownProps.match.params.noteId
      }))
    },
    removeNote: () => {
      dispatch(requestRemoveNote(ownProps.match.params.noteId))
    },
    searchCategory: query => {
      dispatch(performSearch(query))
    },
    selectNewCategory: category => {
      dispatch(selectCategory(category))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute(NotePage)))
