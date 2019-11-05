import { withRouter } from 'react-router-dom';
import React from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react';

import './Comments.css';

const Comments = props => {
  return (
    <div>
      <Comment.Group>
        <Header as="h3" dividing>
          Comments
        </Header>
        <Form reply>
          <Form.TextArea />
          <div className="ReplyButton">
            <Button
              className="ReplyButton"
              content="Add Reply"
              labelPosition="right"
              icon="edit"
              secondary
            />
          </div>
        </Form>
      </Comment.Group>
    </div>
  );
};

export default withRouter(Comments);
