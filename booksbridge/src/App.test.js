import React from 'react';
// import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
// import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Redirect } from 'react-router-dom';

import App from './App';
import { history } from './store/store';
import { getMockStore } from './test-utils/mocks';

const mockStore = getMockStore({});

jest.mock('./containers/Signin', () =>
  jest.fn(props => <div className="spyLogin" />),
);

describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history} />
      </Provider>
    );
  });

  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });

  it('should be redirected to login page', () => {
    history.push('aaa');
    const component = mount(app);
    expect(component.find(Redirect));
  });
});
