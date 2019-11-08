import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/actionCreators';
import CommentUnit from '../../components/CommentUnit/CommentUnit';
import ReplyUnit from '../../components/CommentUnit/CommentUnit';

import './Comments.css';

const Comments = props => {
  const [content, setContent] = useState('');

  const onClickPostComment = () => {
    if (content != '') {
      props.onPostComment({
        article_id: props.article_id,
        content: content,
        parent_id: -1,
      });
      setContent('');
    } else {
      window.alert('Content is empty.');
    }
  };

  const comments = props.comments.map(comment => {
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
            value={content}
            onChange={({ target: { value } }) => setContent(value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                onClickPostComment();
              }
            }}
          />
          <div className="ReplyButton">
            <Button
              className="ReplyButton"
              content="Add Reply"
              labelPosition="right"
              icon="edit"
              onClick={() => onClickPostComment()}
              secondary
            />
          </div>
        </Form>
      </Comment.Group>
    </div>
  );
};

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
