import React from 'react';
import { shallow, mount } from 'enzyme';
import BookTabsReview from './BookTabsReview';
import { history } from '../../store/store';
import { Router } from 'react-router-dom';

describe('<BookTabsReview />', () => {
  let review;
  const author = {
    username: 'ybzzang',
    profile_photo: 'resources/image/profile/ybzzang',
    nickname: 'ybzzang',
  };
  const date = [0, 0, 0, 0, 0];

  beforeEach(() => {
    review = (
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
        />
      </Router>
    );
  });
  it('should render long review summary without errors', () => {
    const component = mount(review);
    const wrapper = component.find('.Review');
    expect(wrapper.length).toBe(1);
    component
      .find('.box')
      .at(0)
      .simulate('click');
  });
  it('should render short review summary without errors', () => {
    const component = mount(review);
    const wrapper = component.find('.Review');
    expect(wrapper.length).toBe(1);
  });
});
