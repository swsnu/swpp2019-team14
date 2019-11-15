import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Tab } from 'semantic-ui-react';

import Article from '../Article';

class UserReviewList extends Component {
  componentDidMount() {}

  render() {
    if (!this.props.user_reviews) return null;

    const reviews = this.props.user_reviews.map(review => {
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

    //const shortReviewList = reviews.filter(review => review.props.is_short);
    //const longReviewList = reviews.filter(review => review.props.is_long);
    //const phraseList = reviews.filter(review => review.is_phrase);

    // need to pass in reverse order
    const panes = [
      {
        menuItem: 'Short Review',
        render: () => (
          <Tab.Pane>{reviews.filter(review => review.props.is_short)}</Tab.Pane>
        ),
      },
      {
        menuItem: 'Long Review',
        render: () => (
          <Tab.Pane>{reviews.filter(review => review.props.is_long)}</Tab.Pane>
        ),
      },
      {
        menuItem: 'Phrase',
        render: () => (
          <Tab.Pane>{reviews.filter(review => review.is_phrase)}</Tab.Pane>
        ),
      },
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
