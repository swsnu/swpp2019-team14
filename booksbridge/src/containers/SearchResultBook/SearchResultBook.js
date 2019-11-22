import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Header from '../../components/Header';
import * as actionCreators from '../../store/actions/actionCreators';
import BookResultSummary from '../../components/BookResultSummary/BookResultSummary';
import './SearchResultBook.css';
import ScrollUpButton from 'react-scroll-up-button';
import { Button } from 'semantic-ui-react';
import { Pagination } from 'semantic-ui-react';

const mapStateToProps = state => ({
  books: state.book.books,
  count: state.book.count,
});

const mapDispatchToProps = dispatch => ({
  onSearchBooks: (keyword, page) =>
    dispatch(actionCreators.getSearchedBooks(keyword, page)),
});

class SearchResultBook extends Component {
  state = {
    activePage: this.props.match.params.page,
  };
  componentDidMount() {
    this.props.onSearchBooks(
      this.props.match.params.keyword,
      this.props.match.params.page,
    );
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.keyword !== prevProps.match.params.keyword) {
      this.props.onSearchBooks(
        this.props.match.params.keyword,
        this.props.match.params.page,
      );
    }
    if (this.props.match.params.page !== prevProps.match.params.page) {
      this.props.onSearchBooks(
        this.props.match.params.keyword,
        this.props.match.params.page,
      );
    }
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  handlePaginationChange = (e, { activePage }) => {
    this.setState({ activePage });
    this.props.history.push(
      '/result/search=' +
        this.props.match.params.keyword +
        '/book/' +
        activePage,
    );
  };

  render() {
    const active = parseInt(this.props.match.params.page);
    const items = [];
    let first = active - 2;
    let last = active + 2;
    let final = parseInt(this.props.count / 10) + 1;
    if (this.props.count % 10 === 0) final -= 1;

    const result = this.props.books.map(book => (
      <BookResultSummary
        cover={book.thumbnail}
        title={book.title}
        authors={book.authors}
        publisher={book.publisher}
        isbn={book.isbn}
        direct
      />
    ));

    return (
      <div className="SearchResultBook">
        <Header />
        {this.props.count !== 0 ? (
          <div>
            <div id="result">{result}</div>
            <Pagination
              activePage={this.state.activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={final}
            />
            <div className="TopButton">
              <ScrollUpButton>
                <Button>Top</Button>
              </ScrollUpButton>
            </div>
          </div>
        ) : (
          <h4>검색 결과가 없습니다.</h4>
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SearchResultBook));
