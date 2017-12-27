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
    const updatedDate = new Date(this.props.note.updated_date)
    return (
      <div className='note-item card-thumb'>
        <div className='card-thumb__content'>
          <div className='note-item__title'>{this.props.note.title}</div>
          <div className='note-item__date'>
            { `${updatedDate.getDate()}.${updatedDate.getMonth() + 1}.${updatedDate.getFullYear()}`}
          </div>
          <div className='note-item__excerpt'>{this.props.note.excerpt}</div>
        </div>
        <div className='note-item__toolbar card-thumb__action'>
          <Link to={`/notes/${this.props.note.key}`} > View </Link>
        </div>
      </div>
    )
  }
}
