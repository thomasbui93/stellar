import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'


export class NoteNewPage extends React.Component {
  render() {
    return (
      <div>
        <div className='title-editor'>
          
        </div>
        <div className='category-editor'>

        </div>
        <div className='content-editor'>

        </div>
        <div className='tag-editor'>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ noteView }) => {
  return {
    notebook: noteView.notebook,
    isLoading: noteView.isLoading,
    tags: noteView.tags.toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveNote: (noteData) => {
      dispatch(noteData)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteNewPage))
