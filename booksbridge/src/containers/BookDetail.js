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
    }

    return (
      <div className='main'>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);