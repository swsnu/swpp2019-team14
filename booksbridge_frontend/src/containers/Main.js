import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './containers.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

import Header from '../components/Header'

class Main extends Component {

  componentDidMount() {
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    return nextState;
  }

  render() {
    return (
      <div className='main'>
          <Header/>
        <h1></h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main);