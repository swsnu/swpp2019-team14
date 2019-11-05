import { withRouter } from "react-router-dom";
import React from "react";
import { Button, Comment, Form, Header } from 'semantic-ui-react';

const CommentUnit = props => {
  return (
    <div>
      <Comment>
        <img className="profilePic" src={props.user.profile_photo}></img>
        <Comment.Content>
          <Comment.Author as='a'>{props.user.nickname}</Comment.Author>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
          <Comment.Text>How artistic!</Comment.Text>
          <Comment.Actions>
            <Comment.Action>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
      </Comment>
    </div>
  );
};

export default withRouter(CommentUnit);
