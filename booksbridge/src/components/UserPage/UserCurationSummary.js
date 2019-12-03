import React from 'react';
import './UserCurationSummary.css';

const UserCurationSummary = props => {
  return (
    <div className="UserCurationSummary">
      <div className="CurationSummary">
        <a href={'/curation/' + props.id}>
          <h3 className="CurationTitle">{props.title}</h3>
        </a>
        <a href={'/book/' + props.book_isbn}>
          <p className="BookTitle">{props.book_title}</p>
        </a>
        <p className="CurationContent">{props.content}</p>
      </div>
    </div>
  );
};

export default UserCurationSummary;
