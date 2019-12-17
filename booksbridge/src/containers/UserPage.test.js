import React from 'react';
import { mount } from 'enzyme';
import UserPage from './UserPage';
import * as actionCreators from '../store/actions/actionCreators';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

const user = {
  id: '0',
  username: 'USERNAME',
  nickname: 'NICKNAME',
  profile_photo: 'url',
  profile_text: 'PROFILE COMMENT',
  like_books: [],
};

const stubInitialState = {
  logged_in_user: user,
  profile_user: user,
  articlesByUserID: [
    {
      logged_in_user: user,
      profile_user: user,
      author: user,
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
      logged_in_user: user,
      profile_user: user,
      author: user,
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
      author: user,
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
  let userpage,
    spyGetUser,
    spyGetReviews,
    spyGetFollows,
    deleteArticle,
    deleteCuration;
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

    deleteCuration = jest
      .spyOn(actionCreators, 'deleteSpecificCuration')
      .mockImplementation(() => {
        return dispatch => {};
      });

    deleteArticle = jest
      .spyOn(actionCreators, 'deleteSpecificArticle')
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

  it('should edit review', () => {
    const component = mount(userpage);
    const wrapper = component.find('.UserPage');
    const edit_button = wrapper.find('#edit-review-button').at(1);
    edit_button.simulate('click');
  });

  it('should edit curation', () => {
    const component = mount(userpage);
    const wrapper = component.find('.UserPage');
    const edit_button = wrapper.find('#edit-curation-button').at(1);
    edit_button.simulate('click');
  });

  it('should delete review', () => {
    const component = mount(userpage);
    const wrapper = component.find('.UserPage');
    const delete_button = wrapper.find('#delete-review-button').at(1);
    delete_button.simulate('click');
    const confirm = component.find('Button[content="취소"]').at(0);
    confirm.simulate('click');
    delete_button.simulate('click');
    const delete_confirm = component.find('Button[content="삭제"]').at(0);
    delete_confirm.simulate('click');
  });

  it('should delete curation', () => {
    const component = mount(userpage);
    const wrapper = component.find('.UserPage');
    const delete_button = wrapper.find('#delete-curation-button').at(1);
    delete_button.simulate('click');
    const confirm = component.find('Button[content="취소"]').at(0);
    confirm.simulate('click');
    delete_button.simulate('click');
    const delete_confirm = component.find('Button[content="삭제"]').at(0);
    delete_confirm.simulate('click');
  });
});
