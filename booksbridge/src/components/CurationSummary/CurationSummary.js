import React from 'react';
import { withRouter } from 'react-router';
import { Button, Feed, Icon } from 'semantic-ui-react';
import Alert from 'react-bootstrap/Alert';
import Time from '../Time';
import ProfileSummary from '../ProfileSummary/ProfileSummary';
import Carousel from 'react-bootstrap/Carousel';

const CurationSummary = props => {
  const Author = <ProfileSummary user={props.author} />;

  // const Books = props.curations.books.map(book => {
  //   return (
  //     <Carousel.Item>
  //       <img
  //         className="d-block w-100"
  //         src={book.book_thumbnail}
  //         alt="First slide"
  //       />
  //       <Carousel.Caption>
  //         <h3>First slide label</h3>
  //         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  //       </Carousel.Caption>
  //     </Carousel.Item>
  //   );
  // });

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
                  <div className="content">
                    {/* <Carousel>{Books}</Carousel> */}
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
