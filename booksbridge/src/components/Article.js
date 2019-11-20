import React from 'react';
import { withRouter } from 'react-router';
import { Button, Feed, Icon } from 'semantic-ui-react';
import * as actionCreators from '../store/actions/actionCreators';
import './Article.css';
import Alert from 'react-bootstrap/Alert';
import Time from './Time';
import ProfileSummary from './ProfileSummary/ProfileSummary';

const Article = props => {
  const Author = <ProfileSummary user={props.author} />;

  return (
    <Alert variant="secondary" className="article">
      <div className="ui feed">
        <div>
          <div className="AuthorProfileMain">
            <div>{Author}</div>
            <div className="summary">
              <Time date={props.date} />
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
                    더 보기
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <div className="MainLikeButton">
            <Feed.Meta>
              <Feed.Like>
                <Icon name="like" />4 Likes
              </Feed.Like>
            </Feed.Meta>
          </div>
        </div>
      </div>
    </Alert>
  );
};

export default withRouter(Article);
