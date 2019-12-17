import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Button, Comment, Form, Icon } from 'semantic-ui-react';
import ReplyUnit from './ReplyUnit';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import Time from '../Time';

import './CommentUnit.css';

class CommentUnit extends Component {
  state = {
    reply: false,
    content: '',
    onEdit: false,
    editcontent: '',
  };

  //reply
  onClickPostComment = () => {
    if (this.state.content != '') {
      if (this.props.is_article) {
        const comment = {
          article_id: this.props.article_id,
          content: this.state.content,
          parent_id: this.props.id,
        };
        this.props.onPostComment(comment);
        this.setState({ reply: false, content: '' });
      } else {
        const comment = {
          curation_id: this.props.curation_id,
          content: this.state.content,
          parent_id: this.props.id,
        };
        this.props.onPostCurationComment(comment);
        this.setState({ reply: false, content: '' });
      }
    } else {
      window.alert('Content is empty.');
    }
  };

  onClickDeleteComment = id => {
    if (this.props.is_article) {
      this.props.onDeleteComment(id);
    } else {
      this.props.onDeleteCurationComment(id);
    }
  };

  onClickEditComment = () => {
    if (this.state.editcontent != '') {
      if (this.props.is_article) {
        const comment = {
          id: this.props.id,
          content: this.state.editcontent,
        };
        this.props.onEditComment(comment);
        this.setState({ onEdit: false });
      } else {
        const comment = {
          id: this.props.id,
          content: this.state.editcontent,
        };
        this.props.onEditCurationComment(comment);
        this.setState({ onEdit: false });
      }
    } else {
      window.alert('Content is empty.');
    }
  };

  render() {
    let profile_photo;
    if (this.props.author.profile_photo.startsWith('http'))
      profile_photo = this.props.author.profile_photo;
    else profile_photo = '/media/' + this.props.author.profile_photo;

    const EditDeleteButton =
      this.props.author.username === this.props.logged_in_user.username ? (
        <div className="CommentDeleteButton">
          <Icon
            name="pencil"
            id="pencil-button"
            onClick={() =>
              this.setState({
                onEdit: !this.state.onEdit,
                editcontent: this.props.content,
              })
            }
          />
          <Icon
            id="delete-button"
            name="delete"
            onClick={() => this.onClickDeleteComment(this.props.id)}
          />
        </div>
      ) : null;

    let replies;
    if (this.props.replies.length) {
      replies = this.props.replies.map(reply => {
        return (
          <ReplyUnit
            key={reply.id}
            is_article={this.props.is_article}
            author={reply.author}
            date={reply.date}
            content={reply.content}
            replies={reply.replies}
            id={reply.id}
            logged_in_user={this.props.logged_in_user}
            EditCommentHandler={this.props.onEditComment}
            EditCurationCommentHandler={this.props.onEditCurationComment}
            DeleteHandler={this.onClickDeleteComment}
          />
        );
      });
    }
    const onChangeInput = e => {
      this.setState({ ...this.state, content: e.target.value });
    };
    const replyForm = (
      <Form reply>
        <Form.TextArea
          id="reply-input"
          className="ReplyTextArea"
          value={this.state.content}
          onChange={onChangeInput}
        />
        <div className="ReplyButton">
          <Button
            className="ReplyButton"
            content="답글 작성"
            labelPosition="right"
            icon="edit"
            onClick={() => this.onClickPostComment()}
            secondary
          />
        </div>
      </Form>
    );
    const editForm = (
      <Form reply>
        <Form.TextArea
          id="edit-input"
          className="ReplyTextArea"
          value={this.state.editcontent}
          onChange={e =>
            this.setState({ ...this.state, editcontent: e.target.value })
          }
        />
        <div className="ReplyButton">
          <Button
            id="edit-button"
            className="ReplyButton"
            content="댓글 수정"
            labelPosition="right"
            icon="edit"
            onClick={() => this.onClickEditComment()}
            secondary
          />
        </div>
      </Form>
    );
    return (
      <div className="CommentUnit">
        <Comment>
          <a
            id="redirect-to-userpage"
            href={'/page/' + this.props.author.username}
          >
            <Comment.Avatar as="a" src={profile_photo} />
          </a>
          <Comment.Content>
            <div className="CommentContents">
              <a
                id="redirect-to-userpage"
                href={'/page/' + this.props.author.username}
              >
                <Comment.Author as="a">
                  {this.props.author.nickname}
                </Comment.Author>
              </a>
              <Comment.Metadata>
                <span>
                  <Time date={this.props.date} />
                </span>
              </Comment.Metadata>
              <div className="CommentButton">{EditDeleteButton}</div>
              <Comment.Text>{this.props.content}</Comment.Text>
            </div>
            {this.state.onEdit == true ? editForm : null}
            <Comment.Actions>
              <a
                id="show-reply-form"
                onClick={() => {
                  this.setState({ ...this.state, reply: !this.state.reply });
                }}
              >
                Reply
              </a>
            </Comment.Actions>
          </Comment.Content>

          <Comment.Group>
            <div className="CommentReplies">{replies}</div>
          </Comment.Group>
          {this.state.reply == true ? replyForm : null}
        </Comment>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostComment: comment =>
      dispatch(actionCreators.postLongReviewComment(comment)),
    onPostCurationComment: comment =>
      dispatch(actionCreators.postCurationComment(comment)),
    onEditComment: comment =>
      dispatch(actionCreators.editSpecificLongReviewComment(comment)),
    onEditCurationComment: comment =>
      dispatch(actionCreators.editSpecificCurationComment(comment)),
    onDeleteComment: id =>
      dispatch(actionCreators.deleteSpecificLongReviewComment(id)),
    onDeleteCurationComment: id =>
      dispatch(actionCreators.deleteSpecificCurationComment(id)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(CommentUnit));
