import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Popup, Button, Form, TextArea, Confirm } from 'semantic-ui-react';

import Header from '../components/Header';
import OcrModal from '../components/OcrModal/OcrModal';
import * as actionCreators from '../store/actions/actionCreators';
import Spinner from 'react-bootstrap/Spinner';
import BookResultSummary from '../components/BookResultSummary/BookResultSummary';

class EditReview extends Component {
  constructor(params) {
    super(params);
    this.state = {
      title: '',
      content: '',
      confirm: false,
      loaded: false,
    };
    this.props.onLoadArticle(this.props.match.params.review_id);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.loaded && this.props.selectedArticle)
      this.setState({
        title: this.props.selectedArticle.title,
        content: this.props.selectedArticle.content,
        loaded: true,
        confirm: false,
      });
  }

  onClickEditButton = () => {
    this.props.onEditArticle({
      id: this.props.selectedArticle.id,
      isbn: this.props.selectedArticle.book.isbn,
      title: this.state.title,
      content: this.state.content,
      is_long: this.props.selectedArticle.is_long,
      is_short: this.props.selectedArticle.is_short,
      is_phrase: this.props.selectedArticle.is_phrase,
    });
  };

  confirm_open = () => {
    const article = this.props.selectedArticle;
    if (!article) return;
    if (article.is_long) {
      if (this.state.title === '')
        window.alert('제목을 반드시 입력해야 합니다.');
      else if (this.state.content === '')
        window.alert('내용을 반드시 작성해야 합니다.');
      else if (this.state.content.length < 140) {
        window.alert('긴 리뷰는 140자 이상 작성해야 합니다.');
      } else {
        this.setState({ ...this.state, confirm: true });
      }
    } else if (article.is_short) {
      if (this.state.content === '')
        window.alert('내용을 반드시 작성해야 합니다.');
      else if (this.state.content.length > 140) {
        window.alert('짧은 리뷰는 140자를 넘을 수 없습니다.');
      } else this.setState({ ...this.state, confirm: true });
    } else {
      if (this.state.content === '')
        window.alert('내용을 반드시 작성해야 합니다.');
      else this.setState({ ...this.state, confirm: true });
    }
  };
  confirm_close = () => this.setState({ ...this.state, confirm: false });

  render() {
    if (!this.props.selectedArticle)
      return (
        <Spinner
          id="edit-review-spinner"
          animation="border"
          className="Spinner"
        />
      );
    const article = this.props.selectedArticle;

    const book = (
      <BookResultSummary
        cover={article.book.thumbnail}
        title={article.book.title}
        authors={article.book.authors}
        publisher={article.book.publisher}
        isbn={article.book.isbn}
        direct={false}
        click={() => {}}
      />
    );

    return (
      <div className="EditReview">
        <Header />
        <div>
          <div className="ReviewCreateForm">
            <div className="SelectedBook">{book}</div>
            <Form className="ui form">
              {article.is_long === true ? (
                <div className="field">
                  <label className="FormLabel">리뷰 제목</label>
                  <input
                    id="review-title"
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={event =>
                      this.setState({
                        ...this.state,
                        title: event.target.value,
                      })
                    }
                  />
                </div>
              ) : null}
              <br />
              <div className="field">
                <label className="FormLabel">리뷰 내용</label>
                <TextArea
                  id="review-content"
                  name="content"
                  value={this.state.content}
                  rows={article.is_long === true ? '20' : '5'}
                  onChange={event =>
                    this.setState({
                      ...this.state,
                      content: event.target.value,
                    })
                  }
                />
              </div>

              <OcrModal id="ocr-modal" />

              <Button
                className="SubmitButton"
                id="edit-review"
                content="Submit"
                onClick={this.confirm_open}
              />
              <Confirm
                className="CreateReviewConfirm"
                open={this.state.confirm}
                onCancel={this.confirm_close}
                onConfirm={() => this.onClickEditButton()}
                size={'large'}
                cancelButton="취소"
                confirmButton="수정"
                content="이대로 리뷰의 내용을 수정합니까?"
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
    selectedArticle: state.article.selectedArticle,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEditArticle: review =>
      dispatch(actionCreators.editSpecificArticle(review)),
    onLoadArticle: id => dispatch(actionCreators.getSpecificArticle(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(EditReview));
