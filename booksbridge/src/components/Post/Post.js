import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Icon } from 'semantic-ui-react';
import './Post.css';
import Time from '../Time';
import ProfileSummary from '../ProfileSummary/ProfileSummary';
import Comments from '../../containers/Comments/Comments';
import * as actionCreators from '../../store/actions/index';

class Post extends Component {
  state = {
    show: false,
    content: '',
  };

  render() {
    const Author = <ProfileSummary user={this.props.author} />;

    const comments = !this.state.show ? (
      <Button
        id="see-more"
        onClick={() => this.setState({ ...this.state, show: true })}
      >
        댓글 보기
      </Button>
    ) : (
      <div id="post-comments">
        <div class="fold-comments">
          <Button
            id="fold-comments"
            onClick={() => this.setState({ ...this.state, show: false })}
          >
            댓글 접기
          </Button>
        </div>
        <Comments
          comments={this.props.comments}
          post_id={this.props.id}
          is_article={false}
          is_post={true}
          createCommentHandler={this.props.createCommentHandler}
        />
      </div>
    );
    return (
      <Card id="individul-post">
        <div className="card-post">
          <div className="post-author-time">
            <div className="post-author">{Author}</div>
            <div className="post-time">
              <Time date={this.props.date} />
            </div>
          </div>
          <div className="post-content">{this.props.content}</div>
          <div className="post-like">
            {this.props.like_or_not ? (
              <div
                className="post-like-button"
                onClick={this.props.clickUnlike}
              >
                <Icon name="like" color="red" />
                {this.props.like_count}
              </div>
            ) : (
              <div className="post-like-button" onClick={this.props.clickLike}>
                <Icon name="like" />
                {this.props.like_count}
              </div>
            )}
          </div>
          <div className="post-comments">{comments}</div>
        </div>
      </Card>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onDeletePost: (page, id) => dispatch(actionCreators.deletePost(page, id)),
    onEditPost: (page, id, content) =>
      dispatch(actionCreators.editPost(page, id, content)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(Post);
