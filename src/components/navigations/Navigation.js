import React, {Component} from 'react'
import {PrivateNavigation} from './PrivateNavigation'

export class Navigation extends Component {
  render () {
    return <div className='app-navigation'>
      <PrivateNavigation />
    </div>
  }
}
