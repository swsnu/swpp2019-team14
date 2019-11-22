import React, { Component } from 'react';

import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';

import * as actionCreators from '../../store/actions/actionCreators';

import './BookInfo.css';

class BookInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="containerStyle">
        <div style={{ textAlign: 'left' }}>
          <Image src={this.props.thumbnail} className="imageStyle" />
        </div>

        <div style={{ textAlign: 'right' }}>
          <div className="BookInfoStyle">
            <div className="info">
              <p className="titleStyle">{this.props.title}</p>
              <p>
                <b>AUTHOR(S) : </b>
                {this.props.authors}
              </p>
              <p>
                <b>PUBLISHER : </b>
                {this.props.publisher}
              </p>
              <p>
                <b>PUBLISHED DATE : </b>
                {this.props.publishedDate}
              </p>
              <p>
                <b>ISBN : </b>
                {this.props.isbn}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BookInfo;
