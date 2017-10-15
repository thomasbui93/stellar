import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {DataGrid} from './DataGrid'
import {StaticTag} from '../general/StaticTag'
import {Loader} from '../../components/general/Loader'
import {Pagination} from './Pagination'
import {SearchBox} from './SearchBox'
import {SorterBox} from './SorterBox'

export class GridIndex extends Component {
  static propTypes = {
    items: PropTypes.array,
    isLoading: PropTypes.bool,
    removeAction: PropTypes.func,
    requestApi: PropTypes.func,
    sortingFields: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })),
    pagination: PropTypes.shape({
      next: PropTypes.number,
      prev: PropTypes.number
    }),
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
  };

  componentDidMount () {
    this.props.requestApi()
  }

  render () {
    const {
      error,
      isLoading,
      items,
      removeAction,
      match,
      pagination,
      requestApi,
      sortingFields
    } = this.props

    return <div className={this.props.className}>
      <div className='messages'>
        {error ? <StaticTag className='request-error' staticText={error} /> : ''}
      </div>
      <div className='filter-box'>
        <SearchBox requestApi={requestApi} />
        <SorterBox requestApi={requestApi} fields={sortingFields} />
      </div>
      <Pagination requestApi={requestApi} next={pagination.next} prev={pagination.prev} />
      <div>
        {isLoading ? <Loader /> : ''}
        <DataGrid
          baseUrl={match.url}
          items={items}
          removeAction={removeAction} />
      </div>
      <Pagination requestApi={requestApi} next={pagination.next} prev={pagination.prev} />
    </div>
  }
}
