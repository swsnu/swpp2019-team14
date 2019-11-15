import React from 'react';
import './BookTabsReview.css';
import Alert from 'react-bootstrap/Alert';
import Time from '../Time';
import ProfileSummary from '../ProfileSummary/ProfileSummary';
import { withRouter } from 'react-router';

const BookTabsReview = props => {
  const Author = <ProfileSummary user={props.author} />;
  return (
    <div className="Review">
      <Alert variant="light" className="article">
        <div className="ui feed">
          <div>
            <div className="AuthorProfileMain">
              <div>{Author}</div>
              <div className="summary">
                <Time date={props.date} />
              </div>
            </div>
            <div className="content">
              <div className="box">
                <a
                  onClick={() => {
                    props.history.push(`/review/${props.id}`);
                  }}
                >
                  <h3>{props.title}</h3>
                </a>
                <div className="ReviewTitle">
                  <span>{props.book_title}</span>
                </div>
                <div className="ReviewContent">{props.content}</div>
              </div>
              <div className="ReviewAdditionalDetail">
                {props.is_long ? (
                  <a
                    onClick={() => {
                      props.history.push(`/review/${props.id}`);
                    }}
                  >
                    Additional Details
                  </a>
                ) : null}
              </div>
              {props.is_long ? null : (
                <div className="ReviewLikeButton">
                  <div className="ui labeled button" tabIndex="0">
                    <div className="ui red button">
                      <i className="heart icon" /> Like
                    </div>
                    <a className="ui basic red left pointing label">0</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Alert>
    </div>
  );
};

export default withRouter(BookTabsReview);
