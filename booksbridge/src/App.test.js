import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';

const mockStore = getMockStore({ 
  users: [
    {
      "id": 1,
      "email": "swpp@snu.ac.kr",
      "password": "iluvswpp",
      "name": "ARTICLE_AUTHOR",
      "logged_in": false
    },
    {
      "id": 2,
      "email": "alan@turing.com",
      "password": "iluvswpp",
      "name": "Alan Turing",
      "logged_in": false
    },
    {
      "id": 3,
      "email": "edsger@dijkstra.com",
      "password": "iluvswpp",
      "name": "Edsger Dijkstra",
      "logged_in": false
    }
  ],
  logged_in_user: null,
});

jest.mock('./containers/Login', () => {
  return jest.fn(props => {
    return (
      <div className="spyLogin">
      </div>);
  });
});

describe('App', () => {
  let app;

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history}/>
      </Provider>
    )
  });

  it('should render', () => {
    const component = mount(app);
    expect(component.find('.App').length).toBe(1);
  });

  it('should be redirected to login page', () => {
    history.push('aaa');
    const component = mount(app);
    expect(component.find(Redirect));
  })
});
