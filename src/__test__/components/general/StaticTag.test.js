import React from 'react'
import {StaticTag} from '../../../components/general/StaticTag'
import renderer from 'react-test-renderer'
import {shallow} from 'enzyme'

describe('StaticTag Component', function () {
  it('render correctly', () => {
    const component = renderer.create(<StaticTag />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should render props correctly', () => {
    const wrapper = shallow(<StaticTag className='test-class' staticText='A static text' />)
    expect(wrapper.props().className).toEqual('test-class static-tag')
  })

  it('should render passed props into the component', () => {
    const wrapper = shallow(<StaticTag className='test-class' staticText='A static text' />)
    expect(wrapper.text()).toEqual('A static text')
  })
})
