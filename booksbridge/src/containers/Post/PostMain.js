import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
// import '../containers.css';
// import '../Main.css';
import { Button } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../../components/Header';
import Post from '../../components/Post/Post';
import CreatePost from './CreatePost';
import Comments from '../Comments/Comments';
import * as actionCreators from '../../store/actions/index';
import Spinner from 'react-bootstrap/Spinner';

class PostMain extends Component {
  constructor(params) {
    super(params);
    this.state = {
      page: 1,
      posts: [],
      hasNext: true,
      createMode: false,
      showComments: false,
    };
    this.fetchMoreData = this.fetchMoreData.bind(this);
    this.fetchMoreData();
    this.CreateHandler = this.CreateHandler.bind(this);
    this.createCommentHandler = this.createCommentHandler.bind(this);
  }

  onClickLikePostButton = (like_or_not, id) => {
    if (like_or_not) {
      this.props.onDeleteLikePost(id);
      const deleted = this.state.posts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            like_count: post.like_count - 1,
            like_or_not: false,
          };
        } else {
          return { ...post };
        }
      });
      this.setState({
        ...this.state,
        posts: deleted,
      });
    } else {
      this.props.onPostLikePost(id);
      const added = this.state.posts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            like_count: post.like_count + 1,
            like_or_not: true,
          };
        } else {
          return { ...post };
        }
      });
      this.setState({
        ...this.state,
        posts: added,
      });
    }
  };

  async fetchMoreData() {
    await this.props.onGetPosts();
    this.setState(state => {
      if (state.hasNext & (this.props.loadPost.length > 10 * state.page)) {
        return {
          page: state.page + 1,
          posts: state.posts.concat(
            this.props.loadPost.slice((state.page - 1) * 10, state.page * 10),
          ),
          hasNext: true,
        };
      } else {
        return {
          page: state.page + 1,
          posts: state.posts.concat(
            this.props.loadPost.slice((state.page - 1) * 10, state.page * 10),
          ),
          hasNext: false,
        };
      }
    });
  }

  CreateHandler = post => {
    this.setState(state => ({
      createMode: false,
      posts: [post].concat(state.posts),
      page: 1,
    }));
  };

  createCommentHandler = () => {
    this.setState({ ...this.state, posts: this.props.loadPost });
  };

  render() {
    console.log('DEBUG]: ', this.state.posts);

    const feed = this.state.posts.map(post => (
      <div>
        <Post
          author={post.author}
          id={post.id}
          title={post.title}
          content={post.content}
          date={post.date}
          like_or_not={post.like_or_not}
          like_count={post.like_count}
          logged_in_user={this.props.logged_in_user}
          clickLike={() => this.onClickLikePostButton(false, post.id)}
          clickUnlike={() => this.onClickLikePostButton(true, post.id)}
          comments={post.comments}
          showComments={this.state.showComments}
          openComments={() =>
            this.setState({ ...this.state, showComments: true })
          }
          closeComments={() =>
            this.setState({ ...this.state, showComments: false })
          }
          createCommentHandler={this.createCommentHandler}
        />
      </div>
    ));

    const create = this.state.createMode ? (
      <CreatePost
        onClose={() => {
          this.setState({ ...this.state, createMode: false });
        }}
        onCreate={this.CreateHandler}
      />
    ) : (
      <Button
        onClick={() => this.setState({ ...this.state, createMode: true })}
      >
        포스트 만들기
      </Button>
    );

    return (
      <div className="main">
        <Header />
        {create}
        <div className="posts">
          <InfiniteScroll
            className="scroll"
            dataLength={this.state.posts.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasNext}
            loader={<Spinner animation="border" />}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {feed}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadPost: state.post.posts,
    hasNext: state.post.hasNext,
    logged_in_user: state.user.logged_in_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPosts: page => dispatch(actionCreators.getPosts(page)),
    onPostLikePost: post_id => dispatch(actionCreators.postPostLike(post_id)),
    onDeleteLikePost: post_id =>
      dispatch(actionCreators.deletePostLike(post_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostMain);
