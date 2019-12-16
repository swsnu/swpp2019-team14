import React from 'react';
import { shallow, mount } from 'enzyme';
import BookTabsReview from './BookTabsReview';
import { history } from '../../store/store';
import { Router } from 'react-router-dom';

describe('<BookTabsReview />', () => {
  let long_review, short_review, phrase, not_my_review, spyLikeHandler;
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
    long_review = (
      <Router history={history}>
        <BookTabsReview
          author={author}
          logged_in_user={author}
          content="example"
          date={date}
          id="1"
          title="review title"
          book_title="book title"
          content="review content"
          is_long={true}
          like_or_not={false}
          likeHandler={spyLikeHandler}
        />
      </Router>
    );
    short_review = (
      <Router history={history}>
        <BookTabsReview
          author={author}
          logged_in_user={author}
          content="example"
          date={date}
          id="1"
          title="review title"
          book_title="book title"
          content="review content"
          is_long={false}
          is_short={true}
        />
      </Router>
    );
    phrase = (
      <Router history={history}>
        <BookTabsReview
          author={author}
          logged_in_user={author}
          content="example"
          date={date}
          id="1"
          title="review title"
          book_title="book title"
          content="review content"
          is_long={false}
          is_short={false}
          is_phrase={true}
        />
      </Router>
    );

    not_my_review = (
      <Router history={history}>
        <BookTabsReview
          author={author}
          logged_in_user={author2}
          content="example"
          date={date}
          id="1"
          title="review title"
          book_title="book title"
          content="review content"
          like_or_not={true}
          likeHandler={spyLikeHandler}
          is_long={true}
        />
      </Router>
    );
  });
  it('should render long review summary without errors', () => {
    const component = mount(long_review);
    const wrapper = component.find('.Review');
    expect(wrapper.length).toBe(1);
    component
      .find('.box')
      .at(0)
      .simulate('click');
  });
  it('should render short review summary without errors', () => {
    const component = mount(short_review);
    const wrapper = component.find('.Review');
    expect(wrapper.length).toBe(1);
  });
  it('should render phrase summary without errors', () => {
    const component = mount(phrase);
    const wrapper = component.find('.Review');
    expect(wrapper.length).toBe(1);
  });
  it('no edit or delete button for not mine', () => {
    const component = mount(not_my_review);
    const wrapper = component.find('.Review');
    expect(wrapper.length).toBe(1);
  });
  it('like handle', () => {
    // const component = shallow(<BookTabsReview {...baseProps} />);
    const component = mount(long_review);
    const likeButton = component.find('.ReviewLikeButton').at(0);
    expect(likeButton.length).toBe(1);
    likeButton.simulate('click');
    expect(spyLikeHandler).toHaveBeenCalledTimes(1);
  });
  it('unlike handle', () => {
    // const component = shallow(<BookTabsReview {...baseProps} />);
    const component = mount(long_review);
    const likeButton = component.find('.ReviewLikeButton').at(0);
    expect(likeButton.length).toBe(1);
    likeButton.simulate('click');
    expect(spyLikeHandler).toHaveBeenCalledTimes(1);
  });
});
