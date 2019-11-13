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
            content: 'reply exmaple',
            replies: null,
        },
    ];
    const stub_comment = {
        article_id: 0,
        id: 0,
        author: stub_author,
        date: [0, 0, 0, 0, 0],
        content: 'comment exmaple',
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
                        date={stub_comment.date}
                        content={stub_comment.content}
                        replies={stub_comment.replies}
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
                        replies={[]}
                    />
                </ConnectedRouter>
            </Provider>,
        );
        const wrapper = component.find('.CommentUnit');
        expect(wrapper.length).toBe(1);
    });

    it('should render Comment with default profilc pic', () => {
        const author = { username: 'ybzzang', nickname: 'ybzzang', profile_photo: 'wrong' };
        const component = mount(
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <CommentUnit
                        key={stub_comment.id}
                        article_id={stub_comment.article_id}
                        author={author}
                        date={stub_comment.date}
                        content={stub_comment.content}
                        replies={[]}
                    />
                </ConnectedRouter>
            </Provider>,
        );
        const wrapper = component.find('.CommentUnit');
        expect(wrapper.length).toBe(1);
    });

    it(`should set state properly on input, and post comment`, () => {
        const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });
        const spyPostComment = jest
            .spyOn(actionCreators, 'postLongReviewComment')
            .mockImplementation(() => {
                return dispatch => { };
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
});
