import React from 'react'
import PropTypes from 'prop-types'

export default class Message extends React.Component {
  static propTypes = {
    message: PropTypes.shape({
      type: PropTypes.oneOf(['error', 'notice']),
      info: PropTypes.string
    }).isRequired
  }

  state = {
    isClosed: false
  }

  render() {
    return (
      <div className={`${this.props.message.type} message ${this.state.isClosed ? 'hidden': ''}`}>
        <span>{this.props.message.info}</span>
        <span className="close-button" onClick={() => { this.setState({ isClosed: true })}}>
          <i className="material-icons">close</i>
        </span>
      </div>
    )
  }
}
