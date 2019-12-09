import React from 'react';
import { shallow, mount } from 'enzyme';
import UserReviewList from './UserReviewList';
import { getMockStore } from '../../test-utils/mocks';
import { Provider } from 'react-redux';
import { history } from '../../store/store';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import * as actionCreators from '../../store/actions/actionCreators';

const stubInitialState = {};

const mockStore = getMockStore(stubInitialState);

const user_reviews = [
  {
    author: 'author',
    book_isbn: '123',
    book_title: 'title',
    book_thumbnail: 'thumbnail',
    id: 1,
    title: 'title',
    content: 'content',
    date: 123,
    is_long: true,
    is_short: false,
    is_phrase: false,
  },
];
describe('<UserReviewList />', () => {
  let url;

  beforeEach(() => {
    url = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <UserReviewList user_reviews={user_reviews} />
        </ConnectedRouter>
      </Provider>
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  fit('should render', () => {
    const component = mount(url);
    const wrapper = component.find('.UserReviewTab');
    expect(wrapper.length).toBe(1);
  });
});
