import React, { Component } from 'react';
import BookTabsReview from './BookTabsReview';
import { Pagination } from 'semantic-ui-react';

import './BookTabsReviewList.css';

class BookTabsReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_long: false,
      is_short: false,
      is_phrase: false,
      activePage: 1,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.is_long !== prevState.is_long) {
      return {
        is_long: true,
        is_short: false,
        is_phrase: false,
        activePage: 1,
      };
    } else if (nextProps.is_short !== prevState.is_short) {
      return {
        is_long: false,
        is_short: true,
        is_phrase: false,
        activePage: 1,
      };
    } else if (nextProps.is_phrase !== prevState.is_phrase) {
      return {
        is_long: false,
        is_short: false,
        is_phrase: true,
        activePage: 1,
      };
    }
    return null;
  }
  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage });
  };
  render() {
    if (this.props.reviews.length == 0) {
      return <div>작성된 리뷰가 없습니다.</div>;
    }

    const length = this.props.reviews.length;
    let final = 1;
    if (this.props.is_long)
      final = length % 5 === 0 ? length / 5 : parseInt(length / 5) + 1;
    else final = length % 10 === 0 ? length / 10 : parseInt(length / 10) + 1;

    let slicedReviews = [];
    if (this.props.is_long) {
      slicedReviews = this.props.reviews.slice(
        (this.state.activePage - 1) * 5,
        this.state.activePage * 5,
      );
    } else {
      slicedReviews = this.props.reviews.slice(
        (this.state.activePage - 1) * 10,
        this.state.activePage * 10,
      );
    }

    const reviews = slicedReviews.map((review, index) => {
      return (
        <div className="BookTabsReviewWrapper" key={index}>
          <BookTabsReview
            author={review.author}
            title={review.title}
            book={review.book}
            content={review.content}
            date={review.date}
            is_long={review.is_long}
            is_short={review.is_short}
            is_phrase={review.is_phrase}
            id={review.id}
            like_count={review.like_count}
            like_or_not={review.like_or_not}
            likeHandler={this.props.likeHandler}
            deleteHandler={this.props.deleteHandler}
            logged_in_user={this.props.logged_in_user}
          />
        </div>
      );
    });

    return (
      <div id="book-tabs-review-list">
        {reviews}
        <Pagination
          defaultActivePage={1}
          activePage={this.state.activePage}
          onPageChange={this.handlePaginationChange}
          firstItem={null}
          lastItem={null}
          pointing
          secondary
          totalPages={final}
        />
      </div>
    );
  }
}

export default BookTabsReviewList;
