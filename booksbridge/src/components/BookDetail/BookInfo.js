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

  onClickLikeBookButton = like_or_not => {
    console.log(like_or_not);
    if (like_or_not) this.props.onUnlikeBook(this.props.isbn);
    else {
      this.props.onLikeBook(this.props.isbn);
    }
  };

  render() {
    const test = user => user.id === this.props.logged_in_user.id;
    const like_or_not = this.props.like_users.some(test);
    console.log(like_or_not);
    const LikeButton = (
      <div onClick={() => this.onClickLikeBookButton(like_or_not)}>
        {like_or_not ? (
          <Icon name="heart" color="red" />
        ) : (
          <Icon name="heart outline" />
        )}
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
  return {
    onLikeBook: isbn => dispatch(actionCreators.postBookLike(isbn)),
    onUnlikeBook: isbn => dispatch(actionCreators.deleteBookLike(isbn)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookInfo);
