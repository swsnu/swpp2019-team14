import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Input } from 'semantic-ui-react'

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
    // searchedBooks: [],
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

  // chooseHandler = () => {   // may become obsolete -> yes this button is not needed.
  //   if (this.props.selectedBook) {
  //     this.props.onDone();
  //   }
     
  // }

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
      <Modal trigger={<Button className="SelectBookButton" onClick={() => this.props.onEmptySearchedBooks()}>Select Another Book</Button>}>
        <Modal.Content scrolling={true}>
          <Input placeholder='search...' onChange={(event) => this.setState({ keyword: event.target.value})} />
          <Button onClick={this.searchHandler}>찾기</Button>
          {/* <Button onClick={this.chooseHandler}>확인</Button>  */}
          {result}
          <Button onClick={this.seeMoreHandler}>더보기</Button>
        </Modal.Content>
      </Modal>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseBookModal);