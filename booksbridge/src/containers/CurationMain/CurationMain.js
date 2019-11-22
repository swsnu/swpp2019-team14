import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../components/Header';
import * as actionCreators from '../../store/actions/index';
import Spinner from 'react-bootstrap/Spinner';
import CurationSummary from '../../components/CurationSummary/CurationSummary';

class CurationMain extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      page: 1,
      curations: [],
      hasNext: true,
    };
    this.fetchMoreData();
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 10 more records in 0.7 secs
    this.props.onGetCurations(this.state.page);
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    delay(500)
      .then(() =>
        this.setState({
          page: this.state.page + 1,
          curations: this.state.curations.concat(this.props.loadCurations),
          hasNext: this.props.hasNext,
        }),
      )
      .catch();
  };

  render() {
    return (
      <div className="main">
        <Header />
        <div className="articles">
          <a href="/curation/create">
            <img
              id="createReviewLogo"
              className="createReviewLogo"
              src="/images/reviewcreate.jpg"
              width="600"
            />
          </a>
          <InfiniteScroll
            className="scroll"
            dataLength={this.state.curations.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasNext}
            loader={<Spinner animation="border" />}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {this.state.curations.map(curation => (
              <div>
                <CurationSummary
                  books={curation.books}
                  author={curation.author}
                  title={curation.title}
                  content={curation.content}
                  date={curation.date}
                />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadCurations: state.curation.curations,
    hasNext: state.curation.hasNext,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetCurations: page => dispatch(actionCreators.getCurations(page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurationMain);
