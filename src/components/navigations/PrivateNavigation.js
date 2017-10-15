import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class PrivateNavigation extends Component {
  render () {
    return <div className='navigation'>
      <Link to='/dashboard/notes'>Notes</Link>
      <Link to='/dashboard/tags'>Tags</Link>
      <Link to='/dashboard/categories'>Categories</Link>
    </div>
  }
}
