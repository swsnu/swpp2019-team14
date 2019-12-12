import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Feed, Icon, Popup, Confirm } from 'semantic-ui-react';
import Spinner from 'react-bootstrap/Spinner';

import Header from '../../components/Header';
import Comments from '../Comments/Comments';
import ProfileSummary from '../../components/ProfileSummary/ProfileSummary';
import Time from '../../components/Time';
import * as actionCreators from '../../store/actions/actionCreators';

import './PostDetailPage.css';

class PostDetailPage extends Component {
  constructor(params) {
    super(params);
    this.state = { delete_confirm: false };
    this.props.onLoadPost(this.props.match.params.post_id);
  }

  onClickLikePostButton = (like_or_not, id) => {
    if (like_or_not) {
      this.props.onDeleteLikePost(id);
    } else {
      this.props.onPostLikePost(id);
    }
  };

  render() {
    if (!this.props.currentPost) {
      return <Spinner animation="border" className="Spinner" />;
    }

    const like_or_not = this.props.currentPost.like_or_not;

    const LikeButton = like_or_not ? (
      <div
        onClick={() =>
          this.onClickLikePostButton(like_or_not, this.props.currentPost.id)
        }
      >
        <Icon color="red" name="like" />
        {this.props.currentPost.like_count}
      </div>
    ) : (
      <div
        onClick={() =>
          this.onClickLikePostButton(like_or_not, this.props.currentPost.id)
        }
      >
        <Icon name="like" />
        {this.props.currentPost.like_count}
      </div>
    );

    return (
      <div className="PostDetailPage">
        <Confirm
          className="DeletePostConfirm"
          size={'small'}
          cancelButton="취소"
          confirmButton="삭제"
          content="정말로 포스트를 삭제하시겠습니까? 삭제한 포스트는 되돌릴 수 없습니다."
          open={this.state.delete_confirm}
          onCancel={() => this.setState({ delete_confirm: false })}
          onConfirm={() => {
            this.props.onDeletePost(this.props.currentPost.id);
            this.props.history.push('/post');
          }}
        />
        <Header />

        <div className="PostDetail">
          <div className="PostTitleStyle">
            <p className="PostDetailTitle">{this.props.currentPost.title}</p>
          </div>
          <div className="AuthorDateInfo">
            <div className="AuthorProfile">
              <ProfileSummary user={this.props.currentPost.author} />
            </div>
            <div className="PostDateInfo">
              <Time date={this.props.currentPost.date} />
            </div>
          </div>
          <div className="PostContainer">
            {this.props.currentPost.content}
            <div className="LikeButton">{LikeButton}</div>
            <div className="PostDetailEditDeleteButton">
              {this.props.currentPost.author.username ===
              this.props.logged_in_user.username ? (
                <div className="PostDeleteButton">
                  <Popup
                    content="수정"
                    position={'top center'}
                    trigger={
                      <a
                        className="PostEditIcon"
                        href={'/post/edit/' + this.props.currentPost.id}
                      >
                        <Icon name="pencil" />
                      </a>
                    }
                  />
                  <Popup
                    content="삭제"
                    position={'top center'}
                    trigger={
                      <Icon
                        name="delete"
                        onClick={() => this.setState({ delete_confirm: true })}
                      />
                    }
                  />
                </div>
              ) : null}
            </div>
            <div className="PostComments">
              <Comments
                comments={this.props.currentPost.comments}
                post_id={this.props.match.params.post_id}
                is_article={false}
                is_post={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentPost: state.post.selectedPost,
    logged_in_user: state.user.logged_in_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadPost: id => dispatch(actionCreators.getSpecificPost(id)),
    onPostLikePost: post_id => dispatch(actionCreators.postPostLike(post_id)),
    onDeleteLikePost: post_id =>
      dispatch(actionCreators.deletePostLike(post_id)),
    onDeletePost: post_id =>
      dispatch(actionCreators.deleteSpecificPost(post_id, null)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PostDetailPage));
