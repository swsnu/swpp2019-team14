import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
// import '../containers.css';
// import '../Main.css';
import { Button } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ScrollUpButton from 'react-scroll-up-button';
import { Pagination } from 'semantic-ui-react';
import Header from '../../components/Header';
import Post from '../../components/Post/Post';
import CreatePost from './CreatePost';
import * as actionCreators from '../../store/actions/index';
import './PostMain.css';

class PostMain extends Component {
  constructor(params) {
    super(params);
    this.state = {
      posts: [],
      // hasNext: true,
      createMode: false,
      activePage: this.props.match.params.page,
    };

    this.props.onGetPosts(this.props.match.params.page);
    this.CreateHandler = this.CreateHandler.bind(this);
    this.createCommentHandler = this.createCommentHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.page !== prevProps.match.params.page) {
      this.props.onGetPosts(this.props.match.params.page);
    }
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  onClickLikePostButton = (like_or_not, id) => {
    if (like_or_not) {
      this.props.onDeleteLikePost(this.state.activePage, id);
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
      this.props.onPostLikePost(this.state.activePage, id);
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

  // async fetchMoreData() {
  //   await this.props.onGetPosts();
  //   this.setState(state => {
  //     if (state.hasNext & (this.props.loadPost.length > 10 * state.page)) {
  //       return {
  //         page: state.page + 1,
  //         posts: state.posts.concat(
  //           this.props.loadPost.slice((state.page - 1) * 10, state.page * 10),
  //         ),
  //         hasNext: true,
  //       };
  //     } else {
  //       return {
  //         page: state.page + 1,
  //         posts: state.posts.concat(
  //           this.props.loadPost.slice((state.page - 1) * 10, state.page * 10),
  //         ),
  //         hasNext: false,
  //       };
  //     }
  //   });
  // }

  CreateHandler = () => {
    this.setState({
      ...this.state,
      createMode: false,
      // posts: [post].concat(state.posts),
      // page: 1,
    });
  };

  createCommentHandler = () => {
    this.setState({ ...this.state, posts: this.props.loadPost });
  };

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage: activePage });
    this.props.history.push('/post/' + activePage);
  };

  render() {
    let final = parseInt(this.props.count / 10) + 1;
    if (this.props.count % 10 === 0) final -= 1;

    const feed = this.props.loadPost.map(post => (
      <Post
        className="individual-post"
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
        createCommentHandler={this.createCommentHandler}
      />
    ));

    const createSpace = this.state.createMode ? (
      <CreatePost
        onClose={() => {
          this.setState({ ...this.state, createMode: false });
        }}
        onCreate={this.CreateHandler}
      />
    ) : (
      <Button
        id="create-post-button"
        color="blue"
        size="small"
        onClick={() => this.setState({ ...this.state, createMode: true })}
      >
        포스트 만들기
      </Button>
    );
    const create = this.state.activePage == 1 ? createSpace : null;

    return (
      <div className="post-main">
        <Header />
        <div id="open-create-post-button">{create}</div>
        <div className="posts">
          <div id="post-feed">{feed}</div>
          <Pagination
            activePage={this.state.activePage}
            onPageChange={this.handlePaginationChange}
            firstItem={null}
            lastItem={null}
            pointing
            secondary
            totalPages={final}
          />
          <div className="TopButton">
            <ScrollUpButton>
              <Button>Top</Button>
            </ScrollUpButton>
          </div>

          {/* <InfiniteScroll
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
          </InfiniteScroll> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadPost: state.post.posts,
    count: state.post.count,
    // hasNext: state.post.hasNext,
    logged_in_user: state.user.logged_in_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPosts: page => dispatch(actionCreators.getPosts(page)),
    onPostLikePost: (page, post_id) =>
      dispatch(actionCreators.postPostLike(page, post_id)),
    onDeleteLikePost: (page, post_id) =>
      dispatch(actionCreators.deletePostLike(page, post_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostMain);
