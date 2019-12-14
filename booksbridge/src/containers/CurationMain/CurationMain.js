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
    this.likeHandler = this.likeHandler.bind(this);
  }
  fetchMoreData = () => {
    this.fetchMore();
  };
  async fetchMore() {
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await this.props.onGetCurations(this.state.page);
    delay(500)
      .then(() =>
        this.setState({
          page: this.state.page + 1,
          curations: this.state.curations.concat(this.props.loadCurations),
          hasNext: this.props.hasNext,
        }),
      )
      .catch();
  }

  likeHandler(like_or_not, curation_id) {
    if (like_or_not) {
      this.props.onDeleteLikeCuration(curation_id);
      const deleted = this.state.curations.map(curation => {
        if (curation.id === curation_id) {
          return {
            ...curation,
            like_count: curation.like_count - 1,
            like_or_not: false,
          };
        } else {
          return { ...curation };
        }
      });
      this.setState({
        ...this.state,
        curations: deleted,
      });
    } else {
      this.props.onPostLikeCuration(curation_id);
      const added = this.state.curations.map(curation => {
        if (curation.id === curation_id) {
          return {
            ...curation,
            like_count: curation.like_count + 1,
            like_or_not: true,
          };
        } else {
          return { ...curation };
        }
      });
      this.setState({
        ...this.state,
        curations: added,
      });
    }
  }

  render() {
    return (
      <div className="main">
        <Header />
        <div className="articles">
          <a href="/curation/create">
            <img
              id="createReviewLogo"
              className="createReviewLogo"
              src="/images/create-curation-image2.jpg"
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
                  id={curation.id}
                  books={curation.books}
                  author={curation.author}
                  title={curation.title}
                  content={curation.content}
                  date={curation.date}
                  like_or_not={curation.like_or_not}
                  like_count={curation.like_count}
                  likeHandler={this.likeHandler}
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
    onPostLikeCuration: curation_id =>
      dispatch(actionCreators.postCurationLike(curation_id)),
    onDeleteLikeCuration: curation_id =>
      dispatch(actionCreators.deleteCurationLike(curation_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurationMain);
