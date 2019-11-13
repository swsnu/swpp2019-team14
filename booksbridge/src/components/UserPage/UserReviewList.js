import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Tab } from 'semantic-ui-react';

import Article from '../Article';

class UserReviewList extends Component {
  componentDidMount() {}

  render() {
    if (!this.props.user_reviews) return null;

    console.log('[DEBUG]' + this.props.user_reviews);

    const shortReviewList = this.props.user_reviews
      .filter(review => review.is_short)
      .map(review => {
        return (
          <Article
            author={review.author}
            book_isbn={review.book_isbn}
            book_title={review.book_title}
            book_thumbnail={review.book_thumbnail}
            id={review.id}
            title={review.title}
            content={review.content}
            date={review.date}
            is_long={review.is_long}
            is_short={review.is_short}
            is_phrase={review.is_phrase}
          />
        );
      });
    const longReviewList = this.props.user_reviews
      .filter(review => review.is_long)
      .map(review => {
        return (
          <Article
            author={review.author}
            book_isbn={review.book_isbn}
            book_title={review.book_title}
            book_thumbnail={review.book_thumbnail}
            id={review.id}
            title={review.title}
            content={review.content}
            date={review.date}
            is_long={review.is_long}
            is_short={review.is_short}
            is_phrase={review.is_phrase}
          />
        );
      });
    const phraseList = this.props.user_reviews
      .filter(review => review.is_phrase)
      .map(review => {
        return (
          <Article
            author={review.author}
            book_isbn={review.book_isbn}
            book_title={review.book_title}
            book_thumbnail={review.book_thumbnail}
            id={review.id}
            title={review.title}
            content={review.content}
            date={review.date}
            is_long={review.is_long}
            is_short={review.is_short}
            is_phrase={review.is_phrase}
          />
        );
      });

    /*
        this.props.user_reviews.forEach(review => {
          console.log('[DEBUG] in forEach');
          const article = (
            <Article
              author={review.author}
              book_isbn={review.book_isbn}
              book_title={review.book_title}
              book_thumbnail={review.book_thumbnail}
              id={review.id}
              title={review.title}
              content={review.content}
              date={review.date}
              is_long={review.is_long}
              is_short={review.is_short}
              is_phrase={review.is_phrase}
            />
          );
    
          if (review.is_short) {
            console.log('[DEBUG] review is short');
            shortReviewList.concat(article);
            console.log(shortReviewList);
          } else if (review.is_long) {
            console.log('[DEBUG] review is long');
            longReviewList.concat(article);
            console.log(shortReviewList);
          } else phraseList.concat(article);
        });
    
        console.log('[DEBUG]' + shortReviewList);
        console.log('[DEBUG]' + longReviewList);
        console.log('[DEBUG]' + phraseList);
    */
    /*
    const shortReviewList = this.props.user_reviews.reduce(function(
      accumulator,
      currentValue,
    ) {
      if (currentValue.is_short) {
        return accumulator.concat(
          <Article
            author={currentValue.author}
            book_isbn={currentValue.book_isbn}
            book_title={currentValue.book_title}
            book_thumbnail={currentValue.book_thumbnail}
            id={currentValue.id}
            title={currentValue.title}
            content={currentValue.content}
            date={currentValue.date}
            is_long={currentValue.is_long}
            is_short={currentValue.is_short}
            is_phrase={currentValue.is_phrase}
          />,
        );
      } else {
        return accumulator;
      }
    },
    []);

    const longReviewList = this.props.user_reviews.reduce(function(
      accumulator,
      currentValue,
    ) {
      if (currentValue.is_long) {
        return accumulator.concat(
          <Article
            author={currentValue.author}
            book_isbn={currentValue.book_isbn}
            book_title={currentValue.book_title}
            book_thumbnail={currentValue.book_thumbnail}
            id={currentValue.id}
            title={currentValue.title}
            content={currentValue.content}
            date={currentValue.date}
            is_long={currentValue.is_long}
            is_short={currentValue.is_short}
            is_phrase={currentValue.is_phrase}
          />,
        );
      } else {
        return accumulator;
      }
    },
    []);

    const phraseList = this.props.user_reviews.reduce(function(
      accumulator,
      currentValue,
    ) {
      if (currentValue.is_phrase) {
        return accumulator.concat(
          <Article
            author={currentValue.author}
            book_isbn={currentValue.book_isbn}
            book_title={currentValue.book_title}
            book_thumbnail={currentValue.book_thumbnail}
            id={currentValue.id}
            title={currentValue.title}
            content={currentValue.content}
            date={currentValue.date}
            is_long={currentValue.is_long}
            is_short={currentValue.is_short}
            is_phrase={currentValue.is_phrase}
          />,
        );
      } else {
        return accumulator;
      }
    },
    []);
  */

    const panes = [
      {
        menuItem: 'Short Review',
        render: () => <Tab.Pane>{shortReviewList}</Tab.Pane>,
      },
      {
        menuItem: 'Long Review',
        render: () => <Tab.Pane>{longReviewList}</Tab.Pane>,
      },
      { menuItem: 'Phrase', render: () => <Tab.Pane>{phraseList}</Tab.Pane> },
    ];

    return (
      <div className="UserReviewTab">
        <Tab panes={panes} />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserReviewList));
