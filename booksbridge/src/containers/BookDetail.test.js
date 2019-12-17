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
  currentBook: {
    isbn: 1,
    title: 'TEST_BOOK',
    url: 'TEST_URL',
    thumbnail: 'TEST_THUMBNAIL',
    contents: 'TEST_CONTENTS',
    authors: 'TEST_AUTHORS',
    publisher: 'TEST_PUBLISHER',
    published_date: 'TEST_DATE',
    author_contents: 'TEST_AUTHOR_CONTENTS',
    like_users: [],
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
      like_count: 1,
      like_or_not: true,
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
      like_count: 1,
      like_or_not: true,
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
      like_count: 1,
      like_or_not: true,
    },
  ],
  libraries: [],
  logged_in_user: {
    id: 1,
    username: 'TEST_USER',
    profile_photo: '',
    nickname: 'TEST_USER',
  },
};
const mockStore = getMockStore(stubInitialState);

const stubInitialState2 = {
  currentBook: {
    isbn: 1,
    title: 'TEST_BOOK',
    url: 'TEST_URL',
    thumbnail: 'TEST_THUMBNAIL',
    contents: 'TEST_CONTENTS',
    authors: 'TEST_AUTHORS',
    publisher: 'TEST_PUBLISHER',
    published_date: 'TEST_DATE',
    author_contents: 'TEST_AUTHOR_CONTENTS',
    like_users: [
      {
        id: 1,
        username: 'TEST_USER',
        profile_photo: '',
        nickname: 'TEST_USER',
      },
    ],
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
      like_count: 1,
      like_or_not: true,
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
      like_count: 1,
      like_or_not: true,
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
      like_count: 1,
      like_or_not: true,
    },
  ],
  libraries: [],
  logged_in_user: {
    id: 1,
    username: 'TEST_USER',
    profile_photo: '',
    nickname: 'TEST_USER',
  },
};
const mockStore2 = getMockStore(stubInitialState2);

describe('<BookDetail />', () => {
  let bookDetail,
    spyGetArticlesByBookId,
    spyGetSpecificBook,
    bookDetail2,
    spyLikeBook,
    spyUnlikeBook,
    spyLikeArticle,
    spyUnlikeArticle,
    spyDeleteArticle;
  beforeEach(() => {
    bookDetail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Route path="/" exact render={() => <BookDetail />} />
        </ConnectedRouter>
      </Provider>
    );
    bookDetail2 = (
      <Provider store={mockStore2}>
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
    spyLikeBook = jest
      .spyOn(actionCreators, 'postBookLike')
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyUnlikeBook = jest
      .spyOn(actionCreators, 'deleteBookLike')
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyLikeArticle = jest
      .spyOn(actionCreators, 'postArticleLike')
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyUnlikeArticle = jest
      .spyOn(actionCreators, 'deleteArticleLike')
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyDeleteArticle = jest
      .spyOn(actionCreators, 'deleteSpecificArticle')
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it('should render loading page', () => {
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

  it(`'should redirect to review create page`, () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(bookDetail);
    const wrapper = component.find('#create_review_button').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/review/create');
  });
  it('should like book', () => {
    const component = mount(bookDetail);
    const button = component.find('#like-book-button').at(0);
    button.simulate('click');
    expect(spyLikeBook).toHaveBeenCalledTimes(1);
  });
  it('should unlike book', () => {
    const component = mount(bookDetail2);
    const button = component.find('#like-book-button').at(0);
    button.simulate('click');
    expect(spyLikeBook).toHaveBeenCalledTimes(1);
  });
});
