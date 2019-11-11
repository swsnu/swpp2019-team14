import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class UserReviewList extends Component {
  componentDidMount() {}

  render() {
    return <div>Hello from UserReviewList</div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(UserReviewList));
