import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {DataGrid} from '../../../components/admingrid/DataGrid'
import {requestTags, removeTag} from '../../../actions/tags/tags'
import {StaticTag} from '../../../components/general/StaticTag'
import {Loader} from "../../../components/general/Loader"

export class TagIndex extends Component {
  static propTypes = {
    items: PropTypes.array
  }

  componentDidMount () {
    this.props.requestTags()
  }

  render () {
    return <div>
      {this.props.error ? <StaticTag className='request-error' staticText={this.props.error} /> : ''}
      {this.props.isLoading ? <Loader/> : ''}
      <DataGrid
        baseUrl={this.props.match.url}
        items={this.props.items}
        rowClassName='tag-row'
        removeAction={this.props.removeAction}/>
    </div>
  }
}

export const mapStateToProps = ({tagReducers}) => {
  const {isRemoving, removedItem, removeError, tags} = tagReducers;
  const items = !removeError && !isRemoving ?  tagReducers.tags.filter(item => {
    return item.key !== removedItem;
  }) : tags;
  return {
    error: removeError ? removeError: tagReducers.error,
    isLoading: tagReducers.isLoading,
    items: items,
    isRemoving: isRemoving
  }
};

const mapDispatchToProps = dispatch => {
  return {
    requestTags: (filterParams) => {
      dispatch(requestTags(filterParams))
    },
    removeAction: tagKey =>{
      dispatch(removeTag(tagKey));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagIndex))
