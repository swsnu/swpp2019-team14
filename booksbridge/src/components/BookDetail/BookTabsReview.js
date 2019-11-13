import React from 'react';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/actionCreators';
import './BookTabsReview.css';
import Alert from 'react-bootstrap/Alert';
import Time from '../Time';
import ProfileSummary from '../ProfileSummary/ProfileSummary';

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
          {/*props.is_long ? ( 
            <div className="ui comments">
              <h3 className="ui dividing header">Comments</h3>
            </div>
          ) : null*/}
        </div>
      </Alert>
    </div>
  );
};

export default withRouter(BookTabsReview);
