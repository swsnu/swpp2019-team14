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
    if (user.profile_photo.startsWith('http'))
      profile_photo = user.profile_photo;
    else profile_photo = '/media/' + user.profile_photo;
  }

  return (
    <div className="ProfileSummary">
      <img
        className="profilePic"
        onClick={() => props.history.push('/page/' + user.username)}
        src={profile_photo}
      />
      <a className="profileName" onClick={props.menu}>
        <b className="nickname">{user.nickname}</b>
        <p className="username">@{user.username}</p>
      </a>
    </div>
  );
};

export default withRouter(ProfileSummary);
