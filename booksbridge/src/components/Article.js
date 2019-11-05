import React from 'react';
import { withRouter } from 'react-router';
import './Article.css';
import Alert from 'react-bootstrap/Alert';
import ProfileSummary from './ProfileSummary/ProfileSummary';

const Article = props => {
  const Author = <ProfileSummary user={props.author} />;
  return (
    <div>
      <Alert variant="secondary" className="article">
        <div className="ui feed">
          <div>
            <div className="AuthorProfileMain">
              <div>{Author}</div>
              <div className="summary">
                <div className="date">30 minutes ago</div>
              </div>
            </div>
            <div className="ui items">
              <div className="item">
                <div className="book_cover">
                  <a
                    onClick={() => {
                      props.history.push(`/book/${props.book_isbn}`);
                    }}
                  >
                    <img src={props.book_thumbnail} />
                  </a>
                </div>
                <div className="MainArticle">
                  <div className="MainBookTitle">
                    <a
                      onClick={() => {
                        props.history.push(`/review/${props.id}`);
                      }}
                    >
                      <h3 className="MainArticleTitle">{props.title}</h3>
                    </a>
                  </div>
                  <div className="MainArticleContent">
                    <div className>{props.content}</div>
                  </div>
                  {props.is_long ? (
                    <a
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
    </div>
  );
};

export default withRouter(Article);
