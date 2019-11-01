import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Button } from "semantic-ui-react";

import Header from "../../components/Header";
import BookInfo from "../../components/BookInfo";

import * as actionCreators from "../../store/actions/actionCreators";

import "./ReviewDetailPage.css";

class ReviewDetailPage extends Component {
  componentDidMount() {
    this.props.onLoadArticle(this.props.match.params.review_id);
  }

  onCreateReview = () => {
    this.props.history.push("/review/create");
  };

  render() {
    if (!this.props.currentArticle) {
      return <div>LOADING...</div>;
    }

    const book = this.props.currentArticle.book;

    return (
      <div>
        <Header />
        <div className='ReviewTitleStyle'>
            <h1>{this.props.currentArticle.title}</h1>
        </div>
        <div className="infoStyle">
          <BookInfo
            isbn={book.isbn}
            title={book.title}
            authors={book.authors}
            publisher={book.publisher}
            publishedDate={book.publishedDate}
            thumbnail={book.thumbnail}
          />
        </div>
        <div>
          <Button onClick={() => this.props.history.push("/book/" + book.isbn)}>
            Check this book!
          </Button>
        </div>
        <div className="ReviewContainer">
        {this.props.currentArticle.content}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentArticle: state.article.selectedArticle,
    currentBook: state.article.selectedBook
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadArticle: id => dispatch(actionCreators.getSpecificArticle(id)),
    onLoadBook: isbn => dispatch(actionCreators.getSpecificBook(isbn))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ReviewDetailPage));
