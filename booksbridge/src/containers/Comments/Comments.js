import { withRouter } from 'react-router-dom';
import React from 'react';

import "./Comments.css";

import Comment from "../../components/Comment/Comment"

const Comments = props => {
  return (
    <div class="ui comments">
      <h3 class="ui dividing header">Comments</h3>
      <Comment />
      <form class="ui reply form">
        <div class="field">
          <textarea></textarea>
        </div>
        <div class="ReplyButton">
        <div class="ui black labeled submit icon button">
          <i class="icon edit"></i> Add Reply
        </div>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Comments);
