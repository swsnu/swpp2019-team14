import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Feed, Icon } from 'semantic-ui-react';
import Spinner from 'react-bootstrap/Spinner';

import Header from '../../components/Header';
import BookInfo from '../../components/BookDetail/BookInfo';
import Comments from '../Comments/Comments';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';
import Time from '../../components/Time';
import * as actionCreators from '../../store/actions/actionCreators';

import './ReviewDetailPage.css';

class ReviewDetailPage extends Component {
  constructor(params) {
    super(params);
    this.props.onLoadArticle(this.props.match.params.review_id);
  }

  onClickLikeArticleButton = (like_or_not, id) => {
    if (like_or_not) {
      this.props.onDeleteLikeArticle(id);
    } else {
      this.props.onPostLikeArticle(id);
    }
  };

  render() {
    if (!this.props.currentArticle) {
      return <Spinner animation="border" className="Spinner" />;
    }

    const book = this.props.currentArticle.book;

    const like_or_not = this.props.currentArticle.like_or_not;

    const LikeButton = like_or_not ? (
      <div
        onClick={() =>
          this.onClickLikeArticleButton(
            like_or_not,
            this.props.currentArticle.id,
          )
        }
      >
        <Icon color="red" name="like" />
        {this.props.currentArticle.like_count}
      </div>
    ) : (
      <div
        onClick={() =>
          this.onClickLikeArticleButton(
            like_or_not,
            this.props.currentArticle.id,
          )
        }
      >
        <Icon name="like" />
        {this.props.currentArticle.like_count}
      </div>
    );

    return (
      <div className="ReviewDetailPage">
        <Header />

        <div className="ReviewDetail">
          <div className="ReviewTitleStyle">
            <p className="ReviewDetailTitle">
              {this.props.currentArticle.title}
            </p>
          </div>
          <div className="AuthorDateInfo">
            <div className="AuthorProfile">
              <ProfileSummary user={this.props.currentArticle.author} />
            </div>
            <div className="ReviewDateInfo">
              <Time date={this.props.currentArticle.date} />
            </div>
          </div>
          <div>
            <a id="ReviewDetailBookInfo" href={'/book/' + book.isbn}>
              <BookInfo
                isbn={book.isbn}
                title={book.title}
                authors={book.authors}
                publisher={book.publisher}
                publishedDate={book.published_date}
                thumbnail={book.thumbnail}
              />
            </a>
          </div>
          <div className="ReviewContainer">
            {this.props.currentArticle.content}
            <div className="LikeButton">{LikeButton}</div>
            <div className="ReviewComments">
              <Comments
                comments={this.props.currentArticle.comments}
                article_id={this.props.match.params.review_id}
                is_article={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentArticle: state.article.selectedArticle,
    logged_in_user: state.user.logged_in_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadArticle: id => dispatch(actionCreators.getSpecificArticle(id)),
    onPostLikeArticle: article_id =>
      dispatch(actionCreators.postArticleLike(article_id)),
    onDeleteLikeArticle: article_id =>
      dispatch(actionCreators.deleteArticleLike(article_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ReviewDetailPage));
