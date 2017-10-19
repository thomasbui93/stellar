import React from 'react'
import {Route} from 'react-router-dom'
import TagIndex from './tags/TagIndex'
import TagEdit from './tags/TagEdit'

export const Dashboard = ({ match }) => {
  return <div className='app-dashboard'>
    <Route exact path={`${match.url}/tags`} component={TagIndex} />
    <Route exact path={`${match.url}/tags/:key`} component={TagEdit} />
  </div>
}
