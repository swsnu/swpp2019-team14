import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';

import Header from '../../components/Header';
import BookInfo from '../../components/BookDetail/BookInfo';
import Comments from '../Comments/Comments';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';

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
    console.log('DEGUB ', this.props.currentArticle);

    if (!this.props.currentArticle) {
      return <div className="loading">LOADING..!</div>;
    }

    const book = this.props.currentArticle.book;

    return (
      <div className="ReviewDetailPage">
        <Header />
        <div className="ReviewTitleStyle">
          <h1>{this.props.currentArticle.title}</h1>
        </div>
        <div className="AuthorProfile">
          <ProfileSummary user={this.props.currentArticle.author} />
        </div>
        <div className="infoStyle">
          <BookInfo
            isbn={book.isbn}
            title={book.title}
            authors={book.authors}
            publisher={book.publisher}
            publishedDate={book.published_date}
            thumbnail={book.thumbnail}
          />
        </div>
        <div>
          <Button
            id="check-book-button"
            onClick={() => this.props.history.push(`/book/${book.isbn}`)}
          >
            Check this book!
          </Button>
        </div>
        <div className="ReviewContainer">
          {this.props.currentArticle.content}
          <div className="LikeButton" onClick={this.likeHandler}>
            <div className="ui labeled button" tabIndex="0">
              <div className="ui red button">
                <i className="heart icon" /> Like
              </div>
              <a className="ui basic red left pointing label">
                {this.props.likes}
              </a>
            </div>
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
