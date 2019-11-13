import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import { getMockStore } from '../test-utils/mocks';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { history } from '../store/store';

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
    expect(spyHistoryPush).toHaveBeenCalledWith(
      '/result/search=TEST_INPUT/book/1',
    );
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
    expect(spyHistoryPush).toHaveBeenCalledWith(
      '/result/search=TEST_INPUT/book/1',
    );
  });

  it(`'should redirect to main page`, () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(user => {
        return dispatch => {};
      });
    const component = mount(header);
    const wrapper = component.find('.logo').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/main');
  });
});
