import React from 'react';
import './UserCurationSummary.css';

const UserCurationSummary = props => {
  if (props.books.length === 0) return null;
  let books_title =
    props.books[0].book.title + ' 등 총 ' + props.books.length + '권';
  return (
    <div className="UserCurationSummary">
      <div className="CurationSummary">
        <a href={'/curation/' + props.id}>
          <h3 className="CurationTitle">{props.title}</h3>
        </a>
        <p className="BookTitle">{books_title}</p>
        <p className="CurationContent">{props.content}</p>
      </div>
    </div>
  );
};

export default UserCurationSummary;
