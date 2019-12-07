import React, { Component } from 'react';
import { Tab } from 'semantic-ui-react';
import BookTabsReviewList from './BookTabsReviewList';
import BookDetailInfo from '../BookDetailInfo/BookDetailInfo';

import './BookTabs.css';

class BookTabs extends Component {
  render() {
    const shortReviewList = (
      <BookTabsReviewList
        is_short
        is_long={false}
        is_phrase={false}
        reviews={this.props.shortReviews}
        likeHandler={this.props.likeHandler}
        deleteHandler={this.props.deleteHandler}
        logged_in_user={this.props.logged_in_user}
      />
    );
    const longReviewList = (
      <BookTabsReviewList
        is_short={false}
        is_long
        is_phrase={false}
        reviews={this.props.longReviews}
        likeHandler={this.props.likeHandler}
        deleteHandler={this.props.deleteHandler}
        logged_in_user={this.props.logged_in_user}
      />
    );
    const phraseList = (
      <BookTabsReviewList
        is_short={false}
        is_long={false}
        is_phrase
        reviews={this.props.phrases}
        likeHandler={this.props.likeHandler}
        deleteHandler={this.props.deleteHandler}
        logged_in_user={this.props.logged_in_user}
      />
    );

    const contents = (
      <BookDetailInfo
        contents={this.props.contents}
        author_contents={this.props.author_contents}
      />
    );

    const panes = [
      {
        menuItem: 'Summary',
        id: 'Book-tabs-menu',
        render: () => <Tab.Pane>{contents}</Tab.Pane>,
      },
      {
        menuItem: 'Long Review',
        render: () => <Tab.Pane>{longReviewList}</Tab.Pane>,
      },
      {
        menuItem: 'Short Review',
        render: () => <Tab.Pane>{shortReviewList}</Tab.Pane>,
      },
      {
        menuItem: 'Phrase',
        render: () => <Tab.Pane>{phraseList}</Tab.Pane>,
      },
    ];

    return (
      <div className="DetailTabStyle">
        <Tab panes={panes} />
      </div>
    );
  }
}

export default BookTabs;
