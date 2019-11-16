import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Alert from 'react-bootstrap/Alert';

import './UserInfo.css';
class UserInfo extends Component {
  componentDidMount() {}

  render() {
    const profile_user = this.props.profile_user;
    const logged_in_user = this.props.logged_in_user;
    if (!profile_user) return null;
    if (!logged_in_user) return null;
    const nickname = profile_user.nickname;
    const username = profile_user.username;
    const profile_text = profile_user.profile_text;
    let profile_photo = '';
    if (profile_user.profile_photo.startsWith('resources/image/profile'))
      profile_photo = '/static/' + profile_user.profile_photo.substr(24);
    else profile_photo = profile_user.profile_photo;
    const edit_button = <img src="/images/edit_button.png" width="30"></img>;

    const profile_picture = (
      <img src={profile_photo} className="ProfilePicture" />
    );

    // TODO: replace SignOut with a proper button, link it to the database so that one can sign out properly.
    return (
      <div className="Wrapper">
        <div className="Header">
          <div className="Edit">
            {profile_user.username === logged_in_user.username
              ? edit_button
              : null}
          </div>
        </div>
        <div className="Upper">
          <p className="UpperLeft">
            <p className="ProfilePictureContainer">
              <div className="ProfilePicture">{profile_picture}</div>
            </p>
          </p>
          <div className="UpperRight">
            <div className="NameContainer">
              <div className="Username">{nickname}</div>
              <div className="Nickname">@{username}</div>
              <div className="ProfileComment">{profile_text}</div>
            </div>
          </div>
        </div>
        <div className="Footer">
          <div className="FooterLeft"></div>
          <div className="FooterRight">
            <div className="Follow">
              <img src="/images/emptyheart.png" width="30"></img>
              <p className="FollowStatus">104 팔로워 104 팔로잉</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
