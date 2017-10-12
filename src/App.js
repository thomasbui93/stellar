import React from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import {Navigation} from './components/navigations/Navigation'
import LoginPage from './pages/auth/LoginPage'
import {About} from './pages/misc/About'
import {NotFoundPage} from './pages/misc/NotFoundPage'
import {Dashboard} from './pages/dashboard/DashboardIndex'
import './styles/index.sass'

const App = () => (
  <BrowserRouter>
    <div className='public-app'>
      <Navigation />
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/about' component={About} />
        <Route path='/dashboard' component={Dashboard} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default App
