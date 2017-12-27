import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { requestCategoryList } from './../../actions/category/index'
import {
  removeCategoryItem,
  updateCategoryItem,
  createCategoryItem
} from './../../actions/category/individual'
import CategoryItem from './../../components/category/CategoryItem'
import CategoryInlineEditor from './../../components/category/CategoryInlineEditor'
import Loader from './../../components/general/Loader'
import { Map } from 'immutable'
import AuthenticatedRoute from './../../components/layout/AuthenticatedRoute'

export class CategoryListPage extends React.Component {
  static defaultProps = {
    categories: [],
    isLoading: false,
    error: null
  };

  static propTypes = {
    categories: PropTypes.array,
    isLoading: PropTypes.bool,
    requestCategoryList: PropTypes.func,
    removeCategoryItem: PropTypes.func,
    updateCategoryItem: PropTypes.func,
    createCategoryItem: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  };

  state = {
    data: Map({
      editorVisibility: false
    })
  };

  constructor (props) {
    super(props)
    this.toggleNewEditor = this.toggleNewEditor.bind(this)
  }

  componentDidMount () {
    this.props.requestCategoryList()
  }

  toggleNewEditor () {
    this.setState(({ data }) => ({
      data: data.update('editorVisibility', v => !v)
    }))
  }

  render () {
    const categories = this.props.categories
      .filter(category => !category.disabled)
      .map(category => {
        return (
          <CategoryItem
            category={category}
            key={category.key}
            updateAction={this.props.updateCategoryItem}
            removeAction={this.props.removeCategoryItem}
          />
        )
      })

    return (
      <div className='page-wrapper notebook-page'>
        <div className='page-header'>
          <h1> Your Notebooks </h1>
          <button className={`button ${this.state.data.get('editorVisibility') ? 'is-h-danger' : 'is-h-primary'}`} onClick={this.toggleNewEditor}> { this.state.data.get('editorVisibility') ? 'Close' : 'New Notebook'} </button>
        </div>
        {this.state.data.get('editorVisibility') ? (
          <div className='category-editor'>
            <CategoryInlineEditor
              isCreating={this.props.isCreating}
              createAction={this.props.createCategoryItem}
            />
          </div>
        ) : (
          ''
        )}
        {this.props.isLoading ? <Loader /> : ''}
        {!this.props.isLoading & this.props.error ? this.props.error : ''}
        <div className='category-list'>
          {categories.length === 0 ? (
            <div> There is no categories yet. </div>
          ) : (
            categories
          )}
        </div>
      </div>
    )
  }
}

export const mapStateToProps = ({
  categoryList,
  categoryRemoval,
  categoryUpdate,
  categoryCreate
}) => {
  const { removingList, removedList } = categoryRemoval
  const { updatingList, updatedCategory } = categoryUpdate
  const { category } = categoryCreate
  const updatedIndex = updatedCategory
    ? categoryList.categories.findIndex(
        item => item.key === updatedCategory.key
      )
    : -1

  const updatedCategories =
    updatedIndex >= 0
      ? categoryList.categories.set(updatedIndex, updatedCategory)
      : categoryList.categories

  const insertedCategories = category ? updatedCategories.push(category) : updatedCategories

  const categories = insertedCategories.toJS().map(category => {
    const { key } = category
    return Object.assign({}, category, {
      isLoading: removingList.includes(key) || updatingList.includes(key),
      disabled: removedList.includes(key)
    })
  })

  return {
    categories: categories,
    isLoading: categoryList.isLoading,
    error: categoryList.error
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    requestCategoryList: () => {
      dispatch(requestCategoryList())
    },
    removeCategoryItem: key => {
      dispatch(removeCategoryItem(key))
    },
    updateCategoryItem: data => {
      dispatch(updateCategoryItem(data))
    },
    createCategoryItem: data => {
      dispatch(createCategoryItem(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute(CategoryListPage))
