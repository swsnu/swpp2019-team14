import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';

import * as actionCreators from '../../store/actions/actionCreators';

import './BookInfo.css';

class BookInfo extends Component{
  constructor(props) {
    super(props);
  }

  render(){

    return (
      <div className='containerStyle'>
        <div style={{textAlign: 'left'}}>
          <Image 
            src={this.props.thumbnail}
            className='imageStyle'
          />
        </div>

        <div style={{textAlign: 'right'}}>
          <div className='infoStyle'>
          <div>
          <p className='titleStyle'>{this.props.title}</p>
          <p><b>AUTHORS : </b>{this.props.authors}</p>
          <p><b>PUBLISHER : </b>{this.props.publisher}</p>
          <p><b>PUBLISHED DATE : </b>{this.props.publishedDate}</p>
          <p><b>ISBN : </b>{this.props.isbn}</p>
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