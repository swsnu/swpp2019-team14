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
      />
    );
    const longReviewList = (
      <BookTabsReviewList
        is_short={false}
        is_long
        is_phrase={false}
        reviews={this.props.longReviews}
      />
    );
    const phraseList = (
      <BookTabsReviewList
        is_short={false}
        is_long={false}
        is_phrase
        reviews={this.props.phrases}
      />
    );

    const contents = (
      <BookDetailInfo
        contents={this.props.content}
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
