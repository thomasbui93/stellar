import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {EditableField} from '../../../components/admin-editor/EditableField.js'
import { requestTag, updateTag } from '../../../actions/tags/tag'
import {Loader} from '../../../components/general/Loader'
import {StaticTag} from '../../../components/general/StaticTag'

export class TagEdit extends Component {
  static propTypes = {
    view: PropTypes.object,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    isLoading: PropTypes.bool,
    isEdit: PropTypes.bool
  }

  componentDidMount () {
    this.props.requestView()
  }

  renderFormData () {
    const updateAction = this.props.updateField
    return composeViewToFormData(this.props.view).map(element => {
      return <EditableField
        updateAction={updateAction}
        key={element.name}
        data={element.data}
        isEditableField={element.isEditableField}
        name={element.name} />
    })
  }

  render () {
    return <div>

      <div className='view-editor'>
        {this.props.isLoading ? <Loader /> : ''}
        {this.props.error ? <StaticTag className='request-error' staticText={this.props.error} /> : ''}
        {this.renderFormData()}
      </div>
    </div>
  }
}

const mapStateToProps = ({tagViewReducer}) => {
  return {
    view: tagViewReducer.view,
    error: tagViewReducer.error,
    isLoading: tagViewReducer.isLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const {key} = ownProps.match.params
  return {
    updateField: (upateData) => {
      dispatch(updateTag(key, upateData))
    },
    requestView: () => {
      dispatch(requestTag(key))
    }
  }
}

const composeViewToFormData = (view) => {
  let composedView = []
  Object.keys(view).forEach(key => {
    composedView.push({
      name: key,
      data: view[key],
      isEditableField: false
    })
  })
  return composedView
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TagEdit))
