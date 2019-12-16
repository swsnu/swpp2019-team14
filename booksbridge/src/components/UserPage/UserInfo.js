import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, TextArea, Icon } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/actionCreators';

import FollowerListModal from './FollwerListModal';

import './UserInfo.css';
class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onEdit: false,
      nickname: '',
      comment: '',
      //followerOpen: false,
    };

    this.inputRef = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.profile_user) return;
    this.setState({
      //...this.state,
      onEdit: false,
      nickname: nextProps.profile_user.nickname,
      comment: nextProps.profile_user.profile_text,
    });
  }

  onEditProfile(user) {
    if (this.state.nickname === '') {
      window.alert('Nickname cannot be empty!');
      return;
    } else if (
      this.state.nickname === this.props.logged_in_user.nickname &&
      this.state.comment === this.props.logged_in_user.profile_text
    ) {
      this.setState(state => ({ ...this.state, onEdit: false }));
      return;
    } else if (this.state.nickname.search(/\s/) > -1) {
      window.alert('닉네임엔 공백을 입력할 수 없습니다.');
      return;
    } else if (this.state.nickname.length > 8) {
      window.alert('닉네임은 8글자를 넘을 수 없습니다.');
      return;
    } else if (this.state.comment.length > 120) {
      window.alert('자기소개는 120글자를 넘을 수 없습니다.');
      return;
    } else {
      const profile = {
        id: user.id,
        nickname: this.state.nickname,
        profile_text: this.state.comments,
        profile_photo: user.profile_photo,
      };
      this.props.onEditProfile(profile);
      this.setState(state => ({ ...this.state, onEdit: false }));
    }
  }

  handleFileInput(e) {
    e.preventDefault();
    console.log(this.inputRef.current.files[0]);
    const formData = new FormData();
    formData.append('image', this.inputRef.current.files[0]);
    this.props.onUploadProfileImage(formData);
  }

  handleFollowToggle(isFollowing) {
    if (!isFollowing) {
      this.props.onFollow(this.props.profile_user.id);
    } else {
      this.props.onUnfollow(this.props.profile_user.id);
    }
  }

  render() {
    const profile_user = this.props.profile_user;
    const logged_in_user = this.props.logged_in_user;
    if (!profile_user) return null;
    if (!logged_in_user) return null;
    const nickname = profile_user.nickname;
    const username = profile_user.username;
    const profile_text = profile_user.profile_text;
    let profile_photo = '';
    const followers = this.props.followers;
    const followees = this.props.followees;
    const isFollowing =
      followers &&
      followers
        .map(follower => follower.id)
        .includes(this.props.logged_in_user.id)
        ? true
        : false;

    let follow_button = (
      <Icon
        name="heart outline"
        size="big"
        link
        onClick={() => this.handleFollowToggle(isFollowing)}
      />
    );

    if (isFollowing) {
      follow_button = (
        <Icon
          name="heart"
          size="big"
          color="red"
          link
          onClick={() => this.handleFollowToggle(isFollowing)}
        />
      );
    }

    if (this.props.logged_in_user.id === this.props.profile_user.id)
      follow_button = null;

    if (profile_user.profile_photo.startsWith('http'))
      profile_photo = profile_user.profile_photo;
    else profile_photo = '/media/' + profile_user.profile_photo;
    let edit_button;
    if (!this.state.onEdit) {
      edit_button = (
        <img
          className="EditButtonImage"
          src="/images/edit_button.png"
          width="30"
          onClick={() =>
            this.setState(state => ({ ...this.state, onEdit: true }))
          }
        ></img>
      );
    } else {
      edit_button = (
        <img
          className="EditConfirmButtonImage"
          src="/images/tick.png"
          width="30"
          onClick={() => this.onEditProfile(profile_user)}
        ></img>
      );
    }

    const profile_picture = (
      <img src={profile_photo} className="ProfilePicture" />
    );

    return (
      <div className="Wrapper">
        <div className="UploadBox">
          <form>
            <input
              type="file"
              onChange={event => this.handleFileInput(event)}
              ref={this.inputRef}
              style={{ display: 'none' }}
            />
          </form>
        </div>
        <div className="Header">
          <div className="Edit">
            {profile_user.username === logged_in_user.username
              ? edit_button
              : null}
          </div>
        </div>
        <div className="Upper">
          <p className="UpperLeft">
            <div className="ProfilePictureContainer">
              {this.state.onEdit === true ? (
                <div>
                  <div className="ProfilePictureEdit">
                    <img
                      className="ProfilePicture"
                      src="/images/profile_edit.png"
                      onClick={() => {
                        this.inputRef.current.click();
                      }}
                    ></img>
                  </div>
                  <div className="ProfilePicture">{profile_picture}</div>
                </div>
              ) : (
                <div className="ProfilePicture">{profile_picture}</div>
              )}
            </div>
          </p>
          <div className="UpperRight">
            <div className="NameContainer">
              <div className="NicknameContainer">
                {this.state.onEdit === true ? (
                  <div>
                    <div>
                      <input
                        className="NicknameForm"
                        type="text"
                        value={this.state.nickname}
                        placeholder={nickname}
                        onChange={event =>
                          this.setState({
                            ...this.state,
                            nickname: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className="Username">{nickname}</div>
                )}
              </div>
              <div className="Nickname">@{username}</div>
              <div className="ProfileComment">
                {this.state.onEdit === true ? (
                  <div>
                    <TextArea
                      className="commentForm"
                      type="textbox"
                      value={this.state.comment}
                      placeholder={profile_text}
                      onChange={event =>
                        this.setState({
                          ...this.state,
                          comment: event.target.value,
                        })
                      }
                    />
                  </div>
                ) : (
                  <div className="Comment">{profile_text}</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="Footer">
          <div className="FooterLeft"></div>
          <div className="FooterRight">
            <div className="Follow">
              {follow_button}
              <FollowerListModal
                profile_user={profile_user}
                followers={followers}
                followees={followees}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged_in_user: state.user.logged_in_user,
  followers: state.user.follower_list,
  followees: state.user.followee_list,
});

const mapDispatchToProps = dispatch => {
  return {
    onEditProfile: profile => dispatch(actionCreators.editUserProfile(profile)),
    onUploadProfileImage: formdata =>
      dispatch(actionCreators.uploadProfileImage(formdata)),
    onFollow: followee_id => dispatch(actionCreators.followUser(followee_id)),
    onUnfollow: followee_id =>
      dispatch(actionCreators.unfollowUser(followee_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfo);
