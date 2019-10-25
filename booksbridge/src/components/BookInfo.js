import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';


import * as actionCreators from '../store/actions/actionCreators';

//import './BookInfo.css';

class BookInfo extends Component{
  constructor(props) {
    super(props);
    this.props.onLoadBook(this.props.match.params.book_id);
  }

  render(){
    console.log('[DEBUG] match: ' + this.props.match);

    const containerStyle = {
      height: '500px',
      width: '800px',
      border: '1px solid gray',
    };

    const imageStyle = {
      height: '500px',
      width: 'auto',
      textAlign: 'left',
      padding: '20px',
    };

    const infoStyle = {
      height: '500px',
      width: '400px',
      textAlign: 'right',
      padding: '20px',
    };
    
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
    const author = this.props.currentBook.author;
    const publisher = this.props.currentBook.publisher;
    const publishedDate = this.props.currentBook.datetime;
    const thumbnail = this.props.currentBook.thumbnail;
    

    return (
      <div style={containerStyle}>
        <div className="image" style={{textAlign: 'left'}}>
          <Image 
            src={thumbnail}
            style={imageStyle}
          />
        </div>
        <div className="info" style={{textAlign: 'right'}}>
          <div style={infoStyle}>
            
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