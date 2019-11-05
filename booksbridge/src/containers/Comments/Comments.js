import { withRouter } from 'react-router-dom';
import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

import './Comments.css';

import CommentUnit from "../../components/CommentUnit/CommentUnit"

const Comments = props => {
  return (
    <div>
      <Comment.Group>
        <Header as='h3' dividing>
          Comments
        </Header>
        <Form reply>
          <Form.TextArea />
          <Button content='Add Reply' labelPosition='left' icon='edit' primary />
        </Form>
      </Comment.Group>
    </div>
  );
};

export default withRouter(Comments);
