import React, { Component } from 'react';
import Button from './Button';

class AddBookModal extends Component {

    state = {
        searchKeyword = "",
        searchedBookList = [],
        book: "", 
    }

   
    onClickChooseBookButton = () => {
        this.props.whenDone(this.state.book); // book = book_id
    } 

    onClickSearchBookButton = () => {
        // send get request to /search and get back list of books
        // change this.state.searcedBookList

    }


    render() {
        const bookList = null; // made of BookInfo component with this.state.searchedBookList

        const ADD_BOOK = this.props.show &&
                        <div id="add-book-modal">
                            <input id="search-book" onChange={(event) => this.setState({ searchKeyword: event.target.value })}/> 
                            <Button id="search-book-button" content="Search" onClick={() => this.props.onClickSearchBookButton()}/>
                            {bookList}
                            <Button id="choose-book-button" content="Choose" onClick={() => this.props.onClickChooseBookButton()}/>
                        </div>
        return ADD_BOOK; 
    }
}

const mapDispatchToProps = dispatch => {
  return {
      // 1. get request to /search for books
      
  }
}
export default connect(null, mapDispatchToProps)(AddBookModal);