import React from 'react'
import { Map } from 'immutable'
import { Link } from 'react-router-dom'

export default class Sidebar extends React.Component {
  state = {
    data: Map({ isOpened: true })
  }

  constructor () {
    super()
    this.toggleSideBar = this.toggleSideBar.bind(this)
  }

  toggleSideBar () {
    this.setState(({ data }) => ({
      data: data.update('isOpened', v => !v)
    }))
  }

  render () {
    const state = this.state.data
    const today = new Date()
    return (
      <div className={`sidebar ${state.get('isOpened') ? '' : 'closed'}`}>
        <div className='sidebar__header'>
          <div> Stellar </div>
          <div className='sidebar__icon' onClick={this.toggleSideBar}>
            <i className='material-icons'>settings</i>
          </div>
        </div>
        <div className='sidebar__content'>
          <div className='sidebar__item'>
            <Link to='/categories'>Notebooks</Link>
            <Link to='/logout'> Logout </Link>
          </div>
        </div>
        <div className='sidebar__footer'>
          Copyright { today.getFullYear() } - Khoa Bui
        </div>
      </div>
    )
  }
}
