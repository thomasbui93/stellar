import React from 'react'
import renderer from 'react-test-renderer'
import {DataRow} from '../../../components/admingrid/DataRow'
import { MemoryRouter } from 'react-router'

describe('DataRow', () => {
  it('should render correctly', () => {
    const item = {
      name: 'Test Row',
      key: 'test-row',
      isActive: false,
      baseUrl: '/'
    };
    const component = renderer.create(
      <MemoryRouter>
        <DataRow item={item} className='row-data' />
      </MemoryRouter>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
