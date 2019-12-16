import React from 'react';
import { withRouter } from 'react-router';
import { Image, Icon, Reveal } from 'semantic-ui-react';
import * as actionCreators from '../store/actions/actionCreators';
import './Article.css';
import Alert from 'react-bootstrap/Alert';
import Time from './Time';
import ProfileSummary from './ProfileSummary/ProfileSummary';

const Article = props => {
  const Author = <ProfileSummary user={props.author} />;

  if (props.is_phrase) return null;

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
                <a id="book-cover" href={'/book/' + props.book_isbn}>
                  <img
                    src={
                      props.book_thumbnail
                        ? props.book_thumbnail
                        : '/images/no_cover.jpg'
                    }
                  />
                </a>
              </div>
              <div className="MainArticle">
                <a id="article-title" href={'/review/' + props.id}>
                  <h3 className="MainArticleTitle">{props.title}</h3>
                </a>
                <div className="MainBookTitle">
                  <a
                    id="book-title"
                    className="meta"
                    href={'/book/' + props.book_isbn}
                  >
                    <span>{props.book_title}</span>
                  </a>
                </div>
                <div className="MainArticleContent">
                  <div className="content">
                    {props.is_spoiler ? (
                      <Reveal animated="move down">
                        <Reveal.Content visible>
                          <Image src="/images/short-paragraph.jpg" />
                        </Reveal.Content>
                        <Reveal.Content hidden>{props.content}</Reveal.Content>
                      </Reveal>
                    ) : (
                      props.content
                    )}
                  </div>
                </div>
                {props.is_long ? (
                  <a
                    id="article-extra"
                    className="extra"
                    href={'/review/' + props.id}
                  >
                    더 보기
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          {props.like_or_not ? (
            <div className="MainLikeButton" onClick={props.clickUnlike}>
              <Icon name="like" color="red" />
              {props.like_count}
            </div>
          ) : (
            <div className="MainLikeButton" onClick={props.clickLike}>
              <Icon name="like" />
              {props.like_count}
            </div>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default withRouter(Article);
