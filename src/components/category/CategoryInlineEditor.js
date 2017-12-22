import React from 'react'
import PropTypes from 'prop-types'

export default class CategoryInlineEditor extends React.Component {
  static propTypes = {
    isCreating: PropTypes.bool,
    createAction: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.createNewCategory = this.createNewCategory.bind(this)
  }

  createNewCategory () {
    const title = this.refs.title.value
    this.refs.title.value = ''
    return title ? this.props.createAction({title: title}) : ''
  }

  render () {
    return (
      <div className='inline-editor'>
        <div className='inline-editor__input'>
          <input type='text' ref='title' disabled={this.props.isCreating} />
        </div>
        <div>
          <button
            onClick={this.createNewCategory}
            disabled={this.props.isCreating}
            className='button is-primary'>
            { this.props.isCreating ? 'Creating...' : 'Create' }
          </button>
        </div>
      </div>
    )
  }
}
