import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import ReplyUnit from './ReplyUnit';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';

import './CommentUnit.css';

class CommentUnit extends Component {
  state = {
    reply: false,
    content: '',
  };

  //reply
  onClickPostComment = () => {
    if (this.state.content != '') {
      const comment = {
        article_id: this.props.article_id,
        content: this.state.content,
        parent_id: this.props.comment_id,
      };
      console.log(comment);
      this.props.onPostComment(comment);
      this.setState({ content: '' });
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
    const timeDiff = () => {
      const pTime = this.props.date;
      if (pTime[0]) return pTime[0] + ' years ago';
      else if (pTime[1]) return pTime[1] + ' months ago';
      else if (pTime[2]) return pTime[2] + ' days ago';
      else if (pTime[3]) return pTime[3] + ' hours ago';
      else if (pTime[4]) return pTime[4] + ' minutes ago';
      else return '방금 전';
    };
    const replyForm = (
      <Form reply>
        <Form.TextArea value={this.state.content} onChange={onChangeInput} />
        <div className="ReplyButton">
          <Button
            className="ReplyButton"
            content="Add Reply"
            labelPosition="right"
            icon="edit"
            onClick={() => this.onClickPostComment()}
            secondary
          />
        </div>
      </Form>
    );
    return (
      <Comment>
        <Comment.Avatar as="a" src={profile_photo} />
        <Comment.Content>
          <Comment.Author as="a">{this.props.author.nickname}</Comment.Author>
          <Comment.Metadata>
            <span>{timeDiff()}</span>
          </Comment.Metadata>
          <Comment.Text>{this.props.content}</Comment.Text>
          <Comment.Actions>
            <a
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
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostComment: comment =>
      dispatch(actionCreators.postLongReviewComment(comment)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(CommentUnit));
