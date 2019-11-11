import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';

import './UserInfo.css';
class UserInfo extends Component {
  componentDidMount() {
  }

  render() {
    const profile_user = this.props.profile_user;

    if (!profile_user) return null;

    console.log('[debug] ' + profile_user.username);
    console.log('[debug] ' + profile_user.nickname);
    console.log('[debug] ' + profile_user);

    const nickname = profile_user.nickname;
    const username = profile_user.username;
    const profile_picture = <Image src={profile_user.profile_photo} className='ProfilePicture' />;



    return (
      <div className='Wrapper'>
        <div className='Edit'>
          Edit
                </div>
        <div className='Upper'>
          <div className='ProfilePicture'>
            {profile_picture}
          </div>
          <div className='Names'>
            {username}
            <br />
            {nickname}
          </div>
        </div>
        <div className='userInfoLower'>
          <div className='StatusMsg'>

          </div>
        </div>
        <div className='Footer'>
          <div className='SignOut'>

          </div>
          <div className='Follow'>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserInfo));
