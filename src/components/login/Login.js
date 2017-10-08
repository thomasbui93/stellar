import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class Login extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isLoading: PropTypes.bool
  };

  constructor (props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  submit (event) {
    event.preventDefault()
    this.props.onSubmit(this.refs.username.value, this.refs.password.value)
  }

  render () {
    return <form className='login-form' onSubmit={this.submit}>
      <div className='field'>
        <label className='label'>Email</label>
        <div className='control'>
          <input className='input' type='text' placeholder='Username' ref='username' />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Password</label>
        <div className='control'>
          <input className='input' type='password' ref='password' />
        </div>
      </div>
      <div className='control'>
        <button className='button is-primary' type='submit' disabled={this.props.isLoading}>Submit</button>
      </div>
    </form>
  }
}
