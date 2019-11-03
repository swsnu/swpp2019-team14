import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Tab } from 'semantic-ui-react';
import BookTabsReviewList from './BookTabsReviewList';
import BookDetailInfo from '../BookDetailInfo/BookDetailInfo';

import './BookTabs.css';

class BookTabs extends Component {
  componentDidMount() {

  }

  render() {

    console.log("[DEBUG] short reviews: " + this.props.shortReviews);
    console.log("[DEBUG] long reviews: " + this.props.longReviews);
    console.log("[DEBUG] phrase reviews: " + this.props.phrases);

    var shortReviewList = <BookTabsReviewList
                            is_short={true}
                            is_long={false}
                            is_phrase={false}
                            reviews={this.props.shortReviews}
                          />;
    var longReviewList = <BookTabsReviewList
                            is_short={false}
                            is_long={true}
                            is_phrase={false}
                            reviews={this.props.longReviews}
                          />;
    var phraseList = <BookTabsReviewList
                      is_short={false}
                      is_long={false}
                      is_phrase={true}
                      reviews={this.props.phrases}
                    />;

    // for debugging
    //shortReviewList = this.props.shortReviews[0];
    //console.log("[DEBUG] shortReviewList[0] == " + shortReviewList)
    const contents = <BookDetailInfo contents={this.props.contents} author_contents={this.props.author_contents}/>;

    const panes = [
      { menuItem: 'Summary', render: () => <Tab.Pane>{contents}</Tab.Pane> },
      { menuItem: 'Short Review', render: () => <Tab.Pane>{shortReviewList}</Tab.Pane> },
      { menuItem: 'Long Review', render: () => <Tab.Pane>{longReviewList}</Tab.Pane> },
      { menuItem: 'Phrase', render: () => <Tab.Pane>{phraseList}</Tab.Pane> },
    ]

    return (
      <div className='DetailTabStyle'>
        <Tab panes={panes} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookTabs));