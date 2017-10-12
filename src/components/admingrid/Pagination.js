import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({next, prev, requestApi}) => {
  return (
    <div className='pagination'>
      { next > 0 ? <div className='pagination-next' onClick={() => { requestApi({page: next}) }}>Next</div> : ''}
      { prev > 0 ? <div className='pagination-previous' onClick={() => { requestApi({page: prev}) }}>Prev</div> : ''}
    </div>
  )
}

Pagination.propTypes = {
  next: PropTypes.number,
  prev: PropTypes.number,
  requestApi: PropTypes.func
}

export { Pagination }
