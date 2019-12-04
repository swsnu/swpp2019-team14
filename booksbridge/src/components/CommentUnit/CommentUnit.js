import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import ReplyUnit from './ReplyUnit';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import Time from '../Time';

import './CommentUnit.css';

class CommentUnit extends Component {
  state = {
    reply: false,
    content: '',
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

  render() {
    let profile_photo;
    if (this.props.author.profile_photo.startsWith('resources/image/profile')) {
      profile_photo = '/static/' + this.props.author.profile_photo.substr(24);
    } else {
      profile_photo = this.props.author.profile_photo;
    }

    let replies;
    if (this.props.replies.length) {
      replies = this.props.replies.map(reply => {
        return (
          <ReplyUnit
            key={reply.id}
            author={reply.author}
            date={reply.date}
            content={reply.content}
            replies={reply.replies}
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
    return (
      <div className="CommentUnit">
        <Comment>
          <Comment.Avatar as="a" src={profile_photo} />
          <Comment.Content>
            <Comment.Author as="a">{this.props.author.nickname}</Comment.Author>
            <Comment.Metadata>
              <span>
                <Time date={this.props.date} />
              </span>
            </Comment.Metadata>
            <Comment.Text>{this.props.content}</Comment.Text>
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
          <Comment.Group>{replies}</Comment.Group>
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
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(CommentUnit));
