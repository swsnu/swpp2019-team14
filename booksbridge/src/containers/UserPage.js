import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';

import Header from '../components/Header';
import UserInfo from '../components/UserPage/UserInfo';
import UserReviewList from '../components/UserPage/UserReviewList';

import * as actionCreators from '../store/actions/actionCreators';
import './UserPage.css';

class UserPage extends Component {
  constructor(params) {
    super(params);
    this.props.onLoadUser(this.props.match.params.username);
    this.props.onLoadUserReviews(this.props.match.params.username);
  }

  render() {
    // Ensures rerendering when moving from userpage to userpage
    if (
      this.props.profile_user &&
      this.props.match.params.username !== this.props.profile_user.username
    ) {
      this.props.onLoadUser(this.props.match.params.username);
      this.props.onLoadUserReviews(this.props.match.params.username);
    }

    // Ensures UserInfo gets proper follower-followee arrays before its rendering
    if (this.props.profile_user) {
      this.props.onGetFollows(this.props.profile_user.id);
    }

    return (
      <div className="UserPage">
        <Header />
        <div className="UserInfo">
          <UserInfo
            profile_user={this.props.profile_user}
            logged_in_user={this.props.logged_in_user}
          />
        </div>
        <div className="ArmisticeLine"></div>
        <div className="Tab">
          <div className="UserReviewList"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged_in_user: state.user.logged_in_user,
  profile_user: state.user.profile_user,
  articles_by_userID: state.article.articlesByUserID,
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadUser: username => {
      dispatch(actionCreators.getSpecificUser(username));
    },
    onLoadUserReviews: username => {
      dispatch(actionCreators.getArticlesByUserId(username));
    },
    onGetFollows: profile_user_id =>
      dispatch(actionCreators.getFollows(profile_user_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserPage));
