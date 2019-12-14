import React from 'react';
import { shallow, mount } from 'enzyme';
import Article from './Article';
import { getMockStore } from '../test-utils/mocks';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { history } from '../store/store';
import { Provider } from 'react-redux';

const stubInitialState = {};

const mockStore = getMockStore(stubInitialState);
const article = {
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
  date: [0, 0, 0, 0, 454],
  is_long: true,
  is_short: false,
  is_phrase: false,
  is_spoiler: false,
  likes: { count: 0, users: [] },
};

describe('<Article/>', () => {
  let atc;

  beforeEach(() => {
    atc = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Article
            author={article.author}
            book_isbn={article.book_isbn}
            book_title={article.book_title}
            book_thumbnail={article.book_thumbnail}
            id={article.id}
            title={article.title}
            content={article.content}
            date={article.date}
            is_long={article.is_long}
            is_short={article.is_short}
            is_phrase={article.is_phrase}
            likes={article.likes}
          />
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render without errors (longReview)', () => {
    const component = mount(atc);
    const wrapper = component.find('.article');
    expect(wrapper.length).toBe(2);
  });

  it('should render without errors (shortReview,phrase)', () => {
    const component = mount(atc);
    const wrapper = component.find('.article');
    expect(wrapper.length).toBe(2);
  });

  it('should redirect to book page', () => {
    const component = mount(atc);
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(user => {
        return dispatch => {};
      });
  });

  it('should redirect to article page', () => {
    const component = mount(atc);
    const spyHistoryPush = jest
      .spyOn(history, 'push')
      .mockImplementation(user => {
        return dispatch => {};
      });
  });

  it('should change time text', () => {
    const component = mount(atc);
  });

  it('should change time text', () => {
    const component = mount(atc);
  });
});
