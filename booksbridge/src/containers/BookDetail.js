import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react';
import Form from 'react-bootstrap/Form';

import Header from '../components/Header';
import BookInfo from '../components/BookInfo';
import BookTabs from '../components/BookTabs';

import * as actionCreators from '../store/actions/actionCreators';

import './BookDetail.css';
import './containers.css';

class BookDetail extends Component {

  componentDidMount() {
  }

  onCreateReview = () => {
    this.props.history.push('/review/create');
  }

  render() {

    //북디테일에서 리뷰버튼을 누르면 CreateReview로 가도록, 즉 /review/create로 가도록 해라

    return (
      <div >
        <Header />
        <h1>Book Detail</h1>
        <div className='infoStyle'>
          <BookInfo />
        </div>
        <Button
          id='create_review_button'
          onClick={() => this.onCreateReview()}
        >Create a Review!</Button>
        <div className='tab'>
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