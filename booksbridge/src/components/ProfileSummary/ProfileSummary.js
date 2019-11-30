import React from 'react';
import './ProfileSummary.css';
import { withRouter } from 'react-router';

const ProfileSummary = props => {
  let userload = false;
  let user = { id: '', profile_photo: '', nickname: '', username: '' };

  let profile_photo = '';

  if (!userload && props.user) {
    userload = true;
    user = props.user;
    if (profile_user.profile_photo.startsWith('http'))
      profile_photo = profile_user.profile_photo;
    else profile_photo = '/media/' + profile_user.profile_photo;
  }

  return (
    <div className="ProfileSummary">
      <img
        className="profilePic"
        onClick={() => props.history.push('/page/' + user.username)}
        src={profile_photo}
      />
      <div className="profileName">
        <b className="nickname">{user.nickname}</b>
        <p className="username">@{user.username}</p>
      </div>
    </div>
  );
};

export default withRouter(ProfileSummary);
