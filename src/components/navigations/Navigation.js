import React, {Component} from 'react'
import {isAuth} from '../../utils/auth'
import {PrivateNavigation} from './PrivateNavigation'
import {PublicNavigation} from './PublicNavigation'

export class Navigation extends Component {
  render () {
    return <div className='app-navigation'>
        { isAuth() ? <PrivateNavigation /> : <PublicNavigation /> }
    </div>
  }
}
