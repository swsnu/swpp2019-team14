import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

import './BookInfo.css';

class BookInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="BookInfoContainer">
        <div style={{ textAlign: 'left' }}>
          {this.props.thumbnail === '' ? (
            /* Need to confirm no_cover.jpg is currently on the remote */
            <Image src="/images/no_cover.jpg" className="imageStyle" />
          ) : (
            <Image src={this.props.thumbnail} className="imageStyle" />
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          {/* Need to confirm BookInfoStyle is currently on the remote */}
          <div className="BookInfoStyle">
            <div className="BookInfoText">
              <div className="BookTitleStyle">{this.props.title}</div>
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

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookInfo);
