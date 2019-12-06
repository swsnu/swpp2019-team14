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
    comments: [],
    date: [0, 0, 0, 0, 0],
    likes: { count: 0, users: [] },
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
    expect(component.find('.loading').length).toBe(1);
  });
});
