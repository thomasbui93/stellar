import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect} from 'react-router'

export default class PrivateRoute  extends Component {

  static propTypes = {
    component: PropTypes.func,
    path: PropTypes.string,
    name: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool
  };

  async validate(){

  }

  render() {
    const canAccess = true;
    return canAccess ? <Route {...this.props} /> : <Redirect to="/login" />
  }
}
