import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import CategoryPage from './pages/category/CategoryPage'
import CategoryListPage from './pages/category/CategoryListPage'
import NotePage from './pages/note/NotePage'
import NoteNewPage from './pages/note/NoteNewPage'
import './styles/index.scss'

const App = () => (
  <BrowserRouter>
    <div className='stellar-application' >
      <Sidebar />
      <div className='main-content'>
        <Switch>
          <Route exact path='/categories' component={CategoryListPage} />
          <Route exact path='/categories/:categoryId' component={CategoryPage} />
          <Route exact path='/notes/:noteId' component={NotePage} />
          <Route exact path='/note-new/:categoryId' component={NoteNewPage} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
)

export default App
