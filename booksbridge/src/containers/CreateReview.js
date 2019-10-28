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
    short_review: true,  // default
    long_review: false,
    phrase: false,
    add_book: false,
    book: {isbn: "9788996991342", // 미움받을용기 isbn 
           authors:  "문병로",
           contents: "귀납적 사고를 통한 문제 해결 기법 훈련 알고리즘에 대한 지식을 기반으로 제대로 프로그래밍을 하는 이들뿐만 아니라, 알고리즘 속에 깃들어 있는 여러 가지 생각하는 방법, 자료구조, 테크닉을 통해 체계적으로 생각하는 훈련을 하고자 하는 모든 이들을 대상으로 합니다. 알고리즘의 설계와 분석을 활용하여 체계적으로 사고할 수 있는 빌딩 블록을 구축하여 컴퓨터 또는 관련 분야의 연구자 또는 개발자로서 갖춰야 할 지적 기반을 쌓을 수 있습니다.",
           publisher: "한빛아카데미",
           thumbnail: "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1566973%3Ftimestamp%3D20190130232605",
           title: "쉽게 배우는 알고리즘(개정판)(IT Cookbook 한빛 교재 시리즈 229)",
           }, 
    //book : this.props.selectedBook, // 1. from BookDetail   or   2. add book in this page by search
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
      <Button id="quote" content="Quote" onClick={() => this.setState({ ocr: !this.state.ocr })} />;
    const addBook = !this.state.add_book && (this.state.book == null) &&
      <Button id="add-book" content="Add Book" onClick={() => this.setState({ add_book: !this.state.add_book })} />;

    console.log(this.state.book);
    const book = <BookResultSummary
                  cover={this.state.book.thumbnail}
                  title={this.state.book.title}
                  authors={this.state.book.authors}
                  publisher={this.state.book.publisher}
                  isbn={this.state.book.isbn}
                 />;

    return (
      <div className='CreateReview'>
        <Header />
        <h1>Create Review</h1>

        <div id="category">
          <Checkbox id="short-review" content="Short Review" onClick={() => this.setState({
            short_review: !this.state.short_review,
            long_review: false, phrase: false
          })} />
          <Checkbox id="long-review" content="Long Review" onClick={() => this.setState({
            long_review: !this.state.long_review,
            short_review: false, phrase: false
          })} />
          <Checkbox id="phrase" content="Phrase" onClick={() => this.setState({
            phrase: !this.state.phrase,
            short_review: false, long_review: false
          })} />
        </div>
        <div>
          {addBook}
          <AddBookModal id="add-book-modal" show={this.state.add_book} whenDone={(book_id) => this.addedBook(book_id)} />
          {book}
          Title:
          <input id="review-title" onChange={(event) => this.setState({ title: event.target.value })} />
          Content: 
          <textarea id="review-content" onChange={(event) => this.setState({ content: event.target.value })} />
          {quote}
          <OCRModal id="ocr-modal" show={this.state.ocr} whenDone={() => this.setState({ ocr: !this.state.ocr })} />
          <Button id="create-review" content="Create" onClick={() => this.onClickCreateButton()} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);


