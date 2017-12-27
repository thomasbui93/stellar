import React from 'react'
import Notice from '../general/Notice'
import { Route, Redirect } from 'react-router-dom'
import { clearToken, getToken } from '../../utils/auth'

export default ComponentPage => {
  return class AuthenticatedRoute extends ComponentPage {
    componentWillReceiveProps(nextProps) {
      if(nextProps.error && nextProps.error.status === 401) {
        clearToken()
        this.props.history.push('/')
      }
    }

    render() {
      const { error } = this.props
      return ( !error || error.status !== 401 ) ? super.render() : <Notice type="error" message="Unauthorized request. Redirecting ..."/>
    }
  }
}

export const PrivateRoute = ({ component: Component, ...rest }) => {
   return <Route {...rest} render={props => (
    getToken() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
}

export const EntryRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => (
   getToken() ? (
     <Redirect to={{
      pathname: '/categories',
      state: { from: props.location }
    }}/>
   ) : (
    <Component {...props}/>
   )
 )}/>
}