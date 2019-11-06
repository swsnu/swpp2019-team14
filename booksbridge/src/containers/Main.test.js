import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Main from './Main';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../store/store';
import * as actionCreators from '../store/actions/actionCreators';

const stubInitialState = {
  loadArticle: [
    {
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
      date: [0, 0, 0, 1, 454],
      is_long: true,
      is_short: false,
      is_phrase: false,
    },
  ],
};

const mockStore = getMockStore(stubInitialState);

describe('<Main />', () => {
  let main;
  beforeEach(() => {
    main = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Main />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render Article', () => {
    const component = mount(main);
    const wrapper = component.find('.main');
    expect(wrapper.length).toBe(1);
  });

  // it(`should render SELECTED_ARTICLE`, () => {
  //   const component = mount(main);
  //   const wrapper = component.find('.right');
  //   expect(wrapper.at(0).text()).toBe('ARTICLE_AUTHOR');
  //   expect(wrapper.at(1).text()).toBe('SELECTED_ARTICLE_TEST_TITLE');
  //   expect(wrapper.at(2).text()).toBe('SELECTED_ARTICLE_TEST_CONTENT');
  // });

  // it(`should call 'clickLogout'`, () => {
  //   const spytoggleLoginInfo = jest
  //     .spyOn(actionCreators, 'toggleLoginInfo')
  //     .mockImplementation(user => {
  //       return dispatch => {};
  //     });
  //   const component = mount(main);
  //   const wrapper = component.find('#logout-button').at(0);
  //   wrapper.simulate('click');
  //   expect(spytoggleLoginInfo).toHaveBeenCalledTimes(1);
  // });

  // it('should call BackHandler', () => {
  //   const spyHistoryPush = jest
  //     .spyOn(history, 'push')
  //     .mockImplementation(path => {});
  //   const component = mount(main);
  //   const wrapper = component.find('#back-detail-main-button').at(0);
  //   wrapper.simulate('click');
  //   expect(spyHistoryPush).toHaveBeenCalledWith('/articles');
  // });

  // it(`should call 'deleteArticle'`, () => {
  //   const spyDeleteArticle = jest
  //     .spyOn(actionCreators, 'deleteArticle')
  //     .mockImplementation(id => {
  //       return dispatch => {};
  //     });
  //   const component = mount(main);
  //   const wrapper = component.find('#delete-main-button').at(0);
  //   wrapper.simulate('click');
  //   expect(spyDeleteArticle).toHaveBeenCalledTimes(1);
  // });

  // it(`should call 'editArticle'`, () => {
  //   const spyHistoryPush = jest
  //     .spyOn(history, 'push')
  //     .mockImplementation(path => {});
  //   const component = mount(main);
  //   const wrapper = component.find('#edit-main-button').at(0);
  //   wrapper.simulate('click');
  //   expect(spyHistoryPush).toHaveBeenCalledWith('/articles/1/edit/');
  // });

  // it(`should call AddComment`, () => {
  //   const input = 'TEST_COMMENT';
  //   const spyAddComments = jest
  //     .spyOn(actionCreators, 'addComment')
  //     .mockImplementation((article_id, author_id, content) => {
  //       return dispatch => {};
  //     });
  //   const component = mount(main);
  //   const wrapper = component.find('#new-comment-content-input').at(0);
  //   wrapper.simulate('change', { target: { value: input } });
  //   const newInstance = component.find(Article.WrappedComponent).instance();
  //   expect(newInstance.state.new_comment).toEqual(input);
  //   component
  //     .find('#confirm-create-comment-button')
  //     .at(0)
  //     .simulate('click');
  //   expect(spyAddComments).toHaveBeenCalledTimes(1);
  // });

  // it('should not call editComment', () => {
  //   const spyEditComment = jest
  //     .spyOn(actionCreators, 'editComment')
  //     .mockImplementation((id, content) => {
  //       return dispatch => {};
  //     });
  //   jest.spyOn(window, 'prompt').mockImplementation(() => {
  //     return null;
  //   });
  //   const component = mount(main);
  //   const wrapper = component.find('#edit-comment-button').at(0);
  //   wrapper.simulate('click');
  //   window.confirm = jest.fn(() => true);
  //   expect(spyEditComment).toHaveBeenCalledTimes(0);
  // });

  // it('should call editComment', () => {
  //   const spyEditComment = jest
  //     .spyOn(actionCreators, 'editComment')
  //     .mockImplementation((id, content) => {
  //       return dispatch => {};
  //     });
  //   jest.spyOn(window, 'prompt').mockImplementation(() => {
  //     return 'TEST_EDIT_COMMENT';
  //   });
  //   const component = mount(main);
  //   const wrapper = component.find('#edit-comment-button').at(0);
  //   wrapper.simulate('click');
  //   expect(spyEditComment).toHaveBeenCalledTimes(1);
  // });

  // it('should call deleteComment', () => {
  //   const spyDeleteComment = jest
  //     .spyOn(actionCreators, 'deleteComment')
  //     .mockImplementation(id => {
  //       return dispatch => {};
  //     });
  //   const component = mount(main);
  //   const wrapper = component.find('#delete-comment-button').at(0);
  //   wrapper.simulate('click');
  //   expect(spyDeleteComment).toHaveBeenCalledTimes(1);
  // });

  // it(`'should redirect to login page`, () => {
  //   const mockInitialStore = getMockStore({
  //     logged_in_user: null,
  //     comments: [
  //       { id: 1, article_id: 1, author_id: 1, content: 'TEST_COMMENT1' },
  //       { id: 2, article_id: 2, author_id: 2, content: 'TEST_COMMENT2' },
  //     ],
  //     users: [
  //       { id: 1, email: '1', password: '1', name: '1', logged_in: false },
  //       { id: 2, email: '2', password: '2', name: '2', logged_in: false },
  //     ],
  //     selectedArticles: {
  //       id: 1,
  //       author_id: 1,
  //       title: 'TEST_TITLE',
  //       content: 'TEST_CONTENT',
  //     },
  //   });
  //   const spyHistoryPush = jest
  //     .spyOn(history, 'push')
  //     .mockImplementation(path => {});
  //   const component = mount(
  //     <Provider store={mockInitialStore}>
  //       <ConnectedRouter history={history}>
  //         <Switch>
  //           <Route path="/" exact component={Article} />
  //         </Switch>
  //       </ConnectedRouter>
  //     </Provider>,
  //   );
  //   expect(spyHistoryPush).toHaveBeenCalledWith('/login');
  // });

  // it(`should not render SELECTED_ARTICLE`, () => {
  //   const mockInitialStore = getMockStore({
  //     comments: null,
  //     users: null,
  //     selectedArticle: null,
  //   });
  //   const component = mount(
  //     <Provider store={mockInitialStore}>
  //       <ConnectedRouter history={history}>
  //         <Switch>
  //           <Route path="/" exact component={Article} />
  //         </Switch>
  //       </ConnectedRouter>
  //     </Provider>,
  //   );
  //   const wrapper = component.find('.right');
  //   expect(wrapper.at(0).text()).toBe('');
  //   expect(wrapper.at(1).text()).toBe('');
  //   expect(wrapper.at(2).text()).toBe('');
  // });
});
