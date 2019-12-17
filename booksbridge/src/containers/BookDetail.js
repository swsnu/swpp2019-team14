import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Icon, Popup, Label, Confirm } from 'semantic-ui-react';
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
    this.state = {
      articles: [],
    };
    this.likeHandler = this.likeHandler.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
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

  likeHandler(like_or_not, article_id) {
    if (like_or_not) {
      this.props.onDeleteLikeArticle(article_id);
    } else {
      this.props.onPostLikeArticle(article_id);
    }
  }

  deleteHandler(article_id, type) {
    this.props.onDeleteArticle(article_id, type);
  }

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
    const like_or_not = like_users.some(test); //true or false

    const LikeButton = (
      <div
        id="like-book-button"
        onClick={() => this.onClickLikeBookButton(like_or_not, isbn)}
      >
        <Button as="div" labelPosition="right">
          {like_or_not ? (
            <Button className="BookLikeButton" color="black">
              <Icon name="heart" />
              즐겨찾기 해제
            </Button>
          ) : (
            <Button className="BookLikeButton" color="black">
              <Icon name="heart" />
              즐겨찾기
            </Button>
          )}
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
          <SelectLibraryModal
            book={this.props.currentBook}
            calledFromBookDetail={true}
          />
          <Popup
            size="small"
            position="top center"
            trigger={LikeButton}
            content="책을 즐겨찾기 할 경우, 새로운 리뷰가 남겨질 때 알람을 받아볼 수 있습니다!"
          />
        </div>
        <div className="tab">
          <BookTabs
            contents={contents}
            author_contents={author_contents}
            shortReviews={shortReviews}
            longReviews={longReviews}
            phrases={phrases}
            logged_in_user={logged_in_user}
            likeHandler={this.likeHandler}
            deleteHandler={this.deleteHandler}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    logged_in_user: state.user.logged_in_user,
    currentBook: state.book.currentBook,
    shortReviews: state.article.shortReviews,
    longReviews: state.article.longReviews,
    phrases: state.article.phrases,
    currentArticle: state.article.selectedArticle,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadBook: isbn => dispatch(actionCreators.getCurrentBook(isbn)),
    onLoadArticles: isbn => dispatch(actionCreators.getArticlesByBookId(isbn)),
    onPostLikeArticle: article_id =>
      dispatch(actionCreators.postArticleLike(article_id)),
    onDeleteLikeArticle: article_id =>
      dispatch(actionCreators.deleteArticleLike(article_id)),
    onLikeBook: isbn => dispatch(actionCreators.postBookLike(isbn)),
    onUnlikeBook: isbn => dispatch(actionCreators.deleteBookLike(isbn)),
    onDeleteArticle: (article_id, type) =>
      dispatch(actionCreators.deleteSpecificArticle(article_id, type)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(BookDetail));
