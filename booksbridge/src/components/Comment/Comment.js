import { withRouter } from 'react-router-dom';
import React from 'react';

const Comment = (props) => (
  <div className="comment">
    <a className="avatar">
      <img src="/images/avatar/small/stevie.jpg" />
    </a>
    <div className="content">
      <a className="author">Stevie Feliciano</a>
      <div className="metadata">
        <div className="date">2 days ago</div>
      </div>
      <div className="text">
          Hey guys, I hope this example comment is helping you read this
          documentation.
      </div>
    </div>
  </div>
);

export default withRouter(Comment);
