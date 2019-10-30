import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Button, Modal, Input } from 'semantic-ui-react'

import * as actionCreators from '../store/actions/actionCreators';
import BookResultSummary from '../components/BookResultSummary/BookResultSummary';

const mapStateToProps = state => {
  return {
    selectedBook: state.book.selectedBook,
    books: state.book.books,
    count: state.book.count,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onSearchBooks: (keyword, page) => dispatch(actionCreators.getSearchedBooks(keyword, page)),
    onGetSpecificBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
  }
}

class ChooseBookModal extends Component {

  state = {
    keyword: "",
    requestNum: 1,
    searchedBooks: [],
  }

  searchHandler = () => {
    this.props.onSearchBooks(this.state.keyword, 1);
    this.setState({ searchedBooks: this.props.books});
    this.setState({ requestNum: 2});
  }
  seeMoreHandler = () => {
    this.props.onSearchBooks(this.state.keyword, this.state.requestNum);
    this.setState({ searchedBooks: this.state.searchedBooks.concat(this.props.books)});
    this.setState({ requestNum: this.state.requestNum + 1 });
  }

  chooseHandler = () => {   // may become obsolete
    if (this.props.selectedBook) {
      this.props.onDone();
    }
     
  }

  render () {
    const result = this.state.searchedBooks.map(book => {
                    return (
                        <BookResultSummary
                            cover={book.thumbnail}
                            title={book.title}
                            authors={book.authors}
                            publisher={book.publisher}
                            isbn={book.isbn}
                            direct={true}
                        />
                    );
                });

    return (
      <Modal trigger={<Button>책 고르기</Button>}>
        <Modal.Content scrolling={true}>
          <Input placeholder='search...' onChange={(event) => this.setState({ keyword: event.target.value})} />
          <Button onClick={this.searchHandler}>찾기</Button>
          <Button onClick={this.chooseHandler}>확인</Button> 
          {result}
          <Button onClick={this.seeMoreHandler}>더보기</Button>
        </Modal.Content>
      </Modal>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseBookModal);