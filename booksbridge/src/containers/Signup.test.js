import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Signup from './Signup';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreators from '../store/actions/actionCreators';

const stubInitialState = {};

const mockStore = getMockStore(stubInitialState);

describe('<Signup />', () => {
  let signup;
  beforeEach(() => {
    signup = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Signup />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Signup page', () => {
    const component = mount(signup);
    const wrapper = component.find('.signup_page');
    expect(wrapper.length).toBe(1);
  });

  it(`should change username state`, () => {
    const input = 'TEST_INPUT';
    const component = mount(signup);
    const wrapper = component.find('#formBasicEmail').at(0);
    wrapper.simulate('change', { target: { value: input } });
    const newInstance = component.find(Signup.WrappedComponent).instance();
    expect(newInstance.state.email).toEqual(input);
  });

  it(`should change nickname state`, () => {
    const input = 'TEST_INPUT';
    const component = mount(signup);
    const wrapper = component.find('#formBasicNickname').at(0);
    wrapper.simulate('change', { target: { value: input } });
    const newInstance = component.find(Signup.WrappedComponent).instance();
    expect(newInstance.state.nickname).toEqual(input);
  });

  it(`should change username state`, () => {
    const input = 'TEST_INPUT';
    const component = mount(signup);
    const wrapper = component.find('#validationFormUsername').at(0);
    wrapper.simulate('change', { target: { value: input } });
    const newInstance = component.find(Signup.WrappedComponent).instance();
    expect(newInstance.state.username).toEqual(input);
  });

  it(`should change password state`, () => {
    const input = 'TEST_INPUT';
    const component = mount(signup);
    const wrapper = component.find('#formBasicPassword').at(0);
    wrapper.simulate('change', { target: { value: input } });
    const newInstance = component.find(Signup.WrappedComponent).instance();
    expect(newInstance.state.password).toEqual(input);
  });

  it(`should call postUser`, () => {
    const spyPostUser = jest
      .spyOn(actionCreators, 'postUser')
      .mockImplementation(user => {
        return dispatch => {};
      });
    const email = 'TEST_EMAIL';
    const username = 'TEST_USER';
    const password = 'TEST_PASSWORD';
    const nickname = 'TEST_NICKNAME';
    const component = mount(signup);
    const wrapperEmail = component.find('#formBasicEmail').at(0);
    wrapperEmail.simulate('change', { target: { value: email } });
    const wrapperUsername = component.find('#validationFormUsername').at(0);
    wrapperUsername.simulate('change', { target: { value: username } });
    const wrapperPassword = component.find('#formBasicPassword').at(0);
    wrapperPassword.simulate('change', { target: { value: password } });
    const wrapperNickname = component.find('#formBasicNickname').at(0);
    wrapperNickname.simulate('change', { target: { value: nickname } });
    const wrapper = component.find('#login-button').at(0);
    wrapper.simulate('submit');
    expect(spyPostUser).toHaveBeenCalledTimes(1);
  });
});
