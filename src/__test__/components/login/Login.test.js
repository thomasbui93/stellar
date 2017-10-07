import React from 'react';
import {Login} from "../../../components/login/Login";
import renderer from 'react-test-renderer';
import {shallow, mount} from 'enzyme';
import {expect as expectChai} from 'chai';
import { spy } from 'sinon'

describe('Login Component', () => {
  it('render correctly', () =>{
    const component = renderer.create(<Login/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render required elements: input, button', ()=> {
    const wrapper = shallow(<Login />);
    expectChai(wrapper.find('button')).to.have.length(1);
    expectChai(wrapper.find('input[type="text"]')).to.have.length(1);
    expectChai(wrapper.find('input[type="password"]')).to.have.length(1);
  });

  it('should disable submit button while isLoading is set to true', ()=>{
    const wrapper = shallow(<Login isLoading={true} />);
    expectChai(wrapper.find('button').prop('disabled')).equal(true);
  });

  it('should call onSubmit if button is click', () => {
    const onButtonClick = spy();
    const wrapper = mount(<Login isLoading={false} onSubmit={onButtonClick}/>);
    wrapper.find('form').simulate('submit');
    expectChai(onButtonClick.calledOnce).to.equal(true);
  });

});