import React from 'react';
import { shallow } from 'enzyme';
import ReplyUnit from './ReplyUnit';

describe('<ReplyUnit />', () => {
  it('should render without errors', () => {
    const reply_author = {
      username: 'ybzzang',
      profile_photo: 'resources/image/profile/ybzzang',
      nickname: 'ybzzang',
    };
    const date = [0, 0, 0, 0, 0];
    const component = shallow(
      <ReplyUnit
        logged_in_user={reply_author}
        author={reply_author}
        content="example"
        date={date}
      />,
    );
    const wrapper = component.find('.ReplyUnit');
    expect(wrapper.length).toBe(1);
  });
  it('should render without errors, with default profile image', () => {
    const reply_author = {
      username: 'ybzzang',
      profile_photo: '',
      nickname: 'ybzzang',
    };
    const date = [0, 0, 0, 0, 0];
    const component = shallow(
      <ReplyUnit
        logged_in_user={reply_author}
        author={reply_author}
        content="example"
        date={date}
      />,
    );
    const wrapper = component.find('.ReplyUnit');
    expect(wrapper.length).toBe(1);
  });
});
