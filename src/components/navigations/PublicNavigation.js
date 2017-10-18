import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class PublicNavigation extends Component {
  render () {
    return <div className='navigation navbar'>
      <Link to='/about' className='navbar-item'>About</Link>
      <Link to='/login' className='navbar-item'>Login</Link>
    </div>
  }
}
