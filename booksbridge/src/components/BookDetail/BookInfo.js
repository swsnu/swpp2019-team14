import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import { Popup, Icon } from 'semantic-ui-react';

import './BookInfo.css';

class BookInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="containerStyle">
        <div style={{ textAlign: 'left' }}>
          {this.props.thumbnail === '' ? (
            <Image src="/images/no_cover.jpg" className="imageStyle" />
          ) : (
            <Image src={this.props.thumbnail} className="imageStyle" />
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="BookInfoStyle">
            <div className="BookInfoText">
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
