import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class NoteThumbItem extends React.Component {
  static propTypes = {
    note: PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.string,
      excerpt: PropTypes.string
    })
  }

  render () {
    return (
      <div className='note-item'>
        <div className='note-item__title'>{this.props.note.title}</div>
        <div className='note-item__excerpt'>{this.props.note.excerpt}</div>
        <div className='note-item__toolbar'>
          <Link to={`/notes/${this.props.note.key}`} > View </Link>
        </div>
      </div>
    )
  }
}
