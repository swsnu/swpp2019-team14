import { connect } from "react-redux";
import React, { Component } from "react";
import { withRouter } from "react-router";
import "./containers.css";
import "./Main.css";
import Header from "../components/Header";
import * as actionCreators from "../store/actions/index";
import Article from "../components/Article";
import { Button } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroll-component";

class Main extends React.Component {
  constructor(params) {
    super(params);
    this.props.onGetArticles(1);
    this.state = {
      page: 2,
      articles: [],
      hasNext: true
    };
    this.fetchMoreData();
  }

  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        page: this.state.page + 1,
        articles: this.state.articles.concat(this.props.loadArticle),
        hasNext: this.props.hasNext
      });
      this.props.onGetArticles(this.state.page);
    }, 500);
  };

  render() {
    return (
      <div className="main">
        <Header />
        <div className="articles">
          <InfiniteScroll
            className="scroll"
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.hasNext}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {this.state.articles.map((article, index) => (
              <div key={index}>
                <Article
                  author_name={article.author_name}
                  book_isbn={article.book_isbn}
                  book_title={article.book_title}
                  book_thumbnail={article.book_thumbnail}
                  id={article.id}
                  title={article.title}
                  content={article.content}
                  date={article.date}
                  is_long={article.is_long}
                  is_short={article.is_short}
                  is_phrase={article.is_phrase}
                />
              </div>
            ))}
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
    books: state.book.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetArticles: page => dispatch(actionCreators.getArticles(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
