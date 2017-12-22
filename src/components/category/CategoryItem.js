import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class CategoryItem extends React.Component {
  static propTypes = {
    category: PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string
    }).isRequired,
    isLoading: PropTypes.bool,
    updateAction: PropTypes.func.isRequired,
    removeAction: PropTypes.func.isRequired
  };

  state = {
    isEditingMode: false
  }

  constructor (props) {
    super(props)
    this.editCategory = this.editCategory.bind(this)
    this.updateCategory = this.updateCategory.bind(this)
  }

  editCategory () {
    this.setState({isEditingMode: true}, () => this.refs.title.focus())
  }

  updateCategory () {
    this.props.updateAction({key: this.props.category.key, title: this.refs.title.value})
    this.setState({isEditingMode: false})
  }

  render () {
    const { category, removeAction, isLoading } = this.props
    return (
      <div className={`category-item ${isLoading ? 'frozen' : ''}`}>
        { this.state.isEditingMode
          ? <div className='category-item__editor'>
            <input type='text' ref='title' onBlur={this.updateCategory} defaultValue={category.title} />
          </div>
          : <div className='category-item__link'>
            <Link to={`categories/${category.key}`}> { category.title } </Link>
          </div>
        }
        {
          this.state.isEditingMode
          ? ''
          : <div className='category-item__actions'>
            <div className='category-item__edit' onClick={this.editCategory}><i className='material-icons'>mode_edit</i></div>
            <div className='category-item__remove' onClick={() => { removeAction(category.key) }}><i className='material-icons'>delete</i></div>
          </div>
        }
      </div>
    )
  }
}
