import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './containers.css';
import './Main.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Header from '../components/Header';
import * as actionCreators from '../store/actions/index';
import Article from '../components/Article';
import Spinner from 'react-bootstrap/Spinner';

class Main extends React.Component {
  constructor(params) {
    super(params);
    this.state = {
      page: 1,
      articles: [],
      hasNext: true,
    };
    this.fetchMoreData();
  }

  onClickLikeArticleButton = (like_or_not, id) => {
    if (like_or_not) {
      this.props.onDeleteLikeArticle(id);
      const deleted = this.state.articles.map(article => {
        if (article.id === id) {
          return {
            ...article,
            like_count: article.like_count - 1,
            like_or_not: false,
          };
        } else {
          return { ...article };
        }
      });
      this.setState({
        ...this.state,
        articles: deleted,
      });
    } else {
      this.props.onPostLikeArticle(id);
      const added = this.state.articles.map(article => {
        if (article.id === id) {
          return {
            ...article,
            like_count: article.like_count + 1,
            like_or_not: true,
          };
        } else {
          return { ...article };
        }
      });
      this.setState({
        ...this.state,
        articles: added,
      });
    }
  };

  fetchMoreData = () => {
    this.fetchMore();
  };
  async fetchMore() {
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await this.props.onGetArticles(this.state.page);
    delay(500)
      .then(() =>
        this.setState({
          page: this.state.page + 1,
          articles: this.state.articles.concat(this.props.loadArticle),
          hasNext: this.props.hasNext,
        }),
      )
      .catch();
  }

  render() {
    const feed = this.state.articles.map(article => (
      <div>
        <Article
          author={article.author}
          book_isbn={article.book.isbn}
          book_title={article.book.title}
          book_thumbnail={article.book.thumbnail}
          id={article.id}
          title={article.title}
          content={article.content}
          date={article.date}
          is_long={article.is_long}
          is_short={article.is_short}
          is_phrase={article.is_phrase}
          is_spoiler={article.is_spoiler}
          like_or_not={article.like_or_not}
          like_count={article.like_count}
          logged_in_user={this.props.logged_in_user}
          clickLike={() => this.onClickLikeArticleButton(false, article.id)}
          clickUnlike={() => this.onClickLikeArticleButton(true, article.id)}
        />
      </div>
    ));
    return (
      <div className="main">
        <Header />
        <div className="articles">
          <a id="create-review-link" href={'/review/create'}>
            <img
              id="createReviewLogo"
              className="createReviewLogo"
              src="/images/create-review-image.jpg"
              width="100%"
            />
          </a>
          <br />
          <a id="curation-link" href={'/curation'}>
            <img
              id="createCurationLogo"
              className="createCurationLogo"
              src="/images/create-curation-image.jpg"
              width="100%"
            />
          </a>
          <InfiniteScroll
            className="scroll"
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasNext}
            loader={<Spinner animation="border" />}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>모든 글을 보셨습니다.</b>
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
    loadArticle: state.article.articles,
    hasNext: state.article.hasNext,
    logged_in_user: state.user.logged_in_user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetArticles: page => dispatch(actionCreators.getArticles(page)),
    onPostLikeArticle: article_id =>
      dispatch(actionCreators.postArticleLike(article_id)),
    onDeleteLikeArticle: article_id =>
      dispatch(actionCreators.deleteArticleLike(article_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
