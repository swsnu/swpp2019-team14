import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Signin from './Signin';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreators from '../store/actions/actionCreators';

const stubInitialState = {};

const mockStore = getMockStore(stubInitialState);

describe('<Signin />', () => {
  let signin;
  beforeEach(() => {
    signin = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Signin />
          {/* <Switch> */}
          {/* <Route path="/" exact render={() => <Signin />} /> */}
          {/* </Switch> */}
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Signin page', () => {
    const component = mount(signin);
    const wrapper = component.find('.login_page');
    expect(wrapper.length).toBe(1);
  });

  it(`should change username state`, () => {
    const input = 'TEST_INPUT';
    const component = mount(signin);
    const wrapper = component.find('#username-input').at(3);
    wrapper.simulate('change', { target: { value: input } });
    const instance = component.find(Signin.WrappedComponent).instance();
    expect(instance.state.username).toEqual(input);
  });

  it(`should change password state`, () => {
    const input = 'TEST_INPUT';
    const component = mount(signin);
    const wrapper = component.find('#pw-input').at(3);
    wrapper.simulate('change', { target: { value: input } });
    const instance = component.find(Signin.WrappedComponent).instance();
    expect(instance.state.password).toEqual(input);
  });

  it(`should call loginUser`, () => {
    const spyLoginUser = jest
      .spyOn(actionCreators, 'loginUser')
      .mockImplementation(user => {
        return dispatch => {};
      });
    const username = 'TEST_USER';
    const password = 'TEST_PASSWORD';
    const component = mount(signin);
    const wrapperUsername = component.find('#username-input').at(3);
    wrapperUsername.simulate('change', { target: { value: username } });
    const wrapperPassword = component.find('#pw-input').at(3);
    wrapperPassword.simulate('change', { target: { value: password } });
    const wrapper = component.find('#login-button').at(0);
    const instance = component.find(Signin.WrappedComponent).instance();
    expect(instance.state.password).toEqual(password);
    wrapper.simulate('submit');
    expect(spyLoginUser).toHaveBeenCalledTimes(1);
  });

  it(`'should redirect to signup page`, () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(signin);
    const wrapper = component.find('#signup-button').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/sign-up/');
  });
  it('should toggle auto login', () => {
    const component = mount(signin);
    const radio = component.find({ type: 'radio' }).at(0); // phrase
    radio.simulate('change', { target: { checked: true } });
    const instance = component.find(Signin.WrappedComponent).instance();
    expect(instance.state.autoLogin).toEqual(true);
  });
});
