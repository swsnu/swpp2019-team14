import React from 'react';
import { withRouter } from 'react-router';
import { UI, Feed, Button, Modal, Input, Grid, Image } from 'semantic-ui-react';
import * as actionCreators from '../store/actions/actionCreators';
import './Article.css';
import Alert from 'react-bootstrap/Alert';
import ProfileSummary from './ProfileSummary/ProfileSummary';

const Article = props => {
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
    <Alert variant="secondary" className="article">
      <div className="ui feed">
        <div>
          <div className="AuthorProfileMain">
            <div>{Author}</div>
            <div className="summary">
              <div className="date">{timeDiff()}</div>
            </div>
          </div>
          <div className="ui items">
            <div className="item">
              <div className="book_cover">
                <a
                  id="book-cover"
                  onClick={() => {
                    props.history.push(`/book/${props.book_isbn}`);
                  }}
                >
                  <img src={props.book_thumbnail} />
                </a>
              </div>
              <div className="MainArticle">
                <a
                  id="article-title"
                  onClick={() => {
                    props.history.push(`/review/${props.id}`);
                  }}
                >
                  <h3 className="MainArticleTitle">{props.title}</h3>
                </a>
                <div className="MainBookTitle">
                  <a
                    id="book-title"
                    className="meta"
                    onClick={() => {
                      props.history.push(`/book/${props.book_isbn}`);
                    }}
                  >
                    <span>{props.book_title}</span>
                  </a>
                </div>
                <div className="MainArticleContent">
                  <div className="content">{props.content}</div>
                </div>
                {props.is_long ? (
                  <a
                    id="article-extra"
                    className="extra"
                    onClick={() => {
                      props.history.push(`/review/${props.id}`);
                    }}
                  >
                    View Full Review
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <div className="MainLikeButton">
            <div className="ui labeled button" tabIndex="0">
              <div className="ui red button">
                <i className="heart icon" /> Like
              </div>
              <a className="ui basic red left pointing label">0</a>
            </div>
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default withRouter(Article);
