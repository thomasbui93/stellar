import React from 'react'
import { connect } from 'react-redux'
import { requestAuthentication } from '../../actions/user/auth';
import { withRouter } from 'react-router'
import Notice from '../../components/general/Notice'
import { saveToken } from '../../utils/auth';

export class LoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.requestAuthentication = this.requestAuthentication.bind(this)
  }

  requestAuthentication(){
    return this.props.requestAuthentication(this.refs.username.value, this.refs.password.value)
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.token) {
      this.props.redirectToMainPage(nextProps.token)
      this.props.history.push('/categories')
    }
  }

  render() {
    return (
      <div>
        <h1> Log In </h1>
        { this.props.error ? <Notice type='error' message={this.props.error}/> : ''}
        <div className="field">
          <div className="control">
            <label>User Name</label>
          </div>
          <div className="input">
            <input type="text" ref="username"/>
          </div>
        </div> 
        <div className="field">
          <div className="control">
            <label>Password</label>
          </div>
          <div className="input">
            <input type="password" ref="password"/>
          </div>
        </div>
        <div className="action">
          <button onClick={this.requestAuthentication}> { this.props.isLoading ? 'Logging In' : 'Login' } </button>
        </div>        
      </div>
    )
  }
}

const mapStateToProps = ({ userAuth }) => {
  return {
    isLoading: userAuth.isLoading,
    token: userAuth.token,
    error: userAuth.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestAuthentication: (username, password) => {
      dispatch(requestAuthentication(username, password))
    },
    redirectToMainPage: (token) => {
      saveToken(token)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))