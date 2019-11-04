import React from 'react';
import './ProfileSummary.css';
import { withRouter } from 'react-router-dom';

const ProfileSummary = (props) => {

    let userload = false;
    let user = { profile_photo: '', nickname: '', username: '' };

    if (!userload && props.user) {
        userload = true;
        user = props.user;
        if (user.profile_photo === '') {
            user.profile_photo = 'https://react.semantic-ui.com/images/avatar/large/matthew.png';
        }
    }

    return (
        <div className="ProfileSummary">
            <img className="profilePic" src={user.profile_photo}></img>
            <div className="profileName">
                <b className="nickname">{user.nickname}</b>
                <p className="username">@{user.username}</p>
            </div>
        </div>
    );
};

export default (withRouter(ProfileSummary));