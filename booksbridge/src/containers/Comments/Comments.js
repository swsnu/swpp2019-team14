import { withRouter } from 'react-router-dom';
import React from 'react';

import './Comments.css';

import Comment from '../../components/Comment/Comment';

const Comments = (props) => (
  <div className="ui comments">
    <h3 className="ui dividing header">Comments</h3>
    <Comment />
    <form className="ui reply form">
      <div className="field">
        <textarea />
      </div>
      <div className="ReplyButton">
        <div className="ui black labeled submit icon button">
          <i className="icon edit" />
          {' '}
Add Reply
        </div>
      </div>
    </form>
  </div>
);

export default withRouter(Comments);
