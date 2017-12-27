import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import { PrivateRoute, EntryRoute } from './components/layout/AuthenticatedRoute'
import Sidebar from './components/layout/Sidebar'
import CategoryPage from './pages/category/CategoryPage'
import CategoryListPage from './pages/category/CategoryListPage'
import NotePage from './pages/note/NotePage'
import NoteNewPage from './pages/note/NoteNewPage'
import LoginPage from './pages/user/Login'
import LogoutPage from './pages/user/Logout'
import NotFound from './pages/user/NotFound'
import './styles/index.scss'

const App = () => (
  <BrowserRouter>
    <div className='stellar-application' >
      <Sidebar />
      <div className='main-content'>
        <Switch>
          <EntryRoute exact path='/' component={LoginPage} />
          <PrivateRoute exact path='/categories' component={CategoryListPage} />
          <PrivateRoute exact path='/categories/:categoryId' component={CategoryPage} />
          <PrivateRoute exact path='/notes/:noteId' component={NotePage} />
          <PrivateRoute exact path='/note-new/:categoryId' component={NoteNewPage} />
          <LogoutPage exact path='/logout' component={LogoutPage} />
          <Route exact path='/not-found' component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
)

export default App
