import React from 'react';
import { shallow, mount } from 'enzyme';
import Comments from './Comments';
import * as actionCreators from '../../store/actions/actionCreators';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

const stubInitialState = {
  selectedArticle: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<Comments />', () => {
  let comments;
  const stub_comment_author = {
    username: 'ybzzang',
    nickname: 'ybzzang',
    profile_photo: 'resources/image/profile',
  };
  const stub_reply = [
    {
      article_id: 0,
      id: 1,
      author: stub_comment_author,
      date: [0, 0, 0, 0, 0],
      content: 'reply exmaple',
      replies: null,
    },
  ];
  const stub_comment = [
    {
      article_id: 0,
      id: 0,
      author: stub_comment_author,
      date: [0, 0, 0, 0, 0],
      content: 'comment exmaple',
      replies: stub_reply,
    },
  ];
  beforeEach(() => {
    comments = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Comments
            logged_in_user={stub_comment_author}
            comments={stub_comment}
          />
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Comments', () => {
    const component = mount(comments);
    const wrapper = component.find('.Comments');
    expect(wrapper.length).toBe(1);
  });

  it(`should set state properly on input`, () => {
    const content = 'comment example';
    const component = mount(comments);
    const wrapper = component.find('textarea#comment-input');
    wrapper.simulate('change', { target: { value: content } });
    const newCommentInstance = component
      .find(Comments.WrappedComponent)
      .instance();
    expect(newCommentInstance.state.content).toEqual(content);
  });
  it(`submit with empty input`, () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const component = mount(comments);
    const wrapper = component.find('button.ReplyButton');
    wrapper.simulate('click');
    expect(spyAlert).toHaveBeenCalledWith('내용을 반드시 입력하셔야 합니다.');
  });
  it(`submit with correct input`, () => {
    const content = 'comment example';
    const component = mount(comments);
    const spyPostComment = jest
      .spyOn(actionCreators, 'postLongReviewComment')
      .mockImplementation(() => {
        return dispatch => {};
      });
    const wrapper = component.find('textarea#comment-input');
    wrapper.simulate('change', { target: { value: content } });
    const submit = component.find('button.ReplyButton');
    submit.simulate('click');
  });
});
