import React from 'react';
import {LoginPage, mapStateToProps} from "../../../pages/auth/LoginPage"
import {StaticTag} from "../../../components/general/StaticTag";
import {Login} from "../../../components/login/Login";
import renderer from 'react-test-renderer';
import {spy} from 'sinon';
import {shallow} from 'enzyme';
import {expect as expectChai} from 'chai';


describe('Login Page', () => {
  it('render correctly', () => {
    const component = renderer.create(<LoginPage/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render error if error is not empty', () => {
    const component = shallow(<LoginPage error="Not Authenticated"/>);
    expectChai(component.find(StaticTag)).to.have.length(1);
  });

  it('should render Login', () => {
    const component = shallow(<LoginPage error="Not Authenticated"/>);
    expectChai(component.find(Login)).to.have.length(1);
  });

  it('should call redirectToDashboard when props isAuthenticated is true', () => {
    const redirectToDashboard = spy();
    const component = shallow(<LoginPage isAuthenticated={true} redirectToDashboard={redirectToDashboard}/>);

    expectChai(redirectToDashboard.calledOnce).to.equal(false);

    component.setProps({isAuthenticated: false});
    expectChai(redirectToDashboard.calledOnce).to.equal(false);

    component.setProps({isAuthenticated: true});
    expectChai(redirectToDashboard.calledOnce).to.equal(true);
  });
});


describe('mapStateToProps', () => {
  it('return isAuthenticated correctly', () => {
    const isAuthenticatedProps = mapStateToProps({
      authReducers:
        {
          token: 'test'
        }
    });
    expectChai(isAuthenticatedProps)
      .to.have.property('isAuthenticated')
      .to.equal(true);

    const failedAuthenticatedPropsUndefined = mapStateToProps({
      authReducers:
        {
          token: undefined
        }
    });
    expectChai(failedAuthenticatedPropsUndefined)
      .to.have.property('isAuthenticated')
      .to.equal(false);

    const failedAuthenticatedPropsEmpty = mapStateToProps({
      authReducers:
        {
          token: ''
        }
    });
    expectChai(failedAuthenticatedPropsEmpty)
      .to.have.property('isAuthenticated')
      .to.equal(false);
  });
});