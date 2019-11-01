import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import './containers.css';
import Form from 'react-bootstrap/Form';
import { Button, Radio, TextArea } from 'semantic-ui-react'
import {Header as uiHeader} from 'semantic-ui-react';

import Header from '../components/Header';
import OcrModal from '../components/OcrModal/OcrModal';
import ChooseBookModal from '../components/ChooseBookModal';
import Checkbox from '../components/Checkbox';
import * as actionCreators from '../store/actions/actionCreators';
import BookResultSummary from '../components/BookResultSummary/BookResultSummary';


class CreateReview extends Component {

  state = {
    title: "",
    content: "",
    type: "short-review",
  }

  onClickCreateButton = () => {
    if (this.state.title != "" && this.state.content != "") {
      this.props.onPostArticle({
        isbn: this.props.selectedBook.isbn,
        title: this.state.title,
        content: this.state.content,
        is_long: this.state.type === "long-review",
        is_short: this.state.type === "short-review",
        is_phrase: this.state.type === "phrase"
      })
      window.alert("포스팅되었습니다");
    } else {
      window.alert("제목 또는 내용이 비어있습니다");
    }
  }

  radioHandler = (event) => {
    this.setState({ type: event.target.value });
  }


  render() {
    const book = (this.props.selectedBook) ? 
                  <BookResultSummary
                    cover={this.props.selectedBook.thumbnail}   
                    title={this.props.selectedBook.title}
                    authors={this.props.selectedBook.authors}
                    publisher={this.props.selectedBook.publisher}
                    isbn={this.props.selectedBook.isbn}
                    direct={false}
                  /> :
                  <BookResultSummary
                    cover={null}
                    title={null}
                    authors={null}
                    publisher={null}
                    isbn={null}
                    direct={false}
                  />;
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
          <ChooseBookModal id="choose-book-modal"  />
          {book}
          제목:
          <TextArea 
            id="review-title" 
            onChange={(event) => this.setState({ title: event.target.value })} 
            placeholder='제목을 입력하세요' 
            rows={2}
            style={{ minWidth: 1000 }}
          />
          <br/>
          내용:
          <TextArea 
            id="review-content" 
            onChange={(event) => this.setState({ content: event.target.value })} 
            placeholder='내용을 입력하세요' 
            style={{ minHeight: 500, minWidth: 1000 }} 
          />
          <OcrModal id="ocr-modal"/>
          <Button id="create-review" content="완료" onClick={() => this.onClickCreateButton()} />
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
    onSearchBooks: (keyword, page) => dispatch(actionCreators.getSearchedBooks(keyword, page)),
    onGetSpecificBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
    onPostArticle: review => dispatch(actionCreators.postArticle(review)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateReview);


