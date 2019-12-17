import React from 'react';
import { shallow } from 'enzyme';
import ReplyUnit from './ReplyUnit';
const reply_author1 = {
  username: 'ybzzang',
  profile_photo: 'resources/image/profile/ybzzang',
  nickname: 'ybzzang',
};
const date = [0, 0, 0, 0, 0];
const reply_author2 = {
  username: 'ybzzang',
  profile_photo: 'http/image/profile/ybzzang',
  nickname: 'ybzzang',
};
const reply_author3 = {
  username: 'zzang',
  profile_photo: 'http/image/profile/ybzzang',
  nickname: 'zzang',
};

describe('<ReplyUnit />', () => {
  let reply1, reply2, reply3;
  const spyEditCommentHandler = jest.fn();
  const spyEditCurationCommentHandler = jest.fn();
  const spyDeleteHandler = jest.fn();
  beforeEach(() => {
    reply1 = (
      <ReplyUnit
        logged_in_user={reply_author1}
        author={reply_author1}
        content="example"
        date={date}
        is_article={true}
        EditCommentHandler={spyEditCommentHandler}
        EditCurationCommentHandler={spyEditCurationCommentHandler}
        DeleteHandler={spyDeleteHandler}
      />
    );
    reply2 = (
      <ReplyUnit
        logged_in_user={reply_author1}
        author={reply_author2}
        content="example"
        date={date}
        is_article={false}
        EditCommentHandler={spyEditCommentHandler}
        EditCurationCommentHandler={spyEditCurationCommentHandler}
        DeleteHandler={spyDeleteHandler}
      />
    );
    reply3 = (
      <ReplyUnit
        logged_in_user={reply_author1}
        author={reply_author3}
        content="example"
        date={date}
        is_article={false}
        EditCommentHandler={spyEditCommentHandler}
        EditCurationCommentHandler={spyEditCurationCommentHandler}
        DeleteHandler={spyDeleteHandler}
      />
    );
  });
  it('should render without errors', () => {
    const component = shallow(reply1);
    const wrapper = component.find('.ReplyUnit');
    expect(wrapper.length).toBe(1);
  });
  it('should render without errors, with default profile image', () => {
    const component = shallow(reply2);
    const wrapper = component.find('.ReplyUnit');
    expect(wrapper.length).toBe(1);
  });
  it('should edit reply in article', () => {
    const component = shallow(reply1);
    const pencil = component.find('#edit-reply-icon').at(0);
    pencil.simulate('click');
    const button = component.find('#edit-reply-button').at(0);
    button.simulate('click');
    expect(spyEditCommentHandler).toHaveBeenCalledTimes(1);
  });
  it('should edit reply in curation', () => {
    const component = shallow(reply2);
    const pencil = component.find('#edit-reply-icon').at(0);
    pencil.simulate('click');
    const button = component.find('#edit-reply-button').at(0);
    button.simulate('click');
    expect(spyEditCurationCommentHandler).toHaveBeenCalledTimes(1);
  });
  it('should not edit with empty input', () => {
    const component = shallow(reply1);
    const pencil = component.find('#edit-reply-icon').at(0);
    pencil.simulate('click');

    console.log(component.debug());
    let form = component.find('#edit-input').at(0);
    form.simulate('change', { target: { value: '' } });
    // form = component.find('#edit-input').at(1);
    // form.simulate('change', { target: { value: '' } });
    // form = component.find('#edit-input').at(2);
    // form.simulate('change', { target: { value: '' } });
    // form = component.find('#edit-input').at(3);
    // form.simulate('change', { target: { value: '' } });

    const button = component.find('#edit-reply-button').at(0);
    button.simulate('click');
    expect(spyEditCommentHandler).toHaveBeenCalledTimes(1); //
  });
  it('should delete reply in curation', () => {
    const component = shallow(reply2);
    const pencil = component.find('#reply-delete-icon').at(0);
    pencil.simulate('click');
    expect(spyDeleteHandler).toHaveBeenCalledTimes(1);
  });
  it('non author', () => {
    const component = shallow(reply3);
    const wrapper = component.find('.ReplyUnit');
    expect(wrapper.length).toBe(1);
  });
});
