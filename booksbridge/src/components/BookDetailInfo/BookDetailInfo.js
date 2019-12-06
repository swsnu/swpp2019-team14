import React from 'react';

import './BookDetailInfo.css';

const BookDetailInfo = props => (
  <div className="BookDetailInfo">
    <div className="BookSummary">
      <p className="Label">About Book</p>
      {props.contents.trim() === ''
        ? '이 책에 대해 제공되는 정보가 없습니다.'
        : props.contents}
    </div>
    <div className="AuthorInfo">
      <p className="Label">About Author(s)</p>
      {props.author_contents.trim() === ''
        ? '저자에 대해 제공되는 정보가 없습니다.'
        : props.author_contents}
    </div>
  </div>
);

export default BookDetailInfo;
