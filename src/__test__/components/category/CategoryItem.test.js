import React from 'react'
import CategoryItem from '../../../components/category/CategoryItem'
import {shallow} from 'enzyme'
import {expect as expectChai} from 'chai'
import {spy} from 'sinon'
import { Link } from 'react-router-dom'

describe('CategoryItem', () => {
  const category = {
    key: '1232-a-a-a',
    title: 'Sample title'
  }
  const isLoading = false
  const updateAction = () => {
    console.log('update action')
  }

  it('should show render link and action icons', () => {
    const removeActionApi = spy()
    const component = shallow(
      <CategoryItem
        updateAction={updateAction}
        category={category}
        isLoading={isLoading}
        removeAction={removeActionApi} />,
      { lifecycleExperimental: true })
    expectChai(component.find('.category-item__actions')).to.have.length(1)
    expectChai(component.find(Link)).to.have.length(1)
    component.find('.category-item__remove').simulate('click')
    expectChai(removeActionApi.calledOnce).to.equal(true)
    expectChai(removeActionApi.calledWith(category.key))
  })

  it('should not show render link and action icons when state isEditingMode is true', () => {
    const removeActionApi = spy()
    const updateActionApi = spy()
    const component = shallow(
      <CategoryItem
        updateAction={updateActionApi}
        category={category}
        isLoading={isLoading}
        removeAction={removeActionApi} />)
    component.setState({'isEditingMode': true})
    expectChai(component.find('.category-item__actions')).to.have.length(0)
    expectChai(component.find(Link)).to.have.length(0)
    expectChai(component.find('.category-item__editor')).to.have.length(1)
  })
})
