import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from '../components/Header';
import UserInfo from '../components/UserPage/UserInfo';
import ContainerHeader from '../components/ContainerHeader/ContainerHeader';
import UserReviewSummary from '../components/UserPage/UserReviewSummary';
import { Pagination } from 'semantic-ui-react';

import * as actionCreators from '../store/actions/actionCreators';
import './UserPage.css';

class UserPage extends Component {
  constructor(params) {
    super(params);
    this.state = { activeReviewPage: 1 };
    this.props.onLoadUser(this.props.match.params.username);
    this.props.onLoadUserReviews(1, this.props.match.params.username);
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.onLoadUserReviews(activePage, this.props.match.params.username);
  };

  render() {
    // need to implement whether user_id from url is valid or not

    let final =
      this.props.length % 5 === 0
        ? this.props.length / 5
        : parseInt(this.props.length / 5) + 1;

    console.log(this.props.length);
    console.log(final);

    const articles = this.props.articles_by_userID.map((article, index) => {
      return (
        <div key={index}>
          <UserReviewSummary
            author={article.author}
            title={article.title}
            book_thumbnail={article.book_thumbnail}
            book_isbn={article.book_isbn}
            book_title={article.book_title}
            content={article.content}
            date={article.date}
            is_long={article.is_long}
            is_short={article.is_short}
            is_phrase={article.is_phrase}
            id={article.id}
          />
        </div>
      );
    });

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
          <div className="UserReviewList">
            <ContainerHeader title="나의 리뷰" />
            {articles}
            <Pagination
              defaultActivePage={1}
              activePage={this.state.activePage}
              onPageChange={this.handlePaginationChange}
              firstItem={null}
              lastItem={null}
              pointing
              secondary
              totalPages={final}
            />
            <ContainerHeader title="나의 큐레이션" />
            <ContainerHeader title="좋아요를 남긴 게시글 목록" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logged_in_user: state.user.logged_in_user,
  profile_user: state.user.profile_user,
  articles_by_userID: state.article.articlesByUserID,
  length: state.article.length,
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadUser: username => {
      dispatch(actionCreators.getSpecificUser(username));
    },
    onLoadUserReviews: (page, username) => {
      dispatch(actionCreators.getArticlesByUserId(page, username));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserPage));
