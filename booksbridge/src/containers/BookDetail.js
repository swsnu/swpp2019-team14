import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './containers.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Header from '../components/Header';
import BookInfo from '../components/BookInfo';
import BookTabs from '../components/BookTabs';

class BookDetail extends Component {

  componentDidMount() {
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    return nextState;
  }

  render() {
    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
    }

    const tabStyle = {
      textAlign: 'center',
      left: '40%',
      right: '40%',
      position: 'absolute',
      height: 'auto',
      width: '500px',
      padding: '20px',
    }

    //북디테일에서 리뷰버튼을 누르면 CreateReview로 가도록, 즉 /review/create로 가도록 해라

    return (
      <div >
        <Header />
        <h1>Book Detail</h1>
        <div style={containerStyle}>
          <BookInfo />
        </div>
        <div style={tabStyle}>
          <BookTabs /> 
        </div>
      </div>
    );
  } 
}

const mapStateToProps = state => {
  return {
  };
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookDetail));