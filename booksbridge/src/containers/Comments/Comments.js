import { withRouter } from 'react-router-dom';
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
    if (this.state.content != '') {
      this.props.onPostComment({
        article_id: this.props.article_id,
        content: this.state.content,
        parent_id: -1,
      });
      this.setState({ content: '' });
    } else {
      window.alert('Content is empty.');
    }
  };

  render() {
    const comments = this.props.comments.map(comment => {
      return (
        <CommentUnit
          author={comment.author}
          date={comment.date}
          content={comment.content}
          replies={comment.replies}
        />
      );
    });
    return (
      <div>
        <Comment.Group threaded>
          <Header className="CommentHeader" as="h3" dividing>
            Comments
          </Header>
          {comments}
          <Form reply>
            <Form.TextArea
              value={this.state.content}
              onChange={({ target: { value } }) =>
                this.setState({ content: value })
              }
            />
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Comments));
