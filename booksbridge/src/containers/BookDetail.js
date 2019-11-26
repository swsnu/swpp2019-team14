import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Icon } from 'semantic-ui-react';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import Header from '../components/Header';
import BookInfo from '../components/BookDetail/BookInfo';
import BookTabs from '../components/BookDetail/BookTabs';
import SelectLibraryModal from '../components/BookDetail/SelectLibraryModal';

import * as actionCreators from '../store/actions/actionCreators';

import './BookDetail.css';
import './containers.css';

class BookDetail extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.onLoadBook(this.props.match.params.book_id);
    this.props.onLoadArticles(this.props.match.params.book_id);
  }

  onCreateReview = () => {
    this.props.history.push('/review/create');
  };

  render() {
    if (!this.props.currentBook) {
      return <Spinner animation="border" className="Spinner" />;
    }
    if (this.props.libraries.length == 0) this.props.onLoadLibrary();

    const isbn = this.props.match.params.book_id;
    const { title } = this.props.currentBook;
    const pattern = /[\[\]\']/g;
    const authors = this.props.currentBook.authors.replace(pattern, '');
    const { publisher } = this.props.currentBook;
    const publishedDate = this.props.currentBook.published_date;
    const { thumbnail } = this.props.currentBook;
    const { contents } = this.props.currentBook;
    const { author_contents } = this.props.currentBook;
    const { shortReviews } = this.props;
    const { longReviews } = this.props;
    const { phrases } = this.props;

    return (
      <div className="bookDetail">
        <Header />
        <div className="HeaderPadding" />
        <div className="infoStyle">
          <BookInfo
            isbn={isbn}
            title={title}
            authors={authors}
            publisher={publisher}
            publishedDate={publishedDate}
            thumbnail={thumbnail}
          />
        </div>
        <div className="BookDetailButtons">
          <Button
            id="create_review_button"
            icon
            color="blue"
            onClick={() => this.onCreateReview()}
          >
            <Icon name="pencil" />
            리뷰 작성하기
          </Button>
          <SelectLibraryModal
            libraries={this.props.libraries}
            book={this.props.currentBook}
          />
        </div>
        <div className="tab">
          <BookTabs
            contents={contents}
            author_contents={author_contents}
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
    logged_in_user: state.user.logged_in_user,
    currentBook: state.book.selectedBook,
    shortReviews: state.article.shortReviews,
    longReviews: state.article.longReviews,
    phrases: state.article.phrases,
    selectedLibrary: state.library.selectedLibrary,
    libraries: state.library.libraries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
    onLoadArticles: isbn => dispatch(actionCreators.getArticlesByBookId(isbn)),
    onLoadLibrary: () => dispatch(actionCreators.getLibraries()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BookDetail));
