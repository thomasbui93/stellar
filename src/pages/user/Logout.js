import React from 'react'
import { withRouter } from 'react-router'
import { clearToken } from '../../utils/auth'

export class LogoutPage extends React.Component {
  constructor (props) {
    super(props)
    this.timer = this.timer.bind(this)
  }
  state = {
    seconds: 5,
    intervalId: null
  }
  componentDidMount () {
    clearToken()
    let intervalId = setInterval(this.timer, 1000)
    this.setState({intervalId: intervalId})
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId)
  }

  timer () {
    this.setState({ seconds: this.state.seconds - 1 })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.seconds < 1) {
      this.props.history.push('/')
    }
  }

  render () {
    return (
      <div>
        <h1> Log Out </h1>
        <div> You are logging out. Redirect to front page within {this.state.seconds} {this.state.seconds > 1 ? 'seconds' : 'second'}</div>
      </div>
    )
  }
}

export default withRouter(LogoutPage)
