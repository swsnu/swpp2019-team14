import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Header from '../components/Header';
import UserInfo from '../components/UserPage/UserInfo';
import ContainerHeader from '../components/ContainerHeader/ContainerHeader';
import UserReviewSummary from '../components/UserPage/UserReviewSummary';
import UserCurationSummary from '../components/UserPage/UserCurationSummary';
import { Pagination } from 'semantic-ui-react';
import Spinner from 'react-bootstrap/Spinner';
import * as actionCreators from '../store/actions/actionCreators';
import './UserPage.css';

class UserPage extends Component {
  constructor(params) {
    super(params);
    this.state = {
      activeReviewPage: 1,
      activeCurationPage: 1,
      activeBookPage: 1,
    };
    this.props.onLoadUser(this.props.match.params.username);
    this.props.onLoadUserReviews(1, this.props.match.params.username);
    this.props.onLoadUserCurations(1, this.props.match.params.username);
    this.deleteHandler = this.deleteHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.username !== prevProps.match.params.username) {
      this.props.onLoadUser(this.props.match.params.username);
    }
  }

  deleteHandler(article_id) {
    this.props.onDeleteArticle(article_id);
    //this.setState({ ...this.state, activeReviewPage: 1 });
    //this.props.onLoadUserReviews(1, this.props.match.params.username);
  }

  handleReviewPaginationChange = (e, { activePage }) => {
    this.setState({ ...this.state, activeReviewPage: activePage });
    this.props.onLoadUserReviews(activePage, this.props.match.params.username);
  };

  handleCurationPaginationChange = (e, { activePage }) => {
    this.setState({ ...this.state, activeCurationPage: activePage });
    this.props.onLoadUserCurations(
      activePage,
      this.props.match.params.username,
    );
  };

  handleBookPaginationChange = (e, { activePage }) => {
    this.setState({ ...this.state, activeBookPage: activePage });
  };

  render() {
    if (!this.props.profile_user) {
      return <Spinner animation="border" className="Spinner" />;
    }

    const { like_books } = this.props.profile_user;

    if (this.props.profile_user) {
      this.props.onGetFollows(this.props.profile_user.id);
    }

    let ReviewFinal =
      this.props.ReviewLength % 5 === 0
        ? this.props.ReviewLength / 5
        : parseInt(this.props.ReviewLength / 5) + 1;

    let CurationFinal =
      this.props.CurationLength % 5 === 0
        ? this.props.CurationLength / 5
        : parseInt(this.props.CurationLength / 5) + 1;

    let BookFinal =
      like_books.length % 6 === 0
        ? like_books.length / 6
        : parseInt(like_books.length / 6) + 1;

    if (
      this.props.ReviewLength !== 0 &&
      this.props.articles_by_userID.length === 0
    ) {
      this.props.onLoadUserReviews(1, this.props.match.params.username);
    }

    const articles = this.props.articles_by_userID.map((article, index) => {
      return (
        <div key={index}>
          <UserReviewSummary
            logged_in_user={this.props.logged_in_user}
            profile_user={this.props.profile_user}
            title={article.title}
            book_isbn={article.book_isbn}
            book_title={article.book_title}
            content={article.content}
            date={article.date}
            is_long={article.is_long}
            is_short={article.is_short}
            is_phrase={article.is_phrase}
            id={article.id}
            deleteHandler={this.deleteHandler}
          />
        </div>
      );
    });

    const curations = this.props.curations_by_userID.map((curation, index) => {
      return (
        <div key={index}>
          <UserCurationSummary
            title={curation.title}
            books={curation.books}
            content={curation.content}
            date={curation.date}
            id={curation.id}
          />
        </div>
      );
    });

    let slicedBooks = [];
    slicedBooks = like_books.slice(
      (this.state.activeBookPage - 1) * 6,
      this.state.activeBookPage * 6,
    );

    const likebooks = slicedBooks.map(book => {
      return book.thumbnail === '' ? (
        <img
          className="LikeBookThumbnail"
          onClick={() => this.props.history.push('/book/' + book.isbn)}
          src="/images/no_cover.jpg"
        />
      ) : (
        <img
          className="LikeBookThumbnail"
          onClick={() => this.props.history.push('/book/' + book.isbn)}
          src={book.thumbnail}
        />
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
            <ContainerHeader title="작성한 리뷰" />
            {this.props.ReviewLength === 0 ? (
              '아직 작성된 리뷰가 없습니다.'
            ) : (
              <div>
                {articles}
                <Pagination
                  defaultActivePage={1}
                  activePage={this.state.activeReviewPage}
                  onPageChange={this.handleReviewPaginationChange}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  totalPages={ReviewFinal}
                />
              </div>
            )}
            <ContainerHeader title="작성한 큐레이션" />
            {curations.length === 0 ? (
              '아직 작성된 큐레이션이 없습니다.'
            ) : (
              <div>
                {curations}
                <Pagination
                  defaultActivePage={1}
                  activePage={this.state.activeCurationPage}
                  onPageChange={this.handleCurationPaginationChange}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  totalPages={CurationFinal}
                />
              </div>
            )}
            <ContainerHeader title="즐겨찾기한 책" />
            {like_books.length === 0 ? (
              '아직 즐겨찾기한 책 없습니다.'
            ) : (
              <div>
                {likebooks}
                <br />
                <Pagination
                  defaultActivePage={1}
                  activePage={this.state.activeBookPage}
                  onPageChange={this.handleBookPaginationChange}
                  firstItem={null}
                  lastItem={null}
                  pointing
                  secondary
                  totalPages={BookFinal}
                />
              </div>
            )}
            <ContainerHeader title="좋아하는 게시글" />
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
  curations_by_userID: state.curation.curationsByUserID,
  ReviewLength: state.article.length,
  CurationLength: state.curation.length,
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadUser: username => {
      dispatch(actionCreators.getSpecificUser(username));
    },
    onLoadUserReviews: (page, username) => {
      dispatch(actionCreators.getArticlesByUserId(page, username));
    },
    onLoadUserCurations: (page, username) => {
      dispatch(actionCreators.getCurationsByUserId(page, username));
    },
    onGetFollows: profile_user_id =>
      dispatch(actionCreators.getFollows(profile_user_id)),
    onDeleteArticle: article_id =>
      dispatch(actionCreators.deleteSpecificArticle(article_id, null)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserPage));
