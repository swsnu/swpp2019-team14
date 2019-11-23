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
          {book_set[0] ? (
            <Image
              href="http://google.com"
              src={book_set[0].thumbnail}
              alt="First slide"
              centered
            />
          ) : null}
          {book_set[1] ? (
            <Image src={book_set[1].thumbnail} alt="First slide" centered />
          ) : null}
          {book_set[2] ? (
            <Image src={book_set[2].thumbnail} alt="First slide" centered />
          ) : null}
          {book_set[3] ? (
            <Image src={book_set[3].thumbnail} alt="First slide" centered />
          ) : null}
          {book_set[4] ? (
            <Image src={book_set[4].thumbnail} alt="First slide" centered />
          ) : null}
        </Image.Group>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
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
              <div className="MainArticle">
                <a id="article-title" href={'/review/'}>
                  <h3 className="MainArticleTitle">{props.title}</h3>
                </a>
                <div className="MainArticleContent">
                  <div className="curation-summary-content">
                    <Carousel
                      className="carousel-items"
                      prevIcon={
                        <Icon color="black" name="angle left" size="large" />
                      }
                      nextIcon={
                        <Icon color="black" name="angle right" size="large" />
                      }
                    >
                      {Books}
                    </Carousel>
                  </div>
                </div>
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

export default CurationSummary;
