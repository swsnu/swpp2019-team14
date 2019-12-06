import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Icon, Popup, Label } from 'semantic-ui-react';
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

  onClickLikeBookButton = (like_or_not, isbn) => {
    if (like_or_not) {
      this.props.onUnlikeBook(isbn);
    } else {
      this.props.onLikeBook(isbn);
    }
  };

  onCreateReview = () => {
    this.props.history.push('/review/create');
  };

  render() {
    if (!this.props.currentBook) {
      return <Spinner animation="border" className="Spinner" />;
    }

    const isbn = this.props.match.params.book_id;
    const { title } = this.props.currentBook;
    const pattern = /[\[\]\']/g;
    const authors = this.props.currentBook.authors.replace(pattern, '');
    const { publisher } = this.props.currentBook;
    const publishedDate = this.props.currentBook.published_date;
    const { thumbnail } = this.props.currentBook;
    const { contents } = this.props.currentBook;
    const { author_contents } = this.props.currentBook;
    const { like_users } = this.props.currentBook;
    const { shortReviews } = this.props;
    const { longReviews } = this.props;
    const { phrases } = this.props;
    const { logged_in_user } = this.props;

    const test = user => user.id === logged_in_user.id;
    const like_or_not = like_users.some(test);

    const LikeButton = (
      <div onClick={() => this.onClickLikeBookButton(like_or_not, isbn)}>
        <Button as="div" labelPosition="right">
          <Button className="BookLikeButton" color="black">
            <Icon name="heart" />
            즐겨찾기
          </Button>
          <Label as="a" basic color="black" pointing="left">
            {like_users.length}
          </Label>
        </Button>
      </div>
    );

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
            color="black"
            onClick={() => this.onCreateReview()}
          >
            <Icon name="pencil" />
            리뷰 작성하기
          </Button>
          <SelectLibraryModal book={this.props.currentBook} />
          <Popup
            size="small"
            position="top center"
            trigger={LikeButton}
            content="책을 즐겨찾기 할 경우, 이 책에 남겨지는 새로운 리뷰를 나의 피드에서 바로 확인할 수 있습니다!"
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
    onLoadArticles: isbn => dispatch(actionCreators.getArticlesByBookId(isbn)),
    onLikeBook: isbn => dispatch(actionCreators.postBookLike(isbn)),
    onUnlikeBook: isbn => dispatch(actionCreators.deleteBookLike(isbn)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BookDetail));
