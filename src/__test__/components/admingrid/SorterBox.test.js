import React from 'react';
import renderer from 'react-test-renderer'
import {SorterBox} from "../../../components/admingrid/SorterBox"
import {expect as expectChai} from 'chai'
import {spy} from 'sinon';
import {mount} from 'enzyme'

describe('SorterBox', () => {
  it('render correctly without error', ()=> {
    const dummyApi = () => { console.log('dummy check')};
    const fields = [
      { value: 'name', label: 'Name'},
      { value: 'title', label: 'Title'},
      { value: 'description', label: 'Description'}
    ];
    const component = renderer.create(
      <SorterBox fields={fields} requestApi={dummyApi}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('call the request action, when select is changed', () => {
    const dummyApi = spy();
    const fields = [
      { value: 'name', label: 'Name'},
      { value: 'title', label: 'Title'},
      { value: 'description', label: 'Description'}
    ];
    const component = mount(<SorterBox fields={fields} requestApi={dummyApi}/>);
    component.find('.sorter-box__field')
      .simulate('change', {target: {value: 'name'}});

    expectChai(dummyApi.calledOnce).to.equal(true);
    expectChai(dummyApi.calledWith({name: 1}));

    component.find('.sorter-box__direction')
      .simulate('change', {target: {value: -1}});
    expectChai(dummyApi.calledTwice).to.equal(true);
    expectChai(dummyApi.calledWith({name: -1}));
  })
})