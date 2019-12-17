import React from 'react';
import { mount } from 'enzyme';
import UserInfo from './UserInfo';
import * as actionCreators from '../../store/actions/actionCreators';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

const stubInitialState = {
  logged_in_user: {
    id: '0',
    username: 'USERNAME',
    nickname: 'NICKNAME',
    profile_photo: 'url',
    profile_text: 'PROFILE COMMENT',
  },
  profile_user: {
    id: '1',
    username: 'USERNAME2',
    nickname: 'NICKNAME2',
    profile_photo: 'url',
    profile_text: 'PROFILE COMMENT',
  },
  follower_list: [
    {
      id: '2',
      username: 'USERNAME3',
      nickname: 'NICKNAME3',
      profile_photo: 'url',
      profile_text: 'PROFILE COMMENT',
    },
  ],
  followee_list: [
    {
      id: '2',
      username: 'USERNAME3',
      nickname: 'NICKNAME3',
      profile_photo: 'url',
      profile_text: 'PROFILE COMMENT',
    },
  ],
};

const FollowState = {
  logged_in_user: {
    id: '0',
    username: 'USERNAME',
    nickname: 'NICKNAME',
    profile_photo: 'url',
    profile_text: 'PROFILE COMMENT',
  },
  profile_user: {
    id: '1',
    username: 'USERNAME2',
    nickname: 'NICKNAME2',
    profile_photo: 'url',
    profile_text: 'PROFILE COMMENT',
  },
  follower_list: [
    {
      id: '0',
      username: 'USERNAME',
      nickname: 'NICKNAME',
      profile_photo: 'url',
      profile_text: 'PROFILE COMMENT',
    },
  ],
  followee_list: [
    {
      id: '0',
      username: 'USERNAME',
      nickname: 'NICKNAME',
      profile_photo: 'url',
      profile_text: 'PROFILE COMMENT',
    },
  ],
};

const MypageState = {
  logged_in_user: {
    id: '0',
    username: 'USERNAME',
    nickname: 'NICKNAME',
    profile_photo: 'url',
    profile_text: 'PROFILE COMMENT',
  },
  profile_user: {
    id: '0',
    username: 'USERNAME',
    nickname: 'NICKNAME',
    profile_photo: 'url',
    profile_text: 'PROFILE COMMENT',
  },
  follower_list: [],
  followee_list: [],
};

const mockStore = getMockStore(stubInitialState);
const followstate = getMockStore(FollowState);
const mypage = getMockStore(MypageState);

describe('<UserInfo />', () => {
  let userinfo, spyFollow, spyUnfollow, spyEditProfile;
  beforeEach(() => {
    userinfo = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <UserInfo
            logged_in_user={stubInitialState.logged_in_user}
            profile_user={stubInitialState.profile_user}
          />
        </ConnectedRouter>
      </Provider>
    );
    spyFollow = jest
      .spyOn(actionCreators, 'followUser')
      .mockImplementation(() => {
        return dispatch => {};
      });
    spyUnfollow = jest
      .spyOn(actionCreators, 'unfollowUser')
      .mockImplementation(() => {
        return dispatch => {};
      });
  });

  it('should render user info without errors', () => {
    const component = mount(userinfo);
    const wrapper = component.find('.Wrapper');
    expect(wrapper.length).toBe(1);
  });

  it('should follow other user', () => {
    const component = mount(userinfo);
    component.find('Icon[name="heart outline"]').simulate('click');
    expect(spyFollow).toBeCalledTimes(1);
  });

  it('should unfollow other user', () => {
    userinfo = (
      <Provider store={followstate}>
        <ConnectedRouter history={history}>
          <UserInfo
            logged_in_user={FollowState.logged_in_user}
            profile_user={FollowState.profile_user}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(userinfo);
    component.find('Icon[name="heart"]').simulate('click');
    expect(spyUnfollow).toBeCalledTimes(1);
  });

  it('should edit my profile', () => {
    spyEditProfile = jest
      .spyOn(actionCreators, 'editUserProfile')
      .mockImplementation(() => {
        return dispatch => {};
      });
    userinfo = (
      <Provider store={mypage}>
        <ConnectedRouter history={history}>
          <UserInfo
            logged_in_user={MypageState.logged_in_user}
            profile_user={MypageState.profile_user}
          />
        </ConnectedRouter>
      </Provider>
    );
    const nickname = 'ybzzang';
    const comment = 'Hello everyone!';
    const component = mount(userinfo);
    component.find('img.EditButtonImage').simulate('click');
    const nicknameform = component.find('input.NicknameForm');
    nicknameform.simulate('change', { target: { value: nickname } });
    const commentform = component.find('textarea.commentForm');
    commentform.simulate('change', { target: { value: comment } });
    const newProfileInstance = component
      .find(UserInfo.WrappedComponent)
      .instance();
    expect(newProfileInstance.state.nickname).toEqual(nickname);
    expect(newProfileInstance.state.comment).toEqual(comment);
    component.find('img.EditConfirmButtonImage').simulate('click');
    expect(spyEditProfile).toBeCalledTimes(1);
  });

  it('should edit my profile pic', () => {
    userinfo = (
      <Provider store={mypage}>
        <ConnectedRouter history={history}>
          <UserInfo
            logged_in_user={MypageState.logged_in_user}
            profile_user={MypageState.profile_user}
          />
        </ConnectedRouter>
      </Provider>
    );
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const component = mount(userinfo);
    component.find('img.EditButtonImage').simulate('click');
    component
      .find('img.ProfilePicture')
      .at(0)
      .simulate('click');
  });

  it('should not edit profile with invalid input', () => {
    userinfo = (
      <Provider store={mypage}>
        <ConnectedRouter history={history}>
          <UserInfo
            logged_in_user={MypageState.logged_in_user}
            profile_user={MypageState.profile_user}
          />
        </ConnectedRouter>
      </Provider>
    );
    const component = mount(userinfo);
    component.find('img.EditButtonImage').simulate('click');
    component.find('img.EditConfirmButtonImage').simulate('click');
    const nicknameform = component.find('input.NicknameForm');
    const commentform = component.find('textarea.commentForm');
    nicknameform.simulate('change', { target: { value: '   ' } });
    component.find('img.EditConfirmButtonImage').simulate('click');
    nicknameform.simulate('change', { target: { value: '' } });
    component.find('img.EditConfirmButtonImage').simulate('click');
    nicknameform.simulate('change', { target: { value: 'aaaaaaaaaaaaaaa' } });
    component.find('img.EditConfirmButtonImage').simulate('click');
    commentform.simulate('change', {
      target: {
        value:
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      },
    });
    component.find('img.EditConfirmButtonImage').simulate('click');
  });
});
