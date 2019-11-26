import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

import BookDetail from './BookDetail';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreators from '../store/actions/actionCreators';

const stubInitialState = {
  selectedBook: {
    isbn: 1,
    title: 'TEST_BOOK',
    url: 'TEST_URL',
    thumbnail: 'TEST_THUMBNAIL',
    contents: 'TEST_CONTENTS',
    authors: 'TEST_AUTHORS',
    publisher: 'TEST_PUBLISHER',
    published_date: 'TEST_DATE',
    author_contents: 'TEST_AUTHOR_CONTENTS',
  },
  shortReviews: [
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
      is_long: false,
      is_short: true,
      is_phrase: false,
    },
  ],
  longReviews: [
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
    },
  ],
  phrases: [
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
      is_long: false,
      is_short: false,
      is_phrase: true,
    },
  ],
  libraries: [],
};

const mockStore = getMockStore(stubInitialState);

describe('<BookDetail />', () => {
  let bookDetail, spyGetArticlesByBookId, spyGetSpecificBook;
  beforeEach(() => {
    bookDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Route path="/" exact render={() => <BookDetail />} />
        </ConnectedRouter>
      </Provider>
    );
    spyGetSpecificBook = jest
      .spyOn(actionCreators, 'getSpecificBook')
      .mockImplementation(id => {
        return dispatch => {};
      });
    spyGetArticlesByBookId = jest
      .spyOn(actionCreators, 'getArticlesByBookId')
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it('should render bookDetail', () => {
    const component = mount(
      <Provider store={getMockStore({})}>
        <ConnectedRouter history={history}>
          <Route path="/" exact render={() => <BookDetail />} />
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find('.Spinner');
    expect(wrapper.length).toBe(2);
  });

  it(`'should render loading page`, () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(bookDetail);
    const wrapper = component.find('#create_review_button').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/review/create');
  });

  it(`'should redirect to review create page`, () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(bookDetail);
    const wrapper = component.find('#create_review_button').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/review/create');
  });
});
