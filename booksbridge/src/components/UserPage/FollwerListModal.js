import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Icon, Comment } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/actionCreators';
import SearchUser from '../SearchUser/SearchUser';

import './FollowerListModal.css';
import '../CommentUnit/CommentUnit.css';
class FollwerListModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  open = () => {
    this.setState({
      ...this.state,
      open: true,
    });
  };

  close = () => {
    this.setState({
      ...this.state,
      open: false,
    });
  };

  render() {
    const follower_followee = (
      <p className="FollowStatus">
        {this.props.followers ? this.props.followers.length : 0} 팔로워{' '}
        {this.props.followees ? this.props.followees.length : 0} 팔로잉
      </p>
    );

    if (!(this.props.followers && this.props.followees)) {
      return <div>로딩 실패 :(</div>;
    }

    const followersHTML = this.props.followers.length
      ? this.props.followers.map(follower => {
          return <SearchUser user={follower} />;
        })
      : this.props.profile_user.nickname + '님을 팔로우하고 있는 사람이 없어요';

    const followeesHTML = this.props.followees.length
      ? this.props.followees.map(followee => {
          return <SearchUser user={followee} />;
        })
      : this.props.profile_user.nickname + '님을 팔로우하고 있는 사람이 없어요';

    return (
      <Modal
        className="FollowerList"
        trigger={follower_followee}
        open={this.state.open}
        onOpen={this.open}
        onClose={this.close}
      >
        <Modal.Header>팔로우 리스트</Modal.Header>
        <Modal.Content scrolling>
          <div className="FollowerListContent">
            <div className="FollowerListContentFollower">
              <div className="FollowerListContentFollowerHeader">
                {this.props.profile_user.nickname}님을 팔로우하는 사람들
              </div>
              <div className="FollowerListContentFollowerContent">
                {followersHTML}
              </div>
            </div>
            <div className="FollowerListContentFollowee">
              <div className="FollowerListContentFolloweeHeader">
                {this.props.profile_user.nickname}님이 팔로우하는 사람들
              </div>
              <div className="FollowerListContentFolloweeContent">
                {followeesHTML}
              </div>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={this.close}>
            닫기
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default FollwerListModal;
