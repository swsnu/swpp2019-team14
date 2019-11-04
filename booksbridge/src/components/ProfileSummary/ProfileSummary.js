import React from 'react';
import './ProfileSummary.css';
import { withRouter } from 'react-router-dom';

const ProfileSummary = (props) => {
    return (
        <div className="profile">
                <img className="profilePic" src={props.profile_photo}></img>
                <div className="profileName">
                    <b className="nickname">{props.nickname}</b>
                    <p className="username">@{props.username}</p>
                </div>
        </div>
    );
};

export default (withRouter(ProfileSummary));