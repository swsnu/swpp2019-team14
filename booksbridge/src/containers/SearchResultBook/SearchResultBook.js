import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Header from '../../components/Header';
import * as actionCreators from '../../store/actions/actionCreators';
import BookResultSummary from '../../components/BookResultSummary/BookResultSummary';
import './SearchResultBook.css';
import ScrollUpButton from 'react-scroll-up-button';
import { Pagination } from 'semantic-ui-react';
import { Card, Button, Tab } from 'semantic-ui-react';
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
  state = {
    activePage: this.props.match.params.page,
  };
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
      this.props.onGetSearchedUser(this.props.match.params.keyword);
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
    const user_result = this.props.users.length ? (
      this.props.users.map(user => <SearchUser user={user} />)
    ) : (
      <h4>검색 결과가 없습니다.</h4>
    );

    const panes = [
      {
        menuItem: { key: 'books', icon: 'book', content: 'Books' },
        render: () => (
          <Tab.Pane className="tab-content">
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
          </Tab.Pane>
        ),
      },
      {
        menuItem: { key: 'users', icon: 'users', content: 'Users' },
        render: () => (
          <Tab.Pane attached className="tab-content">
            <Card.Group itemsPerRow={2} centered fluid>
              {user_result}{' '}
            </Card.Group>
          </Tab.Pane>
        ),
      },
      {
        menuItem: { key: 'curations', icon: 'archive', content: 'Curations' }, //tasks, archive, thumbs up, gift, shopping basket, favorite, shop
        render: () => (
          <Tab.Pane className="tab-content" attached={false}>
            Tab 3 Content
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div className="SearchResultBook">
        <Header />
        <Tab
          className="search-menu"
          menu={{
            widths: 3,
            size: 'large',
            secondary: true,
            pointing: true,
          }}
          panes={panes}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(SearchResultBook));
