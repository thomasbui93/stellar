import React from 'react'
import CategoryInlineEditor from '../../../components/category/CategoryInlineEditor'
import {mount} from 'enzyme'
import {expect as expectChai} from 'chai'
import {spy} from 'sinon'
import { MemoryRouter } from 'react-router'

describe('CategoryItem', () => {
  it('should show render input and button text', () => {
    const createAction = spy()
    const component = mount(
      <MemoryRouter>
        <CategoryInlineEditor
          isCreating={false}
          createAction={createAction}
        />
      </MemoryRouter>
     )

    expectChai(component.find('input')).to.have.length(1)
    expectChai(component.find('input').is('disabled')).to.equal(false)
    expectChai(component.find('button')).to.have.length(1)
    expectChai(component.find('button').text()).to.equal('Create')
  })
})
