import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';

import * as actionCreators from '../store/actions/actionCreators';

import './BookInfo.css';

class BookInfo extends Component{
  constructor(props) {
    super(props);
    this.props.onLoadBook(this.props.match.params.book_id);
  }

  render(){
    console.log('[DEBUG] match: ' + this.props.match);
    
    const titleStyle = {};
    const authorStyle = {};
    const publisherStyle = {};
    const publishedDateStyle = {};

    if(!this.props.currentBook){
      return (
        <div>
          LOADING...
        </div>
      );
    }

    const isbn = this.props.match.params.book_id;
    const title = this.props.currentBook.title;
    const authors = this.props.currentBook.authors.replace(/\['/, '').replace(/'\]/, '').replace(/', '/, ', ');
    const publisher = this.props.currentBook.publisher;
    const publishedDate = this.props.currentBook.datetime;
    const thumbnail = this.props.currentBook.thumbnail;
    
    console.log("[DEBUG] isbn: " + isbn);
    console.log("[DEBUG] title: " + title);
    console.log("[DEBUG] author: " + authors);
    console.log("[DEBUG] publisher: " + publisher);
    console.log("[DEBUG] publishedDate: " + publishedDate);

    return (
      <div className='containerStyle'>
        <div style={{textAlign: 'left'}}>
          <Image 
            src={thumbnail}
            className='imageStyle'
          />
        </div>

        <div style={{textAlign: 'right'}}>
          <div className='infoStyle'>
          <div>
          <p>isbn: {isbn}</p>
          <p>title: {title}</p>
          <p>author(s): {authors}</p>
          <p>publisher: {publisher}</p>
          <p>publishedDate: {publishedDate}</p>
        </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentBook: state.book.selectedBook,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadBook: (isbn) => 
      dispatch(actionCreators.getSpecificBook(isbn)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BookInfo));