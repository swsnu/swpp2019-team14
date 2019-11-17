import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'semantic-ui-react';
import Alert from 'react-bootstrap/Alert';
import * as actionCreators from '../../store/actions/actionCreators';

import './UserInfo.css';
class UserInfo extends Component {
  state = {
    onEdit: false,
    nickname: '',
    comment: '',
  };

  onEditProfile(user) {
    if (this.state.nickname === '') {
      window.alert('Nickname cannot be empty!');
    } else {
      this.props.onEditProfile({
        id: user.id,
        nickname: this.state.nickname,
        profile_text: user.profile_text,
        profile_photo: user.profile_photo,
      });
      this.setState(state => ({ ...this.state, onEdit: false }));
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
    if (profile_user.profile_photo.startsWith('resources/image/profile'))
      profile_photo = '/static/' + profile_user.profile_photo.substr(24);
    else profile_photo = profile_user.profile_photo;
    let edit_button;
    if (!this.state.onEdit) {
      edit_button = (
        <img
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
          src="/images/tick.png"
          width="30"
          onClick={() => this.onEditProfile(profile_user)}
        ></img>
      );
    }

    const profile_picture = (
      <img src={profile_photo} className="ProfilePicture" />
    );

    // TODO: 글자수 제한, 사진 변경
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
              <div className="NicknameContainer">
                {this.state.onEdit === true ? (
                  <div>
                    <div className="NicknameForm">
                      <Form size={'medium'}>
                        <Form.Input
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
                      </Form>
                    </div>
                  </div>
                ) : (
                  <div className="Username">{nickname}</div>
                )}
              </div>
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

const mapDispatchToProps = dispatch => {
  return {
    onEditProfile: profile => dispatch(actionCreators.editUserProfile(profile)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(UserInfo);
