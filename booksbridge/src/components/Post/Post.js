import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Feed, Icon } from 'semantic-ui-react';
import './Post.css';
import Alert from 'react-bootstrap/Alert';
import Time from '../Time';
import ProfileSummary from '../ProfileSummary/ProfileSummary';
import Comments from '../../containers/Comments/Comments';

class Post extends Component {
  state = {
    show: false,
  };

  render() {
    const Author = <ProfileSummary user={this.props.author} />;

    const comments = !this.state.show ? (
      <Button
        id="see-more"
        onClick={() => this.setState({ ...this.state, show: true })}
      >
        댓글 보기
      </Button>
    ) : (
      <div id="post-comments">
        <Button
          id="fold-comments"
          onClick={() => this.setState({ ...this.state, show: false })}
        >
          댓글 접기
        </Button>
        <Comments
          comments={this.props.comments}
          post_id={this.props.id}
          is_article={false}
          is_post={true}
          createCommentHandler={this.props.createCommentHandler}
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
                <Time date={this.props.date} />
              </div>
            </div>
            <div className="ui items">
              <div className="item">
                <div className="MainArticle">
                  <a id="article-title" href={'/review/' + this.props.id}>
                    <h3 className="MainArticleTitle">{this.props.title}</h3>
                  </a>
                </div>
                <div className="MainArticleContent">
                  <div className="content">{this.props.content}</div>
                </div>
                {comments}
              </div>
            </div>
          </div>
          {this.props.like_or_not ? (
            <div className="MainLikeButton" onClick={this.props.clickUnlike}>
              <Icon name="like" color="red" />
              {this.props.like_count}
            </div>
          ) : (
            <div className="MainLikeButton" onClick={this.props.clickLike}>
              <Icon name="like" />
              {this.props.like_count}
            </div>
          )}
        </div>
      </Alert>
    );
  }
}

export default withRouter(Post);
