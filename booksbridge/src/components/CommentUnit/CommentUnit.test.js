import React from 'react';
import { shallow, mount } from 'enzyme';
import CommentUnit from './CommentUnit';
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

describe('<CommentUnit />', () => {
  let commentunit;
  const stub_author = {
    username: 'ybzzang',
    nickname: 'ybzzang',
    profile_photo: 'resources/image/profile',
  };
  const stub_reply = [
    {
      article_id: 0,
      id: 1,
      author: stub_author,
      date: [0, 0, 0, 0, 0],
      content: 'reply example',
      replies: null,
    },
  ];
  const stub_comment = {
    article_id: 0,
    id: 0,
    author: stub_author,
    date: [0, 0, 0, 0, 0],
    content: 'comment example',
    replies: stub_reply,
  };

  beforeEach(() => {
    commentunit = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CommentUnit
            key={stub_comment.id}
            article_id={stub_comment.article_id}
            author={stub_comment.author}
            logged_in_user={stub_comment.author}
            date={stub_comment.date}
            content={stub_comment.content}
            replies={stub_comment.replies}
            is_article={true}
          />
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Comment with replies', () => {
    const component = mount(commentunit);
    const wrapper = component.find('.CommentUnit');
    expect(wrapper.length).toBe(1);
  });

  it('should render Comment with no reply', () => {
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CommentUnit
            key={stub_comment.id}
            article_id={stub_comment.article_id}
            author={stub_comment.author}
            date={stub_comment.date}
            content={stub_comment.content}
            logged_in_user={stub_comment.author}
            replies={[]}
          />
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find('.CommentUnit');
    expect(wrapper.length).toBe(1);
  });

  it('should render Comment with default profilc pic', () => {
    const author = {
      username: 'ybzzang',
      nickname: 'ybzzang',
      profile_photo: 'wrong',
    };
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CommentUnit
            key={stub_comment.id}
            article_id={stub_comment.article_id}
            author={author}
            date={stub_comment.date}
            content={stub_comment.content}
            logged_in_user={author}
            replies={[]}
            is_article={true}
          />
        </ConnectedRouter>
      </Provider>,
    );
    const wrapper = component.find('.CommentUnit');
    expect(wrapper.length).toBe(1);
  });

  it(`should set state properly on input, and post comment`, () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const spyPostComment = jest
      .spyOn(actionCreators, 'postLongReviewComment')
      .mockImplementation(() => {
        return dispatch => {};
      });
    const content = 'reply example';
    const component = mount(commentunit);
    const replyon = component.find('a#show-reply-form');
    replyon.simulate('click');
    const submit = component.find('button.ReplyButton');
    submit.simulate('click');
    expect(spyAlert).toHaveBeenCalledWith('Content is empty.');
    const replyform = component.find('textarea#reply-input');
    replyform.simulate('change', { target: { value: content } });
    const newCommentInstance = component
      .find(CommentUnit.WrappedComponent)
      .instance();
    expect(newCommentInstance.state.reply).toEqual(true);
    expect(newCommentInstance.state.content).toEqual(content);
    submit.simulate('click');
  });

  it(`should set state properly on input, and post comment to curation`, () => {
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const spyPostComment = jest
      .spyOn(actionCreators, 'postLongReviewComment')
      .mockImplementation(() => {
        return dispatch => {};
      });
    const content = 'reply example';
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CommentUnit
            key={stub_comment.id}
            article_id={stub_comment.article_id}
            author={stub_comment.author}
            date={stub_comment.date}
            content={stub_comment.content}
            logged_in_user={stub_comment.author}
            replies={[]}
            is_article={false}
          />
        </ConnectedRouter>
      </Provider>,
    );
    const replyon = component.find('a#show-reply-form');
    replyon.simulate('click');
    const submit = component.find('button.ReplyButton');
    submit.simulate('click');
    expect(spyAlert).toHaveBeenCalledWith('Content is empty.');
    const replyform = component.find('textarea#reply-input');
    replyform.simulate('change', { target: { value: content } });
    const newCommentInstance = component
      .find(CommentUnit.WrappedComponent)
      .instance();
    expect(newCommentInstance.state.reply).toEqual(true);
    expect(newCommentInstance.state.content).toEqual(content);
    submit.simulate('click');
  });

  it(`should edit comment`, () => {
    const content = 'edit example';
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const spyEditComment = jest
      .spyOn(actionCreators, 'editSpecificLongReviewComment')
      .mockImplementation(() => {
        return dispatch => {};
      });
    const component = mount(commentunit);
    const edit_button = component.find('#pencil-button').at(1);
    edit_button.simulate('click');
    const edit_submit = component.find('button#edit-button');
    edit_submit.simulate('click');
    expect(spyAlert).toHaveBeenCalledWith('Content is empty.');
    edit_button.simulate('click');
    const edit_form = component.find('textarea#edit-input');
    edit_form.simulate('change', { target: { value: content } });
    const newCommentInstance = component
      .find(CommentUnit.WrappedComponent)
      .instance();
    expect(newCommentInstance.state.onEdit).toEqual(true);
    expect(newCommentInstance.state.editcontent).toEqual(content);
    edit_submit.simulate('click');
  });

  it(`should edit comment of curation`, () => {
    const content = 'edit example';
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const spyEditComment = jest
      .spyOn(actionCreators, 'editSpecificCurationComment')
      .mockImplementation(() => {
        return dispatch => {};
      });
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CommentUnit
            key={stub_comment.id}
            article_id={stub_comment.article_id}
            author={stub_comment.author}
            date={stub_comment.date}
            content={stub_comment.content}
            logged_in_user={stub_comment.author}
            replies={[]}
            is_article={false}
          />
        </ConnectedRouter>
      </Provider>,
    );
    const edit_button = component.find('#pencil-button').at(1);
    edit_button.simulate('click');
    const edit_submit = component.find('button#edit-button');
    edit_submit.simulate('click');
    expect(spyAlert).toHaveBeenCalledWith('Content is empty.');
    edit_button.simulate('click');
    const edit_form = component.find('textarea#edit-input');
    edit_form.simulate('change', { target: { value: content } });
    const newCommentInstance = component
      .find(CommentUnit.WrappedComponent)
      .instance();
    expect(newCommentInstance.state.onEdit).toEqual(true);
    expect(newCommentInstance.state.editcontent).toEqual(content);
    edit_submit.simulate('click');
  });

  it(`should delete comment`, () => {
    const spyDeleteComment = jest
      .spyOn(actionCreators, 'deleteSpecificLongReviewComment')
      .mockImplementation(() => {
        return dispatch => {};
      });
    const component = mount(commentunit);
    const delete_button = component.find('#delete-button').at(1);
    delete_button.simulate('click');
  });

  it(`should delete comment of curation`, () => {
    const spyDeleteComment = jest
      .spyOn(actionCreators, 'deleteSpecificCurationComment')
      .mockImplementation(() => {
        return dispatch => {};
      });
    const component = mount(
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <CommentUnit
            key={stub_comment.id}
            article_id={stub_comment.article_id}
            author={stub_comment.author}
            date={stub_comment.date}
            content={stub_comment.content}
            logged_in_user={stub_comment.author}
            replies={[]}
            is_article={false}
          />
        </ConnectedRouter>
      </Provider>,
    );
    const delete_button = component.find('#delete-button').at(1);
    delete_button.simulate('click');
  });
});
