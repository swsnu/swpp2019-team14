import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import CommentUnit from '../../components/CommentUnit/CommentUnit';

import './Comments.css';

class Comments extends Component {
  state = {
    content: '',
  };
  onClickPostComment = () => {
    if (this.state.content !== '') {
      if (this.state.content.trim() === '') {
        window.alert('공백 문자로만 이루어진 내용은 허용되지 않습니다.');
      } else if (this.state.content.trim().length > 1500) {
        window.alert('댓글은 1500글자 이내여야 합니다.');
      } else {
        if (this.props.is_article) {
          this.props.onPostComment({
            article_id: this.props.article_id,
            content: this.state.content.trim(),
            parent_id: -1,
          });
        } else {
          this.props.onPostCurationComment({
            curation_id: this.props.curation_id,
            content: this.state.content.trim(),
            parent_id: -1,
          });
        }
        this.setState({ content: '' });
      }
    } else {
      window.alert('내용을 반드시 입력하셔야 합니다.');
    }
  };

  render() {
    if (this.props.comments === null) return null;

    const comments =
      this.props.comments.length === 0
        ? '아직 댓글이 없습니다'
        : this.props.comments.map(comment => {
            return (
              <CommentUnit
                key={comment.id}
                id={comment.id}
                article_id={this.props.article_id}
                curation_id={this.props.curation_id}
                author={comment.author}
                date={comment.date}
                content={comment.content}
                replies={comment.replies}
                is_article={this.props.is_article}
                logged_in_user={this.props.logged_in_user}
              />
            );
          });

    return (
      <div className="Comments">
        <Comment.Group threaded>
          <Header className="CommentHeader" as="h3" dividing>
            Comments
          </Header>
          {comments}
          <Form reply>
            <Form.TextArea
              id="comment-input"
              value={this.state.content}
              onChange={({ target: { value } }) =>
                this.setState({ content: value })
              }
            />
            <div className="ReplyButton">
              <Button
                className="ReplyButton"
                content="댓글 작성"
                labelPosition="right"
                icon="edit"
                onClick={() => this.onClickPostComment()}
                secondary
              />
            </div>
          </Form>
        </Comment.Group>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onPostComment: comment =>
      dispatch(actionCreators.postLongReviewComment(comment)),
    onPostCurationComment: comment =>
      dispatch(actionCreators.postCurationComment(comment)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comments);
