import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './containers.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InfiniteScroll from 'react-infinite-scroller';
import Header from '../components/Header';
import * as actionCreators from '../store/actions/index';
import BookResultSummary from '../components/BookResultSummary/BookResultSummary';

class Main extends Component {
  state = {
    page: 1,
    hasMore: false,
  }

  componentDidMount() {
    this.loadMore();
  }

  loadMore = () => {
    //this.props.onGetArticles(this.state.page);
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    return nextState;
  }

  render() {
    const result = this.props.books.map(book => {
      return (
        <BookResultSummary
          cover={book.thumbnail}
          title={book.title}
          authors={book.authors}
          publisher={book.publisher}
          isbn={book.isbn}
        />
      );
    });
    return (
      <div className='main'>
        <Header />
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore()}
          hasMore={this.state.hasMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
        >
          {result}
        </InfiniteScroll>
        <h1></h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loadArticle: state.article.articles,
    books: state.book.books,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetArticles: page => dispatch(actionCreators.getArticles(page)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);