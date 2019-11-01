import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';
import Form from 'react-bootstrap/Form';

import Header from '../components/Header';
import BookInfo from '../components/BookInfo';
import BookTabs from '../components/BookTabs';

import * as actionCreators from '../store/actions/actionCreators';

import './BookDetail.css';
import './containers.css';

class BookDetail extends Component {

  componentDidMount() {
    this.props.onLoadBook(this.props.match.params.book_id);
    this.props.onLoadArticles(this.props.match.params.book_id);
  }

  onCreateReview = () => {
    this.props.history.push('/review/create');
  }

  render() {

    if (!this.props.currentBook) {
      return (
        <div>
          LOADING...
        </div>
      );
    }

    const isbn = this.props.match.params.book_id;
    const title = this.props.currentBook.title;
    var pattern = /[\[\]\']/g;
    const authors = this.props.currentBook.authors.replace(pattern, '');
    const publisher = this.props.currentBook.publisher;
    const publishedDate = this.props.currentBook.published_date;
    const thumbnail = this.props.currentBook.thumbnail;
    const contents = this.props.currentBook.contents;
    const shortReviews = this.props.shortReviews;
    const longReviews = this.props.longReviews;
    const phrases = this.props.phrases;


    return (
      <div >
        <Header />
        <h1>Book Detail</h1>
        <div className='infoStyle'>
          <BookInfo
            isbn={isbn}
            title={title}
            authors={authors}
            publisher={publisher}
            publishedDate={publishedDate}
            thumbnail={thumbnail}
          />
        </div>
        <Button
          id='create_review_button'
          onClick={() => this.onCreateReview()}
        >Create a Review!</Button>
        <div className='tab'>
          <BookTabs
            contents={contents}
            shortReviews={shortReviews}
            longReviews={longReviews}
            phrases={phrases}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentBook: state.book.selectedBook,
    shortReviews: state.article.shortReviews,
    longReviews: state.article.longReviews,
    phrases: state.article.phrases,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadBook: (isbn) =>
      dispatch(actionCreators.getSpecificBook(isbn)),
    onLoadArticles: (isbn) =>
      dispatch(actionCreators.getArticlesByBookId(isbn)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookDetail));