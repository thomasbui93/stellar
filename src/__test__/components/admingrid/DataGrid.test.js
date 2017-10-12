import React from 'react'
import renderer from 'react-test-renderer'
import {DataGrid} from '../../../components/admingrid/DataGrid'
import {MemoryRouter} from 'react-router'
import {shallow} from 'enzyme';
import {expect as expectChai} from 'chai';
import {Loader} from "../../../components/general/Loader";
import {DataRow} from "../../../components/admingrid/DataRow";

describe('DataGrid', () => {
  const items = [{
    name: 'Test Row',
    key: 'test-row',
    isActive: false,
    baseUrl: '/'
  }];
  const isLoading = false;
  const rowClassName = 'test-class-name';
  const baseUrl = '/base-url';

  it('should render correctly', () => {
    const component = renderer.create(
      <MemoryRouter>
        <DataGrid isLoading={isLoading}
                  baseUrl={baseUrl}
                  rowClassName={rowClassName}
                  className='row-data'
                  items={items}/>
      </MemoryRouter>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('should show empty grid if items is empty', () => {
    const wrapper = shallow(
      <DataGrid isLoading={isLoading}
                baseUrl={baseUrl}
                rowClassName={rowClassName}
                className='row-data'
                items={items}/>,
      { lifecycleExperimental: true }
    );
    expectChai(wrapper.find('.empty-grid')).to.have.length(0);
    wrapper.setProps({items: []});
    expectChai(wrapper.find('.empty-grid')).to.have.length(1);
  });

  it('should render correct number of DataRow element', () => {
    const wrapper = shallow(
      <DataGrid isLoading={isLoading}
                baseUrl={baseUrl}
                rowClassName={rowClassName}
                className='row-data'
                items={items}/>
    );
    expectChai(wrapper.find(DataRow)).to.have.length(items.length);
  });
});
