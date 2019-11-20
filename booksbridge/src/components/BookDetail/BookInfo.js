import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import Image from 'react-bootstrap/Image';
import SelectLibraryModal from './SelectLibraryModal';

import * as actionCreators from '../../store/actions/actionCreators';

import './BookInfo.css';

class BookInfo extends Component {
  constructor(props) {
    super(props);
  }

  onClickAddToLibrary = () => {
    return;
  };

  render() {
    return (
      <div className="containerStyle">
        <div className="Left">
          <Image src={this.props.thumbnail} className="imageStyle" />
        </div>
        <div className="Right">
          <div className="outerInfo">
            <div className="innerInfo">
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
            <div className="LibraryButton">
              <SelectLibraryModal isbn={this.props.isbn} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddToLibrary: isbn => dispatch(actionCreators.addBookToLibrary),
  };
};

export default connect(mapDispatchToProps)(withRouter(BookInfo));
