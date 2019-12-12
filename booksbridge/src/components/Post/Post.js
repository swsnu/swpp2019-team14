import React from 'react';
import { withRouter } from 'react-router';
import { Button, Feed, Icon } from 'semantic-ui-react';
import './Post.css';
import Alert from 'react-bootstrap/Alert';
import Time from '../Time';
import ProfileSummary from '../ProfileSummary/ProfileSummary';
import Comments from '../../containers/Comments/Comments';

const Post = props => {
  const Author = <ProfileSummary user={props.author} />;

  const comments = !props.showComments ? (
    <Button id="see-more" onClick={() => props.openComments()}>
      댓글 보기
    </Button>
  ) : (
    <div id="post-comments">
      <Button id="fold-comments" onClick={() => props.closeComments()}>
        댓글 접기
      </Button>
      <Comments
        comments={props.comments}
        post_id={props.id}
        is_article={false}
        is_post={true}
        createCommentHandler={props.createCommentHandler}
      />
    </div>
  );
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
                <a id="article-title" href={'/review/' + props.id}>
                  <h3 className="MainArticleTitle">{props.title}</h3>
                </a>
              </div>
              <div className="MainArticleContent">
                <div className="content">{props.content}</div>
              </div>
              {comments}
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
    </Alert>
  );
};

export default withRouter(Post);
