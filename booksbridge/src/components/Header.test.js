import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import { getMockStore } from '../test-utils/mocks';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { history } from '../store/store';
import * as actionCreators from '../store/actions/actionCreators';

const stubInitialState = {
  logged_in_user: {
    username: 'TEST_USER',
    nickname: 'TEST_USER',
    profile_photo: '',
    profile_text: '',
  },
};
const mockStore = getMockStore(stubInitialState);

describe('<Header/>', () => {
  let header;
  beforeEach(() => {
    header = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Header />
        </ConnectedRouter>
      </Provider>
    );
  });
  it('should render without errors', () => {
    const component = mount(header);
    const wrapper = component.find('.MainHeader');
    expect(wrapper.length).toBe(1);
  });

  it(`should redirect to search result page(enter)`, () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(user => {
        return dispatch => {};
      });
    const input = 'TEST_INPUT';
    const component = mount(header);
    const wrapper = component.find('#search-input').at(0);
    wrapper.simulate('change', { target: { value: input } });
    component.find('input').simulate('keypress', { key: 'Spacebar' });
    component.find('input').simulate('keypress', { key: 'Enter' });
    expect(spyHistoryPush).toHaveBeenCalledWith('/result/search=TEST_INPUT/1');
  });

  it(`'should redirect to search result page(click)`, () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(user => {
        return dispatch => {};
      });
    const input = 'TEST_INPUT';
    const component = mount(header);
    const wrapper = component.find('#search-input').at(0);
    wrapper.simulate('change', { target: { value: input } });
    component
      .find('#search-button')
      .at(0)
      .simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/result/search=TEST_INPUT/1');
  });

  it(`'should redirect to my page`, () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(user => {
        return dispatch => {};
      });
    const component = mount(header);
    const wrapper = component.find('.header-icon').at(0);
    wrapper.simulate('click');
    component
      .find('MenuItem')
      .at(0)
      .simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/page/TEST_USER');
  });

  it('should redirect to my library', () => {
    const spyHistoryPushLibrary = jest
      .spyOn(history, 'push')
      .mockImplementation(user => {
        return dispatch => {};
      });
    const component = mount(header);
    const wrapper = component.find('.header-icon').at(0);
    wrapper.simulate('click');
    component
      .find('MenuItem')
      .at(1)
      .simulate('click');
    expect(spyHistoryPushLibrary).toHaveBeenCalledWith('/library/');
  });

  it(`'should log out`, () => {
    const spyLogout = jest
      .spyOn(actionCreators, 'logoutUser')
      .mockImplementation(() => {
        return dispatch => {};
      });
    const component = mount(header);
    const wrapper = component.find('.header-icon').at(0);
    wrapper.simulate('click');
    component
      .find('MenuItem')
      .at(2)
      .simulate('click');
    expect(spyLogout).toBeCalledTimes(1);
  });
});
