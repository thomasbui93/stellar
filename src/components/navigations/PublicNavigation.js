import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class PublicNavigation extends Component {
  render() {
    return <div className="navigation">
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
    </div>
  }
}