import React from 'react'
import PropTypes from 'prop-types'
import NoteThumbItem from './../../components/notes/NoteThumbItem'
import Pagination from './../../components/notes/Pagination'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { requestCategoryView } from './../../actions/category/view'
import { Link } from 'react-router-dom'
import {push} from 'react-router-redux'
import queryString from 'query-string'
import AuthenticatedRoute from './../../components/layout/AuthenticatedRoute'

export class CategoryPage extends React.Component {
  static propsTypes = {
    notebook: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    page: PropTypes.number,
    notes: PropTypes.array.isRequired,
    requestView: PropTypes.func,
    paginate: PropTypes.func
  }

  componentDidMount () {
    this.props.requestView()
  }

  render () {
    const parsedParams = queryString.parse(window.location.search)
    const currentPage = parsedParams['page'] ? parseInt(parsedParams['page'], 0) : 1
    return (
      <div className='page-wrapper'>
        <div className='page-header'>
          <h1>{ this.props.notebook ? this.props.notebook.title : '' }</h1>
          <Link className="button is-h-primary" to={`/note-new/${this.props.match.params.categoryId}`}>
            Add New Note
          </Link>
        </div>
        <div className='note-list card-thumb-grid'>
          {
          this.props.notes.length > 0
          ? this.props.notes.map(note => {
            return <NoteThumbItem key={note.key} note={note} />
          })
          : <div> There aren't any notes. </div>
        }
          <Pagination currentPage={currentPage} numberOfPages={this.props.numberOfPages} navigate={this.props.paginate} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ categoryView }) => {
  return {
    notebook: categoryView.notebook,
    notes: categoryView.notes.toJS(),
    isLoading: categoryView.isLoading,
    error: categoryView.error,
    numberOfPages: categoryView.pages
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestView: () => {
      dispatch(requestCategoryView(ownProps.match.params.categoryId, ownProps.location.search))
    },
    paginate: (page) => {
      dispatch(push({
        path: ownProps.match.path,
        search: `?page=${page}`
      }))
      dispatch(requestCategoryView(ownProps.match.params.categoryId, `?page=${page}`))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute(CategoryPage)))
