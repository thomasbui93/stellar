import {connect} from 'react-redux'
import {push} from 'react-router-redux'
import {withRouter} from 'react-router-dom'
import React, {Component} from 'react'
import {Login} from '../../components/login/Login'
import {requestAuthentication} from '../../actions/auth/login'
import {StaticTag} from '../../components/general/StaticTag'

export class LoginPage extends Component {
  componentWillReceiveProps (nextProps) {
    const {isAuthenticated} = nextProps
    if (isAuthenticated) {
      this.props.redirectToDashboard()
    }
  }

  render () {
    return <div className='login-page page'>
      {this.props.error ? <StaticTag className='error-tag' staticText={this.props.error} /> : ''}
      <Login onSubmit={this.props.onSubmit} isLoading={this.props.isLoading} className='center' />
    </div>
  }
}

export const mapStateToProps = ({authReducers}) => {
  return {
    error: authReducers.error,
    isLoading: authReducers.isLoading,
    isAuthenticated: typeof authReducers.token !== 'undefined' && authReducers.token !== ''
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (username, password) => {
      dispatch(requestAuthentication(username, password))
    },
    redirectToDashboard: () => {
      dispatch(push('/dashboard'))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
