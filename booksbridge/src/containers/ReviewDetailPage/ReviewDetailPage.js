import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Feed, Icon } from 'semantic-ui-react';

import Header from '../../components/Header';
import BookInfo from '../../components/BookDetail/BookInfo';
import Comments from '../Comments/Comments';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';
import Time from '../../components/Time';
import * as actionCreators from '../../store/actions/actionCreators';

import './ReviewDetailPage.css';

class ReviewDetailPage extends Component {
  // componentDidMount() {
  //   this.props.onLoadArticle(this.props.match.params.review_id);
  // }

  constructor(params) {
    super(params);
    this.props.onLoadArticle(this.props.match.params.review_id);
  }

  likeHandler = () => {
    if (this.props.likes > 0) {
      this.props.onDeleteLikeArticle(this.props.match.params.review_id);
    } else {
      this.props.onPostLikeArticle(this.props.match.params.review_id);
    }
  };

  render() {
    this.props.onGetLikeArticle(this.props.match.params.review_id);

    if (!this.props.currentArticle) {
      return <div className="loading">LOADING...</div>;
    }

    const book = this.props.currentArticle.book;

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
            <div className="LikeButton">
              <Feed.Meta>
                <Feed.Like>
                  <Icon name="like" onClick={this.likeHandler} />
                  {this.props.likes}
                </Feed.Like>
              </Feed.Meta>
            </div>
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
    likes: state.article.likes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadArticle: id => dispatch(actionCreators.getSpecificArticle(id)),
    onLikeArticle: () => dispatch(actionCreators.postArticleLike()),
    onPostLikeArticle: article_id =>
      dispatch(actionCreators.postArticleLike(article_id)),
    onGetLikeArticle: article_id =>
      dispatch(actionCreators.getArticleLike(article_id)),
    onDeleteLikeArticle: article_id =>
      dispatch(actionCreators.deleteArticleLike(article_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ReviewDetailPage));
