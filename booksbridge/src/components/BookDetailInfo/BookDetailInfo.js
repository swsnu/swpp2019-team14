import { withRouter } from 'react-router-dom';
import React from 'react';

import './BookDetailInfo.css';

const BookDetailInfo = (props) => (
  <div className="BookDetailInfo">
    <div className="BookSummary">
      <h1 className="Label">About Book</h1>
      {props.contents}
    </div>
    <div className="AuthorInfo">
      <h1 className="Label">About Author(s)</h1>
      {props.author_contents}
    </div>
  </div>
);

export default withRouter(BookDetailInfo);
