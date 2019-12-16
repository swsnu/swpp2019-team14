import React from 'react';
import { withRouter } from 'react-router';
import { Button, Feed, Icon, Image } from 'semantic-ui-react';
import Alert from 'react-bootstrap/Alert';
import Time from '../Time';
import ProfileSummary from '../ProfileSummary/ProfileSummary';
import Carousel from 'react-bootstrap/Carousel';
import './CurationSummary.css';

const CurationSummary = props => {
  const Author = <ProfileSummary user={props.author} />;

  const Books = props.books.map(book_set => {
    return (
      <Carousel.Item className="curation-summary-items">
        <Image.Group className="curation-summary-images">
          {book_set.map(book => {
            return (
              <Image
                href={'/book/' + book.isbn}
                src={book.thumbnail ? book.thumbnail : '/images/no_cover.jpg'}
                alt="First slide"
                className="curation-summary-image"
                centered
              />
            );
          })}
        </Image.Group>
        {/* <Carousel.Caption className="curation-captions">
          {book_set.map(book => {
            return <p className="caption-content">{book.title}</p>;
          })}
        </Carousel.Caption> */}
      </Carousel.Item>
    );
  });

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
              <div className="curation-main-article">
                <a id="article-title" href={'/curation/' + props.id}>
                  <h3 className="MainArticleTitle">{props.title}</h3>
                </a>
                <div className="MainArticleContent">
                  <div className="curation-summary-content">
                    <Carousel
                      className="carousel-items"
                      prevIcon={
                        props.books.length > 1 ? (
                          <Icon color="black" name="angle left" size="large" />
                        ) : null
                      }
                      nextIcon={
                        props.books.length > 1 ? (
                          <Icon color="black" name="angle right" size="large" />
                        ) : null
                      }
                    >
                      {Books}
                    </Carousel>
                    <div className="content">{props.content}</div>
                  </div>
                  <a
                    id="article-extra"
                    className="extra"
                    href={'/curation/' + props.id}
                  >
                    더 보기
                  </a>
                </div>
              </div>
            </div>
          </div>
          {props.like_or_not ? (
            <div
              className="MainLikeButton"
              onClick={() => props.likeHandler(true, props.id)}
            >
              <Icon name="like" color="red" />
              {props.like_count}
            </div>
          ) : (
            <div
              className="MainLikeButton"
              onClick={() => props.likeHandler(false, props.id)}
            >
              <Icon name="like" />
              {props.like_count}
            </div>
          )}
        </div>
      </div>
    </Alert>
  );
};
export default CurationSummary;
