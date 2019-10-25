import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './containers.css';
import Form from 'react-bootstrap/Form';

import Header from '../components/Header';
import OCRModal from '../components/OCRModal';
import AddBookModal from '../components/AddBookModal';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

class BookDetail extends Component {

  state = {
    title: "",
    content: "",
    short_review: true,  // default
    long_review: false, 
    phrase: false,
    add_book: false,
    book: this.props.selectedBook, // from bookDetail
    ocr: false,
  }

  componentDidMount() {
  }

//   static getDerivedStateFromProps(nextProps, nextState) {
//     return nextState;
//   }


HandleCheckbox = () => {
    // short review  vs  long review  vs  phrase
    // because when we send post request to create review, we should decide review's type
}

onClickCreateButton = () => {
    // create review OR show alert message for inappropriate input 
    if (this.state.title != "" && this.state.content != "") {
        // something like this.props.createReview
    } else {
        window.alert("input is empty");        
    }
}

addedBook = (book_id) => {  // this function may become obsolete as we get book from selectedBook in both cases
  this.setState({ add_book: false })
  // get request to /book to get chosen book
}



render() {
    const quote = !this.state.ocr && 
                  <Button id="quote" content="Quote" onClick={() => this.setState({ ocr: !this.state.ocr })}/>;
    const addBook = !this.state.add_book && (this.state.book == null) && 
                    <Button id="add-book" content="Add Book" onClick={()=> this.setState({ add_book: !this.state.add_book })}/>;
    const book = this.state.book;

    return (
      <div className='CreateReview'>
        <Header />
        <h1>Create Review</h1>
        
        <div id="category">
            <Checkbox id="short-review" content="Short Review" onClick={() => this.setState({ short_review: !this.state.short_review,
                                                                                              long_review: false, phrase: false })}/>
            <Checkbox id="long-review" content="Long Review" onClick={() => this.setState({ long_review: !this.state.long_review,
                                                                                            short_review: false, phrase: false })}/>
            <Checkbox id="phrase" content="Phrase" onClick={() => this.setState({ phrase: !this.state.phrase,
                                                                                  short_review: false, long_review: false })}/>
        </div>

        <div id="review-write-section">
            {addBook}
            <AddBookModal id="add-book-modal" show={this.state.add_book} whenDone={(book_id) => this.addedBook(book_id)}/>
            {book}
            <input id="review-title" onChange={(event) => this.setState({ title: event.target.value })}/>
            <textarea id="review-content" onChange={(event) => this.setState({ content: event.target.value })}/>
            {quote}
            <OCRModal id="ocr-modal" show={this.state.ocr} whenDone={() => this.setState({ ocr: !this.state.ocr })}/>  
            <Button id="create-review" content="Create" onClick={()=>this.onClickCreateButton()}/>
        </div>        

      </div>
    );
  } 
}

const mapStateToProps = state => {
  return {
    selectedBook: state.book.selectedBook,
  };
}

const mapDispatchToProps = dispatch => {
  return {
      // 1. createReview (/review)
      // 2. get book search results (/search)
      // 3. get book (/book)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);


