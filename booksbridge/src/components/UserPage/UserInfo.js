import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';

import './UserInfo.css';
class UserInfo extends Component {
  componentDidMount() {}

  render() {
    const profile_user = this.props.profile_user;

    if (!profile_user) return null;

    const nickname = profile_user.nickname;
    const username = profile_user.username;
    const profile_text = profile_user.profile_text;
    const profile_picture = (
      <Image src={profile_user.profile_photo} className="ProfilePicture" />
    );
    // TODO: replace SignOut with a proper button, link it to the database so that one can sign out properly.
    return (
      <div className="Wrapper">
        <div className="Header">
          <div className="Edit">Edit</div>
        </div>
        <div className="Upper">
          <p className="UpperLeft">
            <p className="ProfilePictureContainer">
              <div className="ProfilePicture">{profile_picture}</div>
            </p>
          </p>
          <div className="UpperRight">
            <div className="NameContainer">
              <div className="Username">{username}</div>
              <div className="Nickname">@{nickname}</div>
            </div>
          </div>
        </div>
        <div className="Lower">
          <div className="Profile_Text">{profile_text}</div>
        </div>
        <div className="Footer">
          <div className="FooterLeft">
            <div className="SignOut-Deprecated"></div>
          </div>
          <div className="FooterRight">
            <div className="Follow">Follow</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserInfo));
