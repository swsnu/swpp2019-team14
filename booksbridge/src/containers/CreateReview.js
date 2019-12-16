import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import {
  Popup,
  Button,
  Form,
  TextArea,
  Confirm,
  Checkbox,
} from 'semantic-ui-react';

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
    confirm: false,
    spoiler: false,
  };

  onClickCreateButton = () => {
    if (this.state.type === 'long-review') {
      this.props.onPostArticle({
        isbn: this.props.selectedBook.isbn,
        title: this.state.title.trim(),
        content: this.state.content.trim(),
        is_long: true,
        is_short: false,
        is_phrase: false,
        is_spoiler: this.state.spoiler,
      });
    } else {
      this.props.onPostArticle({
        isbn: this.props.selectedBook.isbn,
        title: '',
        content: this.state.content.trim(),
        is_long: false,
        is_short: this.state.type === 'short-review',
        is_phrase: this.state.type === 'phrase',
        is_spoiler: this.state.spoiler,
      });
    }
  };

  radioHandler = event => {
    this.setState({ type: event.target.value });
  };

  confirm_open = () => {
    if (!this.props.selectedBook) {
      window.alert('책을 반드시 선택해야 합니다.');
      return;
    } else if (this.state.type === 'long-review') {
      if (this.state.title === '')
        window.alert('제목을 반드시 입력해야 합니다.');
      else if (this.state.title !== '' && this.state.title.trim() === '')
        window.alert('공백 문자로만 이루어진 제목은 허용되지 않습니다.');
      else if (this.state.title.trim().length > 40)
        window.alert('제목은 40자 이내여야 합니다.');
      else if (this.state.content === '')
        window.alert('내용을 반드시 작성해야 합니다.');
      else if (this.state.content !== '' && this.state.content.trim() === '')
        window.alert('공백 문자로만 이루어진 내용은 허용되지 않습니다.');
      else if (this.state.content.trim().length > 5000)
        window.alert('내용은 5000자 이내여야 합니다.');
      else if (this.state.content.trim().length < 140) {
        window.alert('긴 리뷰는 140자 이상 작성해야 합니다.');
      } else {
        this.setState({ ...this.state, confirm: true });
      }
    } else if (this.state.type === 'short-review') {
      if (this.state.content === '')
        window.alert('내용을 반드시 작성해야 합니다.');
      else if (this.state.content !== '' && this.state.content.trim() === '')
        window.alert('공백 문자로만 이루어진 내용은 허용되지 않습니다.');
      else if (this.state.content.trim().length > 5000)
        window.alert('내용은 5000자 이내여야 합니다.');
      else if (this.state.content.trim().length > 140) {
        window.alert('짧은 리뷰는 140자를 넘을 수 없습니다.');
      } else this.setState({ ...this.state, confirm: true });
    } else {
      if (this.state.content === '')
        window.alert('내용을 반드시 작성해야 합니다.');
      else if (this.state.content !== '' && this.state.content.trim() === '')
        window.alert('공백 문자로만 이루어진 내용은 허용되지 않습니다.');
      else if (this.state.content.trim().length > 5000)
        window.alert('내용은 5000자 이내여야 합니다.');
      else this.setState({ ...this.state, confirm: true });
    }
  };
  confirm_close = () => this.setState({ ...this.state, confirm: false });

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

    const SpoilerCheckbox = (
      <div>
        <Checkbox
          className="SpoilerCheckbox"
          onChange={() =>
            this.setState(prevState => ({ spoiler: !prevState.spoiler }))
          }
          checked={this.state.spoiler}
          label="스포일러 방지 체크"
        />
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

    const currentContentLength =
      this.state.content.trim().length === 0 ||
      (this.state.type === 'short-review' &&
        this.state.content.trim().length > 140) ||
      (this.state.type === 'long-review' &&
        this.state.content.trim().length < 140) ||
      this.state.content.trim().length > 5000 ? (
        <div className="CreateReviewContentHeaderCurrentLengthIllegal">
          현재 글자 수: {this.state.content.trim().length}자
        </div>
      ) : (
        <div className="CreateReviewContentHeaderCurrentLength">
          현재 글자 수: {this.state.content.trim().length}자
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
                  <label className="FormLabel">리뷰 제목</label>
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
                <div className="CreateReviewContentHeader">
                  <label className="FormLabel">리뷰 내용</label>
                  {this.state.type === 'phrase' ? null : currentContentLength}
                </div>
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
              {this.state.type !== 'phrase' ? SpoilerCheckbox : null}
              <Button
                color={'black'}
                className="SubmitButton"
                id="create-review"
                content="리뷰 만들기"
                onClick={this.confirm_open}
              />
              <Confirm
                className="CreateReviewConfirm"
                open={this.state.confirm}
                onCancel={this.confirm_close}
                onConfirm={() => this.onClickCreateButton()}
                size={'large'}
                cancelButton="취소"
                confirmButton="작성"
                content="이대로 리뷰를 올리시겠습니까? 올린 후, 리뷰의 종류(Long Review/Short Review/Phrase)는 수정할 수 없습니다."
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
