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
    isbn: '1',
    title: 'TITLE',
    authors: 'AUTHOR',
    publisher: 'PUBLISHER',
    publishedDate: '20190101',
    thumbnail: '',
    content: 'REVIEW CONTENT',
    title: 'REVIEW TITLE',
    comments: [],
  },
};

const mockStore = getMockStore(stubInitialState);

describe('<ReviewDetailPage />', () => {
  let reviewdetailpage, spyGetArticle;
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
  });

  it('should render review detail page without errors', () => {
    const component = mount(reviewdetailpage);
    const wrapper = component.find('.ReviewDetailPage');
    expect(wrapper.length).toBe(1);
    expect(component.find('.ReviewTitleStyle').text()).toEqual('REVIEW TITLE');
    expect(spyGetArticle).toBeCalledTimes(1);
  });

  it('should redirect to book detail page', () => {
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(reviewdetailpage);
    const wrapper = component.find('.ReviewDetailPage');
    component.find('button#check-book-button').simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/book/1');
  });
});
