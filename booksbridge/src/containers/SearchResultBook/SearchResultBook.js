import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Pagination from 'react-bootstrap/Pagination';
import Header from '../../components/Header';
import * as actionCreators from '../../store/actions/actionCreators';
import BookResultSummary from '../../components/BookResultSummary/BookResultSummary';
import './SearchResultBook.css';
import ScrollUpButton from 'react-scroll-up-button';
import { Card, Button } from 'semantic-ui-react';
import SearchUser from '../../components/SearchUser/SearchUser';

const mapStateToProps = state => ({
  books: state.book.books,
  count: state.book.count,
  users: state.user.users,
});

const mapDispatchToProps = dispatch => ({
  onSearchBooks: (keyword, page) =>
    dispatch(actionCreators.getSearchedBooks(keyword, page)),
  onGetSearchedUser: keyword =>
    dispatch(actionCreators.getSearchedUsers(keyword)),
});

class SearchResultBook extends Component {
  componentDidMount() {
    this.props.onSearchBooks(
      this.props.match.params.keyword,
      this.props.match.params.page,
    );
    this.props.onGetSearchedUser(this.props.match.params.keyword);
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

  render() {
    const active = parseInt(this.props.match.params.page);
    const items = [];
    let first = active - 2;
    let last = active + 2;
    let final = parseInt(this.props.count / 10) + 1;
    if (this.props.count % 10 === 0) final -= 1;

    if (final < 5) {
      for (let number = 1; number <= final; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === active}
            onClick={() =>
              this.props.history.push(
                `/result/search=${this.props.match.params.keyword}/book/${number}`,
              )
            }
          >
            {number}
          </Pagination.Item>,
        );
      }
    } else {
      if (active < 3) {
        first = 1;
        last = 5;
      }
      if (active > final - 2) {
        first = final - 4;
        last = final;
      }
      for (let number = first; number <= last; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === active}
            onClick={() =>
              this.props.history.push(
                `/result/search=${this.props.match.params.keyword}/book/${number}`,
              )
            }
          >
            {number}
          </Pagination.Item>,
        );
      }
    }

    const pagination = (
      <div className="pagination">
        <Pagination>{items}</Pagination>
      </div>
    );

    const book_result = this.props.books.map(book => (
      <BookResultSummary
        cover={book.thumbnail}
        title={book.title}
        authors={book.authors}
        publisher={book.publisher}
        isbn={book.isbn}
        direct
      />
    ));
    const user_result = this.props.users.map(user => (
      <SearchUser user={user} />
    ));

    return (
      <div className="SearchResultBook">
        <Header />
        <h2>유저</h2>
        <div className="searched-user-section">
          <Card.Group itemsPerRow={1} centered={true}>
            {user_result}{' '}
          </Card.Group>
        </div>
        <h2>책</h2>
        {this.props.count !== 0 ? (
          <div>
            <div id="result">{book_result}</div>
            {pagination}
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
