import React from 'react';

import './BookDetailInfo.css';

const BookDetailInfo = props => (
  <div className="BookDetailInfo">
    <div className="BookSummary">
      <p className="Label">About Book</p>
      {props.contents}
    </div>
    <div className="AuthorInfo">
      <p className="Label">About Author(s)</p>
      {props.author_contents}
    </div>
  </div>
);

export default BookDetailInfo;
