import { connect } from 'react-redux';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button, Form, TextArea } from 'semantic-ui-react';

import Header from '../components/Header';
import OcrModal from '../components/OcrModal/OcrModal';
import ChooseBookModal from '../components/ChooseBookModal';
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
      if (this.state.title != '' && this.state.content != '') {
        this.props.onPostArticle({
          isbn: this.props.selectedBook.isbn,
          title: this.state.title,
          content: this.state.content,
          is_long: true,
          is_short: false,
          is_phrase: false,
        });
        window.alert('Success!');
      } else {
        window.alert('Title or content is empty.');
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
        window.alert('Success!');
      } else {
        window.alert('Content is empty.');
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
    return (
      <div className="CreateReview">
        <Header />
        <h1>Create Review</h1>
        <div className="ReviewTypeCheckbox">
          <div className="ui form">
            <div className="inline fields">
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
            </div>
          </div>
        </div>

        <div>
          <div className="SelectedBook">{book}</div>
          <ChooseBookModal id="choose-book-modal" />
          <div className="ReviewCreateForm">
            <Form className="ui form">
              {this.state.type === 'long-review' ? (
                <div className="field">
                  <label className="FormLabel">Title</label>
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
                <label className="FormLabel">Content</label>
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
    onSearchBooks: (keyword, page) =>
      dispatch(actionCreators.getSearchedBooks(keyword, page)),
    onGetSpecificBook: isbn => dispatch(actionCreators.getSpecificBook(isbn)),
    onPostArticle: review => dispatch(actionCreators.postArticle(review)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CreateReview));
