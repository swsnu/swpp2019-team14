import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Feed, Icon } from 'semantic-ui-react';
import * as actionCreators from '../../store/actions/actionCreators';

class ArticleLike extends Component {
  constructor(params) {
    super(params);
    this.props.onLoadArticle(this.props.article_id);
  }

  likeHandler = () => {
    if (
      this.checkUserInArray(
        this.props.logged_in_user.id,
        this.props.currentArticle.likes.users,
      )
    ) {
      this.props.onDeleteLikeArticle(this.props.match.params.review_id);
    } else {
      this.props.onPostLikeArticle(this.props.match.params.review_id);
    }
  };

  checkUserInArray = (user_id, user_array) => {
    console.log(user_array);
    const result = user_array.filter(user => user.id === user_id);
    console.log(result.length);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const count = this.props.currentArticle
      ? this.props.currentArticle.likes.count
      : null;
    return (
      <Feed.Meta>
        <Feed.Like>
          <Icon name="like" onClick={this.likeHandler} />
          {count}
          {/* {this.props.currentArticle.likes.count} */}
        </Feed.Like>
      </Feed.Meta>
    );
  }
}
const mapStateToProps = state => {
  return {
    currentArticle: state.article.selectedArticle,
    logged_in_user: state.user.logged_in_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadArticle: id => dispatch(actionCreators.getSpecificArticle(id)),
    onPostLikeArticle: article_id =>
      dispatch(actionCreators.postArticleLike(article_id)),
    onDeleteLikeArticle: article_id =>
      dispatch(actionCreators.deleteArticleLike(article_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ArticleLike));
