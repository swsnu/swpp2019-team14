import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Create from './Create';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreators from '../store/actions/actionCreators';

const stubInitialState = {
};

const mockStore = getMockStore(stubInitialState);

describe('<Create />', () => {
  beforeEach(() => {
    newArticle = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={Create} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => { jest.clearAllMocks() });

  it('should render Article', () => {
    const component = mount(newReview);
    const wrapper = component.find('.NewReview');
    expect(wrapper.length).toBe(1);
  });

});


