import React from 'react';
import { shallow, mount } from 'enzyme';
import BookTabsReviewList from './BookTabsReviewList';
import { history } from '../../store/store';
import { Router } from 'react-router-dom';

const review = {
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
  like_count: 1,
  like_or_not: true,
  author: { username: 'TEST', profile_photo: 'TEST', nickname: 'TEST' },
};

describe('<BookTabsReviewList />', () => {
  let long_review, short_review, phrase, spyLikeHandler, spyDeleteHandler;
  const author = {
    username: 'ybzzang',
    profile_photo: 'resources/image/profile/ybzzang',
    nickname: 'ybzzang',
  };
  const author2 = {
    username: 'swpp',
    profile_photo: 'resources/image/profile/swpp',
    nickname: 'swpp',
  };
  const date = [0, 0, 0, 0, 0];

  beforeEach(() => {
    spyLikeHandler = jest.fn();
    spyDeleteHandler = jest.fn();
    long_review = (
      <Router history={history}>
        <BookTabsReviewList
          is_short={false}
          is_long={true}
          is_phrase={false}
          reviews={[review]}
          likeHandler={spyLikeHandler}
          deleteHandler={spyDeleteHandler}
          logged_in_user={author}
        />
      </Router>
    );
    short_review = (
      <Router history={history}>
        <BookTabsReviewList
          is_short={true}
          is_long={false}
          is_phrase={false}
          reviews={[review]}
          likeHandler={spyLikeHandler}
          deleteHandler={spyDeleteHandler}
          logged_in_user={author}
        />
      </Router>
    );

    phrase = (
      <Router history={history}>
        <BookTabsReviewList
          is_short={false}
          is_long={false}
          is_phrase={true}
          reviews={[review]}
          likeHandler={spyLikeHandler}
          deleteHandler={spyDeleteHandler}
          logged_in_user={author}
        />
      </Router>
    );
  });
  it('should render long review', () => {
    const component = mount(long_review);
    const wrapper = component.find('#book-tabs-review-list');
    expect(wrapper.length).toBe(1);
  });
  it('should render short review', () => {
    const component = mount(short_review);
    const wrapper = component.find('#book-tabs-review-list');
    expect(wrapper.length).toBe(1);
  });
  it('should render phrase', () => {
    const component = mount(phrase);
    const wrapper = component.find('#book-tabs-review-list');
    expect(wrapper.length).toBe(1);
  });
});
