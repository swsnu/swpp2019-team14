import React from 'react';
import './BookTabsReview.css';
import Alert from 'react-bootstrap/Alert';
import Time from '../Time';
import ProfileSummary from '../ProfileSummary/ProfileSummary';
import { Button, Feed, Icon } from 'semantic-ui-react';

const BookTabsReview = props => {
  const Author = <ProfileSummary user={props.author} />;
  return (
    <div className="Review">
      <Alert variant="light" className="article">
        <div>
          <div>
            <div className="AuthorProfileMain">
              <div>{Author}</div>
              <div className="summary">
                <Time date={props.date} />
              </div>
            </div>
            <div className="content">
              <div className="box">
                {props.is_long ? (
                  <a href={'/review/' + props.id}>
                    <h3 className="ReviewTitle">{props.title}</h3>
                  </a>
                ) : null}
                <div>
                  <span>{props.book_title}</span>
                </div>
                <div className="ReviewContent">{props.content}</div>
              </div>
              {props.is_long ? null : (
                <div className="ReviewLikeButton">
                  <Feed.Meta>
                    <Feed.Like>
                      <Icon name="like" />4 Likes
                    </Feed.Like>
                  </Feed.Meta>
                </div>
              )}
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default BookTabsReview;
