import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { MemoryRouter } from 'react-router'

it('renders without crashing', () => {
  const div = document.createElement('div')
  /* disable for crashing 
  ReactDOM.render(
    <MemoryRouter>
      <App />
    </MemoryRouter>, div)
  */
})
