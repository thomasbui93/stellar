import React from 'react'
import PropTypes from 'prop-types'

export default class NoteThumbItem extends React.Component {
  static propTypes = {
    numberOfPages: PropTypes.number,
    navigate: PropTypes.func,
    currentPage: PropTypes.number
  }

  render () {
    const paginationSequences = Array.from({length: this.props.numberOfPages}, (v, k) => k + 1)
    return (
      <div className='pagination'>
        {
          paginationSequences.length > 1
          ? paginationSequences.map(sequence => {
            return <div
              className={`${this.props.currentPage === sequence ? 'current-page' : ''} pagination-page`}
              key={sequence}
              onClick={() => this.props.navigate(sequence)}> {sequence} </div>
          }) : ''
        }
      </div>
    )
  }
}
