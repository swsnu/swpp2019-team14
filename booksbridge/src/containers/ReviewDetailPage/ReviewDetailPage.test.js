import React from 'react';
import { shallow, mount } from 'enzyme';
import ReviewDetailPage from './ReviewDetailPage';
import * as actionCreators from '../../store/actions/actionCreators';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

const stubInitialState = {
  selectedArticle: {
    book: {
      isbn: 1,
      title: 'TITLE',
      authors: 'AUTHOR',
      publisher: 'PUBLISHER',
      publishedDate: '20190101',
      thumbnail: '',
    },
    content: 'REVIEW CONTENT',
    title: 'REVIEW TITLE',
    date: [0, 0, 0, 0, 0],
    is_long: true,
    like_count: 1,
    like_or_not: true,
    author: { username: 'TEST', profile_photo: 'TEST', nickname: 'TEST' },
  },
  comments: [],
  logged_in_user: { username: 'TEST', profile_photo: 'TEST', nickname: 'TEST' },
};
const mockStore = getMockStore(stubInitialState);

const stubInitialState2 = {
  selectedArticle: {
    book: {
      isbn: 1,
      title: 'TITLE',
      authors: 'AUTHOR',
      publisher: 'PUBLISHER',
      publishedDate: '20190101',
      thumbnail: '',
    },
    content: 'REVIEW CONTENT',
    date: [0, 0, 0, 0, 0],
    like_count: 1,
    like_or_not: false,
    is_long: false,
    author: { username: 'TEST', profile_photo: 'TEST', nickname: 'TEST' },
  },
  comments: [],
  logged_in_user: { username: 'TES', profile_photo: 'TES', nickname: 'TES' },
};
const mockStore2 = getMockStore(stubInitialState2);

describe('<ReviewDetailPage />', () => {
  let reviewdetailpage,
    spyGetArticle,
    spyLikeArticle,
    spyUnlikeArticle,
    spyPush,
    spyDeleteArticle;
  beforeEach(() => {
    reviewdetailpage = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <ReviewDetailPage />
        </ConnectedRouter>
      </Provider>
    );
    spyGetArticle = jest
      .spyOn(actionCreators, 'getSpecificArticle')
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
    spyPush = jest.spyOn(history, 'push').mockImplementation(() => {
      return dispatch => {};
    });
  });

  it('should render review detail page without errors', () => {
    const component = mount(reviewdetailpage);
    const wrapper = component.find('.ReviewDetailPage');
    expect(wrapper.length).toBe(1);
    expect(component.find('.ReviewTitleStyle').text()).toEqual('REVIEW TITLE');
    expect(spyGetArticle).toBeCalledTimes(1);
  });

  it('should redirect to book detail page', () => {
    const component = mount(reviewdetailpage);
    const wrapper = component.find('.ReviewDetailPage');
    component.find('a#ReviewDetailBookInfo').simulate('click');
  });

  it(`show loading`, () => {
    const InitialStore = getMockStore({
      selectedArticle: null,
    });
    const component = mount(
      <Provider store={InitialStore}>
        <ConnectedRouter history={history}>
          <ReviewDetailPage />
        </ConnectedRouter>
      </Provider>,
    );
    expect(component.find('Spinner').length).toBe(1);
  });
  it('should like ', () => {
    const component = mount(reviewdetailpage);
    const button = component.find('.like-review-page');
    button.simulate('click');
    expect(spyUnlikeArticle).toHaveBeenCalledTimes(1);
  });
  it('should like ', () => {
    const component = mount(
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <ReviewDetailPage />
        </ConnectedRouter>
      </Provider>,
    );
    const button = component.find('.like-review-page');
    button.simulate('click');
    expect(spyLikeArticle).toHaveBeenCalledTimes(1);
  });
  it('should delete', () => {
    const component = mount(reviewdetailpage);
    const button = component.find('#delete-review-page').at(0);
    button.simulate('click');
    const confirm = component.find('Button[content="삭제"]').at(0);
    confirm.simulate('click');
    expect(spyDeleteArticle).toHaveBeenCalledTimes(1);
    expect(spyPush).toHaveBeenCalledTimes(1);
  });
});
