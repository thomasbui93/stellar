import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { ENTER, ESC } from '../../utils/constants/keyCode'

export default class CategorySelector extends React.Component {
  state = {
    data: Map({
      editMode: false,
      inputValue: this.props.notebook.title
    })
  }

  static propTypes = {
    notebook: PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string
    }).isRequired,
    notebooks: PropTypes.array,
    performSearch: PropTypes.func,
    selectNewCategory: PropTypes.func,
    isSearching: PropTypes.bool
  }

  constructor (props) {
    super(props)
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.catchSpecialKeyEvents = this.catchSpecialKeyEvents.bind(this)
    this.selectNewCategory = this.selectNewCategory.bind(this)
  }

  toggleEditMode (isHidden) {
    this.setState(({ data }) => ({
      data: data.update('editMode', v => isHidden ? !isHidden : !v)
    }), () => {
      if (this.state.data.get('editMode')) {
        this.refs.inputSearch.focus()
      }
    })
  }

  handleChange (event) {
    const value = event.target.value
    this.setState(({ data }) => ({
      data: data.set('inputValue', value)
    }), () => {
      this.props.performSearch(this.state.data.get('inputValue'))
    })
  }

  selectNewCategory (notebook) {
    this.props.selectNewCategory(notebook)
    this.toggleEditMode(true)
    this.setState(({ data }) => ({
      data: data.set({'inputValue': notebook.title})
    }))
  }

  catchSpecialKeyEvents (event) {
    if (event.keyCode === ENTER || event.keyCode === ESC) {
      this.toggleEditMode(true)
    }
  }

  render () {
    return (
      <div>
        {
          this.props.notebook && !this.state.data.get('editMode')
          ? <Link to={`/categories/${this.props.notebook.key}`}>{this.props.notebook.title}</Link> : ''
        }
        {
          this.state.data.get('editMode')
          ? <div className='category-editor' >
            <div className='category-editor__input'>
              <input
                ref='inputSearch'
                type='text'
                placeholder='Enter category here...'
                value={this.state.data.get('inputValue')}
                onKeyUp={this.catchSpecialKeyEvents}
                onChange={this.handleChange} />
              { this.props.isSearching ? <div> Searching... </div> : ''}
            </div>
            {
              this.props.notebooks
              ? <ul>
                {
                  this.props.notebooks.map(notebook => {
                    return <li key={notebook.key} onClick={() => { this.selectNewCategory(notebook) }}> { notebook.title }</li>
                  })
                }
                {
                  this.props.notebooks.length === 0 ? 'Nothing found so far...' : ''
                }
              </ul> : ''
            }
          </div> : ''
        }
        {
          !this.state.data.get('editMode')
          ? <span onClick={() => { this.toggleEditMode(false) }}>Edit</span> : ''
        }
      </div>
    )
  }
}
