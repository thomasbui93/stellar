import React from 'react'
import {shallow} from 'enzyme'
import {expect as expectChai} from 'chai'
import Message from '../../../components/general/Message'

describe('Message', () => {
  it('should render message box and close button', () => {
    const message = {
      type: 'error',
      info: 'Unexpected error happened'
    }
    const component = shallow(
      <Message message={message} />
    )

    expectChai(component.find('.close-button')).to.have.length(1)
  })

  it('should have isClosed state is false when the close button is clicked', () => {
    const message = {
      type: 'error',
      info: 'Unexpected error happened'
    }
    const component = shallow(
      <Message message={message} />
    )

    component.find('.close-button').simulate('click')
    expectChai(component.state().isClosed).to.equal(true)
  })
})