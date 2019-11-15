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
  componentDidMount() {
    this.props.onLoadArticle(this.props.match.params.review_id);
  }

  render() {
    if (!this.props.currentArticle) {
      return <div className="loading">LOADING...</div>;
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
          <div className="LikeButton">
            <div className="ui labeled button" tabIndex="0">
              <div className="ui red button">
                <i className="heart icon" /> Like
              </div>
              <a className="ui basic red left pointing label">0</a>
            </div>
          </div>
          <div className="ReviewComments">
            <Comments
              comments={this.props.currentArticle.comments}
              article_id={this.props.match.params.review_id}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadArticle: id => dispatch(actionCreators.getSpecificArticle(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ReviewDetailPage));
