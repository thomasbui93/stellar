import React, {Component} from 'react';

export class Login extends Component {
  render() {
    return <div className="login-form">
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input className="input" type="text" placeholder="Username"/>
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password"/>
        </div>
      </div>
      <div className="control">
        <button className="button is-primary">Submit</button>
      </div>
    </div>
  }
}