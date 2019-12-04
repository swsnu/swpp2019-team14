import React from 'react';
import './UserReviewSummary.css';
import { Label } from 'semantic-ui-react';

const UserReviewSummary = props => {
  return (
    <div className="UserReviewSummary">
      <div className="ReviewSummary">
        {props.is_short === true ? (
          <Label size="mini">Short Review</Label>
        ) : null}
        {props.is_phrase === true ? <Label size="mini">Phrase</Label> : null}
        <a href={'/review/' + props.id}>
          <h3 className="ReviewTitle">{props.title}</h3>
        </a>
        <a href={'/book/' + props.book_isbn}>
          <p className="BookTitle">{props.book_title}</p>
        </a>
        {props.is_long === true ? (
          <p className="ReviewContent">{props.content}</p>
        ) : (
          <p className="ShortContent">{props.content}</p>
        )}
      </div>
    </div>
  );
};

export default UserReviewSummary;
