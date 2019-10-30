import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './containers.css';
import Form from 'react-bootstrap/Form';
import { Button, Radio, TextArea } from 'semantic-ui-react'
import {Header as uiHeader} from 'semantic-ui-react';

import Header from '../components/Header';
import OcrModal from '../components/OcrModal';
import ChooseBookModal from '../components/ChooseBookModal';
import Checkbox from '../components/Checkbox';
import * as actionCreators from '../store/actions/actionCreators';
import BookResultSummary from '../components/BookResultSummary/BookResultSummary';

const mapStateToProps = state => {
  return {
    selectedBook: state.book.selectedBook,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSearchBooks: (keyword, page) => dispatch(actionCreators.getSearchedBooks(keyword, page)),
    onGetSpecificBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
    onPostShortReview: review => dispatch(actionCreators.postShortReview(review)),
    onPostLongReivew: review => dispatch(actionCreators.postLongReview(review)),
    onPostPhrase: review => dispatch(actionCreators.postPhrase(review)),
  }
}

class CreateReview extends Component {

  state = {
    title: "",
    content: "",
    type: "phrase",
    addBookBySearch: false,
    book : this.props.selectedBook, // 1. from BookDetail   or   2. add book in this page by search
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
      this.props.onPostShortReview({
        isbn: this.state.book.isbn,
        title: this.state.title,
        content: this.state.content
      })
      window.alert("review is created");
    } else {
      window.alert("input is empty");
    }
  }

  addedBook = (book_id) => {  // this function may become obsolete as we get book from selectedBook in both cases
    this.setState({ add_book: false })
    // get request to /book to get chosen book
  }

  radioHandler = (event) => {
    this.setState({ type: event.target.value });
  }



  render() {
    // const quote = !this.state.ocr &&
    //   <Button id="quote" content="Quote" onClick={() => this.setState({ ocr: !this.state.ocr })} />;

    // const addBook = !this.state.add_book && (this.state.book == null) &&
    //   <Button id="add-book" content="Add Book" onClick={() => this.setState({ add_book: !this.state.add_book })} />;

    // const addBookModal = <AddBookModal id="add-book-modal" show={this.state.add_book} whenDone={(book_id) => this.addedBook(book_id)} />

    const book = (this.props.selectedBook) ? 
                  <BookResultSummary
                    cover={this.state.book.thumbnail}
                    title={this.state.book.title}
                    authors={this.state.book.authors}
                    publisher={this.state.book.publisher}
                    isbn={this.state.book.isbn}
                  /> :
                  <BookResultSummary
                    cover={null}
                    title={null}
                    authors={null}
                    publisher={null}
                    isbn={null}
                  />;
                 
    
    console.log("DEBUG: ", this.props.selectedBook);

    return (
      <div className='CreateReview'>
        <Header/>
        <h1>Create Review</h1>

          <form>
            <label>
              <input
                id="short-review-radio"
                type='radio'
                name='radioGroup'
                value='short-review'
                checked={this.state.type === 'short-review'}
                onChange={this.radioHandler}
              />
              Short Review
            </label>
            <label>
              <input
                id="long-review-radio"
                type='radio'
                name='radioGroup'
                value='long-review'
                checked={this.state.type === 'long-review'}
                onChange={this.radioHandler}
              />
              Long Review
            </label>
            <label>
              <input
                  id="phrase-radio"
                  type='radio'
                  name='radioGroup'
                  value='phrase'
                  checked={this.state.type === 'phrase'}
                  onChange={this.radioHandler}
              />
              Phrase
            </label>
          </form>

        <div>
          <ChooseBookModal id="choose-book-modal" onDone={() => this.setState({ addBookBySearch: true})} />
          {book}

          제목:
          <TextArea 
            id="review-title" 
            onChange={(event) => this.setState({ title: event.target.value })} 
            placeholder='write your title' 
            rows={2}
            style={{ minWidth: 1000 }}
          />
          <br/>
          내용:
          <TextArea 
            id="review-content" 
            onChange={(event) => this.setState({ content: event.target.value })} 
            placeholder='write your thoughts' 
            style={{ minHeight: 500, minWidth: 1000 }} 
          />
          <OcrModal id="ocr-modal"/>
          <Button id="create-review" content="완료" onClick={() => this.onClickCreateButton()} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);


