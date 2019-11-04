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
          <Switch>
            <Route path="/" exact render={() => <Signin />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Signin page', () => {
    const component = mount(signin);
    const wrapper = component.find('.login_page');
    expect(wrapper.length).toBe(1);
  });
});
