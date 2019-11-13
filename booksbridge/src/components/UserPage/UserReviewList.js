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
