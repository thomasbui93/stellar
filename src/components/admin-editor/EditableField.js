import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Editor, EditorState} from 'draft-js'

export class EditableField extends Component {
  static propTypes = {
    data: PropTypes.string,
    updateAction: PropTypes.func,
    isEditableField: PropTypes.bool,
    name: PropTypes.string
  }

  state = {
    openEditor: false
  }

  constructor (props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()}
    this.onChange = (editorState) => this.setState({editorState})
    this.toggleView = this.toggleView.bind(this)
  }

  toggleView () {
    if (this.state.openEditor) {
      this.setState({
        openEditor: false
      })
      const updateData = {}
      updateData[this.props.name] = this.refs.textInput.value
      this.props.updateAction(updateData)
    } else {
      this.setState({
        openEditor: true
      }, () => {
        this.refs.textInput.focus()
      })
    }
  }

  render () {
    const {isEditableField} = this.props
    return (
      <div className='editable-field'>
        { isEditableField
                    ? <div className='editable-field__container'>
                      <div style={{display: this.state.openEditor ? 'none' : 'block'}}
                        className='editable-field__present'
                        ref='textPresentation'
                        dangerouslySetInnerHTML={this.props.data}
                        onDoubleClick={this.toggleView} />
                      <Editor
                        style={{display: this.state.openEditor ? 'block' : 'none'}}
                        className='editable__editor'
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        onBlur={this.toggleView}
                        ref='textInput'
                        defaultValue={this.props.data} />
                    </div>
                    : <div className='editable-field__container'>
                      <div style={{display: this.state.openEditor ? 'none' : 'block'}}
                        className='editable-field__present'
                        ref='textPresentation'
                        onDoubleClick={this.toggleView}>{this.props.data}</div>
                      <input style={{display: this.state.openEditor ? 'block' : 'none'}}
                        name={this.props.name}
                        ref='textInput'
                        type='text'
                        onBlur={this.toggleView}
                        defaultValue={this.props.data} />
                    </div>
                }
      </div>
    )
  }
}
