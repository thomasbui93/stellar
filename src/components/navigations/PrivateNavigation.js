import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class PrivateNavigation extends Component {
  render () {
    return <div className='navbar'>
      <Link to='/dashboard/notes' className='navbar-item'>Notes</Link>
      <Link to='/dashboard/tags' className='navbar-item'>Tags</Link>
      <Link to='/dashboard/categories' className='navbar-item'>Categories</Link>
    </div>
  }
}
