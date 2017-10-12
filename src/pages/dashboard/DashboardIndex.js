import React from 'react'
import {Route} from 'react-router-dom'
import TagIndex from './tags/TagIndex'
import {PrivateNavigation} from '../../components/navigations/PrivateNavigation'

export const Dashboard = ({ match }) => {
  return <div className='app-dashboard'>
    <PrivateNavigation />
    <Route path={`${match.url}/tags`} component={TagIndex} />
  </div>
}
