import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { ENTER, ESC, TAB } from '../../utils/constants/keyCode'

export default class TagEditor extends React.Component {
  state = {
    data: Map({
      editMode: false,
      inputValue: ''
    })
  }

  propTypes = {
    isProcessingTag: PropTypes.bool.isRequired,
    tags: PropTypes.array.isRequired,
    getSuggestedTags: PropTypes.func.isRequired,
    suggestedTags: PropTypes.array.isRequired,
    creatTagAction: PropTypes.func.isRequired,
    removeTagAction: PropTypes.func.isRequired,
    saveTag: PropTypes.func.isProcessingTag
  }

  constructor(props) {
    super(props)
    this.observeInputChange = this.observeInputChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.clearInput = this.clearInput.bind(this)
  }

  observeInputChange(event) {
    if(event.keyCode === ESC) {
      this.clearInput()
    } else if( event.keyCode === ENTER || event.keyCode === TAB) {
      const tagValue = event.target.value.trim()
      this.clearInput()
      this.props.saveTag(tagValue)
    } else {
      this.setState(({data}) => ({
        data: data.update('inputValue', event.target.value)
      }))
    }
  }

  clearInput() {
    this.setState(({data}) => ({
      data: data.update('inputValue', '')
    }))
  }

  onBlur(event) {
    this.setState(({data}) => ({
      data: data.update('inputValue', '')
    }))
  }

  render() {
    return (
      <div className={`tag-editor ${this.state.data.get('editMode') ? 'editing': ''}`}>
        {
          this.props.tags ?
          <div>
             {
                this.props.tags.map(tag => {
                  return (
                    <div className='tag-cookie'>
                      <Link to={`/tags/${tag.key}`}>{ tag.title}</Link>
                      <span onClick={() => this.props.removeTagAction(tag) }>x</span>
                    </div>
                  )
                })
              } 
          </div> : ''
        }
        {
          this.state.data.get('editMode') ?
          <input 
            value={this.state.getData('inputValue')}
            onKeyUp={this.observeInputChange}
            disable={this.props.isProcessingTag}
            onBlur={this.onBlur} /> : ''
        }
      </div>
    )
  }
}