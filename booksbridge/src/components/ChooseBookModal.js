import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Input } from 'semantic-ui-react';

import * as actionCreators from '../store/actions/actionCreators';
import BookResultSummary from '../components/BookResultSummary/BookResultSummary';

import "./ChooseBookModal.css";

const mapStateToProps = state => {
  return {
    selectedBook: state.book.selectedBook,
    books: state.book.books,
    searchedBooks: state.book.searchedBooks,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onSearchBooks: (keyword, page) => dispatch(actionCreators.getSearchedBooks(keyword, page)),
    onGetSpecificBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
    onEmptySearchedBooks: () => dispatch(actionCreators.emptySearchedBooks()),
  }
}

class ChooseBookModal extends Component {

  state = {
    keyword: "",
    requestNum: 1,
    open: false,
  }

  openHandler = () => {
    this.setState({ open: true });
    this.props.onEmptySearchedBooks();
  }

  searchHandler = () => {
    this.props.onEmptySearchedBooks();
    this.props.onSearchBooks(this.state.keyword, 1);
    // this.setState({ searchedBooks: this.props.books});
    this.setState({ requestNum: 2});
  }

  seeMoreHandler = () => {
    // console.log("SEE MORE: ", this.state.requestNum);
    this.props.onSearchBooks(this.state.keyword, this.state.requestNum);
    // this.setState({ searchedBooks: this.state.searchedBooks.concat(this.props.books)});
    this.setState({ requestNum: this.state.requestNum + 1 });
  }

  render () {
    // console.log("DEBUG ", this.props.searchedBooks);
    const result = (this.props.searchedBooks.length > 1) ? 
                  this.props.searchedBooks.map(book => {
                    return (
                        <BookResultSummary
                            cover={book.thumbnail}
                            title={book.title}
                            authors={book.authors}
                            publisher={book.publisher}
                            isbn={book.isbn}
                            direct={false}
                        />
                    );
                }) : null;

    return (
      <div className="choose-book-modal">
        <Button className="select-book-button" onClick={this.openHandler}>Select Book</Button>

        <Modal open={this.state.open}>
        <Modal.Content scrolling={true}>
          <Input placeholder='search...' onChange={(event) => this.setState({ keyword: event.target.value})} />
          <Button onClick={this.searchHandler}>Search!</Button>
          {/* <Button onClick={() => this.setState({ open: false })}>Choose</Button>  */}
          <Button className="close-select-book-button" onClick={() => this.setState({ open: false })}>Close</Button>
          {result}
          <Button onClick={this.seeMoreHandler}>More...</Button>
        </Modal.Content>
      </Modal>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseBookModal);


