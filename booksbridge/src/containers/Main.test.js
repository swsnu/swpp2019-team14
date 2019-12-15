import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Main from './Main';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreators from '../store/actions/actionCreators';

const stubInitialState = {
  loadArticle: [
    {
      author: {
        id: 1,
        username: 'TEST_USER',
        profile_photo: '',
        nickname: 'TEST_USER',
      },
      book_isbn: 9788915092044,
      book_title: 'TEST_BOOK',
      book_thumbnail: '',
      id: 1,
      title: 'TEST_ARTICLE',
      content: 'TEST_ARTICLE',
      date: [0, 0, 0, 1, 454],
      is_long: true,
      is_short: false,
      is_phrase: false,
      is_spoiler: false,
      like_or_not: true,
      like_count: 1,
    },
  ],
  hasNext: true,
};

const mockStore = getMockStore(stubInitialState);

describe('<Main />', () => {
  let main;
  beforeEach(() => {
    main = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Main />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Article', () => {
    const component = mount(main);
    const wrapper = component.find('.main');
    expect(wrapper.length).toBe(1);
  });

  //it('should ')
});
