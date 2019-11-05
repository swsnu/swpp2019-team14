import React from 'react';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/actionCreators';
import './BookTabsReview.css';
import Alert from 'react-bootstrap/Alert';
import ProfileSummary from '../ProfileSummary/ProfileSummary';

const BookTabsReview = props => {
  const Author = <ProfileSummary user={props.author} />;
  const timeDiff = () => {
    const pTime = props.date;
    if (pTime[0]) return pTime[0] + ' years ago';
    else if (pTime[1]) return pTime[1] + ' months ago';
    else if (pTime[2]) return pTime[2] + ' days ago';
    else if (pTime[3]) return pTime[3] + ' hours ago';
    else if (pTime[4]) return pTime[4] + ' minutes ago';
    else return '방금 전';
  };
  return (
    <div className="Review">
      <Alert variant="light" className="article">
        <div className="ui feed">
          <div>
            <div className="AuthorProfileMain">
              <div>{Author}</div>
              <div className="summary">
                <div className="date">{timeDiff()}</div>
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
                    <a className="ui basic red left pointing label">1,048</a>
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
