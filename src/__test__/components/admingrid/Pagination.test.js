import React from 'react';
import renderer from 'react-test-renderer'
import {Pagination} from "../../../components/admingrid/Pagination"
import {expect as expectChai} from 'chai'
import {spy} from 'sinon';
import {mount} from 'enzyme';

describe('Pagination', () => {
  it('render correctly once provide proper props', ()=> {
    const dummyApi = () => { console.log('dummy check')};
    const component = renderer.create(
      <Pagination prev={1} next={3} requestApi={dummyApi}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot()
  });

  it('navigation functions called once click', ()=> {
    const dummyApi = spy();
    const component = mount(
      <Pagination prev={1} next={3} requestApi={dummyApi}/>
    );

    component
      .find('.pagination-next')
      .simulate('click');
    expectChai(dummyApi.calledOnce).to.equal(true);
    expectChai(dummyApi.calledWith({page: 3}))

    component
      .find('.pagination-previous')
      .simulate('click');
    expectChai(dummyApi.calledTwice).to.equal(true);
    expectChai(dummyApi.calledWith({page: 2}))
  });
});