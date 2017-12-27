import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class CategorySelector extends React.Component {
  static propTypes = {
    notebook: PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string
    }).isRequired
  }

  render() {
    return (
      <div>
        { 
          this.props.notebook ?
            <Link to={`/categories/${this.props.notebook.key}`}>Back To {this.props.notebook.title}</Link> : ''
        }
      </div>
    )
  }
}