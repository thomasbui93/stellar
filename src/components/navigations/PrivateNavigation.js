import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class PrivateNavigation extends Component {
  render() {
    return <div className="navigation">
      <Link to="/about">Notes</Link>
      <Link to="/tags">Tags</Link>
      <Link to="/categories">Categories</Link>
    </div>
  }
}