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

  componentDidMount() {}

  // Q. how to enforce reendering after loading props state?

  render() {
    // need to implement whether user_id from url is valid or not

    console.log(
      '[DEBUG from userpage] user_id: ' + this.props.match.params.username,
    );
    console.log('[DEBUG from userpage] user: ' + this.props.profile_user);

    return (
      <div className="UserPage">
        <Header />
        <div className="UserInfo">
          <UserInfo profile_user={this.props.profile_user} />
        </div>
        <div className="ArmisticeLine"></div>
        <div className="Tab">
          <div className="UserReviewList">
            <UserReviewList
              profile_user={this.props.profile_user}
              user_reviews={this.props.articles_by_userID}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserPage));
