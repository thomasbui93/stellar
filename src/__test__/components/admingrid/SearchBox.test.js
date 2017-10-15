import React from 'react'
import renderer from 'react-test-renderer'
import {SearchBox} from '../../../components/admingrid/SearchBox'
import {expect as expectChai} from 'chai'
import {spy} from 'sinon'
import {mount} from 'enzyme'

describe('SearchBox', () => {
  it('render correctly without error', () => {
    const dummyApi = () => {
      console.log('dummy check')
    }
    const component = renderer.create(
      <SearchBox requestApi={dummyApi} className='search-box-container' />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('trigger requestApi when submit the form with more than 2 character input (TBD)', () => {
    const dummyApi = spy()
    const component = mount(<SearchBox requestApi={dummyApi} />)

    component.find('button[type="button"]')
      .simulate('click')
    expectChai(dummyApi.called).to.equal(true)
    expectChai(dummyApi.calledWith({query: false}))
  })
})
