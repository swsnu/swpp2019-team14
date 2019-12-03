import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Popup, Button, Form, TextArea } from 'semantic-ui-react';

import Header from '../components/Header';
import OcrModal from '../components/OcrModal/OcrModal';
import ReviewChooseBookModal from '../components/ReviewChooseBookModal';
import * as actionCreators from '../store/actions/actionCreators';
import BookResultSummary from '../components/BookResultSummary/BookResultSummary';

import './CreateReview.css';

class CreateReview extends Component {
  state = {
    title: '',
    content: '',
    type: 'long-review',
  };

  onClickCreateButton = () => {
    if (!this.props.selectedBook) {
      return;
    }
    if (this.state.type === 'long-review') {
      if (this.state.content.length < 140) {
        window.alert('긴 리뷰는 140자 이상 작성해야 합니다.');
      } else if (this.state.title != '' && this.state.content != '') {
        this.props.onPostArticle({
          isbn: this.props.selectedBook.isbn,
          title: this.state.title,
          content: this.state.content,
          is_long: true,
          is_short: false,
          is_phrase: false,
        });
      } else {
      }
    } else {
      if (this.state.content != '') {
        this.props.onPostArticle({
          isbn: this.props.selectedBook.isbn,
          title: '',
          content: this.state.content,
          is_long: false,
          is_short: this.state.type === 'short-review',
          is_phrase: this.state.type === 'phrase',
        });
      } else {
      }
    }
  };

  radioHandler = event => {
    this.setState({ type: event.target.value });
  };

  render() {
    const book = this.props.selectedBook ? (
      <BookResultSummary
        cover={this.props.selectedBook.thumbnail}
        title={this.props.selectedBook.title}
        authors={this.props.selectedBook.authors}
        publisher={this.props.selectedBook.publisher}
        isbn={this.props.selectedBook.isbn}
        direct={false}
        click={() => {}}
      />
    ) : null;

    const LongReviewCheckbox = (
      <div className="field">
        <div className="ui radio checkbox">
          <input
            type="radio"
            id="long-review-radio"
            type="radio"
            name="radioGroup"
            value="long-review"
            checked={this.state.type === 'long-review'}
            onChange={this.radioHandler}
          />
          <label>Long Review</label>
        </div>
      </div>
    );

    const ShortReviewCheckbox = (
      <div className="field">
        <div className="ui radio checkbox">
          <input
            type="radio"
            id="short-review-radio"
            type="radio"
            name="radioGroup"
            value="short-review"
            checked={this.state.type === 'short-review'}
            onChange={this.radioHandler}
          />
          <label>Short Review</label>
        </div>
      </div>
    );

    const PhraseCheckbox = (
      <div className="field">
        <div className="ui radio checkbox">
          <input
            type="radio"
            id="phrase-radio"
            type="radio"
            name="radioGroup"
            value="phrase"
            checked={this.state.type === 'phrase'}
            onChange={this.radioHandler}
          />
          <label>Phrase</label>
        </div>
      </div>
    );

    return (
      <div className="CreateReview">
        <Header />
        <div className="ReviewTypeCheckbox">
          <div className="ui form">
            <div className="inline fields">
              <Popup
                content="제목이 있고, 문단을 갖춘 긴 리뷰를 작성합니다. 긴 리뷰는 140자를 넘어야 합니다."
                trigger={LongReviewCheckbox}
              />
              <Popup
                content="140자 미만의 짧은 리뷰를 작성할 수 있습니다."
                trigger={ShortReviewCheckbox}
              />
              <Popup
                content="인상 깊었던 책의 구절, 문장 혹은 문단을 모두와 공유해보세요."
                trigger={PhraseCheckbox}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="SelectedBook">{book}</div>
          <ReviewChooseBookModal id="choose-book-modal" />
          <div className="ReviewCreateForm">
            <Form className="ui form">
              {this.state.type === 'long-review' ? (
                <div className="field">
                  <label className="FormLabel">제목</label>
                  <input
                    id="review-title"
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    onChange={event =>
                      this.setState({ title: event.target.value })
                    }
                  />
                </div>
              ) : null}
              <br />
              <div className="field">
                <label className="FormLabel">내용</label>
                <TextArea
                  id="review-content"
                  name="content"
                  placeholder="Enter Content"
                  rows={this.state.type === 'long-review' ? '20' : '5'}
                  onChange={event =>
                    this.setState({ content: event.target.value })
                  }
                />
              </div>

              <OcrModal id="ocr-modal" />

              <Button
                className="SubmitButton"
                id="create-review"
                content="Submit"
                onClick={() => this.onClickCreateButton()}
              />
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedBook: state.book.selectedBook,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPostArticle: review => dispatch(actionCreators.postArticle(review)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CreateReview));
