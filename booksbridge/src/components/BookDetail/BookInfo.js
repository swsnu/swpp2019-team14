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
    const LikeButton = (
      <div>
        <Icon name="like" />
        {this.props.like_users.length} 즐겨찾기
      </div>
    );

    return (
      <div className="containerStyle">
        <div style={{ textAlign: 'left' }}>
          <Image src={this.props.thumbnail} className="imageStyle" />
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
            <div className="BookLikeSection">
              <div className="BookLikeButton">
                <Popup
                  content="책을 '즐겨찾기'할 경우, 이 책에 새로 남겨진 리뷰를 피드에서 확인할 수 있습니다."
                  position="top center"
                  trigger={LikeButton}
                />
              </div>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookInfo);
