import React from 'react';
import { mount } from 'enzyme';
import UserPage from './UserPage';
import * as actionCreators from '../store/actions/actionCreators';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

const stubInitialState = {
  logged_in_user: {
    id: '0',
    username: 'USERNAME',
    nickname: 'NICKNAME',
    profile_photo: 'url',
    profile_text: 'PROFILE COMMENT',
  },
  profile_user: {
    id: '0',
    username: 'USERNAME',
    nickname: 'NICKNAME',
    profile_photo: 'url',
    profile_text: 'PROFILE COMMENT',
    like_books: [],
  },
  articlesByUserID: [
    {
      book_title: 'BOOK1',
      title: 'TITLE1',
      content: 'CONTENT1',
      is_long: true,
      is_short: false,
      is_phrase: false,
    },
    {
      book_title: 'BOOK2',
      title: 'TITLE2',
      content: 'CONTENT2',
      is_long: false,
      is_short: true,
      is_phrase: false,
    },
    {
      book_title: 'BOOK3',
      title: 'TITLE3',
      content: 'CONTENT3',
      is_long: false,
      is_short: false,
      is_phrase: true,
    },
  ],
  curationsByUserID: [
    {
      id: 1,
      author: {
        id: 2,
        username: 'TEST_USER',
        profile_photo: '',
        nickname: 'TEST_USER',
      },
      books: [
        {
          book: {
            title: 'TEST_TITLE',
          },
        },
        {
          book: {
            title: 'TEST_TITLE2',
          },
        },
      ],
      title: 'TEST_TITLE',
      content: 'TEST_CONTENT',
      date: 'TEST_DATE',
      likes: 1,
    },
  ],
  bookmarks: [
    {
      author: { username: 'test' },
      book_title: 'BOOK1',
      title: 'TITLE1',
      content: 'CONTENT1',
      is_long: true,
      is_short: false,
      is_phrase: false,
    },
  ],
  CurationBookmarks: [],
  length: 6,
};

const mockStore = getMockStore(stubInitialState);

describe('<UserPage />', () => {
  let userpage, spyGetUser, spyGetReviews, spyGetFollows;
  beforeEach(() => {
    userpage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <UserPage />
        </ConnectedRouter>
      </Provider>
    );
    spyGetUser = jest
      .spyOn(actionCreators, 'getSpecificUser')
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyGetReviews = jest
      .spyOn(actionCreators, 'getArticlesByUserId')
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyGetFollows = jest
      .spyOn(actionCreators, 'getFollows')
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it('should render user page without errors', () => {
    const component = mount(userpage);
    const wrapper = component.find('.UserPage');
    expect(wrapper.length).toBe(1);
    expect(spyGetUser).toBeCalledTimes(1);
    expect(spyGetReviews).toBeCalledTimes(1);
    expect(spyGetFollows).toHaveBeenCalledWith('0');
  });

  it('should pagination', () => {
    const component = mount(userpage);
    const wrapper = component.find('.UserPage');
    wrapper
      .find('PaginationItem[content=2]')
      .at(0)
      .simulate('click');
  });
});
