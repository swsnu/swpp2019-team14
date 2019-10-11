import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Login from './Login';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreators from '../store/actions/actionCreators';

const stubInitialState = {
};

const mockStore = getMockStore(stubInitialState);

describe('<Login />', () => {
  let login, spyGetUsers;
  beforeEach(() => {
    login = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact
            render={() => <Login />} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetUsers = jest.spyOn(actionCreators, 'getUsers')
        .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render Login page', () => {
    const component = mount(login);
    const wrapper = component.find('.login_page');
    expect(wrapper.length).toBe(1);
  });
});
