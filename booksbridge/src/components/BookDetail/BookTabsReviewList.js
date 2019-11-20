import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BookTabsReview from './BookTabsReview';

import './BookTabsReviewList.css';

class BookTabsReviewList extends Component {
  componentDidMount() {}

  render() {
    if (this.props.reviews.length == 0) {
      return <div>작성된 리뷰가 없습니다.</div>;
    }

    const reviews = this.props.reviews.map((review, index) => {
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
          />
        </div>
      );
    });

    return <div>{reviews}</div>;
  }
}

export default BookTabsReviewList;
