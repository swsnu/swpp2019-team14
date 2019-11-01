import { withRouter } from "react-router-dom";
import React from "react";

const Comment = props => {
  return (
    <div class="comment">
      <a class="avatar">
        <img src="/images/avatar/small/stevie.jpg"></img>
      </a>
      <div class="content">
        <a class="author">Stevie Feliciano</a>
        <div class="metadata">
          <div class="date">2 days ago</div>
        </div>
        <div class="text">
          Hey guys, I hope this example comment is helping you read this
          documentation.
        </div>
      </div>
    </div>
  );
};

export default withRouter(Comment);
