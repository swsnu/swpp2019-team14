import React from 'react';
import './ProfileSummary.css';
import { withRouter } from 'react-router-dom';

const ProfileSummary = props => {
  let userload = false;
  let user = { profile_photo: '', nickname: '', username: '' };

  if (!userload && props.user) {
    userload = true;
    user = props.user;
  }

  return (
    <div className="ProfileSummary">
      <img className="profilePic" src={user.profile_photo} />
      <div className="profileName">
        <b className="nickname">{user.nickname}</b>
        <p className="username">@{user.username}</p>
      </div>
    </div>
  );
};

export default withRouter(ProfileSummary);
