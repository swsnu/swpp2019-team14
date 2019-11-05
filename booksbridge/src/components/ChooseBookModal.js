import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Sticky } from 'semantic-ui-react';
import FormControl from 'react-bootstrap/FormControl';
import ScrollUpButton from 'react-scroll-up-button';

import * as actionCreators from '../store/actions/actionCreators';
import BookResultSummary from './BookResultSummary/BookResultSummary';

import './ChooseBookModal.css';

const mapStateToProps = state => {
  return {
    selectedBook: state.book.selectedBook,
    books: state.book.books,
    searchedBooks: state.book.searchedBooks,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSearchBooks: (keyword, page) =>
      dispatch(actionCreators.getSearchedBooks(keyword, page)),
    onGetSpecificBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
    onEmptySearchedBooks: () => dispatch(actionCreators.emptySearchedBooks()),
  };
};

class ChooseBookModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      requestNum: 1,
      open: false,
      search: false,
    };

    this.chooseHandler = this.chooseHandler.bind(this);
  }

  openHandler = () => {
    this.setState({ open: true, search: false });
    this.props.onEmptySearchedBooks();
  };

  searchHandler = () => {
    this.props.onEmptySearchedBooks();
    this.props.onSearchBooks(this.state.keyword, 1);
    this.setState({ requestNum: 2, search: true });
  };

  seeMoreHandler = () => {
    this.props.onSearchBooks(this.state.keyword, this.state.requestNum);
    this.setState({ requestNum: this.state.requestNum + 1 });
  };

  chooseHandler = () => {
    this.setState({ open: false });
  };

  render() {
    const result =
      this.props.searchedBooks.length > 1
        ? this.props.searchedBooks.map(book => {
            return (
              <BookResultSummary
                cover={book.thumbnail}
                title={book.title}
                authors={book.authors}
                publisher={book.publisher}
                isbn={book.isbn}
                direct={false}
                click={this.chooseHandler}
              />
            );
          })
        : null;

    const moreButton = this.state.search && (
      <Button onClick={this.seeMoreHandler}>More...</Button>
    );

    return (
      <div className="choose-book-modal">
        <Button className="select-book-button" onClick={this.openHandler}>
          Select Book
        </Button>

        <Modal open={this.state.open}>
          <Modal.Content scrolling>
            <FormControl
              aria-describedby="basic-addon2"
              type="text"
              onChange={event => this.setState({ keyword: event.target.value })}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.searchHandler();
                }
              }}
            />
            <Button onClick={this.searchHandler}>Search!</Button>
            <Sticky>
              <Button
                className="close-select-book-button"
                onClick={() => this.setState({ open: false })}
              >
                Close
              </Button>
            </Sticky>
            {result}
            {moreButton}
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseBookModal);
