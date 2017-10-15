import React from 'react'
import renderer from 'react-test-renderer'
import {EditableField} from '../../../components/admin-editor/EditableField'
import {mount} from 'enzyme'
import {expect as expectChai} from 'chai'
import {spy} from 'sinon'

describe('EditableField', () => {
  const updateAction = () => {
    console.log('action update')
  }
  const key = 'test key'
  const data = 'test data'
  const isEditableField = false
  const name = 'test name'
  it('render correctly', () => {
    const component = renderer.create(
      <EditableField
        updateAction={updateAction}
        key={key}
        data={data}
        isEditableField={isEditableField}
        name={name} />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show input field if double click to .editable-field__present', () => {
    const component = mount(
      <EditableField
        updateAction={updateAction}
        key={key}
        data={data}
        isEditableField={isEditableField}
        name={name} />)
    component.find('.editable-field__present').simulate('doubleclick')
    expectChai(component.ref('textPresentation').style).have.property('display').equal('none')
    expectChai(component.ref('textInput').style).have.property('display').equal('block')
  })

  it('should hide input field and call update action if the input is blur', () => {
    const updateActionSpy = spy()
    const component = mount(
      <EditableField
        updateAction={updateActionSpy}
        key={key}
        data={data}
        isEditableField={isEditableField}
        name={name} />)
    component.find('.editable-field__present').simulate('doubleclick')
    component.find('input').simulate('blur')

    expectChai(component.ref('textPresentation').style).have.property('display').equal('block')
    expectChai(component.ref('textInput').style).have.property('display').equal('none')
    expectChai(updateActionSpy.called).to.equal(true)
    let expectedUpdatedData = {}
    expectedUpdatedData[name] = component.ref('textInput').value
    expectChai(updateActionSpy.calledWith(expectedUpdatedData))
  })
})
